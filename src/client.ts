import { initWidget } from './main'

declare global {
    interface Window {
        initWidget: typeof initWidget
        loadlive2d?: (id: string, path: string) => void
    }
}

window.initWidget = initWidget

// 从当前 <script> 标签获取基础路径
const script = document.currentScript
let BASE_URL = 'https://live2dwidget.leafyee.xyz/'
let TOOLS = 'hitokoto,switch-model,switch-texture,info,quit'
if (script) {
    BASE_URL = script.getAttribute('data-server') || BASE_URL
    TOOLS = script.getAttribute('data-tools') || TOOLS
}
const tools = TOOLS.split(',').map(tool => tool.trim()) as ('hitokoto' | 'switch-model' | 'switch-texture' | 'info' | 'quit')[]
// 将 waifu.css 加载到页面中
const waifuCss = document.createElement('link')
waifuCss.rel = 'stylesheet'
waifuCss.href = BASE_URL.endsWith('/') ? BASE_URL + 'waifu.css' : BASE_URL + '/waifu.css'
document.head.appendChild(waifuCss)
// 将 live2d.min.js 加载到页面中
const live2dScript = document.createElement('script')
live2dScript.src = BASE_URL.endsWith('/') ? BASE_URL + 'live2d.min.js' : BASE_URL + '/live2d.min.js'
document.body.appendChild(live2dScript)
// 加载看板娘
let count: number = 0
function tryLoadLive2d() {
    if (window.loadlive2d) {
        initWidget({
            BASE_URL: BASE_URL,
            TOOLS: tools
        })
    } else if (count >= 50) {
        console.error('Failed to load live2d.min.js')
    } else {
        count++
        setTimeout(tryLoadLive2d, 100)
    }
}
if (screen.width >= 768) {
    tryLoadLive2d()
}