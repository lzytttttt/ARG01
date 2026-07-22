# ARG-01「六年一夜」

ARG-01 是一个基于 [Vite](https://vitejs.dev/) 构建的玩家游戏站（ARG，Alternate Reality Game）前端框架，本项目为序章内容。

## 目录结构

```
ARG/
├── ARG-01/      # 前端工程（Vite 项目，游戏站本体）
├── assets/      # 静态资源（图片、样式、页面等）
├── WIKI/        # 项目 Wiki / 设定文档
└── novel/       # 剧情 / 小说文本
```

## 环境要求

- [Node.js](https://nodejs.org/) 18 及以上版本（含 npm）
- 一个现代浏览器（Chrome / Edge / Firefox 等）

## 本地运行

ARG-01 是一个 Vite 前端工程，按以下步骤启动本地开发服务器：

```bash
# 进入前端工程目录
cd ARG-01

# 安装依赖（首次运行或拉取新代码后需要）
npm install

# 启动开发服务器，默认地址 http://localhost:5173
npm run dev
```

在浏览器中打开 `npm run dev` 输出的本地地址（默认 `http://localhost:5173`）即可访问游戏站。

## 构建与预览

```bash
# 构建生产版本，产物输出到 ARG-01/dist
npm run build

# 本地预览构建产物
npm run preview
```

## 从仓库克隆后

`node_modules/`（依赖）与 `dist/`（构建产物）已被 `.gitignore` 忽略，不会进入仓库。因此克隆后需要先安装依赖再运行：

```bash
git clone https://github.com/lzytttttt/ARG01.git
cd ARG01/ARG-01
npm install
npm run dev
```

## 版本

当前仓库使用语义化标签标记版本（如 `0.3`、`0.5`、`0.7`、`0.8`、`0.81`、`0.9`、`0.91`）。查看历史版本：

```bash
git tag
```
