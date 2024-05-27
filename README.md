这是小叶子自用的 `live2d` 小组件修改版本 

## 使用方法
把以下代码加入你的网页的 `<head>`

```html
<script src="https://live2dwidget.leafyee.xyz/client.js" defer></script>
```

## 基础配置
```html
<script
  src="https://live2dwidget.leafyee.xyz/client.js"
  data-tools="hitokoto,switch-model,switch-texture,photo,info,quit"
  data-server="https://live2dwidget.leafyee.xyz/"
  defer
></script>
```

- `data-tools` 为加载的小工具按钮，可以自行删减; 默认为全部
- `data-server` 为小组件的服务器地址，一般为 `src` 删去 `client.js` 的路径, 默认为 `https://live2dwidget.leafyee.xyz/`

## 进阶配置
- `/public/model` 存放模型
- `/src/model_list.json` 模型列表
- `/src/waifu-tips.json` 中定义了触发条件（`selector`，CSS 选择器）和触发时显示的文字（`text`）
- `/public/waifu.css` 是看板娘的样式表

## 自己部署
- 安装依赖: `npm install` 或 `pnpm install` 或 `bun install`
- 构建命令: `npm run build` 或 `pnpm run build` 或 `bun run build`
- 输出目录未 `dist`，将 `dist` 目录部署到你的服务器或 `Vercel`, `Cloudflare Pages` 等静态网站托管服务即可

#### 冰糖葫芦好可爱(¯﹃¯)