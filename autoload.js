// 从当前 <script> 标签获取基础路径
const script = document.currentScript
const BASE_URL = script.src.replace(/autoload.js$/, '')
// 从 data-tools 属性获取工具列表
// ['hitokoto', 'asteroids', 'switch-model', 'switch-texture', 'photo', 'info', 'quit']
const TOOLS = script.getAttribute('data-tools').split(',')
// 将 waifu.css live2d.min.js waifu-tips.js 加载到页面中
if (screen.width >= 768) {
	const live2d = document.createElement('script')
	const waifuCss = document.createElement('link')
	const waifuTips = document.createElement('script')
	live2d.src = BASE_URL + 'live2d.min.js'
	waifuCss.rel = 'stylesheet'
	waifuCss.href = BASE_URL + 'waifu.css'
	waifuTips.src = BASE_URL + 'waifu-tips.js'
	// 当所有资源加载完成后初始化看板娘
	Promise.all([
		new Promise((resolve, _reject) => {
			document.head.appendChild(waifuCss)
			waifuCss.onload = () => resolve(true)
		}),
		new Promise((resolve, _reject) => {
			document.head.appendChild(live2d)
			live2d.onload = () => resolve(true)
		}),
		new Promise((resolve, _reject) => {
			document.head.appendChild(waifuTips)
			waifuTips.onload = () => resolve(true)
		})
	]).then(() => {
		initWidget({
			BASE_URL: BASE_URL,
			TOOLS: TOOLS,
		})
	})
}
