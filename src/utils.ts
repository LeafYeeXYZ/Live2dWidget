export function randomSelection<T>(obj: T | T[]): T {
    return Array.isArray(obj) ? obj[Math.floor(Math.random() * obj.length)] : obj
}

let messageTimer: number | null = null

export function showMessage(
    text: string | string[],
    timeout: number,
    priority: number
) {
    if (!text || (sessionStorage.getItem("waifu-text") && +sessionStorage.getItem("waifu-text")! > priority)) return
    if (messageTimer) {
        clearTimeout(messageTimer)
        messageTimer = null
    }
    text = randomSelection(text)
    sessionStorage.setItem("waifu-text", priority.toString())
    const tips = document.getElementById("waifu-tips")!
    tips.innerHTML = text
    tips.classList.add("waifu-tips-active")
    messageTimer = setTimeout(() => {
        sessionStorage.removeItem("waifu-text")
        tips.classList.remove("waifu-tips-active")
    }, timeout)
}