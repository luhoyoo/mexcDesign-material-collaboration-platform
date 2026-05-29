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
const RESOURCE_PRESETS = {
  "square-1200": {
    label: "1:1 海报 · 1200 × 1200",
    width: 1200,
    height: 1200,
  },
};
const ALL_LANGUAGES = [
  { code: "en", csvCodes: ["en-US", "en"], name: "English", target: "English", dir: "ltr" },
  { code: "zh-Hant", csvCodes: ["zh-TW", "zh-Hant"], name: "繁体中文", target: "Traditional Chinese", dir: "ltr" },
  { code: "zh-Hans", csvCodes: ["zh-CN", "zh-Hans"], name: "简体中文", target: "Simplified Chinese", dir: "ltr" },
  { code: "zh-MY", csvCodes: ["zh-MY"], name: "中文（马来西亚）", target: "Chinese Malaysia", dir: "ltr" },
  { code: "ja", csvCodes: ["ja-JP", "ja"], name: "日本語", target: "Japanese", dir: "ltr" },
  { code: "ko", csvCodes: ["ko-KR", "ko"], name: "한국어", target: "Korean", dir: "ltr" },
  { code: "ru", csvCodes: ["ru-RU", "ru"], name: "Русский", target: "Russian", dir: "ltr" },
  { code: "tr", csvCodes: ["tr-TR", "tr"], name: "Türkçe", target: "Turkish", dir: "ltr" },
  { code: "tr-CT", csvCodes: ["tr-CT"], name: "Türkçe CT", target: "Turkish", dir: "ltr" },
  { code: "vi", csvCodes: ["vi-VN", "vi"], name: "Tiếng Việt", target: "Vietnamese", dir: "ltr" },
  { code: "uk", csvCodes: ["uk-UA", "uk"], name: "Українська", target: "Ukrainian", dir: "ltr" },
  { code: "id", csvCodes: ["id-ID", "id"], name: "Indonesia", target: "Indonesian", dir: "ltr" },
  { code: "pt", csvCodes: ["pt-PT", "pt"], name: "Português", target: "Portuguese", dir: "ltr" },
  { code: "es", csvCodes: ["es-ES", "es"], name: "Español", target: "Spanish", dir: "ltr" },
  { code: "it", csvCodes: ["it-IT", "it"], name: "Italiano", target: "Italian", dir: "ltr" },
  { code: "fa", csvCodes: ["fa-IR", "fa"], name: "فارسی", target: "Persian", dir: "rtl" },
  { code: "fil", csvCodes: ["fil-PH", "fil"], name: "Filipino", target: "Filipino", dir: "ltr" },
  { code: "ar", csvCodes: ["ar-AE", "ar"], name: "العربية", target: "Arabic", dir: "rtl" },
  { code: "he", csvCodes: ["he-IL", "he"], name: "עברית", target: "Hebrew", dir: "rtl" },
  { code: "de", csvCodes: ["de-DE", "de"], name: "Deutsch", target: "German", dir: "ltr" },
  { code: "fr", csvCodes: ["fr-FR", "fr"], name: "Français", target: "French", dir: "ltr" },
  { code: "th", csvCodes: ["th-TH", "th"], name: "ไทย", target: "Thai", dir: "ltr" },
];
let LANGUAGES = [...ALL_LANGUAGES];
const IS_STANDALONE = window.location.protocol === "file:";
const MYMEMORY_LANGUAGE_CODES = {
  ar: "ar",
  de: "de",
  en: "en",
  es: "es",
  fa: "fa",
  fil: "tl",
  fr: "fr",
  id: "id",
  it: "it",
  ja: "ja",
  pt: "pt",
  ru: "ru",
  th: "th",
  tr: "tr",
  uk: "uk",
  vi: "vi",
  "zh-Hans": "zh-CN",
  "zh-Hant": "zh-TW",
};

const stage = document.querySelector("#stage");
const canvasViewport = document.querySelector("#canvasViewport");
const canvasWorld = document.querySelector("#canvasWorld");
const konvaContainer = document.querySelector("#konvaStage");
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
const exportAllFooter = document.querySelector("#exportAllFooter");
const translationStatus = document.querySelector("#translationStatus");
const languageList = document.querySelector("#languageList");
const languageCount = document.querySelector("#languageCount");
const canvasLanguageName = document.querySelector("#canvasLanguageName");
const activeLanguageName = document.querySelector("#activeLanguageName");
const activeTitleInput = document.querySelector("#activeTitleInput");
const activeSubtitleInput = document.querySelector("#activeSubtitleInput");
const activeReviewStatus = document.querySelector("#activeReviewStatus");
const activeNoteInput = document.querySelector("#activeNoteInput");
const csvUpload = document.querySelector("#csvUpload");
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
const confirmProgress = document.querySelector("#confirmProgress");
const zoomOut = document.querySelector("#zoomOut");
const zoomIn = document.querySelector("#zoomIn");
const zoomLabel = document.querySelector("#zoomLabel");
const resetCanvasView = document.querySelector("#resetCanvasView");
const projectWizard = document.querySelector("#projectWizard");
const closeProjectWizard = document.querySelector("#closeProjectWizard");
const wizardProjectName = document.querySelector("#wizardProjectName");
const resourcePreset = document.querySelector("#resourcePreset");
const wizardLanguageList = document.querySelector("#wizardLanguageList");
const selectAllLanguages = document.querySelector("#selectAllLanguages");
const clearLanguages = document.querySelector("#clearLanguages");
const createProjectFromWizard = document.querySelector("#createProjectFromWizard");
const measureCanvas = document.createElement("canvas");
const measureContext = measureCanvas.getContext("2d");
let posterStage = null;
let posterLayer = null;
let wizardSelectedLanguageCodes = [];
const canvasView = {
  x: 0,
  y: 0,
  scale: 1,
};

if (IS_STANDALONE) {
  document.body.classList.add("standalone-mode");
}

const state = {
  projectId: "",
  projectList: [],
  projectName: projectNameInput.value,
  resourcePreset: "square-1200",
  selectedLanguageCodes: ALL_LANGUAGES.map((language) => language.code),
  progressStatus: "制作中",
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

function syncLanguageScope() {
  const selectedCodes = state.selectedLanguageCodes.length
    ? state.selectedLanguageCodes
    : ["en"];
  LANGUAGES = ALL_LANGUAGES.filter((language) => selectedCodes.includes(language.code));
  if (!LANGUAGES.length) {
    LANGUAGES = [ALL_LANGUAGES[0]];
    state.selectedLanguageCodes = ["en"];
  }
  if (!LANGUAGES.some((language) => language.code === state.activeLanguage)) {
    state.activeLanguage = LANGUAGES[0].code;
  }
}

function getSelectedLanguageCodesFromWizard() {
  const selectedCodes = Array.from(
    wizardLanguageList.querySelectorAll("input[type='checkbox']:checked"),
  ).map((input) => input.value);
  return selectedCodes.includes("en") ? selectedCodes : ["en", ...selectedCodes];
}

function getActiveVariant() {
  return state.variants[state.activeLanguage] || state.variants.en;
}

function getFallbackVariant(code) {
  return {
    title: state.sourceTitle,
    subtitle: state.sourceSubtitle,
    reviewStatus: code === "en" ? "已确认" : "待检查",
    note: "",
    status: code === "en" ? "源文案" : "待生成",
  };
}

function getVariantForLanguage(code) {
  return state.variants[code] || getFallbackVariant(code);
}

function ensureVariantForLanguage(code) {
  if (!state.variants[code]) {
    state.variants[code] = getFallbackVariant(code);
  }
  return state.variants[code];
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

function initKonvaStage() {
  if (posterStage) {
    return;
  }

  if (!window.Konva) {
    throw new Error("Konva.js 未加载，请确认 vendor/konva.min.js 存在。");
  }

  posterStage = new Konva.Stage({
    container: konvaContainer,
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
  });
  posterLayer = new Konva.Layer();
  posterStage.add(posterLayer);
}

function getCoverCrop(image, width, height) {
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

  return {
    x: sourceX,
    y: sourceY,
    width: sourceWidth,
    height: sourceHeight,
  };
}

function createCoverImageNode(image, x, y, width, height) {
  return new Konva.Image({
    image,
    x,
    y,
    width,
    height,
    crop: getCoverCrop(image, width, height),
  });
}

function createPlaceholderNode() {
  const group = new Konva.Group();
  group.add(new Konva.Rect({
    x: 0,
    y: 0,
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
    fillLinearGradientStartPoint: { x: 0, y: 0 },
    fillLinearGradientEndPoint: { x: CANVAS_SIZE, y: CANVAS_SIZE },
    fillLinearGradientColorStops: [
      0,
      "#f7f9fb",
      0.48,
      "#ffffff",
      1,
      "#dfe7eb",
    ],
  }));
  group.add(new Konva.Text({
    x: 0,
    y: CANVAS_SIZE * 0.1 - 20,
    width: CANVAS_SIZE,
    height: 44,
    text: "上传 1:1 底图",
    fill: "rgba(16,24,32,0.35)",
    fontFamily: "system-ui, sans-serif",
    fontSize: 34,
    fontStyle: "bold",
    align: "center",
    verticalAlign: "middle",
  }));
  return group;
}

function wrapText(text, maxWidth) {
  const paragraphs = text.split("\n");
  const lines = [];

  paragraphs.forEach((paragraph) => {
    let line = "";
    Array.from(paragraph).forEach((char) => {
      const nextLine = line + char;
      if (measureContext.measureText(nextLine).width > maxWidth && line) {
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
  measureContext.font = `${options.weight} ${options.size}px ${options.font}`;
  const lines = wrapText(text || " ", maxWidth);
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

function addTextLayer(box, text, options) {
  const textValue = String(text || "");
  if (!textValue.trim()) {
    return;
  }

  const rect = boxToCanvasRect(box);
  measureContext.font = `${options.weight} ${options.size}px ${options.font}`;
  const lines = wrapText(textValue, rect.width);
  const group = new Konva.Group({
    x: rect.x,
    y: rect.y,
    clip: {
      x: 0,
      y: 0,
      width: rect.width,
      height: rect.height,
    },
  });

  const lineHeight = options.size * options.lineHeight;
  lines.forEach((line, index) => {
    const y = index * lineHeight;
    if (y + lineHeight > rect.height + 2) {
      return;
    }

    group.add(new Konva.Text({
      x: 0,
      y,
      width: rect.width,
      height: lineHeight,
      text: line,
      fill: options.color,
      fontFamily: options.font,
      fontSize: options.size,
      fontStyle: options.weight >= 700 ? "bold" : "normal",
      lineHeight: options.lineHeight,
      align: options.direction === "rtl" ? "right" : "left",
      verticalAlign: "top",
      wrap: "none",
    }));
  });
  posterLayer.add(group);
}

function addImageBoxLayer() {
  if (!state.contentImage) {
    return;
  }

  const rect = boxToCanvasRect(imageBox);
  posterLayer.add(createCoverImageNode(state.contentImage, rect.x, rect.y, rect.width, rect.height));
}

function render() {
  initKonvaStage();
  const variant = getActiveVariant();
  const language = getLanguage(state.activeLanguage);
  applyFixedTextLayout();
  posterLayer.destroyChildren();

  if (state.baseImage) {
    posterLayer.add(createCoverImageNode(state.baseImage, 0, 0, CANVAS_SIZE, CANVAS_SIZE));
  } else {
    posterLayer.add(createPlaceholderNode());
  }

  addImageBoxLayer();
  addTextLayer(titleBox, variant.title, { ...getTitleOptions(), direction: language.dir });
  addTextLayer(subtitleBox, variant.subtitle, { ...getSubtitleOptions(), direction: language.dir });
  posterLayer.batchDraw();
}

function getPosterDataUrl() {
  render();
  return posterStage.toDataURL({
    mimeType: "image/png",
    pixelRatio: 1,
  });
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

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function applyCanvasView() {
  canvasWorld.style.transform = `translate(${canvasView.x}px, ${canvasView.y}px) scale(${canvasView.scale})`;
  zoomLabel.textContent = `${Math.round(canvasView.scale * 100)}%`;
}

function fitCanvasView() {
  const viewportWidth = canvasViewport.clientWidth;
  const viewportHeight = canvasViewport.clientHeight;
  const stageWidth = stage.offsetWidth;
  const stageHeight = stage.offsetHeight;
  const nextScale = clamp(
    Math.min(1, (viewportWidth - 144) / stageWidth, (viewportHeight - 150) / stageHeight),
    0.35,
    1,
  );

  canvasView.scale = nextScale;
  canvasView.x = Math.round((viewportWidth - stageWidth * nextScale) / 2);
  canvasView.y = Math.round((viewportHeight - stageHeight * nextScale) / 2 + 24);
  applyCanvasView();
}

function zoomCanvasAt(nextScale, clientX, clientY) {
  const scale = clamp(nextScale, 0.25, 2.5);
  const viewportRect = canvasViewport.getBoundingClientRect();
  const pointerX = clientX - viewportRect.left;
  const pointerY = clientY - viewportRect.top;
  const worldX = (pointerX - canvasView.x) / canvasView.scale;
  const worldY = (pointerY - canvasView.y) / canvasView.scale;

  canvasView.scale = scale;
  canvasView.x = pointerX - worldX * scale;
  canvasView.y = pointerY - worldY * scale;
  applyCanvasView();
}

function zoomFromCenter(multiplier) {
  const rect = canvasViewport.getBoundingClientRect();
  zoomCanvasAt(
    canvasView.scale * multiplier,
    rect.left + rect.width / 2,
    rect.top + rect.height / 2,
  );
}

function fillLanguageSelect() {
  languageSelect.innerHTML = LANGUAGES.map(
    (language) =>
      `<option value="${language.code}">${language.name}</option>`,
  ).join("");
  languageSelect.value = state.activeLanguage;
}

function renderWizardLanguageList() {
  wizardLanguageList.innerHTML = ALL_LANGUAGES.map((language) => {
    const checked = wizardSelectedLanguageCodes.includes(language.code) ? " checked" : "";
    const disabled = language.code === "en" ? " disabled" : "";
    return `
      <label class="wizard-language-option">
        <input type="checkbox" value="${language.code}"${checked}${disabled} />
        <span>${language.name}</span>
      </label>
    `;
  }).join("");
}

function openProjectWizard() {
  wizardProjectName.value = state.projectName || "MEXC 海报项目";
  resourcePreset.value = state.resourcePreset;
  wizardSelectedLanguageCodes = [...state.selectedLanguageCodes];
  renderWizardLanguageList();
  projectWizard.hidden = false;
  wizardProjectName.focus();
}

function closeWizard() {
  projectWizard.hidden = true;
}

function refreshProjectChrome() {
  confirmProgress.textContent = state.progressStatus === "已完成" ? "已完成" : "确认完成";
  confirmProgress.classList.toggle("primary", state.progressStatus === "已完成");
  projectSelect.value = state.projectId;
}

function renderLanguageList() {
  if (languageCount) {
    languageCount.textContent = String(LANGUAGES.length);
  }
  const activeLanguage = getLanguage(state.activeLanguage);
  if (canvasLanguageName) {
    canvasLanguageName.textContent = activeLanguage.name;
  }
  languageList.innerHTML = LANGUAGES.map((language) => {
    const activeClass = language.code === state.activeLanguage ? " active" : "";
    return `
      <button class="language-card${activeClass}" type="button" data-code="${language.code}">
        <span class="layer-icon">${escapeHtml(language.code.slice(0, 2).toUpperCase())}</span>
        <span class="language-name">${language.name}</span>
      </button>
    `;
  }).join("");
  renderActiveLanguageEditor();
}

function renderActiveLanguageEditor() {
  const language = getLanguage(state.activeLanguage);
  const variant = getVariantForLanguage(language.code);
  activeLanguageName.textContent = language.name;
  activeTitleInput.value = variant.title || "";
  activeSubtitleInput.value = variant.subtitle || "";
  activeReviewStatus.value = variant.reviewStatus || "待检查";
  activeNoteInput.value = variant.note || "";
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

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  const normalizedText = text.replace(/^\uFEFF/, "");

  for (let index = 0; index < normalizedText.length; index += 1) {
    const char = normalizedText[index];
    const nextChar = normalizedText[index + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") {
        index += 1;
      }
      row.push(cell);
      if (row.some((value) => value.trim())) {
        rows.push(row);
      }
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell);
  if (row.some((value) => value.trim())) {
    rows.push(row);
  }

  return rows;
}

function normalizeCell(value) {
  return String(value || "").trim();
}

function getCsvLanguage(csvCode) {
  const normalizedCode = csvCode.toLowerCase();
  return LANGUAGES.find((language) => (
    language.csvCodes || [language.code]
  ).some((code) => code.toLowerCase() === normalizedCode));
}

function applyCsvRows(rows) {
  const headerRow = rows[0] || [];
  const titleRow = rows.find((row) => normalizeCell(row[0]).toLowerCase() === "header");
  const subtitleRow = rows.find((row) => normalizeCell(row[0]).toLowerCase() === "subhead");

  if (!titleRow || !subtitleRow) {
    throw new Error("CSV 需要包含 Header 和 Subhead 两行");
  }

  let importedCount = 0;

  headerRow.forEach((rawCode, columnIndex) => {
    const csvCode = normalizeCell(rawCode);
    if (!csvCode) {
      return;
    }

    const language = getCsvLanguage(csvCode);
    const title = normalizeCell(titleRow[columnIndex]);
    const subtitle = normalizeCell(subtitleRow[columnIndex]);

    if (!language || (!title && !subtitle)) {
      return;
    }

    state.variants[language.code] = {
      ...(state.variants[language.code] || {}),
      title: title || state.variants[language.code]?.title || "",
      subtitle: subtitle || state.variants[language.code]?.subtitle || "",
      reviewStatus: "待检查",
      note: "",
      status: "CSV导入",
    };
    importedCount += 1;
  });

  const englishVariant = state.variants.en;
  if (englishVariant) {
    state.sourceTitle = englishVariant.title;
    state.sourceSubtitle = englishVariant.subtitle;
    titleInput.value = state.sourceTitle;
    subtitleInput.value = state.sourceSubtitle;
    syncEnglishVariant();
    state.variants.en.status = "CSV导入";
  }

  clearPreviewImages();
  renderLanguageList();
  renderPosterPreviewGrid();
  render();
  translationStatus.textContent = `已从 CSV 导入 ${importedCount} 个语言版本。`;
}

async function importCsvFile(file) {
  const text = await file.text();
  applyCsvRows(parseCsv(text));
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

  if (IS_STANDALONE) {
    const titleSource = titleMode === "compact"
      ? compactSourceTitle(state.sourceTitle)
      : state.sourceTitle;
    const [title, subtitle] = await Promise.all([
      translateWithMyMemoryClient(titleSource, language.code),
      translateWithMyMemoryClient(state.sourceSubtitle, language.code),
    ]);
    return {
      title: title || state.sourceTitle,
      subtitle: subtitle || state.sourceSubtitle,
      reviewStatus: "待检查",
      note: "",
      status: "已翻译",
    };
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

async function translateWithMyMemoryClient(text, languageCode) {
  const targetCode = MYMEMORY_LANGUAGE_CODES[languageCode] || languageCode;
  const url = new URL("https://api.mymemory.translated.net/get");
  url.searchParams.set("q", text);
  url.searchParams.set("langpair", `en|${targetCode}`);

  const response = await fetch(url.toString());
  const data = await response.json();

  if (!response.ok || data.responseStatus >= 400) {
    throw new Error(data.responseDetails || "MyMemory translation failed");
  }

  return data.responseData?.translatedText || "";
}

function compactSourceTitle(title) {
  return title
    .replace(/\bEquip the\b/gi, "Equip")
    .replace(/\bwith the\b/gi, "with")
    .replace(/\bfor the\b/gi, "for")
    .replace(/\s+/g, " ")
    .trim();
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
  const link = document.createElement("a");
  link.download = filename;
  link.href = getPosterDataUrl();
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
  exportAllFooter.disabled = true;
  translationStatus.textContent = "正在生成 ZIP 压缩包...";
  const files = [];

  for (const language of LANGUAGES) {
    state.activeLanguage = language.code;
    languageSelect.value = language.code;
    renderLanguageList();
    render();
    files.push({
      name: filenameForLanguage(language),
      data: dataUrlToBytes(getPosterDataUrl()),
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
  exportAllFooter.disabled = false;
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

function optimizeSharedImage(image, dataUrl, maxWidth, maxHeight) {
  if (!image || !dataUrl) {
    return "";
  }

  if (
    dataUrl.startsWith("data:image/webp")
    && image.width <= maxWidth
    && image.height <= maxHeight
  ) {
    return dataUrl;
  }

  const scale = Math.min(1, maxWidth / image.width, maxHeight / image.height);
  const optimizedCanvas = document.createElement("canvas");
  optimizedCanvas.width = Math.round(image.width * scale);
  optimizedCanvas.height = Math.round(image.height * scale);
  optimizedCanvas.getContext("2d").drawImage(
    image,
    0,
    0,
    optimizedCanvas.width,
    optimizedCanvas.height,
  );
  return optimizedCanvas.toDataURL("image/webp", 0.92);
}

function buildProjectData() {
  return {
    baseImageData: optimizeSharedImage(
      state.baseImage,
      state.baseImageData,
      CANVAS_SIZE,
      CANVAS_SIZE,
    ),
    contentImageData: optimizeSharedImage(
      state.contentImage,
      state.contentImageData,
      IMAGE_LAYOUT.width,
      IMAGE_LAYOUT.height,
    ),
    sourceTitle: state.sourceTitle,
    sourceSubtitle: state.sourceSubtitle,
    variants: state.variants,
    activeLanguage: state.activeLanguage,
    resourcePreset: state.resourcePreset,
    selectedLanguageCodes: state.selectedLanguageCodes,
    progressStatus: state.progressStatus,
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
  state.resourcePreset = data.resourcePreset || "square-1200";
  state.selectedLanguageCodes = data.selectedLanguageCodes || ALL_LANGUAGES.map((language) => language.code);
  state.progressStatus = data.progressStatus || "制作中";
  state.activeLanguage = data.activeLanguage || "en";
  syncLanguageScope();

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
  fillLanguageSelect();
  languageSelect.value = state.activeLanguage;
  refreshProjectChrome();

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
  if (IS_STANDALONE) {
    projectSelect.innerHTML = '<option value="">本地单机模式</option>';
    projectStatus.textContent = "本地单机模式：无需服务器，不保存协同项目。";
    refreshProjectChrome();
    return;
  }

  const response = await fetch("/api/projects");
  if (!response.ok) {
    projectStatus.textContent = "协同存储尚未连接，请先在部署平台配置项目存储。";
    state.projectList = [];
  } else {
    state.projectList = await response.json();
  }
  projectSelect.innerHTML = [
    '<option value="">选择已有项目</option>',
    ...state.projectList.map((project) => (
      `<option value="${project.id}">${escapeHtml(project.name)}</option>`
    )),
  ].join("");
  projectSelect.value = state.projectId;
  refreshProjectChrome();
}

async function saveCurrentProject() {
  if (IS_STANDALONE) {
    projectStatus.textContent = "本地单机模式不保存协同项目，请直接导出 PNG 或 ZIP。";
    return;
  }

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
    projectStatus.textContent = "保存失败，请检查线上存储配置或图片文件大小。";
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
  if (IS_STANDALONE) {
    return;
  }

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

function createNewProject(config = {}) {
  state.projectId = "";
  state.projectName = config.name || "MEXC 海报项目";
  state.resourcePreset = config.resourcePreset || "square-1200";
  state.selectedLanguageCodes = config.selectedLanguageCodes?.length
    ? config.selectedLanguageCodes
    : ALL_LANGUAGES.map((language) => language.code);
  state.progressStatus = "制作中";
  syncLanguageScope();
  projectNameInput.value = state.projectName;
  state.baseImage = null;
  state.baseImageData = "";
  state.contentImage = null;
  state.contentImageData = "";
  state.sourceTitle = "Equip the\n$100,000 Exo Suit";
  state.sourceSubtitle = "Epic Gear Arena S3";
  state.variants = {};
  state.activeLanguage = LANGUAGES.some((language) => language.code === "en")
    ? "en"
    : LANGUAGES[0].code;
  titleInput.value = state.sourceTitle;
  subtitleInput.value = state.sourceSubtitle;
  fillLanguageSelect();
  languageSelect.value = state.activeLanguage;
  syncEnglishVariant();
  resetBoxes();
  clearPreviewImages();
  renderLanguageList();
  renderPosterPreviewGrid();
  render();
  refreshProjectChrome();
  const url = new URL(window.location.href);
  url.searchParams.delete("project");
  window.history.replaceState({}, "", url);
  projectStatus.textContent = "已新建项目，保存后即可分享协同链接。";
}

function submitProjectWizard() {
  const selectedLanguageCodes = getSelectedLanguageCodesFromWizard();
  createNewProject({
    name: wizardProjectName.value.trim() || "MEXC 海报项目",
    resourcePreset: resourcePreset.value,
    selectedLanguageCodes,
  });
  closeWizard();
}

async function copyCurrentProjectLink() {
  if (IS_STANDALONE) {
    projectStatus.textContent = "本地单机模式没有协同链接。";
    return;
  }

  if (!state.projectId) {
    await saveCurrentProject();
  }
  const url = new URL(window.location.href);
  url.searchParams.set("project", state.projectId);
  await navigator.clipboard.writeText(url.toString());
  projectStatus.textContent = "协同链接已复制。";
}

async function toggleProgressConfirmation() {
  state.progressStatus = state.progressStatus === "已完成" ? "制作中" : "已完成";
  refreshProjectChrome();
  projectStatus.textContent = state.progressStatus === "已完成"
    ? "项目进度已确认完成。"
    : "项目状态已改回制作中。";
  if (state.projectId && !IS_STANDALONE) {
    await saveCurrentProject();
  }
}

async function refreshPreviewImagesForAllLanguages() {
  const previousLanguage = state.activeLanguage;
  refreshPreviews.disabled = true;
  translationStatus.textContent = "正在生成多语言海报预览...";

  for (const language of LANGUAGES) {
    state.activeLanguage = language.code;
    languageSelect.value = language.code;
    state.previewImages[language.code] = getPosterDataUrl();
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

csvUpload.addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) {
    return;
  }

  try {
    await importCsvFile(file);
  } catch (error) {
    translationStatus.textContent = error.message;
  }
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

newProject.addEventListener("click", openProjectWizard);
saveProject.addEventListener("click", saveCurrentProject);
copyProjectLink.addEventListener("click", copyCurrentProjectLink);
confirmProgress.addEventListener("click", toggleProgressConfirmation);
projectSelect.addEventListener("input", (event) => {
  loadProjectById(event.target.value);
});

languageSelect.addEventListener("input", (event) => {
  state.activeLanguage = event.target.value;
  renderLanguageList();
  renderPosterPreviewGrid();
  render();
});

generateLanguages.addEventListener("click", generateLanguageVariants);
exportAll.addEventListener("click", exportAllLanguages);
exportAllFooter.addEventListener("click", exportAllLanguages);
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

languageList.addEventListener("click", (event) => {
  const card = event.target.closest(".language-card");
  if (!card) {
    return;
  }

  state.activeLanguage = card.dataset.code;
  languageSelect.value = state.activeLanguage;
  renderLanguageList();
  renderPosterPreviewGrid();
  render();
});

function updateActiveVariantField(field, value) {
  const code = state.activeLanguage;
  const variant = ensureVariantForLanguage(code);
  variant[field] = value;
  variant.status = code === "en" ? "源文案" : "已编辑";

  if (code === "en" && (field === "title" || field === "subtitle")) {
    state.sourceTitle = variant.title;
    state.sourceSubtitle = variant.subtitle;
    titleInput.value = state.sourceTitle;
    subtitleInput.value = state.sourceSubtitle;
  }

  delete state.previewImages[code];
  renderLanguageList();
  renderPosterPreviewGrid();
  render();
}

activeTitleInput.addEventListener("input", (event) => {
  updateActiveVariantField("title", event.target.value);
});

activeSubtitleInput.addEventListener("input", (event) => {
  updateActiveVariantField("subtitle", event.target.value);
});

activeReviewStatus.addEventListener("input", (event) => {
  updateActiveVariantField("reviewStatus", event.target.value);
});

activeNoteInput.addEventListener("input", (event) => {
  updateActiveVariantField("note", event.target.value);
});

let canvasPan = null;
canvasViewport.addEventListener("pointerdown", (event) => {
  if (
    event.target.closest(".stage")
    || event.target.closest(".canvas-toolbar")
    || event.target.closest(".canvas-zoom-controls")
  ) {
    return;
  }

  canvasPan = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    viewX: canvasView.x,
    viewY: canvasView.y,
  };
  canvasViewport.classList.add("is-panning");
  canvasViewport.setPointerCapture(event.pointerId);
});

canvasViewport.addEventListener("pointermove", (event) => {
  if (!canvasPan) {
    return;
  }

  canvasView.x = canvasPan.viewX + event.clientX - canvasPan.startX;
  canvasView.y = canvasPan.viewY + event.clientY - canvasPan.startY;
  applyCanvasView();
});

function stopCanvasPan() {
  canvasPan = null;
  canvasViewport.classList.remove("is-panning");
}

canvasViewport.addEventListener("pointerup", stopCanvasPan);
canvasViewport.addEventListener("pointercancel", stopCanvasPan);

canvasViewport.addEventListener("wheel", (event) => {
  event.preventDefault();
  if (event.ctrlKey || event.metaKey) {
    zoomCanvasAt(canvasView.scale * (event.deltaY > 0 ? 0.92 : 1.08), event.clientX, event.clientY);
    return;
  }

  canvasView.x -= event.deltaX;
  canvasView.y -= event.deltaY;
  applyCanvasView();
}, { passive: false });

zoomOut.addEventListener("click", () => {
  zoomFromCenter(0.85);
});

zoomIn.addEventListener("click", () => {
  zoomFromCenter(1.15);
});

resetCanvasView.addEventListener("click", fitCanvasView);

closeProjectWizard.addEventListener("click", closeWizard);
projectWizard.addEventListener("click", (event) => {
  if (event.target === projectWizard) {
    closeWizard();
  }
});
selectAllLanguages.addEventListener("click", () => {
  wizardSelectedLanguageCodes = ALL_LANGUAGES.map((language) => language.code);
  renderWizardLanguageList();
});
clearLanguages.addEventListener("click", () => {
  wizardSelectedLanguageCodes = ["en"];
  renderWizardLanguageList();
});
wizardLanguageList.addEventListener("input", () => {
  wizardSelectedLanguageCodes = getSelectedLanguageCodesFromWizard();
});
createProjectFromWizard.addEventListener("click", submitProjectWizard);
window.addEventListener("resize", fitCanvasView);

enableBoxEditing(imageBox);
init();

async function init() {
  syncLanguageScope();
  syncEnglishVariant();
  fillLanguageSelect();
  wizardSelectedLanguageCodes = [...state.selectedLanguageCodes];
  renderWizardLanguageList();
  refreshProjectChrome();
  renderLanguageList();
  renderPosterPreviewGrid();
  render();
  window.requestAnimationFrame(fitCanvasView);
  await loadProjectList();

  const projectId = IS_STANDALONE ? "" : new URL(window.location.href).searchParams.get("project");
  if (projectId) {
    await loadProjectById(projectId);
  }
}
