// 封装异步加载资源的方法
function loadExternalResource(url, type) {
	return new Promise((resolve, reject) => {
		let tag;

		if (type === "css") {
			tag = document.createElement("link");
			tag.rel = "stylesheet";
			tag.href = url;
		}
		else if (type === "js") {
			tag = document.createElement("script");
			tag.src = url;
		}
		if (tag) {
			tag.onload = () => resolve(url);
			tag.onerror = () => reject(url);
			document.head.appendChild(tag);
		}
	});
}

// 加载 waifu.css live2d.min.js waifu-tips.js
if (screen.width >= 768) {
	Promise.all([
		loadExternalResource("/waifu.css", "css"),
		loadExternalResource("/live2d.min.js", "js"),
		loadExternalResource("/waifu-tips.js", "js")
	]).then(() => {
		// 配置选项的具体用法见 README.md
		initWidget({
			waifuPath: "/waifu-tips.json",
			//apiPath: "https://live2d.fghrsh.net/api/",
			cdnPath: "/",
			//tools: ["hitokoto", "asteroids", "switch-model", "switch-texture", "photo", "info", "quit"]
			tools: ["asteroids", "switch-model", "photo", "quit"]
		});
	});
}