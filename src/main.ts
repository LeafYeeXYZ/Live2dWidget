import { Model } from './model'
import { randomSelection, showMessage } from './utils'
import { tools } from './tools'
import waifuTips from './waifu_tips.json'

export function loadWidget(config: { BASE_URL: string, TOOLS: ('hitokoto' | 'switch-model' | 'switch-texture' | 'info' | 'quit')[] }): void {
    const model = new Model(config)
    localStorage.removeItem("waifu-display")
    sessionStorage.removeItem("waifu-text")
    document.body.insertAdjacentHTML("beforeend", `<div id="waifu">
            <div id="waifu-tips"></div>
            <canvas id="live2d" width="800" height="800"></canvas>
            <div id="waifu-tool"></div>
        </div>`)
    // https://stackoverflow.com/questions/24148403/trigger-css-transition-on-appended-element
    setTimeout(() => {
        document.getElementById("waifu")!.style.bottom = '0'
    }, 0)

    void function registerTools() {
        tools["switch-model"].callback = () => model.loadOtherModel();
        tools["switch-texture"].callback = () => model.loadRandModel();
        if (!Array.isArray(config.TOOLS)) {
            config.TOOLS = Object.keys(tools) as ('hitokoto' | 'switch-model' | 'switch-texture' | 'info' | 'quit')[]
        }
        for (let tool of config.TOOLS) {
            if (tools[tool]) {
                const { icon, callback } = tools[tool]
                document.getElementById("waifu-tool")!.insertAdjacentHTML("beforeend", `<span id="waifu-tool-${tool}">${icon}</span>`)
                document.getElementById(`waifu-tool-${tool}`)!.addEventListener("click", callback)
            }
        }
    }()

    function welcomeMessage(time: { start: string, end: string, text: string }[]) {
        for (const { start, end, text } of time) {
            const now = new Date().getHours()
            if (+start <= now && now <= +end) {
                return text
            }
        }
        return '欢迎回来~'
    }

    function registerEventListener(result: typeof waifuTips) {
        // 检测用户活动状态，并在空闲时显示消息
        let userAction = false
        let userActionTimer: number
        let messageArray = result.message.default
        let lastHoverElement: string | null = null
        window.addEventListener("mousemove", () => userAction = true);
        window.addEventListener("keydown", () => userAction = true);
        setInterval(() => {
            if (userAction) {
                userAction = false
                clearInterval(userActionTimer)
                userActionTimer = 0
            } else if (!userActionTimer) {
                userActionTimer = setInterval(() => {
                    showMessage(messageArray, 6000, 9)
                }, 20000)
            }
        }, 1000)
        showMessage(welcomeMessage(result.time), 7000, 11)
        window.addEventListener("mouseover", event => {
            for (let { selector, text } of result.mouseover) {
                if (!(event.target as HTMLElement).closest(selector)) continue
                if (lastHoverElement === selector) return
                lastHoverElement = selector
                let oneText = randomSelection(text)
                oneText = oneText.replace("{text}", (event.target as HTMLElement).innerText);
                showMessage(oneText, 4000, 8);
                return;
            }
        });
        window.addEventListener("click", event => {
            for (let { selector, text } of result.click) {
                if (!(event.target as HTMLElement).closest(selector)) continue;
                let oneText = randomSelection(text);
                oneText = oneText.replace("{text}", (event.target as HTMLElement).innerText);
                showMessage(text, 4000, 8);
                return;
            }
        });

        window.addEventListener("copy", () => {
            showMessage(result.message.copy, 6000, 9);
        });
        window.addEventListener("visibilitychange", () => {
            if (!document.hidden) showMessage(result.message.visibilitychange, 6000, 9);
        });
    }

    void function initModel() {
        let modelId = Number(localStorage.getItem("modelId") ?? 1)
        let modelTexturesId = Number(localStorage.getItem("modelTexturesId") ?? 53)
        model.loadModel(modelId, modelTexturesId, model.modelList.messages[modelId])
        registerEventListener(waifuTips)
    }()
}

export function initWidget(config: { 
  BASE_URL: string, 
  TOOLS: ('hitokoto' | 'switch-model' | 'switch-texture' | 'info' | 'quit')[]
}): void {
    document.body.insertAdjacentHTML("beforeend", `<div id="waifu-toggle">
            <span>看板娘</span>
        </div>`);
    const toggle = document.getElementById("waifu-toggle")!
    toggle.addEventListener("click", () => {
        toggle.classList.remove("waifu-toggle-active");
        if (toggle.getAttribute("first-time")) {
            loadWidget(config);
            toggle.removeAttribute("first-time");
        } else {
            localStorage.removeItem("waifu-display");
            document.getElementById("waifu")!.style.display = ""
            setTimeout(() => {
                document.getElementById("waifu")!.style.bottom = '0'
            }, 0);
        }
    });
    if (localStorage.getItem("waifu-display") && Date.now() - (localStorage.getItem("waifu-display") ? +localStorage.getItem("waifu-display")! : 0) <= 86400000) {
        toggle.setAttribute("first-time", 'true')
        setTimeout(() => {
            toggle.classList.add("waifu-toggle-active")
        }, 0)
    } else {
        loadWidget(config)
    }
}