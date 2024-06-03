这是小叶子自用的 `live2d` 小组件修改版本, 换用了 `TypeScript`、`Vite`; 将模型整合进项目内; 并整合了[这个`PR`](https://github.com/stevenjoezhang/live2d-widget/pull/82/files)以支持新版模型

## 使用方法
把以下代码加入你的网页的 `<head>`

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.3.10/pixi.min.js"></script>
<script src="https://live2dwidget.leafyee.xyz/live2d.min.js"></script>
<script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/pixi-live2d-display/dist/index.min.js"></script>
<script src="https://live2dwidget.leafyee.xyz/client.js" defer></script>
```

## 基础配置
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/5.3.10/pixi.min.js"></script>
<script src="https://live2dwidget.leafyee.xyz/live2d.min.js"></script>
<script src="https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/pixi-live2d-display/dist/index.min.js"></script>
<script
  src="https://live2dwidget.leafyee.xyz/client.js"
  data-tools="hitokoto,switch-model,switch-texture,info,quit"
  data-server="https://live2dwidget.leafyee.xyz/"
  defer
></script>
```

- `data-tools` 为加载的小工具按钮，可以自行删减; 默认为全部
- `data-server` 为小组件的服务器地址，一般为 `src` 删去 `client.js` 的路径, 默认为 `https://live2dwidget.leafyee.xyz/`

## 进阶配置
- `/public/model` 存放模型
- `/src/model_list.json` 模型列表
- `/src/waifu_tips.json` 中定义了触发条件（`selector`，CSS 选择器）和触发时显示的文字（`text`）
- `/public/waifu.css` 是看板娘的样式表

## 自己部署
- 安装依赖: `npm install` 或 `pnpm install` 或 `bun install`
- 构建命令: `npm run build` 或 `pnpm run build` 或 `bun run build`
- 输出目录未 `dist`，将 `dist` 目录部署到你的服务器或 `Vercel`, `Cloudflare Pages` 等静态网站托管服务即可

#### 冰糖葫芦好可爱(¯﹃¯)