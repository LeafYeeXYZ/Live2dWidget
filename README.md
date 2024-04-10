这是小叶子自用的 `live2d` 小组件修改版本; 使用方法：把以下代码加入你的网页的 `<head>`; 冰糖葫芦好可爱(¯﹃¯)

```html
<script
  src="https://live2dwidget.leafyee.xyz/autoload.js" 
  data-tools="hitokoto,asteroids,switch-model,switch-texture,photo,info,quit" 
  defer
></script>
```

> `data-tools` 为加载的小工具按钮，可以自行删减

## 自定义配置

`autoload.js` 会自动加载三个文件：`waifu.css`，`live2d.min.js` 和 `waifu-tips.js`

- 请在 `/model_list.json` 定义模型列表, 在 `/model` 中存放模型
- `src/waifu-tips.js` 包含了按钮和对话框的逻辑；
- `waifu-tips.js` 是由 `src/waifu-tips.js` 自动打包生成的，不建议直接修改；
- `waifu-tips.json` 中定义了触发条件（`selector`，CSS 选择器）和触发时显示的文字（`text`）；
- `waifu.css` 是看板娘的样式表。

`waifu-tips.json` 中默认的 CSS 选择器规则是对 Hexo 的 [NexT 主题](http://github.com/next-theme/hexo-theme-next) 有效的，为了适用于你自己的网页，可能需要自行修改

## 部署

部署前用 `pnpm build` 将 `src` 中的代码打包到 `waifu-tips.js` 中 (也可以在部署时打包), 之后安装静态网站部署即可

## 更多

更多内容可以参考：  
https://nocilol.me/archives/lab/add-dynamic-poster-girl-with-live2d-to-your-blog-02  
https://github.com/xiazeyu/live2d-widget.js  
https://github.com/summerscar/live2dDemo

关于后端 API 模型：  
https://github.com/xiazeyu/live2d-widget-models  
https://github.com/xiaoski/live2d_models_collection

除此之外，还有桌面版本：  
https://github.com/amorist/platelet  
https://github.com/akiroz/Live2D-Widget  
https://github.com/zenghongtu/PPet  
https://github.com/LikeNeko/L2dPetForMac

以及 Wallpaper Engine：  
https://github.com/guansss/nep-live2d

## 许可证

Released under the GNU General Public License v3  
http://www.gnu.org/licenses/gpl-3.0.html

本仓库并不包含任何模型，用作展示的所有 Live2D 模型、图片、动作数据等版权均属于其原作者，仅供研究学习，不得用于商业用途。

Live2D 官方网站：  
https://www.live2d.com/en/  
https://live2d.github.io

Live2D Cubism Core は Live2D Proprietary Software License で提供しています。  
https://www.live2d.com/eula/live2d-proprietary-software-license-agreement_en.html  
Live2D Cubism Components は Live2D Open Software License で提供しています。  
http://www.live2d.com/eula/live2d-open-software-license-agreement_en.html

> The terms and conditions do prohibit modification, but obfuscating in `live2d.min.js` would not be considered illegal modification.

https://community.live2d.com/discussion/140/webgl-developer-licence-and-javascript-question