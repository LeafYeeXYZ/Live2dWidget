这是小叶子自用的 `live2d` 小组件修改版本 

## 使用方法
把以下代码加入你的网页的 `<head>`

```html
<script
  src="https://live2dwidget.leafyee.xyz/dist/client.js"
  data-tools="hitokoto,asteroids,switch-model,switch-texture,photo,info,quit" 
  data-server="https://live2dwidget.leafyee.xyz/"
  defer
></script>
```

- `data-tools` 为加载的小工具按钮，可以自行删减
- `data-server` 为小组件的服务器地址，一般为 `src` 删去 `dist/client.js` 的路径

## 自定义配置
- `/static/model_list.json` 模型列表
- `/model` 存放模型
- `/static/waifu-tips.json` 中定义了触发条件（`selector`，CSS 选择器）和触发时显示的文字（`text`）
- `/static/waifu.css` 是看板娘的样式表

## 部署
当作静态网站部署即可

- 构建命令: `pnpm build`
- 根目录 / 输出目录: `/`

#### 冰糖葫芦好可爱(¯﹃¯)