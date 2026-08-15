window.__ModuleLoader__.load({
	id: "dsh-netease-music",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");

		//#region css
		const CSS_ID = "dsh-netease-music/style";
		const css = `
.dshncm-entry{position:fixed;z-index:1000;box-sizing:border-box;display:flex;align-items:center;gap:8px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-module);color:var(--dsw-alias-label-primary);border-radius:8px;padding:0 12px;height:34px;font-size:12.5px;font-weight:600;cursor:pointer;transition:border-color .12s,background-color .12s}
.dshncm-entry:hover{border-color:var(--dsw-alias-state-business-primary);background:var(--dsw-alias-bg-fill-neutral)}
.dshncm-entry:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}
.dshncm-entry-badge{width:7px;height:7px;border-radius:50%;background:var(--dsw-alias-label-tertiary);flex:none}
.dshncm-entry-badge[data-playing=true]{background:var(--dsw-alias-state-success-primary);animation:dshncm-pulse 1.4s ease-in-out infinite}
@keyframes dshncm-pulse{50%{opacity:.4}}
.dshncm-entry-rail{justify-content:center;padding:0;width:34px}
.dshncm-entry-rail .dshncm-entry-label{display:none}
.dshncm-panel{position:fixed;z-index:2147483000;box-sizing:border-box;display:flex;flex-direction:column;background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l1);border-radius:12px;box-shadow:0 12px 40px color-mix(in srgb,var(--dsw-alias-label-primary) 18%,transparent);color:var(--dsw-alias-label-primary);font-size:13px;overflow:hidden}
.dshncm-panel-head{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid var(--dsw-alias-border-l1);flex:none}
.dshncm-panel-title{font-size:14px;font-weight:700;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dshncm-close{flex:none;width:24px;height:24px;border:none;background:transparent;color:var(--dsw-alias-label-secondary);border-radius:6px;cursor:pointer;font-size:14px;line-height:1}
.dshncm-close:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.dshncm-body{flex:1;min-height:0;overflow-y:auto;padding:10px 12px;display:flex;flex-direction:column;gap:10px}
.dshncm-login{display:flex;align-items:center;gap:8px;padding:8px 10px;border:1px solid var(--dsw-alias-border-l1);border-radius:8px;background:var(--dsw-alias-bg-module);font-size:12px}
.dshncm-login[data-ok=true]{border-color:var(--dsw-alias-state-success-primary)}
.dshncm-btn{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-module);color:var(--dsw-alias-label-primary);border-radius:8px;padding:5px 12px;font-size:12px;font-weight:600;cursor:pointer;transition:border-color .12s,color .12s}
.dshncm-btn:hover:not(:disabled){border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-state-business-primary)}
.dshncm-btn:disabled{opacity:.5;cursor:default}
.dshncm-btn[data-primary=true]{background:var(--dsw-alias-state-business-primary);border-color:transparent;color:#fff}
.dshncm-btn[data-primary=true]:hover:not(:disabled){opacity:.85;color:#fff}
.dshncm-now{display:flex;flex-direction:column;gap:8px;padding:10px;border:1px solid var(--dsw-alias-border-l1);border-radius:10px;background:var(--dsw-alias-bg-module)}
.dshncm-now-title{font-size:13px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dshncm-now-sub{font-size:11px;color:var(--dsw-alias-label-secondary)}
.dshncm-progress{height:5px;border-radius:3px;background:var(--dsw-alias-bg-fill-neutral);cursor:pointer;position:relative}
.dshncm-progress-fill{position:absolute;left:0;top:0;bottom:0;border-radius:3px;background:var(--dsw-alias-state-business-primary)}
.dshncm-progress-time{display:flex;justify-content:space-between;font-size:10.5px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
.dshncm-controls{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
.dshncm-iconbtn{flex:none;min-width:30px;height:30px;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border-radius:8px;cursor:pointer;font-size:14px;padding:0 8px}
.dshncm-iconbtn:hover:not(:disabled){border-color:var(--dsw-alias-state-business-primary);color:var(--dsw-alias-state-business-primary)}
.dshncm-iconbtn:disabled{opacity:.4;cursor:default}
.dshncm-iconbtn[data-main=true]{background:var(--dsw-alias-state-business-primary);border-color:transparent;color:#fff}
.dshncm-iconbtn[data-main=true]:hover:not(:disabled){opacity:.85;color:#fff}
.dshncm-volume{display:flex;align-items:center;gap:6px;font-size:11px;color:var(--dsw-alias-label-secondary);flex:0 1 auto;min-width:0;max-width:150px}
.dshncm-volume input{width:84px;flex:none;accent-color:var(--dsw-alias-state-business-primary)}
.dshncm-tabs{display:flex;gap:4px;border-bottom:1px solid var(--dsw-alias-border-l1);padding-bottom:6px}
.dshncm-tab{flex:1;text-align:center;border:none;background:transparent;color:var(--dsw-alias-label-secondary);font-size:12px;font-weight:600;padding:5px 0;border-radius:6px;cursor:pointer}
.dshncm-tab:hover{background:var(--dsw-alias-interactive-bg-hover)}
.dshncm-tab[data-active=true]{background:var(--dsw-alias-bg-fill-neutral);color:var(--dsw-alias-label-primary)}
.dshncm-search{display:flex;gap:6px}
.dshncm-search input{flex:1;min-width:0;box-sizing:border-box;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base);color:var(--dsw-alias-label-primary);border-radius:8px;padding:6px 10px;font-size:12.5px}
.dshncm-search input:focus{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px;border-color:transparent}
.dshncm-list{display:flex;flex-direction:column;gap:4px}
.dshncm-row{display:flex;align-items:center;gap:8px;padding:7px 8px;border-radius:8px;cursor:pointer;border:1px solid transparent}
.dshncm-row:hover{background:var(--dsw-alias-bg-fill-neutral)}
.dshncm-row:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}
.dshncm-row[data-disabled=true]{opacity:.45;cursor:not-allowed}
.dshncm-row-main{flex:1;min-width:0}
.dshncm-row-title{font-size:12.5px;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dshncm-row-sub{font-size:11px;color:var(--dsw-alias-label-secondary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.dshncm-row-right{flex:none;font-size:11px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums}
.dshncm-row-play{flex:none;width:26px;height:26px;border-radius:50%;border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-module);color:var(--dsw-alias-label-primary);cursor:pointer;font-size:11px}
.dshncm-row-play:hover{background:var(--dsw-alias-state-business-primary);color:#fff;border-color:transparent}
.dshncm-hint{font-size:11.5px;color:var(--dsw-alias-label-secondary);text-align:center;padding:12px 0}
.dshncm-error{font-size:11.5px;color:var(--dsw-alias-state-error-primary);padding:6px 8px;border:1px solid color-mix(in srgb,var(--dsw-alias-state-error-primary) 40%,transparent);border-radius:8px;background:color-mix(in srgb,var(--dsw-alias-state-error-primary) 8%,transparent)}
.dshncm-panel,.dshncm-body,.dshncm-now,.dshncm-progress,.dshncm-controls,.dshncm-volume,.dshncm-login,.dshncm-tabs,.dshncm-search,.dshncm-list,.dshncm-row{box-sizing:border-box;min-width:0}
.dshncm-now{width:100%}
.dshncm-progress{width:100%}
.dshncm-footer-entry{display:inline-flex;align-items:center;gap:4px;border:1px solid transparent;background:transparent;color:var(--dsw-alias-label-secondary);border-radius:6px;padding:4px 6px;font-size:11px;font-weight:600;cursor:pointer;flex:none;max-width:100%}
.dshncm-footer-entry:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}
.dshncm-footer-entry:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:1px}
.dshncm-footer-entry[data-playing=true]{color:var(--dsw-alias-state-success-primary)}
.dshncm-lyric{display:flex;flex-direction:column;gap:2px;max-height:280px;overflow-y:auto;padding:4px 2px;scroll-behavior:smooth}
.dshncm-lyric-line{font-size:12px;color:var(--dsw-alias-label-secondary);padding:3px 6px;border-radius:6px;line-height:1.5;transition:color .15s,font-weight .15s}
.dshncm-lyric-line[data-active=true]{color:var(--dsw-alias-label-primary);font-weight:700}
.dshncm-lyric-trans{font-size:10.5px;color:var(--dsw-alias-label-tertiary);margin-top:1px}
`;
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(CSS_ID) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-netease-music";
			tag.dataset.pluginCss = CSS_ID;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		//#endregion

		const { useState, useEffect, useRef, useCallback } = react;

		function api(path, opts) {
			return fetch(path, opts).then(function (response) {
				return response.json().catch(function () { return {}; }).then(function (body) {
					if (!response.ok) {
						const error = new Error(body.error || ("HTTP " + response.status));
						error.code = body.error;
						throw error;
					}
					return body;
				});
			});
		}

		function fmtDuration(seconds) {
			if (!Number.isFinite(seconds)) return "--:--";
			const total = Math.floor(seconds);
			return Math.floor(total / 60) + ":" + String(total % 60).padStart(2, "0");
		}

		function fmtMs(ms) {
			if (!Number.isFinite(ms)) return "--:--";
			return fmtDuration(ms / 1000);
		}

		function artistsOf(song) {
			if (song && Array.isArray(song.artists) && song.artists.length > 0) {
				return song.artists.map(function (artist) { return artist.name; }).join(" / ");
			}
			return "";
		}

		function measureSidebar() {
			const nodes = document.querySelectorAll("div");
			for (let i = 0; i < nodes.length; i++) {
				const el = nodes[i];
				const grid = el.style && el.style.gridTemplateColumns;
				// The browser normalizes 0 to 0px inside minmax(), so match loosely.
				if (typeof grid === "string" && grid.indexOf("minmax") !== -1 && grid.indexOf("1fr") !== -1) {
					const col = el.firstElementChild;
					if (col) {
						const rect = col.getBoundingClientRect();
						return {
							left: rect.left,
							top: rect.top,
							width: rect.width,
							height: rect.height,
							collapsed: el.hasAttribute("data-sidebar-collapsed") || rect.width < 120,
						};
					}
				}
			}
			return null;
		}

		// ---- song / playlist rows ----
		function SongRow(props) {
			const song = props.song;
			const onPlay = props.onPlay;
			const blocked = song.visible === false;
			const sub = artistsOf(song) + (song.album && song.album.name ? " · " + song.album.name : "");
			const click = function () { if (!blocked) onPlay(song); };
			return react.createElement(
				"div",
				{
					className: "dshncm-row",
					"data-disabled": blocked || undefined,
					onClick: click,
					role: "button",
					tabIndex: blocked ? -1 : 0,
					onKeyDown: function (event) { if (!blocked && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); onPlay(song); } },
					title: blocked ? "该歌曲当前不可播放" : (song.name + " - " + artistsOf(song)),
				},
				react.createElement("div", { className: "dshncm-row-main" },
					react.createElement("div", { className: "dshncm-row-title" }, song.name),
					react.createElement("div", { className: "dshncm-row-sub" }, sub),
				),
				react.createElement("div", { className: "dshncm-row-right" }, blocked ? "不可播放" : fmtMs(song.duration)),
				react.createElement("button", {
					type: "button",
					className: "dshncm-row-play",
					disabled: blocked,
					onClick: function (event) { event.stopPropagation(); if (!blocked) onPlay(song); },
					"aria-label": "播放 " + song.name,
				}, blocked ? "×" : "▶"),
			);
		}

		function PlaylistRow(props) {
			const playlist = props.playlist;
			const onPlay = props.onPlay;
			const sub = (playlist.creatorNickName ? playlist.creatorNickName + " · " : "") + (playlist.trackCount != null ? playlist.trackCount + " 首" : "");
			return react.createElement(
				"div",
				{
					className: "dshncm-row",
					onClick: function () { onPlay(playlist); },
					role: "button",
					tabIndex: 0,
					onKeyDown: function (event) { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onPlay(playlist); } },
					title: playlist.name,
				},
				react.createElement("div", { className: "dshncm-row-main" },
					react.createElement("div", { className: "dshncm-row-title" }, playlist.name),
					react.createElement("div", { className: "dshncm-row-sub" }, sub),
				),
				react.createElement("button", {
					type: "button",
					className: "dshncm-row-play",
					onClick: function (event) { event.stopPropagation(); onPlay(playlist); },
					"aria-label": "播放歌单 " + playlist.name,
				}, "▶"),
			);
		}

		// ---- LRC lyric parsing ----
		function parseLrc(text) {
			if (!text) return [];
			const lines = [];
			const timeRe = /\[(\d{1,2}):(\d{2})(?:[.:](\d{1,3}))?\]/g;
			const body = String(text).split("\n");
			for (let i = 0; i < body.length; i++) {
				const line = body[i];
				const matches = [];
				let match;
				timeRe.lastIndex = 0;
				while ((match = timeRe.exec(line)) !== null) matches.push(match);
				if (matches.length === 0) continue;
				const content = line.replace(timeRe, "").trim();
				for (let j = 0; j < matches.length; j++) {
					const minutes = parseInt(matches[j][1], 10);
					const seconds = parseInt(matches[j][2], 10);
					const fraction = matches[j][3] ? parseInt(String(matches[j][3]).padEnd(3, "0"), 10) : 0;
					lines.push({ time: minutes * 60 + seconds + fraction / 1000, text: content });
				}
			}
			lines.sort(function (a, b) { return a.time - b.time; });
			return lines;
		}

		function activeLyricIndex(lines, position) {
			let index = -1;
			for (let i = 0; i < lines.length; i++) {
				if (lines[i].time <= position) index = i;
				else break;
			}
			return index;
		}

		// ---- sidebar footer entry (rendered through sidebar.footer.action) ----
		const PANEL_TOGGLE_EVENT = "dshncm:toggle-panel";
		function MusicEntry(props) {
			return react.createElement("button", {
				type: "button",
				className: "dshncm-footer-entry",
				onClick: function () { window.dispatchEvent(new CustomEvent(PANEL_TOGGLE_EVENT)); },
				"aria-label": "音乐播放",
				title: "音乐播放",
			}, "🎵" + (props && props.wide ? " 音乐播放" : ""));
		}

		// ---- main app ----
		function MusicApp() {
			const [rect, setRect] = useState(null);
			const [open, setOpen] = useState(false);
			const [tab, setTab] = useState("search");
			const [player, setPlayer] = useState(null);
			const [login, setLogin] = useState(null);
			const [keyword, setKeyword] = useState("");
			const [results, setResults] = useState(null);
			const [daily, setDaily] = useState(null);
			const [playlists, setPlaylists] = useState(null);
			const [favorite, setFavorite] = useState(null);
			const [lyric, setLyric] = useState(null);
			const [currentSongId, setCurrentSongId] = useState(null);
			const [busy, setBusy] = useState(false);
			const [error, setError] = useState(null);
			const [volume, setVolume] = useState(60);
			const lastRect = useRef(null);

			// toggle from the sidebar footer entry
			useEffect(function () {
				function onToggle() { setOpen(function (value) { return !value; }); }
				window.addEventListener(PANEL_TOGGLE_EVENT, onToggle);
				return function () { window.removeEventListener(PANEL_TOGGLE_EVENT, onToggle); };
			}, []);

			useEffect(function () {
				let cancelled = false;
				function tick() {
					if (cancelled) return;
					const measured = measureSidebar();
					if (measured) {
						const prev = lastRect.current;
						if (!prev || prev.left !== measured.left || prev.top !== measured.top || prev.width !== measured.width || prev.collapsed !== measured.collapsed) {
							lastRect.current = measured;
							setRect(measured);
						}
					}
				}
				tick();
				const timer = setInterval(tick, 600);
				return function () { cancelled = true; clearInterval(timer); };
			}, []);

			const refreshState = useCallback(function () {
				return api("/plugins/ncm/state").then(function (body) {
					setPlayer(body.state || null);
				}).catch(function () { });
			}, []);

			useEffect(function () {
				let cancelled = false;
				let inflight = false;
				function tick() {
					if (inflight || cancelled) return;
					inflight = true;
					api("/plugins/ncm/state").then(function (body) {
						if (!cancelled) setPlayer(body.state || null);
					}).catch(function () { }).finally(function () { inflight = false; });
				}
				tick();
				const timer = setInterval(tick, 1500);
				return function () { cancelled = true; clearInterval(timer); };
			}, []);

			useEffect(function () {
				let cancelled = false;
				function check() {
					api("/plugins/ncm/login-check").then(function (body) {
						if (!cancelled) setLogin(body.result || null);
					}).catch(function (err) { if (!cancelled) setLogin({ error: err.message }); });
				}
				check();
				const timer = setInterval(check, 30000);
				return function () { cancelled = true; clearInterval(timer); };
			}, []);

			function run(operation) {
				setBusy(true);
				setError(null);
				return operation()
					.catch(function (err) { setError(err.message || String(err)); })
					.finally(function () { setBusy(false); refreshState(); });
			}

			function doPlay(song) {
				setCurrentSongId(song.id || null);
				setLyric(null);
				// optimistic update: show the song immediately, real state follows on the next poll
				setPlayer(function (previous) {
					const artist = artistsOf(song);
					return {
						...(previous || {}),
						status: "starting",
						title: song.name + (artist ? " - " + artist : ""),
						position: 0,
						duration: song.duration ? song.duration / 1000 : undefined,
					};
				});
				return run(function () {
					return api("/plugins/ncm/play", {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({ encryptedId: song.id, originalId: song.originalId }),
					});
				});
			}

			function doPlaylist(playlist) {
				return run(function () {
					return api("/plugins/ncm/play-playlist", {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({ encryptedId: playlist.id, originalId: playlist.originalId }),
					});
				});
			}

			function doControl(action) {
				return run(function () {
					return api("/plugins/ncm/control", {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({ action: action }),
					});
				});
			}

			function doVolume(level) {
				setVolume(level);
				run(function () {
					return api("/plugins/ncm/volume", {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({ level: level }),
					});
				});
			}

			function doSeek(seconds) {
				return run(function () {
					return api("/plugins/ncm/seek", {
						method: "POST",
						headers: { "content-type": "application/json" },
						body: JSON.stringify({ seconds: seconds }),
					});
				});
			}

			function doSearch() {
				const value = keyword.trim();
				if (value === "") return;
				run(function () {
					return api("/plugins/ncm/search?keyword=" + encodeURIComponent(value) + "&limit=30")
						.then(function (body) { setResults(body.records || []); });
				});
			}

			function doDaily() {
				run(function () {
					return api("/plugins/ncm/daily?limit=30")
						.then(function (body) { setDaily(body.records || []); });
				});
			}

			function doFavorite() {
				run(function () {
					return api("/plugins/ncm/favorite")
						.then(function (body) {
							const playlist = body.playlist;
							if (!playlist || !playlist.id) {
								setFavorite({ playlist: null, tracks: [] });
								return;
							}
							return api("/plugins/ncm/tracks?playlistId=" + encodeURIComponent(playlist.id) + "&limit=100")
								.then(function (tracksBody) {
									setFavorite({ playlist: playlist, tracks: tracksBody.records || [] });
								});
						});
				});
			}

			// fetch lyrics when the current song changes
			useEffect(function () {
				if (!currentSongId) { setLyric(null); return; }
				let cancelled = false;
				api("/plugins/ncm/lyric?songId=" + encodeURIComponent(currentSongId))
					.then(function (body) {
						if (!cancelled) setLyric(body.lyric || null);
					})
					.catch(function () { if (!cancelled) setLyric(null); });
				return function () { cancelled = true; };
			}, [currentSongId]);

			function normPlaylistList(value) {
				if (Array.isArray(value)) return value;
				if (value && Array.isArray(value.records)) return value.records;
				return [];
			}

			function doPlaylists() {
				run(function () {
					return api("/plugins/ncm/playlists")
						.then(function (body) {
							setPlaylists({ created: normPlaylistList(body.created), collected: normPlaylistList(body.collected) });
						});
				});
			}

			function doLogin() {
				run(function () {
					return api("/plugins/ncm/login", { method: "POST" })
						.then(function (body) {
							const result = body.result || {};
							const url = result.clickableUrl || result.qrCodeUrl;
							if (url) window.open(url, "_blank");
							else if (result.message) setError(String(result.message));
							setLogin({ pending: true, message: result.message });
						});
				});
			}

			const loggedIn = login && (login.success === true || (login.result && login.result.success === true));
			const playing = player && player.status === "playing";

			// ---- render helpers ----
			function renderLoginBar() {
				let text;
				if (loggedIn) text = "✅ 已登录";
				else if (login && login.pending) text = "登录中，请在打开的页面完成授权…";
				else if (login && login.error) text = "插件服务异常";
				else text = "未登录网易云";
				const children = [react.createElement("span", { style: { flex: 1 } }, text)];
				if (!loggedIn && !(login && login.pending)) {
					children.push(react.createElement("button", { type: "button", className: "dshncm-btn", "data-primary": true, onClick: doLogin, disabled: busy }, "去登录"));
				}
				return react.createElement("div", { className: "dshncm-login", "data-ok": loggedIn || undefined }, children);
			}

			function renderNowPlaying() {
				const children = [
					react.createElement("div", { className: "dshncm-now-title" }, (player && player.title) || "未在播放"),
					react.createElement("div", { className: "dshncm-now-sub" }, player && player.status ? ("状态：" + player.status) : ""),
				];
				const ratio = player && player.duration ? Math.min(100, ((player.position || 0) / player.duration) * 100) : 0;
				children.push(react.createElement("div", {
					className: "dshncm-progress",
					onClick: function (event) {
						if (!player || !player.duration) return;
						const node = event.currentTarget;
						const r = (event.clientX - node.getBoundingClientRect().left) / node.getBoundingClientRect().width;
						doSeek(Math.max(0, Math.round(player.duration * r)));
					},
				},
					react.createElement("div", { className: "dshncm-progress-fill", style: { width: ratio + "%" } }),
				));
				children.push(react.createElement("div", { className: "dshncm-progress-time" },
					react.createElement("span", null, player && player.progress ? player.progress : ""),
					react.createElement("span", null, player && !player.progress && player.duration ? fmtDuration(player.duration) : ""),
				));				children.push(react.createElement("div", { className: "dshncm-controls" },
					react.createElement("button", { type: "button", className: "dshncm-iconbtn", onClick: function () { doControl("prev"); }, disabled: busy, title: "上一首", "aria-label": "上一首" }, "⏮"),
					react.createElement("button", {
						type: "button",
						className: "dshncm-iconbtn",
						"data-main": true,
						onClick: function () { doControl(playing ? "pause" : "resume"); },
						disabled: busy,
						title: playing ? "暂停" : "播放",
						"aria-label": playing ? "暂停" : "播放",
					}, playing ? "⏸" : "▶"),
					react.createElement("button", { type: "button", className: "dshncm-iconbtn", onClick: function () { doControl("next"); }, disabled: busy, title: "下一首", "aria-label": "下一首" }, "⏭"),
					react.createElement("button", { type: "button", className: "dshncm-iconbtn", onClick: function () { doControl("stop"); }, disabled: busy, title: "停止", "aria-label": "停止" }, "⏹"),
					react.createElement("div", { className: "dshncm-volume" },
						react.createElement("span", null, "🔊"),
						react.createElement("input", {
							type: "range", min: 0, max: 100, value: volume,
							onChange: function (event) { doVolume(Number(event.target.value)); },
							"aria-label": "音量",
						}),
					),
				));
				return react.createElement("div", { className: "dshncm-now" }, children);
			}

			function renderTabs() {
				return react.createElement("div", { className: "dshncm-tabs" },
					react.createElement("button", { type: "button", className: "dshncm-tab", "data-active": tab === "search" || undefined, onClick: function () { setTab("search"); } }, "搜索"),
					react.createElement("button", { type: "button", className: "dshncm-tab", "data-active": tab === "favorite" || undefined, onClick: function () { setTab("favorite"); if (favorite === null) doFavorite(); } }, "我喜欢"),
					react.createElement("button", { type: "button", className: "dshncm-tab", "data-active": tab === "daily" || undefined, onClick: function () { setTab("daily"); if (daily === null) doDaily(); } }, "每日推荐"),
					react.createElement("button", { type: "button", className: "dshncm-tab", "data-active": tab === "lyric" || undefined, onClick: function () { setTab("lyric"); } }, "歌词"),
					react.createElement("button", { type: "button", className: "dshncm-tab", "data-active": tab === "playlists" || undefined, onClick: function () { setTab("playlists"); if (playlists === null) doPlaylists(); } }, "歌单"),
				);
			}

			function renderSearchTab() {
				const children = [
					react.createElement("div", { className: "dshncm-search" },
						react.createElement("input", {
							value: keyword,
							placeholder: "搜索歌曲…",
							onChange: function (event) { setKeyword(event.target.value); },
							onKeyDown: function (event) { if (event.key === "Enter") doSearch(); },
							"aria-label": "搜索歌曲",
						}),
						react.createElement("button", { type: "button", className: "dshncm-btn", "data-primary": true, onClick: doSearch, disabled: busy || keyword.trim() === "" }, "搜索"),
					),
				];
				if (results === null) {
					children.push(react.createElement("div", { className: "dshncm-hint" }, "输入关键词搜索网易云歌曲"));
				} else if (results.length === 0) {
					children.push(react.createElement("div", { className: "dshncm-hint" }, "没有找到结果"));
				} else {
					const rows = results.map(function (song) {
						return react.createElement(SongRow, { key: song.id || song.originalId, song: song, onPlay: doPlay });
					});
					children.push(react.createElement("div", { className: "dshncm-list" }, rows));
				}
				return react.createElement(react.Fragment, null, children);
			}

			function renderDailyTab() {
				if (daily === null) {
					return react.createElement("div", { className: "dshncm-hint" }, "加载每日推荐…");
				}
				if (daily.length === 0) {
					return react.createElement("div", { className: "dshncm-hint" }, "今日暂无推荐");
				}
				const rows = daily.map(function (song) {
					return react.createElement(SongRow, { key: song.id || song.originalId, song: song, onPlay: doPlay });
				});
				return react.createElement("div", { className: "dshncm-list" }, rows);
			}

			function renderPlaylistsTab() {
				if (playlists === null) {
					return react.createElement("div", { className: "dshncm-hint" }, "加载歌单…");
				}
				const rows = [];
				const created = playlists.created || [];
				const collected = playlists.collected || [];
				for (let i = 0; i < created.length; i++) {
					rows.push(react.createElement(PlaylistRow, { key: created[i].id || created[i].originalId, playlist: created[i], onPlay: doPlaylist }));
				}
				for (let i = 0; i < collected.length; i++) {
					rows.push(react.createElement(PlaylistRow, { key: "c-" + (collected[i].id || collected[i].originalId), playlist: collected[i], onPlay: doPlaylist }));
				}
				return react.createElement("div", { className: "dshncm-list" }, rows);
			}

			function renderFavoriteTab() {
				if (favorite === null) {
					return react.createElement("div", { className: "dshncm-hint" }, "加载我喜欢的音乐…");
				}
				if (!favorite.playlist) {
					return react.createElement("div", { className: "dshncm-hint" }, "未找到红心歌单");
				}
				const children = [];
				children.push(react.createElement("div", { className: "dshncm-hint", style: { padding: "4px 0 8px", fontSize: "12px" } },
					"❤️ " + favorite.playlist.name + "（" + favorite.playlist.trackCount + " 首）"));
				if (favorite.tracks.length === 0) {
					children.push(react.createElement("div", { className: "dshncm-hint" }, "歌单为空"));
				} else {
					const rows = favorite.tracks.map(function (song) {
						return react.createElement(SongRow, { key: song.id || song.originalId, song: song, onPlay: doPlay });
					});
					children.push(react.createElement("div", { className: "dshncm-list" }, rows));
				}
				return react.createElement(react.Fragment, null, children);
			}

			function renderLyricTab() {
				if (!currentSongId) {
					return react.createElement("div", { className: "dshncm-hint" }, "先播放一首歌即可查看歌词");
				}
				if (lyric === null) {
					return react.createElement("div", { className: "dshncm-hint" }, "加载歌词…");
				}
				if (lyric.noLyric === true || !lyric.lyric) {
					return react.createElement("div", { className: "dshncm-hint" }, "暂无歌词");
				}
				const lines = parseLrc(lyric.lyric);
				if (lines.length === 0) {
					return react.createElement("div", { className: "dshncm-hint" }, "暂无歌词");
				}
				const position = player && player.position ? player.position : 0;
				const activeIndex = activeLyricIndex(lines, position);
				const lineNodes = lines.map(function (line, index) {
					return react.createElement("div", {
						key: index,
						className: "dshncm-lyric-line",
						"data-active": index === activeIndex || undefined,
						ref: index === activeIndex ? function (node) {
							if (node && node.scrollIntoView) node.scrollIntoView({ block: "center", behavior: "smooth" });
						} : undefined,
					}, line.text);
				});
				return react.createElement("div", { className: "dshncm-lyric" }, lineNodes);
			}

			function renderBody() {
				const children = [
					renderLoginBar(),
				];
				if (error) children.push(react.createElement("div", { className: "dshncm-error" }, String(error)));
				children.push(renderNowPlaying());
				children.push(renderTabs());
				if (tab === "search") children.push(renderSearchTab());
				else if (tab === "favorite") children.push(renderFavoriteTab());
				else if (tab === "daily") children.push(renderDailyTab());
				else if (tab === "lyric") children.push(renderLyricTab());
				else if (tab === "playlists") children.push(renderPlaylistsTab());
				return react.createElement("div", { className: "dshncm-body" }, children);
			}

			function renderPanel() {
				if (!rect || !open) return null;
				return react.createElement("div", {
					className: "dshncm-panel",
					style: {
						left: rect.left + rect.width + 8,
						top: Math.max(rect.top + 40, 8),
						width: Math.min(Math.max(rect.width, 300), 380),
						height: Math.min(rect.height - 60, 620),
						maxHeight: "calc(100vh - 16px)",
					},
					role: "dialog",
					"aria-label": "音乐播放",
				},
					react.createElement("div", { className: "dshncm-panel-head" },
						react.createElement("span", { className: "dshncm-panel-title" }, "🎵 音乐播放"),
						react.createElement("button", { type: "button", className: "dshncm-close", onClick: function () { setOpen(false); }, "aria-label": "关闭" }, "✕"),
					),
					renderBody(),
				);
			}

			return react.createElement(react.Fragment, null, renderPanel());
		}

		function apply(ctx) {
			// sidebar footer entry via the sidebar.footer.action slot
			if (ctx.get && ctx.get("slots") !== undefined) {
				ctx.slots.inject("sidebar.footer.action", function () {
					return ctx.slots.register({
						name: "sidebar.footer.action",
						id: "dsh-netease-music",
						order: 20,
						label: "音乐播放",
						inject: function () { return {}; },
					}, MusicEntry);
				});
			}
			const host = document.createElement("div");
			host.dataset.dshNeteaseMusicHost = "";
			document.body.appendChild(host);
			const { createRoot } = require("react-dom/client");
			const root = createRoot(host);
			root.render(react.createElement(MusicApp));
			ctx.effect(function () {
				return function () {
					root.unmount();
					host.remove();
				};
			}, "dsh-netease-music: panel");
		}

		exports.apply = apply;
		exports.inject = ["slots"];
		return module.exports;
	}
});
