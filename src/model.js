import showMessage from "./message.js";
import randomSelection from "./utils.js";

class Model {
    constructor(config) {
        let { BASE_URL } = config;
        if (typeof BASE_URL === "string") {
            if (!BASE_URL.endsWith("/")) BASE_URL += "/";
        } else {
            throw "Invalid initWidget argument!";
        }
        this.BASE_URL = BASE_URL;
    }

    async loadModelList() {
        const response = await fetch(`${this.BASE_URL}model_list.json`);
        this.modelList = await response.json();
    }

    async loadModel(modelId, modelTexturesId, message) {
        localStorage.setItem("modelId", modelId);
        localStorage.setItem("modelTexturesId", modelTexturesId);
        showMessage(message, 4000, 10);
        if (!this.modelList) await this.loadModelList();
        const target = randomSelection(this.modelList.models[modelId]);
        loadlive2d("live2d", `${this.BASE_URL}model/${target}/index.json`);
    }

    async loadRandModel() {
        const modelId = localStorage.getItem("modelId");
        if (!this.modelList) await this.loadModelList();
        const target = randomSelection(this.modelList.models[modelId]);
        loadlive2d("live2d", `${this.BASE_URL}model/${target}/index.json`);
        showMessage("我的新衣服好看嘛？", 4000, 10);
    }

    async loadOtherModel() {
        let modelId = localStorage.getItem("modelId");
        if (!this.modelList) await this.loadModelList();
        const index = (++modelId >= this.modelList.models.length) ? 0 : modelId;
        this.loadModel(index, 0, this.modelList.messages[index]);
    }
}

export default Model;
