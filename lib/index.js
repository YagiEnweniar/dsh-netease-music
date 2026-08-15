/**
 * dsh-netease-music — host half.
 *
 * Drives the local Netease `ncm-cli` (search / play / control / state / daily
 * / playlists) through the `subprocess` service and exposes it to the browser
 * client over HTTP routes under `/plugins/ncm/*`. Playback itself happens on
 * the machine via the CLI's mpv backend; this plugin only sends commands and
 * relays state.
 *
 * @module dsh-netease-music
 */
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

export const name = 'dsh-netease-music';
export const inject = ['webServer', 'subprocess'];

/** Candidate locations of the npm-global ncm-cli entry, ordered by likelihood. */
function detectNcmEntry() {
	const candidates = [];
	if (process.env.APPDATA !== undefined) {
		candidates.push(join(process.env.APPDATA, 'npm', 'node_modules', '@music163', 'ncm-cli', 'dist', 'index.js'));
	}
	if (process.env.npm_config_prefix !== undefined) {
		candidates.push(join(process.env.npm_config_prefix, 'node_modules', '@music163', 'ncm-cli', 'dist', 'index.js'));
	}
	candidates.push(join(homedir(), '.npm-global', 'lib', 'node_modules', '@music163', 'ncm-cli', 'dist', 'index.js'));
	candidates.push('/usr/local/lib/node_modules/@music163/ncm-cli/dist/index.js');
	return candidates.find((candidate) => existsSync(candidate)) ?? '';
}

/** Extract the first complete JSON value (object or array) from text. */
function extractFirstJson(value) {
	let start = value.indexOf('{');
	if (start === -1) start = value.indexOf('[');
	if (start === -1) return null;
	const open = value[start];
	const close = open === '{' ? '}' : ']';
	let depth = 0;
	let inStr = false;
	let esc = false;
	for (let i = start; i < value.length; i++) {
		const c = value[i];
		if (inStr) {
			if (esc) esc = false;
			else if (c === '\\') esc = true;
			else if (c === '"') inStr = false;
			continue;
		}
		if (c === '"') { inStr = true; continue; }
		if (c === open) depth += 1;
		else if (c === close) {
			depth -= 1;
			if (depth === 0) return value.slice(start, i + 1);
		}
	}
	return null;
}

/** Locate and parse the first JSON value inside text (ncm-cli may prepend
 * banners and append trailing output on some platforms). */
function parseJson(text) {
	let value = String(text).trim();
	if (value === '') return {};
	// Strip ANSI escape sequences and a leading UTF-8 BOM that some shells add.
	value = value.replace(/\u001B\[[0-9;]*[A-Za-z]/g, '').replace(/^\uFEFF/, '');
	const first = extractFirstJson(value);
	if (first === null) return { raw: value.slice(0, 500), rawLen: value.length, rawTail: value.slice(-200) };
	try {
		return JSON.parse(first);
	} catch {
		return { raw: value.slice(0, 500), rawLen: value.length, rawTail: value.slice(-200) };
	}
}

export function apply(ctx, config = {}) {
	const cfg = {
		ncmCliEntry: (config.ncmCliEntry && String(config.ncmCliEntry).trim()) || detectNcmEntry(),
		nodeBin: (config.nodeBin && String(config.nodeBin).trim()) || process.execPath,
		timeoutMs: Number.isFinite(config.timeoutMs) ? config.timeoutMs : 30000,
	};
	if (cfg.ncmCliEntry === '') {
		ctx.logger.warn('dsh-netease-music: ncm-cli entry not found — set config.ncmCliEntry (path to @music163/ncm-cli/dist/index.js)');
	}
	const subprocess = ctx.subprocess;
	const webServer = ctx.webServer;

	/**
	 * Run one ncm-cli invocation and return the parsed JSON result.
	 *
	 * Commands that drive the local player daemon (play/control/queue) must use
	 * `inherit` stdio: the daemon talks back to its parent over stdout, and a
	 * pipe/collect parent (like the DSH subprocess collector) swallows that
	 * channel, making the daemon appear unresponsive ("daemon 无响应").
	 * Read-only/query commands keep collect mode so we can parse their JSON.
	 * @param args - CLI arguments after the entry script.
	 * @param opts - `{ inherit?: boolean }` switches to inherited stdio.
	 */
	async function runNcm(args, opts = {}) {
		if (cfg.ncmCliEntry === '') {
			const error = new Error('ncm-cli 未找到：请在插件配置中设置 ncmCliEntry（@music163/ncm-cli/dist/index.js 的路径）');
			error.status = 503;
			throw error;
		}
		const handle = subprocess.spawn({
			argv: [cfg.nodeBin, cfg.ncmCliEntry, ...args],
			cwd: process.cwd(),
			stdio: opts.inherit === true
				? { stdin: 'ignore', stdout: 'inherit', stderr: 'inherit' }
				: {
					stdin: 'ignore',
					stdout: { maxBytes: 8 * 1024 * 1024 },
					stderr: { maxBytes: 2 * 1024 * 1024 },
				},
			graceMs: cfg.timeoutMs,
		});
		const outcome = await handle.done;
		if (opts.inherit === true) return {};
		const stdout = handle.collected.stdout !== undefined ? handle.collected.stdout.readFrom(0).text : '';
		const stderr = handle.collected.stderr !== undefined ? handle.collected.stderr.readFrom(0).text : '';
		if (outcome.exitCode !== 0) {
			const error = new Error(stderr || `ncm-cli exited with code ${outcome.exitCode}`);
			error.status = 502;
			throw error;
		}
		return parseJson(stdout);
	}

	// ---- HTTP plumbing ----
	function sendJson(res, status, body) {
		const text = JSON.stringify(body);
		res.writeHead(status, {
			'content-type': 'application/json; charset=utf-8',
			'cache-control': 'no-store',
		});
		res.end(text);
	}

	function readBody(req) {
		return new Promise((resolve, reject) => {
			let data = '';
			req.on('data', (chunk) => {
				data += chunk;
				if (data.length > 1e6) {
					req.destroy();
					reject(new Error('request body too large'));
				}
			});
			req.on('end', () => {
				if (data === '') {
					resolve({});
					return;
				}
				try {
					resolve(JSON.parse(data));
				} catch {
					reject(new Error('invalid JSON body'));
				}
			});
			req.on('error', reject);
		});
	}

	function route(kind, path, handler) {
		ctx.effect(
			() => webServer.register({ kind, path, handler: wrap(handler) }),
			`dsh-netease-music: ${path}`,
		);
	}

	function wrap(handler) {
		return async (req, res) => {
			try {
				await handler(req, res);
			} catch (error) {
				const status = Number.isInteger(error.status) ? error.status : 500;
				sendJson(res, status, { ok: false, error: error.message ?? String(error) });
			}
		};
	}

	function queryOf(req) {
		const url = new URL(req.url ?? '/', 'http://x');
		return url.searchParams;
	}

	// ---- routes ----
	route('exact', '/plugins/ncm/state', async (_req, res) => {
		const result = await runNcm(['state']);
		sendJson(res, 200, { ok: true, state: result.state ?? result });
	});

	route('exact', '/plugins/ncm/play', async (req, res) => {
		const body = await readBody(req);
		const { encryptedId, originalId } = body;
		if (typeof encryptedId !== 'string' || encryptedId === '') {
			sendJson(res, 400, { ok: false, error: 'encryptedId is required' });
			return;
		}
		const args = ['play', '--song', '--encrypted-id', encryptedId];
		if (typeof originalId === 'string' && originalId !== '') args.push('--original-id', originalId);
		const result = await runNcm(args, { inherit: true });
		sendJson(res, 200, { ok: true, result });
	});

	route('exact', '/plugins/ncm/play-playlist', async (req, res) => {
		const body = await readBody(req);
		const { encryptedId, originalId } = body;
		if (typeof encryptedId !== 'string' || encryptedId === '') {
			sendJson(res, 400, { ok: false, error: 'encryptedId is required' });
			return;
		}
		const args = ['play', '--playlist', '--encrypted-id', encryptedId];
		if (typeof originalId === 'string' && originalId !== '') args.push('--original-id', originalId);
		const result = await runNcm(args, { inherit: true });
		sendJson(res, 200, { ok: true, result });
	});

	route('exact', '/plugins/ncm/control', async (req, res) => {
		const body = await readBody(req);
		const action = String(body.action ?? '');
		const allowed = ['pause', 'resume', 'stop', 'next', 'prev'];
		if (!allowed.includes(action)) {
			sendJson(res, 400, { ok: false, error: `action must be one of ${allowed.join(', ')}` });
			return;
		}
		const result = await runNcm([action], { inherit: true });
		sendJson(res, 200, { ok: true, result });
	});

	route('exact', '/plugins/ncm/volume', async (req, res) => {
		const body = await readBody(req);
		const level = Number(body.level);
		if (!Number.isInteger(level) || level < 0 || level > 100) {
			sendJson(res, 400, { ok: false, error: 'level must be an integer 0-100' });
			return;
		}
		const result = await runNcm(['volume', String(level)], { inherit: true });
		sendJson(res, 200, { ok: true, result });
	});

	route('exact', '/plugins/ncm/seek', async (req, res) => {
		const body = await readBody(req);
		const seconds = Number(body.seconds);
		if (!Number.isFinite(seconds) || seconds < 0) {
			sendJson(res, 400, { ok: false, error: 'seconds must be a non-negative number' });
			return;
		}
		const result = await runNcm(['seek', String(seconds)], { inherit: true });
		sendJson(res, 200, { ok: true, result });
	});

	route('exact', '/plugins/ncm/search', async (req, res) => {
		const params = queryOf(req);
		const keyword = params.get('keyword') ?? '';
		if (keyword.trim() === '') {
			sendJson(res, 400, { ok: false, error: 'keyword is required' });
			return;
		}
		const limit = Math.min(Number(params.get('limit') ?? 30) || 30, 100);
		const result = await runNcm(['search', 'song', '--keyword', keyword, '--limit', String(limit)]);
		const records = Array.isArray(result?.data?.records) ? result.data.records : [];
		sendJson(res, 200, { ok: true, records, code: result.code ?? 200 });
	});

	route('exact', '/plugins/ncm/daily', async (req, res) => {
		const params = queryOf(req);
		const limit = Math.min(Number(params.get('limit') ?? 30) || 30, 40);
		const result = await runNcm(['recommend', 'daily', '--limit', String(limit)]);
		const records = Array.isArray(result?.data) ? result.data : [];
		sendJson(res, 200, { ok: true, records, code: result.code ?? 200 });
	});

	route('exact', '/plugins/ncm/playlists', async (_req, res) => {
		const created = await runNcm(['playlist', 'created']);
		const collected = await runNcm(['playlist', 'collected']);
		sendJson(res, 200, {
			ok: true,
			created: Array.isArray(created?.data?.records) ? created.data.records : [],
			collected: Array.isArray(collected?.data?.records) ? collected.data.records : [],
		});
	});

	route('exact', '/plugins/ncm/login-check', async (_req, res) => {
		const result = await runNcm(['login', '--check']);
		sendJson(res, 200, { ok: true, result });
	});

	route('exact', '/plugins/ncm/login', async (_req, res) => {
		const result = await runNcm(['login', '--background']);
		sendJson(res, 200, { ok: true, result });
	});

	route('exact', '/plugins/ncm/queue', async (_req, res) => {
		const result = await runNcm(['queue'], { inherit: true });
		sendJson(res, 200, { ok: true, result });
	});

	route('exact', '/plugins/ncm/queue-add', async (req, res) => {
		const body = await readBody(req);
		const { encryptedId, originalId, next } = body;
		if (typeof encryptedId !== 'string' || encryptedId === '') {
			sendJson(res, 400, { ok: false, error: 'encryptedId is required' });
			return;
		}
		const args = ['queue', 'add', '--encrypted-id', encryptedId];
		if (typeof originalId === 'string' && originalId !== '') args.push('--original-id', originalId);
		if (next === true) args.push('--next');
		const result = await runNcm(args, { inherit: true });
		sendJson(res, 200, { ok: true, result });
	});

	route('exact', '/plugins/ncm/queue-clear', async (_req, res) => {
		const result = await runNcm(['queue', 'clear'], { inherit: true });
		sendJson(res, 200, { ok: true, result });
	});

	route('exact', '/plugins/ncm/favorite', async (_req, res) => {
		const result = await runNcm(['user', 'favorite']);
		sendJson(res, 200, { ok: true, playlist: result?.data ?? null, code: result.code ?? 200 });
	});

	route('exact', '/plugins/ncm/tracks', async (req, res) => {
		const params = queryOf(req);
		const playlistId = params.get('playlistId') ?? '';
		if (playlistId === '') {
			sendJson(res, 400, { ok: false, error: 'playlistId is required' });
			return;
		}
		const limit = Math.min(Number(params.get('limit') ?? 30) || 30, 500);
		const offset = Math.max(Number(params.get('offset') ?? 0) || 0, 0);
		const result = await runNcm(['playlist', 'tracks', '--playlistId', playlistId, '--limit', String(limit), '--offset', String(offset)]);
		// `data` is an array for tracks; some playlist commands wrap in { records }.
		const records = Array.isArray(result?.data)
			? result.data
			: (Array.isArray(result?.data?.records) ? result.data.records : []);
		sendJson(res, 200, { ok: true, records, code: result.code ?? 200 });
	});

	route('exact', '/plugins/ncm/lyric', async (req, res) => {
		const params = queryOf(req);
		const songId = params.get('songId') ?? '';
		if (songId === '') {
			sendJson(res, 400, { ok: false, error: 'songId is required' });
			return;
		}
		const result = await runNcm(['song', 'lyric', '--songId', songId]);
		sendJson(res, 200, { ok: true, lyric: result?.data ?? null, code: result.code ?? 200 });
	});
}
