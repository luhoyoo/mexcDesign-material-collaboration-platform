const CANVAS_SIZE = 1200;
const TEXT_LAYOUT = {
  left: 100,
  top: 223,
  width: 1000,
  gap: 10,
};
const IMAGE_LAYOUT = {
  left: 348,
  top: 533,
  width: 750,
  height: 566,
};
const LANGUAGES = [
  { code: "en", name: "English", target: "English", dir: "ltr" },
  { code: "zh-Hant", name: "繁体中文", target: "Traditional Chinese", dir: "ltr" },
  { code: "zh-Hans", name: "简体中文", target: "Simplified Chinese", dir: "ltr" },
  { code: "ja", name: "日本語", target: "Japanese", dir: "ltr" },
  { code: "ru", name: "Русский", target: "Russian", dir: "ltr" },
  { code: "tr", name: "Türkçe", target: "Turkish", dir: "ltr" },
  { code: "vi", name: "Tiếng Việt", target: "Vietnamese", dir: "ltr" },
  { code: "uk", name: "Українська", target: "Ukrainian", dir: "ltr" },
  { code: "id", name: "Indonesia", target: "Indonesian", dir: "ltr" },
  { code: "pt", name: "Português", target: "Portuguese", dir: "ltr" },
  { code: "es", name: "Español", target: "Spanish", dir: "ltr" },
  { code: "it", name: "Italiano", target: "Italian", dir: "ltr" },
  { code: "fa", name: "فارسی", target: "Persian", dir: "rtl" },
  { code: "fil", name: "Filipino", target: "Filipino", dir: "ltr" },
  { code: "ar", name: "العربية", target: "Arabic", dir: "rtl" },
  { code: "de", name: "Deutsch", target: "German", dir: "ltr" },
  { code: "fr", name: "Français", target: "French", dir: "ltr" },
  { code: "th", name: "ไทย", target: "Thai", dir: "ltr" },
];

const canvas = document.querySelector("#previewCanvas");
const ctx = canvas.getContext("2d");
const stage = document.querySelector("#stage");
const imageBox = document.querySelector("#imageBox");
const titleBox = document.querySelector("#titleBox");
const subtitleBox = document.querySelector("#subtitleBox");
const baseUpload = document.querySelector("#baseUpload");
const boxImageUpload = document.querySelector("#boxImageUpload");
const titleInput = document.querySelector("#titleInput");
const titleFont = document.querySelector("#titleFont");
const titleSize = document.querySelector("#titleSize");
const titleColor = document.querySelector("#titleColor");
const subtitleInput = document.querySelector("#subtitleInput");
const subtitleFont = document.querySelector("#subtitleFont");
const subtitleSize = document.querySelector("#subtitleSize");
const subtitleColor = document.querySelector("#subtitleColor");
const resetLayout = document.querySelector("#resetLayout");
const exportImage = document.querySelector("#exportImage");
const languageSelect = document.querySelector("#languageSelect");
const generateLanguages = document.querySelector("#generateLanguages");
const exportAll = document.querySelector("#exportAll");
const translationStatus = document.querySelector("#translationStatus");
const languageList = document.querySelector("#languageList");
const translationProvider = document.querySelector("#translationProvider");
const apiConfigPanel = document.querySelector(".api-config");
const apiKeyInput = document.querySelector("#apiKeyInput");
const apiBaseUrlInput = document.querySelector("#apiBaseUrlInput");
const apiModelInput = document.querySelector("#apiModelInput");
const saveApiConfig = document.querySelector("#saveApiConfig");
const refreshPreviews = document.querySelector("#refreshPreviews");
const posterPreviewGrid = document.querySelector("#posterPreviewGrid");
const projectNameInput = document.querySelector("#projectNameInput");
const projectSelect = document.querySelector("#projectSelect");
const newProject = document.querySelector("#newProject");
const saveProject = document.querySelector("#saveProject");
const copyProjectLink = document.querySelector("#copyProjectLink");
const projectStatus = document.querySelector("#projectStatus");

const state = {
  projectId: "",
  projectList: [],
  projectName: projectNameInput.value,
  baseImage: null,
  baseImageData: "",
  contentImage: null,
  contentImageData: "",
  activeLanguage: "en",
  sourceTitle: titleInput.value,
  sourceSubtitle: subtitleInput.value,
  variants: {},
  previewImages: {},
  apiConfig: loadApiConfig(),
  titleFont: titleFont.value,
  titleSize: Number(titleSize.value),
  titleColor: titleColor.value,
  subtitleFont: subtitleFont.value,
  subtitleSize: Number(subtitleSize.value),
  subtitleColor: subtitleColor.value,
};

apiKeyInput.value = state.apiConfig.apiKey;
apiBaseUrlInput.value = state.apiConfig.apiBaseUrl;
apiModelInput.value = state.apiConfig.model;
translationProvider.value = state.apiConfig.provider;
toggleApiFields();

function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const reader = new FileReader();

    image.onload = () => resolve({ image, dataUrl: image.src });
    image.onerror = reject;
    reader.onerror = reject;
    reader.onload = () => {
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function loadImageFromDataUrl(dataUrl) {
  return new Promise((resolve, reject) => {
    if (!dataUrl) {
      resolve(null);
      return;
    }

    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = dataUrl;
  });
}

function boxToCanvasRect(box) {
  const stageRect = stage.getBoundingClientRect();
  const boxRect = box.getBoundingClientRect();
  const scale = CANVAS_SIZE / stageRect.width;

  return {
    x: (boxRect.left - stageRect.left) * scale,
    y: (boxRect.top - stageRect.top) * scale,
    width: boxRect.width * scale,
    height: boxRect.height * scale,
  };
}

function pxToPercent(value) {
  return `${(value / CANVAS_SIZE) * 100}%`;
}

function getLanguage(code) {
  return LANGUAGES.find((language) => language.code === code) || LANGUAGES[0];
}

function getActiveVariant() {
  return state.variants[state.activeLanguage] || state.variants.en;
}

function syncEnglishVariant() {
  state.variants.en = {
    title: state.sourceTitle,
    subtitle: state.sourceSubtitle,
    reviewStatus: state.variants.en?.reviewStatus || "已确认",
    note: state.variants.en?.note || "",
    status: "源文案",
  };
}

function loadApiConfig() {
  const savedConfig = JSON.parse(localStorage.getItem("posterTranslationApi") || "{}");
  return {
    provider: savedConfig.provider || "mymemory",
    apiKey: savedConfig.apiKey || "",
    apiBaseUrl: savedConfig.apiBaseUrl || "https://api.openai.com/v1",
    model: savedConfig.model || "gpt-4o-mini",
  };
}

function saveCurrentApiConfig() {
  state.apiConfig = {
    provider: translationProvider.value,
    apiKey: apiKeyInput.value.trim(),
    apiBaseUrl: apiBaseUrlInput.value.trim() || "https://api.openai.com/v1",
    model: apiModelInput.value.trim() || "gpt-4o-mini",
  };
  localStorage.setItem("posterTranslationApi", JSON.stringify(state.apiConfig));
  toggleApiFields();
  translationStatus.textContent = "翻译 API 配置已保存。";
}

function toggleApiFields() {
  apiConfigPanel.classList.toggle("openai-hidden", translationProvider.value !== "openai");
}

function drawCover(image, x, y, width, height) {
  const sourceRatio = image.width / image.height;
  const targetRatio = width / height;
  let sourceWidth = image.width;
  let sourceHeight = image.height;
  let sourceX = 0;
  let sourceY = 0;

  if (sourceRatio > targetRatio) {
    sourceWidth = image.height * targetRatio;
    sourceX = (image.width - sourceWidth) / 2;
  } else {
    sourceHeight = image.width / targetRatio;
    sourceY = (image.height - sourceHeight) / 2;
  }

  ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
}

function drawPlaceholder() {
  const gradient = ctx.createLinearGradient(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  gradient.addColorStop(0, "#f7f9fb");
  gradient.addColorStop(0.48, "#ffffff");
  gradient.addColorStop(1, "#dfe7eb");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  ctx.fillStyle = "rgba(16,24,32,0.35)";
  ctx.font = "700 34px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("上传 1:1 底图", CANVAS_SIZE / 2, CANVAS_SIZE * 0.1);
}

function wrapText(text, maxWidth) {
  const paragraphs = text.split("\n");
  const lines = [];

  paragraphs.forEach((paragraph) => {
    let line = "";
    Array.from(paragraph).forEach((char) => {
      const nextLine = line + char;
      if (ctx.measureText(nextLine).width > maxWidth && line) {
        lines.push(line);
        line = char;
      } else {
        line = nextLine;
      }
    });
    lines.push(line);
  });

  return lines;
}

function getWrappedLines(text, options, maxWidth) {
  ctx.save();
  ctx.font = `${options.weight} ${options.size}px ${options.font}`;
  const lines = wrapText(text || " ", maxWidth);
  ctx.restore();
  return lines;
}

function getTextHeight(text, options) {
  const lines = getWrappedLines(text, options, TEXT_LAYOUT.width);
  return Math.max(options.size * options.lineHeight, lines.length * options.size * options.lineHeight);
}

function getTitleLineCount(title) {
  return getWrappedLines(title, getTitleOptions(), TEXT_LAYOUT.width).length;
}

function enforceTwoLineTitle(title) {
  const lines = getWrappedLines(title, getTitleOptions(), TEXT_LAYOUT.width);

  if (lines.length <= 2) {
    return title;
  }

  const secondLine = lines[1];
  let fittedSecondLine = secondLine;
  const ellipsis = "...";
  while (
    fittedSecondLine.length > 0 &&
    getWrappedLines(`${lines[0]}\n${fittedSecondLine}${ellipsis}`, getTitleOptions(), TEXT_LAYOUT.width)
      .length > 2
  ) {
    fittedSecondLine = fittedSecondLine.slice(0, -1).trimEnd();
  }

  return `${lines[0]}\n${fittedSecondLine}${ellipsis}`;
}

async function optimizeTitleForTwoLines(variant, language) {
  if (getTitleLineCount(variant.title) <= 2) {
    return variant;
  }

  try {
    const compactVariant = await translateVariant(language, "compact");
    if (getTitleLineCount(compactVariant.title) <= 2) {
      return {
        ...compactVariant,
        status: "已优化",
      };
    }
  } catch {
    // Keep the original translated title and apply a visual two-line fallback below.
  }

  return {
    ...variant,
    title: enforceTwoLineTitle(variant.title),
    status: "已优化",
  };
}

function applyFixedTextLayout() {
  const variant = getActiveVariant();
  const titleOptions = getTitleOptions();
  const subtitleOptions = getSubtitleOptions();
  const titleHeight = getTextHeight(variant.title, titleOptions);
  const subtitleHeight = getTextHeight(variant.subtitle, subtitleOptions);
  const subtitleTop = TEXT_LAYOUT.top + titleHeight + TEXT_LAYOUT.gap;

  setBoxLayoutPx(titleBox, {
    left: TEXT_LAYOUT.left,
    top: TEXT_LAYOUT.top,
    width: TEXT_LAYOUT.width,
    height: titleHeight,
  });
  setBoxLayoutPx(subtitleBox, {
    left: TEXT_LAYOUT.left,
    top: subtitleTop,
    width: TEXT_LAYOUT.width,
    height: subtitleHeight,
  });
}

function getTitleOptions() {
  return {
    color: state.titleColor,
    font: state.titleFont,
    lineHeight: 1.1,
    size: state.titleSize,
    weight: 900,
  };
}

function getSubtitleOptions() {
  return {
    color: state.subtitleColor,
    font: state.subtitleFont,
    lineHeight: 1.2,
    size: state.subtitleSize,
    weight: 500,
  };
}

function drawTextLayer(box, text, options) {
  if (!text.trim()) {
    return;
  }

  const rect = boxToCanvasRect(box);
  const lineHeight = options.size * options.lineHeight;

  ctx.save();
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.width, rect.height);
  ctx.clip();
  ctx.fillStyle = options.color;
  ctx.font = `${options.weight} ${options.size}px ${options.font}`;
  ctx.direction = options.direction || "ltr";
  ctx.textAlign = options.direction === "rtl" ? "right" : "left";
  ctx.textBaseline = "top";

  const lines = wrapText(text, rect.width);
  const textX = options.direction === "rtl" ? rect.x + rect.width : rect.x;
  lines.forEach((line, index) => {
    const y = rect.y + index * lineHeight;
    if (y + lineHeight <= rect.y + rect.height + 2) {
      ctx.fillText(line, textX, y);
    }
  });
  ctx.restore();
}

function drawImageBox() {
  if (!state.contentImage) {
    return;
  }

  const rect = boxToCanvasRect(imageBox);
  ctx.save();
  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.width, rect.height);
  ctx.clip();
  drawCover(state.contentImage, rect.x, rect.y, rect.width, rect.height);
  ctx.restore();
}

function render() {
  const variant = getActiveVariant();
  const language = getLanguage(state.activeLanguage);
  applyFixedTextLayout();
  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  if (state.baseImage) {
    drawCover(state.baseImage, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
  } else {
    drawPlaceholder();
  }

  drawImageBox();
  drawTextLayer(titleBox, variant.title, { ...getTitleOptions(), direction: language.dir });
  drawTextLayer(subtitleBox, variant.subtitle, { ...getSubtitleOptions(), direction: language.dir });
}

function setBoxLayout(box, layout) {
  box.style.left = `${layout.left}%`;
  box.style.top = `${layout.top}%`;
  box.style.width = `${layout.width}%`;
  box.style.height = `${layout.height}%`;
}

function setBoxLayoutPx(box, layout) {
  box.style.left = pxToPercent(layout.left);
  box.style.top = pxToPercent(layout.top);
  box.style.width = pxToPercent(layout.width);
  box.style.height = pxToPercent(layout.height);
}

function resetBoxes() {
  setBoxLayoutPx(imageBox, IMAGE_LAYOUT);
  applyFixedTextLayout();
  render();
}

function fillLanguageSelect() {
  languageSelect.innerHTML = LANGUAGES.map(
    (language) =>
      `<option value="${language.code}">${language.name}</option>`,
  ).join("");
  languageSelect.value = state.activeLanguage;
}

function renderLanguageList() {
  languageList.innerHTML = LANGUAGES.map((language) => {
    const variant = state.variants[language.code] || {
      title: state.sourceTitle,
      subtitle: state.sourceSubtitle,
      reviewStatus: "待检查",
      note: "",
      status: "待生成",
    };
    const activeClass = language.code === state.activeLanguage ? " active" : "";
    return `
      <article class="language-card${activeClass}" data-code="${language.code}">
        <div class="language-card-head">
          <span>${language.name}</span>
          <span class="language-status">${variant.status || "已生成"}</span>
        </div>
        <textarea data-field="title" rows="3">${escapeHtml(variant.title)}</textarea>
        <input data-field="subtitle" type="text" value="${escapeHtml(variant.subtitle)}" />
        <div class="language-review-row">
          <select data-field="reviewStatus">
            <option value="待检查"${variant.reviewStatus === "待检查" ? " selected" : ""}>待检查</option>
            <option value="已确认"${variant.reviewStatus === "已确认" ? " selected" : ""}>已确认</option>
            <option value="需修改"${variant.reviewStatus === "需修改" ? " selected" : ""}>需修改</option>
          </select>
          <input data-field="note" type="text" value="${escapeHtml(variant.note || "")}" placeholder="翻译备注" />
        </div>
      </article>
    `;
  }).join("");
}

function renderPosterPreviewGrid() {
  posterPreviewGrid.innerHTML = LANGUAGES.map((language) => {
    const preview = state.previewImages[language.code];
    const activeClass = language.code === state.activeLanguage ? " active" : "";
    const previewMarkup = preview
      ? `<img src="${preview}" alt="${language.name} 海报预览" />`
      : `<div class="poster-preview-empty">待预览</div>`;

    return `
      <button class="poster-preview-card${activeClass}" type="button" data-code="${language.code}">
        ${previewMarkup}
        <span class="poster-preview-name">${language.name}</span>
      </button>
    `;
  }).join("");
}

function clearPreviewImages() {
  state.previewImages = {};
  renderPosterPreviewGrid();
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function translateVariant(language, titleMode = "default") {
  if (language.code === "en") {
    return state.variants.en;
  }

  const response = await fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language: language.target,
      code: language.code,
      title: state.sourceTitle,
      subtitle: state.sourceSubtitle,
      provider: state.apiConfig.provider,
      apiKey: state.apiConfig.apiKey,
      apiBaseUrl: state.apiConfig.apiBaseUrl,
      model: state.apiConfig.model,
      titleMode,
    }),
  });

  if (!response.ok) {
    throw new Error("translation failed");
  }

  const data = await response.json();
  return {
    title: data.title || state.sourceTitle,
    subtitle: data.subtitle || state.sourceSubtitle,
    reviewStatus: "待检查",
    note: "",
    status: "已翻译",
  };
}

async function generateLanguageVariants() {
  syncEnglishVariant();
  translationStatus.textContent = "正在生成多语言文案...";
  generateLanguages.disabled = true;

  for (const language of LANGUAGES) {
    if (language.code === "en") {
      continue;
    }

    try {
      const translatedVariant = await translateVariant(language);
      state.variants[language.code] = await optimizeTitleForTwoLines(translatedVariant, language);
    } catch {
      state.variants[language.code] = {
        title: state.sourceTitle,
        subtitle: state.sourceSubtitle,
        reviewStatus: "待检查",
        note: "",
        status: "待翻译",
      };
    }
    renderLanguageList();
  }

  generateLanguages.disabled = false;
  translationStatus.textContent = "多语言条目已生成；待翻译项可以手动编辑，或接入本地翻译接口后重新生成。";
  await refreshPreviewImagesForAllLanguages();
  render();
}

function downloadCurrentImage(filename) {
  render();
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function filenameForLanguage(language) {
  return `poster-${language.code}.png`;
}

function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

async function exportAllLanguages() {
  const previousLanguage = state.activeLanguage;
  exportAll.disabled = true;
  translationStatus.textContent = "正在生成 ZIP 压缩包...";
  const files = [];

  for (const language of LANGUAGES) {
    state.activeLanguage = language.code;
    languageSelect.value = language.code;
    renderLanguageList();
    render();
    files.push({
      name: filenameForLanguage(language),
      data: dataUrlToBytes(canvas.toDataURL("image/png")),
    });
    await wait(30);
  }

  downloadBlob(createZip(files), "posters-all-languages.zip");
  state.activeLanguage = previousLanguage;
  languageSelect.value = previousLanguage;
  renderLanguageList();
  renderPosterPreviewGrid();
  render();
  exportAll.disabled = false;
  translationStatus.textContent = "ZIP 压缩包已生成。";
}

function downloadBlob(blob, filename) {
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.download = filename;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}

function dataUrlToBytes(dataUrl) {
  const base64 = dataUrl.split(",")[1];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function createZip(files) {
  const chunks = [];
  const centralDirectory = [];
  let offset = 0;

  files.forEach((file) => {
    const filenameBytes = new TextEncoder().encode(file.name);
    const crc = crc32(file.data);
    const localHeader = zipLocalHeader(filenameBytes, file.data.length, crc);
    chunks.push(localHeader, filenameBytes, file.data);
    centralDirectory.push({
      crc,
      filenameBytes,
      offset,
      size: file.data.length,
    });
    offset += localHeader.length + filenameBytes.length + file.data.length;
  });

  const centralStart = offset;
  centralDirectory.forEach((entry) => {
    const header = zipCentralDirectoryHeader(entry);
    chunks.push(header, entry.filenameBytes);
    offset += header.length + entry.filenameBytes.length;
  });

  chunks.push(zipEndOfCentralDirectory(centralDirectory.length, offset - centralStart, centralStart));
  return new Blob(chunks, { type: "application/zip" });
}

function zipLocalHeader(filenameBytes, size, crc) {
  const header = new Uint8Array(30);
  const view = new DataView(header.buffer);
  view.setUint32(0, 0x04034b50, true);
  view.setUint16(4, 20, true);
  view.setUint16(6, 0x0800, true);
  view.setUint16(8, 0, true);
  view.setUint16(10, 0, true);
  view.setUint16(12, 0, true);
  view.setUint32(14, crc, true);
  view.setUint32(18, size, true);
  view.setUint32(22, size, true);
  view.setUint16(26, filenameBytes.length, true);
  view.setUint16(28, 0, true);
  return header;
}

function zipCentralDirectoryHeader(entry) {
  const header = new Uint8Array(46);
  const view = new DataView(header.buffer);
  view.setUint32(0, 0x02014b50, true);
  view.setUint16(4, 20, true);
  view.setUint16(6, 20, true);
  view.setUint16(8, 0x0800, true);
  view.setUint16(10, 0, true);
  view.setUint16(12, 0, true);
  view.setUint16(14, 0, true);
  view.setUint32(16, entry.crc, true);
  view.setUint32(20, entry.size, true);
  view.setUint32(24, entry.size, true);
  view.setUint16(28, entry.filenameBytes.length, true);
  view.setUint16(30, 0, true);
  view.setUint16(32, 0, true);
  view.setUint16(34, 0, true);
  view.setUint16(36, 0, true);
  view.setUint32(38, 0, true);
  view.setUint32(42, entry.offset, true);
  return header;
}

function zipEndOfCentralDirectory(fileCount, centralSize, centralStart) {
  const header = new Uint8Array(22);
  const view = new DataView(header.buffer);
  view.setUint32(0, 0x06054b50, true);
  view.setUint16(4, 0, true);
  view.setUint16(6, 0, true);
  view.setUint16(8, fileCount, true);
  view.setUint16(10, fileCount, true);
  view.setUint32(12, centralSize, true);
  view.setUint32(16, centralStart, true);
  view.setUint16(20, 0, true);
  return header;
}

function crc32(bytes) {
  let crc = 0xffffffff;
  for (let index = 0; index < bytes.length; index += 1) {
    crc = CRC_TABLE[(crc ^ bytes[index]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let index = 0; index < 256; index += 1) {
    let value = index;
    for (let bit = 0; bit < 8; bit += 1) {
      value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
    }
    table[index] = value >>> 0;
  }
  return table;
})();

function getImageBoxLayout() {
  const rect = boxToCanvasRect(imageBox);
  return {
    left: Math.round(rect.x),
    top: Math.round(rect.y),
    width: Math.round(rect.width),
    height: Math.round(rect.height),
  };
}

function buildProjectData() {
  return {
    baseImageData: state.baseImageData,
    contentImageData: state.contentImageData,
    sourceTitle: state.sourceTitle,
    sourceSubtitle: state.sourceSubtitle,
    variants: state.variants,
    activeLanguage: state.activeLanguage,
    imageLayout: getImageBoxLayout(),
    style: {
      titleFont: state.titleFont,
      titleSize: state.titleSize,
      titleColor: state.titleColor,
      subtitleFont: state.subtitleFont,
      subtitleSize: state.subtitleSize,
      subtitleColor: state.subtitleColor,
    },
  };
}

async function applyProjectData(project) {
  state.projectId = project.id;
  state.projectName = project.name;
  projectNameInput.value = project.name;
  const data = project.data || {};

  state.baseImageData = data.baseImageData || "";
  state.contentImageData = data.contentImageData || "";
  state.baseImage = await loadImageFromDataUrl(state.baseImageData);
  state.contentImage = await loadImageFromDataUrl(state.contentImageData);
  state.sourceTitle = data.sourceTitle || titleInput.value;
  state.sourceSubtitle = data.sourceSubtitle || subtitleInput.value;
  state.variants = data.variants || {};
  state.activeLanguage = data.activeLanguage || "en";

  const style = data.style || {};
  state.titleFont = style.titleFont || state.titleFont;
  state.titleSize = Number(style.titleSize || state.titleSize);
  state.titleColor = style.titleColor || state.titleColor;
  state.subtitleFont = style.subtitleFont || state.subtitleFont;
  state.subtitleSize = Number(style.subtitleSize || state.subtitleSize);
  state.subtitleColor = style.subtitleColor || state.subtitleColor;

  titleInput.value = state.sourceTitle;
  subtitleInput.value = state.sourceSubtitle;
  titleFont.value = state.titleFont;
  titleSize.value = state.titleSize;
  titleColor.value = state.titleColor;
  subtitleFont.value = state.subtitleFont;
  subtitleSize.value = state.subtitleSize;
  subtitleColor.value = state.subtitleColor;
  languageSelect.value = state.activeLanguage;

  if (data.imageLayout) {
    setBoxLayoutPx(imageBox, data.imageLayout);
  }

  syncEnglishVariant();
  clearPreviewImages();
  renderLanguageList();
  renderPosterPreviewGrid();
  render();
  setProjectUrl(state.projectId);
  projectStatus.textContent = `已打开项目：${project.name}`;
}

async function loadProjectList() {
  const response = await fetch("/api/projects");
  state.projectList = response.ok ? await response.json() : [];
  projectSelect.innerHTML = [
    '<option value="">选择已有项目</option>',
    ...state.projectList.map((project) => (
      `<option value="${project.id}">${escapeHtml(project.name)}</option>`
    )),
  ].join("");
  projectSelect.value = state.projectId;
}

async function saveCurrentProject() {
  const name = projectNameInput.value.trim() || "未命名项目";
  const payload = {
    name,
    data: buildProjectData(),
  };
  const url = state.projectId ? `/api/projects/${state.projectId}` : "/api/projects";
  const method = state.projectId ? "PUT" : "POST";
  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    projectStatus.textContent = "保存失败，请确认当前通过 http://127.0.0.1:4173/ 打开。";
    return;
  }

  const project = await response.json();
  state.projectId = project.id;
  state.projectName = project.name;
  setProjectUrl(project.id);
  await loadProjectList();
  projectStatus.textContent = `已保存：${project.name}`;
}

async function loadProjectById(projectId) {
  if (!projectId) {
    return;
  }

  const response = await fetch(`/api/projects/${projectId}`);
  if (!response.ok) {
    projectStatus.textContent = "项目不存在或已被删除。";
    return;
  }

  await applyProjectData(await response.json());
  await loadProjectList();
}

function setProjectUrl(projectId) {
  const url = new URL(window.location.href);
  url.searchParams.set("project", projectId);
  window.history.replaceState({}, "", url);
}

function resetNewProject() {
  state.projectId = "";
  state.projectName = "MEXC 海报项目";
  projectNameInput.value = state.projectName;
  state.baseImage = null;
  state.baseImageData = "";
  state.contentImage = null;
  state.contentImageData = "";
  state.sourceTitle = "Equip the\n$100,000 Exo Suit";
  state.sourceSubtitle = "Epic Gear Arena S3";
  state.variants = {};
  state.activeLanguage = "en";
  titleInput.value = state.sourceTitle;
  subtitleInput.value = state.sourceSubtitle;
  languageSelect.value = state.activeLanguage;
  syncEnglishVariant();
  resetBoxes();
  clearPreviewImages();
  renderLanguageList();
  renderPosterPreviewGrid();
  render();
  const url = new URL(window.location.href);
  url.searchParams.delete("project");
  window.history.replaceState({}, "", url);
  projectStatus.textContent = "已新建项目，保存后即可分享协同链接。";
}

async function copyCurrentProjectLink() {
  if (!state.projectId) {
    await saveCurrentProject();
  }
  const url = new URL(window.location.href);
  url.searchParams.set("project", state.projectId);
  await navigator.clipboard.writeText(url.toString());
  projectStatus.textContent = "协同链接已复制。";
}

async function refreshPreviewImagesForAllLanguages() {
  const previousLanguage = state.activeLanguage;
  refreshPreviews.disabled = true;
  translationStatus.textContent = "正在生成多语言海报预览...";

  for (const language of LANGUAGES) {
    state.activeLanguage = language.code;
    languageSelect.value = language.code;
    render();
    state.previewImages[language.code] = canvas.toDataURL("image/png");
    await wait(20);
  }

  state.activeLanguage = previousLanguage;
  languageSelect.value = previousLanguage;
  renderLanguageList();
  renderPosterPreviewGrid();
  render();
  refreshPreviews.disabled = false;
  translationStatus.textContent = "多语言海报预览已刷新。";
}

function enableBoxEditing(box) {
  let activeAction = null;

  box.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    box.setPointerCapture(event.pointerId);

    const stageRect = stage.getBoundingClientRect();
    const boxRect = box.getBoundingClientRect();
    const isResize = event.target.tagName.toLowerCase() === "i";

    activeAction = {
      isResize,
      startX: event.clientX,
      startY: event.clientY,
      stageWidth: stageRect.width,
      stageHeight: stageRect.height,
      left: boxRect.left - stageRect.left,
      top: boxRect.top - stageRect.top,
      width: boxRect.width,
      height: boxRect.height,
    };
  });

  box.addEventListener("pointermove", (event) => {
    if (!activeAction) {
      return;
    }

    const dx = event.clientX - activeAction.startX;
    const dy = event.clientY - activeAction.startY;
    let nextLeft = activeAction.left;
    let nextTop = activeAction.top;
    let nextWidth = activeAction.width;
    let nextHeight = activeAction.height;

    if (activeAction.isResize) {
      nextWidth = Math.max(56, activeAction.width + dx);
      nextHeight = Math.max(44, activeAction.height + dy);
      nextWidth = Math.min(nextWidth, activeAction.stageWidth - activeAction.left);
      nextHeight = Math.min(nextHeight, activeAction.stageHeight - activeAction.top);
    } else {
      nextLeft = Math.min(
        Math.max(0, activeAction.left + dx),
        activeAction.stageWidth - activeAction.width,
      );
      nextTop = Math.min(
        Math.max(0, activeAction.top + dy),
        activeAction.stageHeight - activeAction.height,
      );
    }

    box.style.left = `${(nextLeft / activeAction.stageWidth) * 100}%`;
    box.style.top = `${(nextTop / activeAction.stageHeight) * 100}%`;
    box.style.width = `${(nextWidth / activeAction.stageWidth) * 100}%`;
    box.style.height = `${(nextHeight / activeAction.stageHeight) * 100}%`;
    render();
  });

  box.addEventListener("pointerup", () => {
    activeAction = null;
  });

  box.addEventListener("pointercancel", () => {
    activeAction = null;
  });
}

baseUpload.addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) {
    return;
  }
  const result = await readImageFile(file);
  state.baseImage = result.image;
  state.baseImageData = result.dataUrl;
  clearPreviewImages();
  render();
});

boxImageUpload.addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) {
    return;
  }
  const result = await readImageFile(file);
  state.contentImage = result.image;
  state.contentImageData = result.dataUrl;
  clearPreviewImages();
  render();
});

titleInput.addEventListener("input", (event) => {
  state.sourceTitle = event.target.value;
  syncEnglishVariant();
  renderLanguageList();
  clearPreviewImages();
  render();
});

titleFont.addEventListener("input", (event) => {
  state.titleFont = event.target.value;
  clearPreviewImages();
  render();
});

titleSize.addEventListener("input", (event) => {
  state.titleSize = Number(event.target.value) || 90;
  clearPreviewImages();
  render();
});

titleColor.addEventListener("input", (event) => {
  state.titleColor = event.target.value;
  clearPreviewImages();
  render();
});

subtitleInput.addEventListener("input", (event) => {
  state.sourceSubtitle = event.target.value;
  syncEnglishVariant();
  renderLanguageList();
  clearPreviewImages();
  render();
});

subtitleFont.addEventListener("input", (event) => {
  state.subtitleFont = event.target.value;
  clearPreviewImages();
  render();
});

subtitleSize.addEventListener("input", (event) => {
  state.subtitleSize = Number(event.target.value) || 40;
  clearPreviewImages();
  render();
});

subtitleColor.addEventListener("input", (event) => {
  state.subtitleColor = event.target.value;
  clearPreviewImages();
  render();
});

resetLayout.addEventListener("click", () => {
  resetBoxes();
  clearPreviewImages();
});

exportImage.addEventListener("click", () => {
  downloadCurrentImage(filenameForLanguage(getLanguage(state.activeLanguage)));
});

projectNameInput.addEventListener("input", (event) => {
  state.projectName = event.target.value;
});

newProject.addEventListener("click", resetNewProject);
saveProject.addEventListener("click", saveCurrentProject);
copyProjectLink.addEventListener("click", copyCurrentProjectLink);
projectSelect.addEventListener("input", (event) => {
  loadProjectById(event.target.value);
});

languageSelect.addEventListener("input", (event) => {
  state.activeLanguage = event.target.value;
  renderLanguageList();
  render();
});

generateLanguages.addEventListener("click", generateLanguageVariants);
exportAll.addEventListener("click", exportAllLanguages);
saveApiConfig.addEventListener("click", saveCurrentApiConfig);
translationProvider.addEventListener("input", saveCurrentApiConfig);
refreshPreviews.addEventListener("click", refreshPreviewImagesForAllLanguages);

posterPreviewGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".poster-preview-card");
  if (!card) {
    return;
  }

  state.activeLanguage = card.dataset.code;
  languageSelect.value = state.activeLanguage;
  renderLanguageList();
  renderPosterPreviewGrid();
  render();
});

languageList.addEventListener("input", (event) => {
  const card = event.target.closest(".language-card");
  if (!card) {
    return;
  }

  const code = card.dataset.code;
  const field = event.target.dataset.field;
  state.variants[code] = {
    ...(state.variants[code] || { title: "", subtitle: "", status: "已编辑" }),
    [field]: event.target.value,
    status: code === "en" ? "源文案" : "已编辑",
  };

  if (code === "en") {
    state.sourceTitle = state.variants.en.title;
    state.sourceSubtitle = state.variants.en.subtitle;
    titleInput.value = state.sourceTitle;
    subtitleInput.value = state.sourceSubtitle;
  }

  if (code === state.activeLanguage) {
    render();
  }
  delete state.previewImages[code];
  renderPosterPreviewGrid();
});

enableBoxEditing(imageBox);
init();

async function init() {
  syncEnglishVariant();
  fillLanguageSelect();
  renderLanguageList();
  renderPosterPreviewGrid();
  render();
  await loadProjectList();

  const projectId = new URL(window.location.href).searchParams.get("project");
  if (projectId) {
    await loadProjectById(projectId);
  }
}
