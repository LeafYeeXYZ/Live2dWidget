import { showMessage } from './utils'

declare class Live2D {
    static captureName: string
    static captureFrame: boolean
}

function showHitokoto() {
    // 增加 hitokoto.cn 的 API
    fetch("https://v1.hitokoto.cn")
        .then(response => response.json())
        .then(result => {
            const text = `这句一言来自 <span>「${result.from}」</span>，是 <span>${result.creator}</span> 在 hitokoto.cn 投稿的。`
            showMessage(result.hitokoto, 6000, 9)
            setTimeout(() => {
                showMessage(text, 4000, 9)
            }, 6000)
        })
}

export const tools = {
    "hitokoto": {
        icon: '✏️',
        callback: showHitokoto
    },
    "switch-model": {
        icon: '🫡',
        callback: () => {}
    },
    "switch-texture": {
        icon: '👗',
        callback: () => {}
    },
    "info": {
        icon: 'ℹ️',
        callback: () => {
            open("https://github.com/LeafYeeXYZ/Live2dWidget")
        }
    },
    "quit": {
        icon: '❌',
        callback: () => {
            localStorage.setItem("waifu-display", Date.now().toString())
            showMessage("愿你有一天能与重要的人重逢。", 2000, 11)
            document.getElementById("waifu")!.style.bottom = "-500px"
            setTimeout(() => {
                document.getElementById("waifu")!.style.display = "none"
                document.getElementById("waifu-toggle")!.classList.add("waifu-toggle-active")
            }, 3000)
        }
    }
}
