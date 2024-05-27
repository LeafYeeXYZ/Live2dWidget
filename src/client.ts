import './live2d.min.js'
import { initWidget } from './main'

declare global {
    interface Window {
        initWidget: typeof initWidget
    }
}

window.initWidget = initWidget

// 从当前 <script> 标签获取基础路径
const script = document.currentScript
let BASE_URL = 'https://live2dwidget.leafyee.xyz/'
let TOOLS = 'hitokoto,switch-model,switch-texture,photo,info,quit'
if (script) {
    BASE_URL = script.getAttribute('data-server') || BASE_URL
    TOOLS = script.getAttribute('data-tools') || TOOLS
}
const tools = TOOLS.split(',').map(tool => tool.trim()) as ('hitokoto' | 'switch-model' | 'switch-texture' | 'photo' | 'info' | 'quit')[]
// 将 waifu.css 加载到页面中
const waifuCss = document.createElement('link')
waifuCss.rel = 'stylesheet'
waifuCss.href = BASE_URL.endsWith('/') ? BASE_URL + 'waifu.css' : BASE_URL + '/waifu.css'
document.head.appendChild(waifuCss)
// 加载看板娘
screen.width >= 768 && initWidget({
    BASE_URL: BASE_URL,
    TOOLS: tools
})