const API_BASE_URL = "https://xiaoxin-image-proxy.dorayakiee.workers.dev/v1/images";
const MAX_FILE_SIZE = 20 * 1024 * 1024;

const state = {
    mode: "edit",
    editSize: "",
    generateSize: "1024x1024",
    sourceFile: null,
    sourcePreviewUrl: null,
    resultUrl: null,
    resultPreviewUrl: null,
    resultMimeType: "image/png",
    isProcessing: false
};

const apiKeyInput = document.getElementById("apiKey");
const toggleKeyButton = document.getElementById("toggleKey");
const promptInput = document.getElementById("prompt");
const imageSizeSelect = document.getElementById("imageSize");
const keepOriginalSizeOption = document.getElementById("keepOriginalSize");
const customSizeFields = document.getElementById("customSizeFields");
const customWidthInput = document.getElementById("customWidth");
const customHeightInput = document.getElementById("customHeight");
const promptLabel = document.getElementById("promptLabel");
const imagePicker = document.getElementById("imagePicker");
const sourceImageTrigger = document.getElementById("sourceImageTrigger");
const sourceImageInput = document.getElementById("sourceImage");
const sourcePreview = document.getElementById("sourcePreview");
const sourcePreviewImage = document.getElementById("sourcePreviewImage");
const removeImageButton = document.getElementById("removeImage");
const runButton = document.getElementById("runButton");
const resultImage = document.getElementById("resultImage");
const emptyResult = document.getElementById("emptyResult");
const loadingResult = document.getElementById("loadingResult");
const resultTag = document.getElementById("resultTag");
const statusMessage = document.getElementById("statusMessage");
const downloadButton = document.getElementById("downloadButton");
const modeButtons = [...document.querySelectorAll(".mode-button")];

function setStatus(message = "", type = "") {
    statusMessage.textContent = message;
    statusMessage.className = `status-message${type ? ` is-${type}` : ""}`;
}

function setMode(mode) {
    state.mode = mode;
    const isEdit = mode === "edit";

    modeButtons.forEach((button) => {
        const active = button.dataset.mode === mode;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-selected", String(active));
    });

    imagePicker.hidden = !isEdit;
    sourceImageTrigger.hidden = !isEdit || Boolean(state.sourceFile);
    keepOriginalSizeOption.hidden = !isEdit;
    imageSizeSelect.value = isEdit ? state.editSize : state.generateSize;
    updateSizeControls();
    promptLabel.textContent = isEdit ? "想怎么改？" : "想生成什么？";
    promptInput.placeholder = isEdit
        ? "例如：把衣服改成红色夹克，其他保持不变"
        : "例如：一束放在窗边的粉色郁金香，晨光，温柔胶片感";
    runButton.innerHTML = isEdit ? "开始修图 <span aria-hidden=\"true\">✨</span>" : "开始生图 <span aria-hidden=\"true\">🌷</span>";
    setStatus();
    updateRunButton();
}

function updateRunButton() {
    const hasKey = Boolean(apiKeyInput.value.trim());
    const hasPrompt = Boolean(promptInput.value.trim());
    const hasSource = state.mode !== "edit" || Boolean(state.sourceFile);
    runButton.disabled = state.isProcessing || !hasKey || !hasPrompt || !hasSource || !hasValidImageSize();
}

function updateSizeControls() {
    customSizeFields.hidden = imageSizeSelect.value !== "custom";
}

function getRequestedImageSize() {
    const selectedSize = imageSizeSelect.value;

    if (state.mode === "edit" && !selectedSize) return null;
    if (selectedSize !== "custom") return selectedSize;

    const width = Number(customWidthInput.value);
    const height = Number(customHeightInput.value);
    const hasValidDimension = (dimension) => Number.isInteger(dimension) && dimension >= 256 && dimension <= 2048;

    if (!hasValidDimension(width) || !hasValidDimension(height)) {
        throw new Error("自定义宽高需要是 256 到 2048 之间的整数。");
    }

    return `${width}x${height}`;
}

function hasValidImageSize() {
    try {
        getRequestedImageSize();
        return true;
    } catch {
        return false;
    }
}

function clearSourceImage() {
    if (state.sourcePreviewUrl) URL.revokeObjectURL(state.sourcePreviewUrl);
    state.sourceFile = null;
    state.sourcePreviewUrl = null;
    sourceImageInput.value = "";
    sourcePreviewImage.removeAttribute("src");
    sourcePreview.hidden = true;
    sourceImageTrigger.hidden = state.mode !== "edit";
    updateRunButton();
}

function setSourceImage(file) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
        setStatus("请选择 PNG、JPG 或 WEBP 图片。", "error");
        return;
    }

    if (file.size > MAX_FILE_SIZE) {
        setStatus("图片需要小于 20 MB。", "error");
        return;
    }

    if (state.sourcePreviewUrl) URL.revokeObjectURL(state.sourcePreviewUrl);
    state.sourceFile = file;
    state.sourcePreviewUrl = URL.createObjectURL(file);
    sourcePreviewImage.src = state.sourcePreviewUrl;
    sourcePreview.hidden = false;
    sourceImageTrigger.hidden = true;
    setStatus();
    updateRunButton();
}

function releaseResultPreview() {
    if (state.resultPreviewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(state.resultPreviewUrl);
    }
    state.resultPreviewUrl = null;
}

function getFileExtension(mimeType) {
    const extension = mimeType?.split("/")[1]?.toLowerCase();
    return extension === "jpeg" ? "jpg" : extension || "png";
}

function createBlobResult(base64Image, fallbackMimeType = "image/png") {
    const embeddedDataUrl = /^data:(image\/[^;,]+);base64,([\s\S]+)$/i.exec(base64Image.trim());
    const mimeType = embeddedDataUrl?.[1] || fallbackMimeType;
    const encodedImage = (embeddedDataUrl?.[2] || base64Image).replace(/\s/g, "");
    const binaryImage = atob(encodedImage);
    const bytes = new Uint8Array(binaryImage.length);

    for (let index = 0; index < binaryImage.length; index += 1) {
        bytes[index] = binaryImage.charCodeAt(index);
    }

    const objectUrl = URL.createObjectURL(new Blob([bytes], { type: mimeType }));
    return { downloadUrl: objectUrl, mimeType, previewUrl: objectUrl };
}

async function resolveImageResult(image) {
    const mimeType = image?.mime_type || image?.content_type || "image/png";

    if (image?.b64_json) return createBlobResult(image.b64_json, mimeType);

    if (image?.url) {
        try {
            const response = await fetch(image.url);
            if (!response.ok) throw new Error("Unable to fetch image preview.");

            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            return {
                downloadUrl: objectUrl,
                mimeType: blob.type || mimeType,
                previewUrl: objectUrl
            };
        } catch {
            return { downloadUrl: image.url, mimeType, previewUrl: image.url };
        }
    }

    throw new Error("服务没有返回可显示的图片。");
}

function displayResult(result) {
    clearResult();
    state.resultUrl = result.downloadUrl;
    state.resultPreviewUrl = result.previewUrl;
    state.resultMimeType = result.mimeType;
    resultImage.src = result.previewUrl;
    resultImage.hidden = false;
    emptyResult.hidden = true;
    loadingResult.hidden = true;
    downloadButton.hidden = false;
    downloadButton.disabled = false;
    resultTag.textContent = "完成啦";
}

function clearResult() {
    releaseResultPreview();
    state.resultUrl = null;
    state.resultMimeType = "image/png";
    resultImage.removeAttribute("src");
    resultImage.hidden = true;
    emptyResult.hidden = false;
    loadingResult.hidden = true;
    downloadButton.hidden = true;
    downloadButton.disabled = true;
    resultTag.textContent = "等待灵感";
}

function showLoading() {
    emptyResult.hidden = true;
    resultImage.hidden = true;
    loadingResult.hidden = false;
    downloadButton.hidden = true;
    resultTag.textContent = "处理中";
}

async function readError(response, apiKey) {
    const body = await response.text();
    try {
        const json = JSON.parse(body);
        const message = json?.error?.message || json?.message;
        if (message) return String(message).replaceAll(apiKey, "[hidden]");
    } catch {
        // Fall through to a safe generic error message.
    }
    return `请求失败（${response.status}）。`;
}

async function requestImage(apiKey, prompt, size) {
    let response;

    if (state.mode === "edit") {
        const formData = new FormData();
        formData.append("model", "gpt-image-2");
        formData.append("prompt", prompt);
        if (size) formData.append("size", size);
        formData.append("image", state.sourceFile, state.sourceFile.name);
        response = await fetch(`${API_BASE_URL}/edits`, {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}` },
            body: formData
        });
    } else {
        response = await fetch(`${API_BASE_URL}/generations`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-image-2",
                prompt,
                size
            })
        });
    }

    if (!response.ok) throw new Error(await readError(response, apiKey));

    const payload = await response.json();
    return resolveImageResult(payload?.data?.[0]);
}

modeButtons.forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.mode));
});

imageSizeSelect.addEventListener("change", () => {
    if (state.mode === "edit") {
        state.editSize = imageSizeSelect.value;
    } else {
        state.generateSize = imageSizeSelect.value;
    }
    updateSizeControls();
    updateRunButton();
});

customWidthInput.addEventListener("input", updateRunButton);
customHeightInput.addEventListener("input", updateRunButton);

toggleKeyButton.addEventListener("click", () => {
    const isHidden = apiKeyInput.type === "password";
    apiKeyInput.type = isHidden ? "text" : "password";
    toggleKeyButton.setAttribute("aria-label", isHidden ? "隐藏 API Key" : "显示 API Key");
    toggleKeyButton.title = isHidden ? "隐藏 API Key" : "显示 API Key";
});

apiKeyInput.addEventListener("input", updateRunButton);
promptInput.addEventListener("input", updateRunButton);
sourceImageInput.addEventListener("change", () => setSourceImage(sourceImageInput.files?.[0]));
removeImageButton.addEventListener("click", clearSourceImage);

runButton.addEventListener("click", async () => {
    const apiKey = apiKeyInput.value.trim();
    const prompt = promptInput.value.trim();
    if (!apiKey || !prompt || (state.mode === "edit" && !state.sourceFile)) return;

    let size;
    try {
        size = getRequestedImageSize();
    } catch (error) {
        setStatus(error.message, "error");
        return;
    }

    state.isProcessing = true;
    updateRunButton();
    setStatus();
    showLoading();

    try {
        const result = await requestImage(apiKey, prompt, size);
        displayResult(result);
        setStatus("画好了。", "success");
    } catch (error) {
        clearResult();
        const message = error instanceof TypeError
            ? "浏览器无法连接图片服务。服务端需要允许跨域请求。"
            : error.message;
        setStatus(message, "error");
    } finally {
        state.isProcessing = false;
        updateRunButton();
    }
});

downloadButton.addEventListener("click", () => {
    if (!state.resultUrl) return;
    const link = document.createElement("a");
    link.href = state.resultUrl;
    link.download = `xin-image-${Date.now()}.${getFileExtension(state.resultMimeType)}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
});

setMode("edit");
window.addEventListener("beforeunload", releaseResultPreview);
