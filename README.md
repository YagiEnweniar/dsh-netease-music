# dsh-netease-music

DeepSeek Harness 网易云音乐播放插件：侧边栏底部「音乐播放」入口，点开面板即可搜索歌曲、播放/暂停/切歌/调音量、查看播放状态、「我喜欢的音乐」、每日推荐、歌词同步与歌单播放。声音通过本地 `ncm-cli` + **mpv** 从电脑扬声器输出（浏览器作为遥控器）。

## 前置要求

- `@music163/ncm-cli` 已全局安装并**已登录**（`ncm-cli login` 扫码）
- `mpv` 已安装并在 PATH 中（`ncm-cli` 的播放后端）

## 安装

从 GitHub 安装：

```sh
npx -p @deepseek-ai/dsh dsh plugin --profile web add github:<owner>/dsh-netease-music
```

本地路径安装（开发时）：

```sh
npx -p @deepseek-ai/dsh dsh plugin --profile web add <本仓库路径>
```

> 本仓库采用「提交 `lib/` 产物」的分发方式（无构建步骤），`lib/index.js`（host）与 `lib/client.js`（client bundle）即最终产物，Git 安装后直接可用。
>
> 安装后**重启 DeepSeek Harness Web 服务并刷新页面**。

## 配置

插件配置（`cordis.patch.yml` 的 `config`）：

| 键 | 默认 | 说明 |
|----|------|------|
| `ncmCliEntry` | 自动检测 | `@music163/ncm-cli/dist/index.js` 的绝对路径（自动检测 `APPDATA\npm`、`npm_config_prefix`、`~/.npm-global`） |
| `nodeBin` | 宿主 Node | 运行 CLI 的 node 可执行文件路径 |

## 使用

- 侧边栏底部（设置按钮旁）点击「🎵 音乐播放」打开/关闭面板
- 面板 tab：**搜索** / **我喜欢**（红心歌单）/ **每日推荐** / **歌词**（随播放进度同步高亮）/ **歌单**（创建/收藏）
- 播放控制：播放/暂停、上一首/下一首、停止、进度条点击跳转、音量滑块
- 未登录时面板内可一键生成登录链接

## HTTP 接口（host）

- `GET /plugins/ncm/state` — 播放状态
- `POST /plugins/ncm/play` `{encryptedId, originalId}` — 播放单曲
- `POST /plugins/ncm/play-playlist` — 播放歌单
- `POST /plugins/ncm/control` `{action: pause|resume|stop|next|prev}`
- `POST /plugins/ncm/volume` `{level}`
- `POST /plugins/ncm/seek` `{seconds}`
- `GET /plugins/ncm/search?keyword=&limit=`
- `GET /plugins/ncm/daily?limit=`
- `GET /plugins/ncm/playlists`
- `GET /plugins/ncm/login-check` / `POST /plugins/ncm/login`
- `GET /plugins/ncm/queue` / `POST /plugins/ncm/queue-add` / `POST /plugins/ncm/queue-clear`

## License

MIT
