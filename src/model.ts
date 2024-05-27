import { randomSelection, showMessage } from './utils'
import modelList from './model_list.json'

declare function loadlive2d(id: string, path: string): void

export class Model {
    BASE_URL: string
    modelList: {
        models: string[],
        messages: string[]
    }

    constructor(config: { BASE_URL: string, TOOLS: string[] }) {
        this.modelList = modelList
        let { BASE_URL } = config
        if (typeof BASE_URL === "string") {
            if (!BASE_URL.endsWith("/")) BASE_URL += "/"
        } else {
            throw "Invalid initWidget argument!"
        }
        this.BASE_URL = BASE_URL
    }

    async loadModel(
        modelId: number,
        modelTexturesId: number,
        message: string | string[]
    ) {
        localStorage.setItem("modelId", modelId.toString())
        localStorage.setItem("modelTexturesId", modelTexturesId.toString())
        showMessage(message, 4000, 10);
        const target = randomSelection(this.modelList.models[modelId])
        loadlive2d("live2d", `${this.BASE_URL}model/${target}/index.json`)
    }

    async loadRandModel() {
        const modelId: number = localStorage.getItem("modelId") ? Number(localStorage.getItem("modelId")) : 0
        const target = randomSelection(this.modelList.models[modelId])
        loadlive2d("live2d", `${this.BASE_URL}model/${target}/index.json`)
        showMessage("我的新衣服好看嘛？", 4000, 10);
    }

    async loadOtherModel() {
        let modelId: number = localStorage.getItem("modelId") ? Number(localStorage.getItem("modelId")) : 0
        const index = (++modelId >= this.modelList.models.length) ? 0 : modelId;
        this.loadModel(index, 0, this.modelList.messages[index])
    }
}


