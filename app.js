const DEFAULT_RESOURCE_PRESET = "poster-square-1200";
const DEFAULT_TITLE_SUBTITLE_GAP = 26;
const TITLE_SUBTITLE_GAP_BY_PRESET = {
  "poster-square-1200": 26,
  "ins-poster-1200x1500": 26,
  "announcement-banner-800x450": 10,
  "web-small-banner-288x144": 4,
};
const RESOURCE_PRESETS = {
  "search-banner-690x160": {
    label: "搜索页banner · 690 × 160",
    width: 690,
    height: 160,
    titleBox: { left: 30, top: 47.5, width: 468, height: 33 },
    subtitleBox: { left: 30, top: 88.5, width: 240, height: 23 },
    imageBox: { left: 0, top: 0, width: 690, height: 160 },
    defaultStyle: { titleSize: 28, subtitleSize: 18 },
    figmaNodeId: "9:3612",
  },
  "web-small-banner-288x144": {
    label: "web 小banner · 288 × 144",
    width: 288,
    height: 144,
    titleBox: { left: 16, top: 47.33, width: 163.33, height: 44 },
    subtitleBox: { left: 16, top: 95.33, width: 163, height: 16 },
    imageBox: { left: 170.63, top: 16.23, width: 101.41, height: 111.55 },
    tagBox: { left: 16, top: 16, width: 52.67, height: 17.33 },
    defaultStyle: { titleSize: 18, subtitleSize: 10 },
    figmaNodeId: "9:3624",
  },
  "announcement-banner-800x450": {
    label: "Announcement banner · 800 × 450",
    width: 800,
    height: 450,
    titleBox: { left: 39.5, top: 103.67, width: 408.33, height: 110 },
    subtitleBox: { left: 39.5, top: 223.67, width: 408.3, height: 39 },
    imageBox: { left: 0, top: 0, width: 800, height: 450 },
    tagBox: { left: 39.5, top: 39, width: 105.33, height: 34.67 },
    defaultStyle: { titleSize: 48, subtitleSize: 24 },
    figmaNodeId: "9:3617",
  },
  "dropdown-ad-244x228": {
    label: "下拉广告位 · 244 × 228",
    width: 244,
    height: 228,
    titleBox: { left: 17, top: 119, width: 210, height: 46 },
    subtitleBox: { left: 66.5, top: 173, width: 110, height: 30 },
    imageBox: { left: 0, top: 0, width: 244, height: 228 },
    defaultStyle: { titleSize: 20, subtitleSize: 12 },
    figmaNodeId: "9:3637",
  },
  "web-login-326x584": {
    label: "web登陆注册页广告位 · 326 × 584",
    width: 326,
    height: 584,
    titleBox: { left: 31, top: 387, width: 264, height: 58 },
    subtitleBox: { left: 119.5, top: 455, width: 87, height: 20 },
    imageBox: { left: 0, top: 100, width: 326, height: 269.74 },
    defaultStyle: { titleSize: 28, subtitleSize: 16 },
    figmaNodeId: "9:3600",
  },
  "app-login-343x80": {
    label: "App登陆注册页广告位 · 343 × 80",
    width: 343,
    height: 80,
    titleBox: { left: 15, top: 21.5, width: 230, height: 19 },
    subtitleBox: { left: 15, top: 42.5, width: 79, height: 17 },
    imageBox: { left: 269, top: 15, width: 60.43, height: 50 },
    defaultStyle: { titleSize: 16, subtitleSize: 11 },
    figmaNodeId: "9:3641",
  },
  "poster-square-1200": {
    label: "Poster · 1200 × 1200",
    width: 1200,
    height: 1200,
    titleBox: { left: 98, top: 223, width: 1000, height: 198 },
    subtitleBox: { left: 98, top: 447, width: 814.8, height: 48 },
    imageBox: { left: 348, top: 533, width: 750, height: 566 },
    tagBox: { left: 937.04, top: 113, width: 162.96, height: 39 },
    defaultStyle: { titleSize: 90, subtitleSize: 40 },
    figmaNodeId: "9:3605",
  },
  "ins-poster-1200x1500": {
    label: "INS Poster · 1200 × 1500",
    width: 1200,
    height: 1500,
    titleBox: { left: 98, top: 223, width: 1000, height: 198 },
    subtitleBox: { left: 98, top: 447, width: 814.8, height: 48 },
    imageBox: { left: 348, top: 533, width: 750, height: 866 },
    tagBox: { left: 937, top: 130, width: 162.96, height: 39 },
    defaultStyle: { titleSize: 90, subtitleSize: 40 },
    figmaNodeId: "9:3699",
  },
};
const DEFAULT_TEMPLATE_ID = "figma-mcp-test";
const ALL_LANGUAGES = [
  { code: "en", csvCodes: ["en-US", "en"], name: "English", zhName: "英语", target: "English", dir: "ltr" },
  { code: "zh-Hant", csvCodes: ["zh-TW", "zh-Hant"], name: "繁体中文", zhName: "繁体中文", target: "Traditional Chinese", dir: "ltr" },
  { code: "zh-Hans", csvCodes: ["zh-CN", "zh-Hans"], name: "简体中文", zhName: "简体中文", target: "Simplified Chinese", dir: "ltr" },
  { code: "zh-MY", csvCodes: ["zh-MY"], name: "中文（马来西亚）", zhName: "中文（马来西亚）", target: "Chinese Malaysia", dir: "ltr" },
  { code: "ja", csvCodes: ["ja-JP", "ja"], name: "日本語", zhName: "日语", target: "Japanese", dir: "ltr" },
  { code: "ko", csvCodes: ["ko-KR", "ko"], name: "한국어", zhName: "韩语", target: "Korean", dir: "ltr" },
  { code: "ru", csvCodes: ["ru-RU", "ru"], name: "Русский", zhName: "俄语", target: "Russian", dir: "ltr" },
  { code: "tr", csvCodes: ["tr-TR", "tr"], name: "Türkçe", zhName: "土耳其语", target: "Turkish", dir: "ltr" },
  { code: "tr-CT", csvCodes: ["tr-CT"], name: "Türkçe CT", zhName: "土耳其语 CT", target: "Turkish", dir: "ltr" },
  { code: "vi", csvCodes: ["vi-VN", "vi"], name: "Tiếng Việt", zhName: "越南语", target: "Vietnamese", dir: "ltr" },
  { code: "uk", csvCodes: ["uk-UA", "uk"], name: "Українська", zhName: "乌克兰语", target: "Ukrainian", dir: "ltr" },
  { code: "id", csvCodes: ["id-ID", "id"], name: "Indonesia", zhName: "印度尼西亚语", target: "Indonesian", dir: "ltr" },
  { code: "ms", csvCodes: ["ms-MY", "ms"], name: "Bahasa Melayu", zhName: "马来语", target: "Malay", dir: "ltr" },
  { code: "pt", csvCodes: ["pt-PT", "pt"], name: "Português", zhName: "葡萄牙语", target: "Portuguese", dir: "ltr" },
  { code: "es", csvCodes: ["es-ES", "es"], name: "Español", zhName: "西班牙语", target: "Spanish", dir: "ltr" },
  { code: "it", csvCodes: ["it-IT", "it"], name: "Italiano", zhName: "意大利语", target: "Italian", dir: "ltr" },
  { code: "fa", csvCodes: ["fa-IR", "fa"], name: "فارسی", zhName: "波斯语", target: "Persian", dir: "rtl" },
  { code: "fil", csvCodes: ["fil-PH", "fil"], name: "Filipino", zhName: "菲律宾语", target: "Filipino", dir: "ltr" },
  { code: "ar", csvCodes: ["ar-AE", "ar"], name: "العربية", zhName: "阿拉伯语", target: "Arabic", dir: "rtl" },
  { code: "he", csvCodes: ["he-IL", "he"], name: "עברית", zhName: "希伯来语", target: "Hebrew", dir: "rtl" },
  { code: "de", csvCodes: ["de-DE", "de"], name: "Deutsch", zhName: "德语", target: "German", dir: "ltr" },
  { code: "fr", csvCodes: ["fr-FR", "fr"], name: "Français", zhName: "法语", target: "French", dir: "ltr" },
  { code: "th", csvCodes: ["th-TH", "th"], name: "ไทย", zhName: "泰语", target: "Thai", dir: "ltr" },
  { code: "pl", csvCodes: ["pl-PL", "pl"], name: "Polski", zhName: "波兰语", target: "Polish", dir: "ltr" },
  { code: "sv", csvCodes: ["sv-SE", "sv"], name: "Svenska", zhName: "瑞典语", target: "Swedish", dir: "ltr" },
  { code: "nl", csvCodes: ["nl-NL", "nl"], name: "Nederlands", zhName: "荷兰语", target: "Dutch", dir: "ltr" },
  { code: "el", csvCodes: ["el-GR", "el"], name: "Ελληνικά", zhName: "希腊语", target: "Greek", dir: "ltr" },
  { code: "et", csvCodes: ["et-EE", "et"], name: "Eesti", zhName: "爱沙尼亚语", target: "Estonian", dir: "ltr" },
  { code: "kk", csvCodes: ["kk-KZ", "kk"], name: "Қазақша", zhName: "哈萨克语", target: "Kazakh", dir: "ltr" },
  { code: "fi", csvCodes: ["fi-FI", "fi"], name: "Suomi", zhName: "芬兰语", target: "Finnish", dir: "ltr" },
];

function createFigmaSizeSpec(config) {
  const isPoster = config.id === "poster-square-1200" || config.id === "ins-poster-1200x1500";
  return {
    ...config,
    defaultStyle: {
      titleSize: config.textRules.title.fontSize,
      subtitleSize: config.textRules.subtitle.fontSize,
    },
    output: {
      format: "png",
      quality: 1,
      filenamePattern: `${config.id}-{language}.png`,
    },
    assetRules: {
      background: { enabled: isPoster, required: false, fit: "cover", rtlVariant: true },
      foreground: {
        enabled: !isPoster,
        required: false,
        slot: "imageBox",
        fit: "cover",
        sourceAspectRatio: 1,
        rtlVariant: true,
        adjustable: true,
      },
    },
  };
}

const TEMPLATE_LIBRARY = {
  "figma-mcp-test": {
    id: "figma-mcp-test",
    name: "Figma MCP 测试模板",
    businessLine: "Product Line",
    version: "v0.3.2",
    status: "Draft",
    description: "从 Figma MCP 文件 Page 4 导入的 LTR 多尺寸模板，支持动态标签文案。",
    figmaSource: {
      fileKey: "p2pgCmhAUk4zdo0wkr9pfm",
      pageNodeId: "66:1376",
      pageName: "Page 4",
    },
    sizeSpecifications: {
      "announcement-banner-800x450": createFigmaSizeSpec({
        id: "announcement-banner-800x450",
        label: "Announcement banner · 800 × 450",
        width: 800,
        height: 450,
        backgroundColor: "#000000",
        titleBox: { left: 39.5, top: 103.67, width: 408.33, height: 110 },
        subtitleBox: { left: 39.5, top: 223.67, width: 408.3, height: 39 },
        titleSubtitleGap: 10,
        imageBox: { left: 476, top: 126, width: 285, height: 285 },
        tagBox: { left: 39.5, top: 39, width: 104, height: 34 },
        tagRule: {
          type: "pill",
          fontFamily: "Inter",
          fontSize: 24,
          fontWeight: 500,
          color: "#000000",
          lineHeight: 1,
          paddingX: 14,
          paddingY: 5,
          minWidth: 0,
          maxWidth: 360,
          cornerRadius: 66.67,
          gradientStart: "#bfcfed",
          gradientEnd: "#8ea5d2",
        },
        figmaNodeId: "66:1385",
        textRules: {
          title: { fontFamily: "Inter", fontSize: 50, color: "#ffffff", lineHeight: 1.1, fontWeight: 700, maxLines: 2, overflow: "optimize-or-clip" },
          subtitle: { fontFamily: "Inter", fontSize: 30, color: "#ffffff", lineHeight: 1.3, fontWeight: 500, maxLines: 2, overflow: "clip" },
        },
      }),
      "web-small-banner-288x144": createFigmaSizeSpec({
        id: "web-small-banner-288x144",
        label: "Web小banner · 288 × 144",
        width: 288,
        height: 144,
        backgroundColor: "#000000",
        titleBox: { left: 16, top: 47, width: 163, height: 44 },
        subtitleBox: { left: 16, top: 95.33, width: 163, height: 16 },
        titleSubtitleGap: 4,
        imageBox: { left: 189, top: 45, width: 83, height: 83 },
        tagBox: { left: 16, top: 16, width: 52, height: 16 },
        tagRule: {
          type: "pill",
          fontFamily: "Inter",
          fontSize: 12,
          fontWeight: 500,
          color: "#000000",
          lineHeight: 1,
          paddingX: 7,
          paddingY: 2,
          minWidth: 0,
          maxWidth: 150,
          cornerRadius: 33.33,
          gradientStart: "#bfcfed",
          gradientEnd: "#8ea5d2",
        },
        figmaNodeId: "66:1400",
        textRules: {
          title: { fontFamily: "Inter", fontSize: 20, color: "#ffffff", lineHeight: 1.1, fontWeight: 700, maxLines: 2, overflow: "optimize-or-clip" },
          subtitle: { fontFamily: "Inter", fontSize: 12, color: "#ffffff", lineHeight: 1.3, fontWeight: 500, maxLines: 2, overflow: "clip" },
        },
      }),
      "ins-poster-1200x1500": createFigmaSizeSpec({
        id: "ins-poster-1200x1500",
        label: "INS Poster · 1200 × 1500",
        width: 1200,
        height: 1500,
        backgroundColor: "#f3f4f7",
        titleBox: { left: 98, top: 223, width: 1000, height: 198 },
        subtitleBox: { left: 98, top: 447, width: 720, height: 48 },
        titleSubtitleGap: 26,
        imageBox: { left: 0, top: 0, width: 0, height: 0 },
        tagBox: { left: 990.96, top: 130, width: 109, height: 39 },
        tagRule: { type: "text", anchor: "right", fontFamily: "Inter", fontSize: 35, fontWeight: 400, color: "#000000", lineHeight: 1.1, align: "right" },
        figmaNodeId: "66:1426",
        textRules: {
          title: { fontFamily: "Inter", fontSize: 90, color: "#0057ff", lineHeight: 1.1, fontWeight: 700, maxLines: 2, overflow: "optimize-or-clip" },
          subtitle: { fontFamily: "Inter", fontSize: 40, color: "#000000", lineHeight: 1.2, fontWeight: 400, maxLines: 2, overflow: "clip" },
        },
      }),
      "search-banner-690x160": createFigmaSizeSpec({
        id: "search-banner-690x160",
        label: "搜索页banner · 690 × 160",
        width: 690,
        height: 160,
        backgroundColor: "#000000",
        titleBox: { left: 30, top: 47.25, width: 468, height: 33 },
        subtitleBox: { left: 30, top: 88, width: 468, height: 23 },
        titleSubtitleGap: 7.75,
        imageBox: { left: 540, top: 30, width: 100, height: 100 },
        figmaNodeId: "68:231",
        textRules: {
          title: { fontFamily: "Inter", fontSize: 30, color: "#ffffff", lineHeight: 1.1, fontWeight: 700, maxLines: 2, overflow: "optimize-or-clip" },
          subtitle: { fontFamily: "Inter", fontSize: 18, color: "#ffffff", lineHeight: 1.3, fontWeight: 500, maxLines: 2, overflow: "clip" },
        },
      }),
      "poster-square-1200": createFigmaSizeSpec({
        id: "poster-square-1200",
        label: "Poster · 1200 × 1200",
        width: 1200,
        height: 1200,
        backgroundColor: "#d9d9d9",
        titleBox: { left: 98, top: 223, width: 1000, height: 198 },
        subtitleBox: { left: 98, top: 447, width: 720, height: 48 },
        titleSubtitleGap: 26,
        imageBox: { left: 0, top: 0, width: 0, height: 0 },
        tagBox: { left: 991, top: 113, width: 109, height: 39 },
        tagRule: { type: "text", anchor: "right", fontFamily: "Inter", fontSize: 35, fontWeight: 400, color: "#000000", lineHeight: 1.1, align: "right" },
        figmaNodeId: "68:244",
        textRules: {
          title: { fontFamily: "Inter", fontSize: 90, color: "#0057ff", lineHeight: 1.1, fontWeight: 700, maxLines: 2, overflow: "optimize-or-clip" },
          subtitle: { fontFamily: "Inter", fontSize: 40, color: "#000000", lineHeight: 1.2, fontWeight: 400, maxLines: 2, overflow: "clip" },
        },
      }),
    },
    supportedLanguageCodes: ALL_LANGUAGES.map((language) => language.code),
    fields: [
      {
        id: "main_title",
        label: "主标题",
        required: true,
        binding: "title",
        protectedValues: ["brand", "numbers", "amounts", "dates", "currency"],
        typographyRule: "fixed-or-capped",
      },
      {
        id: "subtitle",
        label: "副标题",
        required: true,
        binding: "subtitle",
        protectedValues: ["brand", "numbers", "amounts", "dates", "currency"],
        typographyRule: "fixed-or-capped",
      },
      {
        id: "tag",
        label: "标签文案",
        required: false,
        binding: "tag",
        protectedValues: ["brand", "numbers", "amounts", "dates", "currency"],
        typographyRule: "hug-content",
      },
    ],
    assetSlots: [
      {
        id: "background",
        label: "底图",
        type: "background",
        required: false,
      },
      {
        id: "foreground",
        label: "图片内容",
        type: "foreground",
        required: false,
      },
    ],
  },
};
let LANGUAGES = [...ALL_LANGUAGES];
const IS_STANDALONE = window.location.protocol === "file:";
const MYMEMORY_LANGUAGE_CODES = {
  ar: "ar",
  de: "de",
  el: "el",
  en: "en",
  es: "es",
  et: "et",
  fa: "fa",
  fil: "tl",
  fi: "fi",
  fr: "fr",
  id: "id",
  it: "it",
  ja: "ja",
  kk: "kk",
  ms: "ms",
  nl: "nl",
  pl: "pl",
  pt: "pt",
  ru: "ru",
  sv: "sv",
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
const resourceArtboards = document.querySelector("#resourceArtboards");
const imageBox = document.querySelector("#imageBox");
const titleBox = document.querySelector("#titleBox");
const subtitleBox = document.querySelector("#subtitleBox");
const baseUpload = document.querySelector("#baseUpload");
const rtlBaseUpload = document.querySelector("#rtlBaseUpload");
const backgroundUploadStatus = document.querySelector("#backgroundUploadStatus");
const boxImageUpload = document.querySelector("#boxImageUpload");
const rtlBoxImageUpload = document.querySelector("#rtlBoxImageUpload");
const foregroundUploadStatus = document.querySelector("#foregroundUploadStatus");
const titleInput = document.querySelector("#titleInput");
const tagInput = document.querySelector("#tagInput");
const sourceCopyPresetName = document.querySelector("#sourceCopyPresetName");
const activeTemplateInput = document.querySelector("#activeTemplateInput");
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
const activeTagInput = document.querySelector("#activeTagInput");
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
const templateSelect = document.querySelector("#templateSelect");
const resourcePreset = document.querySelector("#resourcePreset");
const wizardLanguageModeInputs = Array.from(document.querySelectorAll("input[name='wizardLanguageMode']"));
const wizardManualLanguages = document.querySelector("#wizardManualLanguages");
const wizardLanguageModeHint = document.querySelector("#wizardLanguageModeHint");
const wizardLanguageList = document.querySelector("#wizardLanguageList");
const selectAllLanguages = document.querySelector("#selectAllLanguages");
const clearLanguages = document.querySelector("#clearLanguages");
const createProjectFromWizard = document.querySelector("#createProjectFromWizard");
const openTemplateManager = document.querySelector("#openTemplateManager");
const templateManager = document.querySelector("#templateManager");
const closeTemplateManager = document.querySelector("#closeTemplateManager");
const managedTemplateSelect = document.querySelector("#managedTemplateSelect");
const createTemplate = document.querySelector("#createTemplate");
const duplicateTemplate = document.querySelector("#duplicateTemplate");
const saveTemplateConfig = document.querySelector("#saveTemplateConfig");
const managedSizeList = document.querySelector("#managedSizeList");
const addSizeSpec = document.querySelector("#addSizeSpec");
const templateNameInput = document.querySelector("#templateNameInput");
const templateBusinessLineInput = document.querySelector("#templateBusinessLineInput");
const templateVersionInput = document.querySelector("#templateVersionInput");
const templateStatusInput = document.querySelector("#templateStatusInput");
const sizeIdInput = document.querySelector("#sizeIdInput");
const sizeLabelInput = document.querySelector("#sizeLabelInput");
const sizeWidthInput = document.querySelector("#sizeWidthInput");
const sizeHeightInput = document.querySelector("#sizeHeightInput");
const titleLeftInput = document.querySelector("#titleLeftInput");
const titleTopInput = document.querySelector("#titleTopInput");
const titleWidthInput = document.querySelector("#titleWidthInput");
const titleHeightInput = document.querySelector("#titleHeightInput");
const titleFontSizeInput = document.querySelector("#titleFontSizeInput");
const titleLineHeightInput = document.querySelector("#titleLineHeightInput");
const titleTextColorInput = document.querySelector("#titleTextColorInput");
const subtitleLeftInput = document.querySelector("#subtitleLeftInput");
const subtitleTopInput = document.querySelector("#subtitleTopInput");
const subtitleWidthInput = document.querySelector("#subtitleWidthInput");
const subtitleHeightInput = document.querySelector("#subtitleHeightInput");
const subtitleFontSizeInput = document.querySelector("#subtitleFontSizeInput");
const subtitleLineHeightInput = document.querySelector("#subtitleLineHeightInput");
const subtitleTextColorInput = document.querySelector("#subtitleTextColorInput");
const imageLeftInput = document.querySelector("#imageLeftInput");
const imageTopInput = document.querySelector("#imageTopInput");
const imageWidthInput = document.querySelector("#imageWidthInput");
const imageHeightInput = document.querySelector("#imageHeightInput");
const filenamePatternInput = document.querySelector("#filenamePatternInput");
const templateManagerStatus = document.querySelector("#templateManagerStatus");
const measureCanvas = document.createElement("canvas");
const measureContext = measureCanvas.getContext("2d");
let posterStage = null;
let posterLayer = null;
let wizardSelectedLanguageCodes = [];
let wizardSelectedTemplateId = DEFAULT_TEMPLATE_ID;
let wizardSelectedResourcePresetIds = [DEFAULT_RESOURCE_PRESET];
let wizardLanguageMode = "csv";
let managedTemplateId = DEFAULT_TEMPLATE_ID;
let managedSizeId = DEFAULT_RESOURCE_PRESET;
let resourcePreviewFrame = null;
let isRenderingResourcePreviews = false;
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
  templateId: DEFAULT_TEMPLATE_ID,
  templateVersion: TEMPLATE_LIBRARY[DEFAULT_TEMPLATE_ID].version,
  businessLine: TEMPLATE_LIBRARY[DEFAULT_TEMPLATE_ID].businessLine,
  resourcePreset: DEFAULT_RESOURCE_PRESET,
  resourcePresets: [DEFAULT_RESOURCE_PRESET],
  selectedLanguageCodes: ALL_LANGUAGES.map((language) => language.code),
  progressStatus: "制作中",
  baseImage: null,
  baseImageData: "",
  rtlBaseImage: null,
  rtlBaseImageData: "",
  contentImage: null,
  contentImageData: "",
  rtlContentImage: null,
  rtlContentImageData: "",
  activeLanguage: "en",
  sourceTitle: titleInput.value,
  sourceSubtitle: subtitleInput.value,
  sourceTag: tagInput.value,
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

function isSquareImage(image) {
  return image && Math.abs(image.width - image.height) <= 1;
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

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function readSavedTemplateLibrary() {
  try {
    return JSON.parse(localStorage.getItem("posterTemplateLibrary") || "{}");
  } catch {
    return {};
  }
}

function saveTemplateLibraryToStorage() {
  localStorage.setItem("posterTemplateLibrary", JSON.stringify(TEMPLATE_LIBRARY));
}

function hydrateTemplateLibrary() {
  localStorage.removeItem("posterTemplateLibrary");
}

function readNumberInput(input, fallback = 0) {
  const value = Number(input.value);
  return Number.isFinite(value) ? value : fallback;
}

function boxToCanvasRect(box) {
  const layouts = {
    image: getImageLayout(),
    title: getTitleLayout(),
    subtitle: getResolvedSubtitleLayout(),
  };
  const layout = layouts[box.dataset.box] || getImageLayout();
  return {
    x: layout.left,
    y: layout.top,
    width: layout.width,
    height: layout.height,
  };
}

function pxToPercent(value, axisSize) {
  return `${(value / axisSize) * 100}%`;
}

function getResourcePreset() {
  const specs = getTemplateSizeSpecifications();
  return specs[state.resourcePreset] || specs[DEFAULT_RESOURCE_PRESET] || RESOURCE_PRESETS[DEFAULT_RESOURCE_PRESET];
}

function getTemplate(id = state.templateId) {
  return TEMPLATE_LIBRARY[id] || TEMPLATE_LIBRARY[DEFAULT_TEMPLATE_ID];
}

function normalizeTemplateId(id) {
  return TEMPLATE_LIBRARY[id] ? id : DEFAULT_TEMPLATE_ID;
}

function getTemplateSizeSpecifications(templateId = state.templateId) {
  const template = getTemplate(templateId);
  if (template.sizeSpecifications) {
    return template.sizeSpecifications;
  }
  return Object.fromEntries(
    (template.sizeSpecIds || []).map((id) => [id, RESOURCE_PRESETS[id]]).filter(([, spec]) => Boolean(spec)),
  );
}

function getTemplateSizeSpecIds(templateId = state.templateId) {
  return Object.keys(getTemplateSizeSpecifications(templateId));
}

function getTemplateLanguageCodes(templateId = state.templateId) {
  const languageCodes = getTemplate(templateId).supportedLanguageCodes || [];
  const supported = languageCodes.filter((code) => ALL_LANGUAGES.some((language) => language.code === code));
  return supported.length ? supported : ALL_LANGUAGES.map((language) => language.code);
}

function applyTemplateMetadata() {
  const template = getTemplate();
  state.templateId = template.id;
  state.templateVersion = template.version;
  state.businessLine = template.businessLine;
  if (activeTemplateInput) {
    activeTemplateInput.value = `${template.name} · ${template.version}`;
  }
}

function normalizeResourcePresetId(id) {
  const allowedIds = getTemplateSizeSpecIds();
  return allowedIds.includes(id) ? id : allowedIds[0] || DEFAULT_RESOURCE_PRESET;
}

function normalizeResourcePresetIds(ids, templateId = state.templateId) {
  const allowedIds = getTemplateSizeSpecIds(templateId);
  const presetIds = Array.isArray(ids) ? ids : [ids];
  const normalized = presetIds
    .map((id) => allowedIds.includes(id) ? id : "")
    .filter(Boolean);
  const uniqueIds = [...new Set(normalized)];
  return uniqueIds.length ? uniqueIds : [allowedIds[0] || DEFAULT_RESOURCE_PRESET];
}

function getSizeSpecTextRule(field, fallback = {}) {
  const preset = getResourcePreset();
  return {
    ...(fallback || {}),
    ...(preset.textRules?.[field] || {}),
  };
}

function getSizeSpecAssetRules(presetId = state.resourcePreset) {
  const preset = getTemplateSizeSpecifications()[presetId] || getResourcePreset();
  const isPosterBackground = presetId === "poster-square-1200" || presetId === "ins-poster-1200x1500";
  return {
    background: {
      required: false,
      fit: "cover",
      rtlVariant: true,
      ...(preset.assetRules?.background || {}),
      enabled: isPosterBackground,
      rtlVariant: true,
    },
    foreground: {
      required: false,
      slot: "imageBox",
      fit: "cover",
      sourceAspectRatio: 1,
      rtlVariant: true,
      adjustable: true,
      ...(preset.assetRules?.foreground || {}),
      enabled: !isPosterBackground,
      sourceAspectRatio: 1,
      rtlVariant: true,
    },
  };
}

function syncResourcePresetScope() {
  state.resourcePresets = normalizeResourcePresetIds(
    state.resourcePresets?.length ? state.resourcePresets : state.resourcePreset,
  );
  if (!state.resourcePresets.includes(state.resourcePreset)) {
    state.resourcePreset = state.resourcePresets[0];
  }
}

function getSelectedResourcePresetIdsFromWizard() {
  const selectedIds = Array.from(
    resourcePreset.querySelectorAll("input[type='checkbox']:checked"),
  ).map((input) => input.value);
  return normalizeResourcePresetIds(selectedIds, wizardSelectedTemplateId);
}

function getTitleLayout() {
  return getResourcePreset().titleBox;
}

function getSubtitleLayout() {
  return getResourcePreset().subtitleBox;
}

function getImageLayout() {
  return getResourcePreset().imageBox;
}

function applyResourcePresetToStage() {
  syncResourcePresetScope();
  const preset = getResourcePreset();
  stage.style.aspectRatio = `${preset.width} / ${preset.height}`;
  stage.dataset.resourcePreset = state.resourcePreset;
  stage.dataset.resourceLabel = preset.label;

  if (!posterStage) {
    return;
  }
  posterStage.width(preset.width);
  posterStage.height(preset.height);
  posterStage.batchDraw();
}

function getLanguage(code) {
  return LANGUAGES.find((language) => language.code === code) || LANGUAGES[0];
}

function getLanguageDisplayName(language) {
  return language.zhName && language.zhName !== language.name
    ? `${language.zhName} ${language.name}`
    : language.name;
}

function syncLanguageScope() {
  const selectedCodes = state.selectedLanguageCodes.length
    ? state.selectedLanguageCodes
    : ["en"];
  LANGUAGES = selectedCodes
    .map((code) => ALL_LANGUAGES.find((language) => language.code === code))
    .filter(Boolean);
  if (!LANGUAGES.length) {
    LANGUAGES = [ALL_LANGUAGES[0]];
    state.selectedLanguageCodes = ["en"];
  }
  if (!LANGUAGES.some((language) => language.code === state.activeLanguage)) {
    state.activeLanguage = LANGUAGES[0].code;
  }
}

function getSelectedLanguageCodesFromWizard() {
  if (wizardLanguageMode === "csv") {
    return ["en"];
  }
  const selectedCodes = Array.from(
    wizardLanguageList.querySelectorAll("input[type='checkbox']:checked"),
  ).map((input) => input.value);
  return selectedCodes.includes("en") ? selectedCodes : ["en", ...selectedCodes];
}

function getActiveVariant() {
  return getVariantForLanguage(state.activeLanguage);
}

function getFallbackVariant(code) {
  return {
    title: state.sourceTitle,
    subtitle: state.sourceSubtitle,
    tag: state.sourceTag,
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

function getSizeCopy(variant, presetId = state.resourcePreset) {
  return variant.sizeCopies?.[presetId] || {};
}

function getVariantForRender(code = state.activeLanguage, presetId = state.resourcePreset) {
  const variant = getVariantForLanguage(code);
  return {
    ...variant,
    ...getSizeCopy(variant, presetId),
  };
}

function ensureSizeCopyForLanguage(code, presetId = state.resourcePreset) {
  const variant = ensureVariantForLanguage(code);
  if (!variant.sizeCopies) {
    variant.sizeCopies = {};
  }
  if (!variant.sizeCopies[presetId]) {
    variant.sizeCopies[presetId] = {};
  }
  return variant.sizeCopies[presetId];
}

function getActivePresetLabel() {
  return getResourcePreset().label || state.resourcePreset;
}

function syncEnglishVariant() {
  state.variants.en = {
    ...(state.variants.en || {}),
    title: state.sourceTitle,
    subtitle: state.sourceSubtitle,
    tag: state.sourceTag,
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
    applyResourcePresetToStage();
    return;
  }

  if (!window.Konva) {
    throw new Error("Konva.js 未加载，请确认 vendor/konva.min.js 存在。");
  }

  const preset = getResourcePreset();
  posterStage = new Konva.Stage({
    container: konvaContainer,
    width: preset.width,
    height: preset.height,
  });
  posterLayer = new Konva.Layer();
  posterStage.add(posterLayer);
  applyResourcePresetToStage();
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
  const preset = getResourcePreset();
  const assetRules = getSizeSpecAssetRules();
  const group = new Konva.Group();
  const backgroundRectConfig = {
    x: 0,
    y: 0,
    width: preset.width,
    height: preset.height,
  };
  if (preset.backgroundColor) {
    backgroundRectConfig.fill = preset.backgroundColor;
  } else {
    backgroundRectConfig.fillLinearGradientStartPoint = { x: 0, y: 0 };
    backgroundRectConfig.fillLinearGradientEndPoint = { x: preset.width, y: preset.height };
    backgroundRectConfig.fillLinearGradientColorStops = [
      0,
      "#f7f9fb",
      0.48,
      "#ffffff",
      1,
      "#dfe7eb",
    ];
  }
  group.add(new Konva.Rect(backgroundRectConfig));
  group.add(new Konva.Text({
    x: 0,
    y: preset.height * 0.1 - 20,
    width: preset.width,
    height: 44,
    text: assetRules.background.enabled
      ? `上传 ${preset.label} 底图`
      : `${preset.label} · 前景图尺寸由模板控制`,
    fill: "rgba(16,24,32,0.35)",
    fontFamily: "system-ui, sans-serif",
    fontSize: Math.max(12, Math.min(34, preset.width * 0.04)),
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
  const lines = getWrappedLines(text, options, getTitleLayout().width);
  return Math.max(options.size * options.lineHeight, lines.length * options.size * options.lineHeight);
}

function getVisibleTextLineCount(text, options, layout) {
  const lineHeight = options.size * options.lineHeight;
  const wrappedLineCount = getWrappedLines(text, options, layout.width).length;
  const visibleLineCapacity = Math.max(1, Math.floor((layout.height + 2) / lineHeight));
  return Math.min(wrappedLineCount, visibleLineCapacity);
}

function getTitleSubtitleGap() {
  const preset = getResourcePreset();
  return TITLE_SUBTITLE_GAP_BY_PRESET[state.resourcePreset]
    ?? preset.titleSubtitleGap
    ?? DEFAULT_TITLE_SUBTITLE_GAP;
}

function getResolvedSubtitleLayout(title = getVariantForRender()?.title || "") {
  const titleLayout = getTitleLayout();
  const subtitleLayout = getSubtitleLayout();
  const titleOptions = getTitleOptions();
  const visibleTitleLines = getVisibleTextLineCount(title, titleOptions, titleLayout);
  const titleTextHeight = visibleTitleLines * titleOptions.size * titleOptions.lineHeight;
  return {
    ...subtitleLayout,
    top: titleLayout.top + titleTextHeight + getTitleSubtitleGap(),
  };
}

function getTitleLineCount(title) {
  return getWrappedLines(title, getTitleOptions(), getTitleLayout().width).length;
}

function enforceTwoLineTitle(title) {
  const lines = getWrappedLines(title, getTitleOptions(), getTitleLayout().width);

  if (lines.length <= 2) {
    return title;
  }

  const secondLine = lines[1];
  let fittedSecondLine = secondLine;
  const ellipsis = "...";
  while (
    fittedSecondLine.length > 0 &&
    getWrappedLines(`${lines[0]}\n${fittedSecondLine}${ellipsis}`, getTitleOptions(), getTitleLayout().width)
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

function applyFixedTextLayout(title = getVariantForRender()?.title || "") {
  setBoxLayoutPx(titleBox, getTitleLayout());
  setBoxLayoutPx(subtitleBox, getResolvedSubtitleLayout(title));
}

function getTitleOptions() {
  const titleRule = getSizeSpecTextRule("title", {
    fontFamily: "Inter",
    fontSize: 90,
    lineHeight: 1.1,
    fontWeight: 900,
  });
  return {
    color: titleRule.color || "#0055ff",
    font: titleRule.fontFamily,
    lineHeight: titleRule.lineHeight,
    size: titleRule.fontSize,
    weight: titleRule.fontWeight,
  };
}

function getSubtitleOptions() {
  const subtitleRule = getSizeSpecTextRule("subtitle", {
    fontFamily: "Inter",
    fontSize: 40,
    lineHeight: 1.2,
    fontWeight: 500,
  });
  return {
    color: subtitleRule.color || "#000000",
    font: subtitleRule.fontFamily,
    lineHeight: subtitleRule.lineHeight,
    size: subtitleRule.fontSize,
    weight: subtitleRule.fontWeight,
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

function addTagLayer(text, direction) {
  const preset = getResourcePreset();
  const tagBox = preset.tagBox;
  const rule = preset.tagRule;
  const textValue = String(text || "").trim();
  if (!tagBox || !rule || !textValue) {
    return;
  }

  const fontFamily = rule.fontFamily || "Inter";
  const fontSize = rule.fontSize || 16;
  const fontWeight = rule.fontWeight || 500;
  const lineHeight = rule.lineHeight || 1;
  measureContext.font = `${fontWeight} ${fontSize}px ${fontFamily}`;

  if (rule.type === "pill") {
    const paddingX = rule.paddingX || 0;
    const paddingY = rule.paddingY || 0;
    const measuredWidth = measureContext.measureText(textValue).width + paddingX * 2;
    const width = clamp(measuredWidth, rule.minWidth || 0, rule.maxWidth || preset.width - tagBox.left);
    const height = Math.max(tagBox.height, fontSize * lineHeight + paddingY * 2);
    const group = new Konva.Group({ x: tagBox.left, y: tagBox.top });
    group.add(new Konva.Rect({
      x: 0,
      y: 0,
      width,
      height,
      cornerRadius: Math.min(rule.cornerRadius || height / 2, height / 2),
      fillLinearGradientStartPoint: { x: 0, y: 0 },
      fillLinearGradientEndPoint: { x: width, y: 0 },
      fillLinearGradientColorStops: [0, rule.gradientStart || "#bfcfed", 1, rule.gradientEnd || "#8ea5d2"],
    }));
    group.add(new Konva.Text({
      x: paddingX,
      y: paddingY,
      width: Math.max(0, width - paddingX * 2),
      height: Math.max(0, height - paddingY * 2),
      text: textValue,
      fill: rule.color || "#000000",
      fontFamily,
      fontSize,
      fontStyle: fontWeight >= 700 ? "bold" : "normal",
      lineHeight,
      align: direction === "rtl" ? "right" : "left",
      verticalAlign: "middle",
      wrap: "none",
      ellipsis: true,
    }));
    posterLayer.add(group);
    return;
  }

  const measuredWidth = Math.ceil(measureContext.measureText(textValue).width);
  const rightEdge = tagBox.left + tagBox.width;
  const width = clamp(
    Math.max(tagBox.width, measuredWidth),
    tagBox.width,
    rule.maxWidth || rightEdge,
  );
  const x = rule.anchor === "right" ? Math.max(0, rightEdge - width) : tagBox.left;

  posterLayer.add(new Konva.Text({
    x,
    y: tagBox.top,
    width,
    height: tagBox.height,
    text: textValue,
    fill: rule.color || "#000000",
    fontFamily,
    fontSize,
    fontStyle: fontWeight >= 700 ? "bold" : "normal",
    lineHeight,
    align: rule.align || (direction === "rtl" ? "left" : "right"),
    verticalAlign: "top",
    wrap: "none",
  }));
}

function addImageBoxLayer() {
  const assetRules = getSizeSpecAssetRules();
  if (!assetRules.foreground.enabled) {
    return;
  }

  const language = getLanguage(state.activeLanguage);
  const foregroundImage = language.dir === "rtl" && state.rtlContentImage
    ? state.rtlContentImage
    : state.contentImage;
  if (!foregroundImage) {
    return;
  }
  const rect = boxToCanvasRect(imageBox);
  posterLayer.add(createCoverImageNode(foregroundImage, rect.x, rect.y, rect.width, rect.height));
}

function render() {
  initKonvaStage();
  const variant = getVariantForRender();
  const language = getLanguage(state.activeLanguage);
  const preset = getResourcePreset();
  const assetRules = getSizeSpecAssetRules();
  applyFixedTextLayout(variant.title);
  posterLayer.destroyChildren();

  const backgroundImage = language.dir === "rtl" && state.rtlBaseImage
    ? state.rtlBaseImage
    : state.baseImage;
  if (assetRules.background.enabled && backgroundImage) {
    posterLayer.add(createCoverImageNode(backgroundImage, 0, 0, preset.width, preset.height));
  } else {
    posterLayer.add(createPlaceholderNode());
  }

  addImageBoxLayer();
  addTagLayer(variant.tag, language.dir);
  addTextLayer(titleBox, variant.title, { ...getTitleOptions(), direction: language.dir });
  addTextLayer(subtitleBox, variant.subtitle, { ...getSubtitleOptions(), direction: language.dir });
  posterLayer.batchDraw();
  if (!isRenderingResourcePreviews) {
    queueResourceArtboardsRefresh();
  }
}

function getPosterDataUrl() {
  render();
  return posterStage.toDataURL({
    mimeType: "image/png",
    pixelRatio: 1,
  });
}

function queueResourceArtboardsRefresh() {
  if (!resourceArtboards || resourcePreviewFrame) {
    return;
  }

  resourcePreviewFrame = window.requestAnimationFrame(refreshResourceArtboards);
}

function getBoxInlineStyle(box) {
  return {
    left: box.style.left,
    top: box.style.top,
    width: box.style.width,
    height: box.style.height,
  };
}

function restoreBoxInlineStyle(box, style) {
  box.style.left = style.left;
  box.style.top = style.top;
  box.style.width = style.width;
  box.style.height = style.height;
}

function refreshResourceArtboards() {
  resourcePreviewFrame = null;
  syncResourcePresetScope();
  const previewIds = [...state.resourcePresets];
  if (!previewIds.length) {
    resourceArtboards.innerHTML = "";
    return;
  }

  const activePresetId = state.resourcePreset;
  const cards = [];

  isRenderingResourcePreviews = true;
  previewIds.forEach((id) => {
    state.resourcePreset = id;
    render();
    const preset = getResourcePreset();
    cards.push({
      id,
      label: preset.label,
      dataUrl: posterStage.toDataURL({ mimeType: "image/png", pixelRatio: 1 }),
    });
  });

  state.resourcePreset = activePresetId;
  render();
  isRenderingResourcePreviews = false;

  resourceArtboards.innerHTML = cards.map((card) => `
    <article class="resource-artboard-card${card.id === state.resourcePreset ? " active" : ""}" data-preset="${card.id}">
      <span>${escapeHtml(card.label)}</span>
      <img src="${card.dataUrl}" alt="${escapeHtml(card.label)} 预览" />
    </article>
  `).join("");
}

function selectResourcePresetForEditing(presetId) {
  if (!state.resourcePresets.includes(presetId)) {
    return;
  }
  state.resourcePreset = presetId;
  applyResourcePresetToStage();
  renderSourceCopyEditor();
  renderActiveLanguageEditor();
  render();
}

function setBoxLayout(box, layout) {
  box.style.left = `${layout.left}%`;
  box.style.top = `${layout.top}%`;
  box.style.width = `${layout.width}%`;
  box.style.height = `${layout.height}%`;
}

function setBoxLayoutPx(box, layout) {
  const preset = getResourcePreset();
  box.style.left = pxToPercent(layout.left, preset.width);
  box.style.top = pxToPercent(layout.top, preset.height);
  box.style.width = pxToPercent(layout.width, preset.width);
  box.style.height = pxToPercent(layout.height, preset.height);
}

function resetBoxes() {
  setBoxLayoutPx(imageBox, getImageLayout());
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
  const stageWidth = Math.max(resourceArtboards.offsetWidth, canvasWorld.scrollWidth || 0);
  const stageHeight = Math.max(resourceArtboards.offsetHeight, canvasWorld.scrollHeight || 0);
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
      `<option value="${language.code}">${getLanguageDisplayName(language)}</option>`,
  ).join("");
  languageSelect.value = state.activeLanguage;
}

function fillTemplateSelect() {
  const templateIds = Object.keys(TEMPLATE_LIBRARY);
  templateSelect.innerHTML = templateIds.map((id) => {
    const template = TEMPLATE_LIBRARY[id];
    const selected = id === wizardSelectedTemplateId ? " selected" : "";
    return `<option value="${id}"${selected}>${template.name} · ${template.version}</option>`;
  }).join("");
}

function fillResourcePresetSelect() {
  const templateId = wizardSelectedTemplateId || state.templateId;
  const sizeSpecifications = getTemplateSizeSpecifications(templateId);
  const allowedIds = getTemplateSizeSpecIds(templateId);
  const selectedIds = wizardSelectedResourcePresetIds.length
    ? wizardSelectedResourcePresetIds
    : normalizeResourcePresetIds(state.resourcePresets, templateId);
  wizardSelectedResourcePresetIds = normalizeResourcePresetIds(selectedIds, templateId);
  resourcePreset.innerHTML = allowedIds.map((id) => {
    const preset = sizeSpecifications[id];
    const checked = wizardSelectedResourcePresetIds.includes(id) ? " checked" : "";
    return `
      <label class="wizard-resource-option">
        <input type="checkbox" value="${id}"${checked} />
        <span>${preset.label}</span>
      </label>
    `;
  }).join("");
}

function renderWizardLanguageList() {
  renderWizardLanguageMode();
  const supportedLanguageCodes = getTemplateLanguageCodes(wizardSelectedTemplateId);
  wizardSelectedLanguageCodes = wizardSelectedLanguageCodes
    .filter((code) => supportedLanguageCodes.includes(code));
  if (!wizardSelectedLanguageCodes.includes("en")) {
    wizardSelectedLanguageCodes.unshift("en");
  }
  wizardLanguageList.innerHTML = ALL_LANGUAGES
    .filter((language) => supportedLanguageCodes.includes(language.code))
    .map((language) => {
    const checked = wizardSelectedLanguageCodes.includes(language.code) ? " checked" : "";
    const disabled = language.code === "en" ? " disabled" : "";
    return `
      <label class="wizard-language-option">
        <input type="checkbox" value="${language.code}"${checked}${disabled} />
        <span>${getLanguageDisplayName(language)}</span>
      </label>
    `;
  }).join("");
}

function renderWizardLanguageMode() {
  wizardLanguageModeInputs.forEach((input) => {
    input.checked = input.value === wizardLanguageMode;
  });
  if (wizardManualLanguages) {
    wizardManualLanguages.hidden = wizardLanguageMode !== "manual";
  }
  if (wizardLanguageModeHint) {
    wizardLanguageModeHint.textContent = wizardLanguageMode === "csv"
      ? "进入操作页面后上传 CSV，系统会按表头自动生成语言图层。"
      : "手动选择当前项目需要生成的语言，后续也可以再导入 CSV 覆盖语言图层。";
  }
}

function fillManagedTemplateSelect() {
  managedTemplateSelect.innerHTML = Object.values(TEMPLATE_LIBRARY).map((template) => {
    const selected = template.id === managedTemplateId ? " selected" : "";
    return `<option value="${template.id}"${selected}>${template.name} · ${template.version}</option>`;
  }).join("");
}

function renderManagedSizeList() {
  const sizeSpecs = getTemplateSizeSpecifications(managedTemplateId);
  const sizeIds = Object.keys(sizeSpecs);
  if (!sizeIds.includes(managedSizeId)) {
    managedSizeId = sizeIds[0] || "";
  }
  managedSizeList.innerHTML = sizeIds.map((id) => {
    const spec = sizeSpecs[id];
    const activeClass = id === managedSizeId ? " active" : "";
    return `
      <button class="managed-size-card${activeClass}" type="button" data-size-id="${id}">
        <span>${escapeHtml(spec.label || id)}</span>
        <small>${spec.width} × ${spec.height}</small>
      </button>
    `;
  }).join("");
}

function fillTemplateManagerForm() {
  const template = getTemplate(managedTemplateId);
  const sizeSpecs = getTemplateSizeSpecifications(managedTemplateId);
  const sizeSpec = sizeSpecs[managedSizeId] || sizeSpecs[Object.keys(sizeSpecs)[0]];

  templateNameInput.value = template.name || "";
  templateBusinessLineInput.value = template.businessLine || "Product Line";
  templateVersionInput.value = template.version || "v1.0.0";
  templateStatusInput.value = template.status || "Draft";

  if (!sizeSpec) {
    return;
  }

  sizeIdInput.value = sizeSpec.id || managedSizeId;
  sizeLabelInput.value = sizeSpec.label || "";
  sizeWidthInput.value = sizeSpec.width || 0;
  sizeHeightInput.value = sizeSpec.height || 0;
  titleLeftInput.value = sizeSpec.titleBox?.left || 0;
  titleTopInput.value = sizeSpec.titleBox?.top || 0;
  titleWidthInput.value = sizeSpec.titleBox?.width || 0;
  titleHeightInput.value = sizeSpec.titleBox?.height || 0;
  titleFontSizeInput.value = sizeSpec.textRules?.title?.fontSize || sizeSpec.defaultStyle?.titleSize || 0;
  titleLineHeightInput.value = sizeSpec.textRules?.title?.lineHeight || 1.1;
  titleTextColorInput.value = sizeSpec.textRules?.title?.color || "#0055ff";
  subtitleLeftInput.value = sizeSpec.subtitleBox?.left || 0;
  subtitleTopInput.value = sizeSpec.subtitleBox?.top || 0;
  subtitleWidthInput.value = sizeSpec.subtitleBox?.width || 0;
  subtitleHeightInput.value = sizeSpec.subtitleBox?.height || 0;
  subtitleFontSizeInput.value = sizeSpec.textRules?.subtitle?.fontSize || sizeSpec.defaultStyle?.subtitleSize || 0;
  subtitleLineHeightInput.value = sizeSpec.textRules?.subtitle?.lineHeight || 1.2;
  subtitleTextColorInput.value = sizeSpec.textRules?.subtitle?.color || "#000000";
  imageLeftInput.value = sizeSpec.imageBox?.left || 0;
  imageTopInput.value = sizeSpec.imageBox?.top || 0;
  imageWidthInput.value = sizeSpec.imageBox?.width || 0;
  imageHeightInput.value = sizeSpec.imageBox?.height || 0;
  filenamePatternInput.value = sizeSpec.output?.filenamePattern || `${managedSizeId}-{language}.png`;
}

function renderTemplateManager() {
  fillManagedTemplateSelect();
  renderManagedSizeList();
  fillTemplateManagerForm();
}

function openTemplateManagerPanel() {
  managedTemplateId = state.templateId;
  managedSizeId = state.resourcePreset;
  renderTemplateManager();
  templateManager.hidden = false;
  templateNameInput.focus();
}

function closeTemplateManagerPanel() {
  templateManager.hidden = true;
}

function createBlankTemplate() {
  const nextId = `custom-template-${Date.now().toString(36)}`;
  const defaultSpec = deepClone(RESOURCE_PRESETS[DEFAULT_RESOURCE_PRESET]);
  defaultSpec.id = DEFAULT_RESOURCE_PRESET;
  defaultSpec.output = {
    format: "png",
    quality: 1,
    filenamePattern: `${DEFAULT_RESOURCE_PRESET}-{language}.png`,
  };
  defaultSpec.textRules = {
    title: {
      fontFamily: "Inter",
      fontSize: defaultSpec.defaultStyle.titleSize,
      color: "#0055ff",
      lineHeight: 1.1,
      fontWeight: 900,
      maxLines: 2,
      overflow: "optimize-or-clip",
    },
    subtitle: {
      fontFamily: "Inter",
      fontSize: defaultSpec.defaultStyle.subtitleSize,
      color: "#000000",
      lineHeight: 1.2,
      fontWeight: 500,
      maxLines: 2,
      overflow: "clip",
    },
  };
  defaultSpec.assetRules = {
    background: { enabled: true, required: false, fit: "cover", rtlVariant: true },
    foreground: {
      enabled: false,
      required: false,
      slot: "imageBox",
      fit: "cover",
      sourceAspectRatio: 1,
      rtlVariant: true,
      adjustable: true,
    },
  };

  TEMPLATE_LIBRARY[nextId] = {
    id: nextId,
    name: "新建模板",
    businessLine: "Product Line",
    version: "v1.0.0-draft",
    status: "Draft",
    description: "通过模板管理页创建的自定义模板。",
    sizeSpecifications: {
      [DEFAULT_RESOURCE_PRESET]: defaultSpec,
    },
    supportedLanguageCodes: ALL_LANGUAGES.map((language) => language.code),
    fields: deepClone(getTemplate(DEFAULT_TEMPLATE_ID).fields),
    assetSlots: deepClone(getTemplate(DEFAULT_TEMPLATE_ID).assetSlots),
  };

  managedTemplateId = nextId;
  managedSizeId = DEFAULT_RESOURCE_PRESET;
  saveTemplateLibraryToStorage();
  renderTemplateManager();
  templateManagerStatus.textContent = "已新增模板草稿，请编辑模板信息和尺寸规范后保存。";
}

function buildSizeSpecFromTemplateForm(previousSpec = {}) {
  const nextId = sizeIdInput.value.trim() || managedSizeId;
  const titleFontSizeValue = readNumberInput(titleFontSizeInput, previousSpec.textRules?.title?.fontSize || 90);
  const subtitleFontSizeValue = readNumberInput(subtitleFontSizeInput, previousSpec.textRules?.subtitle?.fontSize || 40);
  return {
    ...previousSpec,
    id: nextId,
    label: sizeLabelInput.value.trim() || nextId,
    width: readNumberInput(sizeWidthInput, previousSpec.width || 1200),
    height: readNumberInput(sizeHeightInput, previousSpec.height || 1200),
    titleBox: {
      left: readNumberInput(titleLeftInput, previousSpec.titleBox?.left || 0),
      top: readNumberInput(titleTopInput, previousSpec.titleBox?.top || 0),
      width: readNumberInput(titleWidthInput, previousSpec.titleBox?.width || 100),
      height: readNumberInput(titleHeightInput, previousSpec.titleBox?.height || 40),
    },
    subtitleBox: {
      left: readNumberInput(subtitleLeftInput, previousSpec.subtitleBox?.left || 0),
      top: readNumberInput(subtitleTopInput, previousSpec.subtitleBox?.top || 0),
      width: readNumberInput(subtitleWidthInput, previousSpec.subtitleBox?.width || 100),
      height: readNumberInput(subtitleHeightInput, previousSpec.subtitleBox?.height || 30),
    },
    imageBox: {
      left: readNumberInput(imageLeftInput, previousSpec.imageBox?.left || 0),
      top: readNumberInput(imageTopInput, previousSpec.imageBox?.top || 0),
      width: readNumberInput(imageWidthInput, previousSpec.imageBox?.width || 100),
      height: readNumberInput(imageHeightInput, previousSpec.imageBox?.height || 100),
    },
    defaultStyle: {
      titleSize: titleFontSizeValue,
      subtitleSize: subtitleFontSizeValue,
    },
    textRules: {
      ...(previousSpec.textRules || {}),
      title: {
        fontFamily: previousSpec.textRules?.title?.fontFamily || "Inter",
        fontSize: titleFontSizeValue,
        color: titleTextColorInput.value || previousSpec.textRules?.title?.color || "#0055ff",
        lineHeight: readNumberInput(titleLineHeightInput, previousSpec.textRules?.title?.lineHeight || 1.1),
        fontWeight: previousSpec.textRules?.title?.fontWeight || 900,
        maxLines: previousSpec.textRules?.title?.maxLines || 2,
        overflow: previousSpec.textRules?.title?.overflow || "optimize-or-clip",
      },
      subtitle: {
        fontFamily: previousSpec.textRules?.subtitle?.fontFamily || "Inter",
        fontSize: subtitleFontSizeValue,
        color: subtitleTextColorInput.value || previousSpec.textRules?.subtitle?.color || "#000000",
        lineHeight: readNumberInput(subtitleLineHeightInput, previousSpec.textRules?.subtitle?.lineHeight || 1.2),
        fontWeight: previousSpec.textRules?.subtitle?.fontWeight || 500,
        maxLines: previousSpec.textRules?.subtitle?.maxLines || 2,
        overflow: previousSpec.textRules?.subtitle?.overflow || "clip",
      },
    },
    output: {
      ...(previousSpec.output || {}),
      format: previousSpec.output?.format || "png",
      quality: previousSpec.output?.quality || 1,
      filenamePattern: filenamePatternInput.value.trim() || `${nextId}-{language}.png`,
    },
  };
}

function saveManagedTemplate() {
  const template = getTemplate(managedTemplateId);
  const sizeSpecs = { ...getTemplateSizeSpecifications(managedTemplateId) };
  const previousSpec = sizeSpecs[managedSizeId] || RESOURCE_PRESETS[DEFAULT_RESOURCE_PRESET];
  const nextSpec = buildSizeSpecFromTemplateForm(previousSpec);
  if (nextSpec.id !== managedSizeId) {
    delete sizeSpecs[managedSizeId];
  }
  sizeSpecs[nextSpec.id] = nextSpec;

  TEMPLATE_LIBRARY[managedTemplateId] = {
    ...template,
    name: templateNameInput.value.trim() || template.name,
    businessLine: templateBusinessLineInput.value,
    version: templateVersionInput.value.trim() || template.version,
    status: templateStatusInput.value,
    sizeSpecifications: sizeSpecs,
  };
  managedSizeId = nextSpec.id;
  saveTemplateLibraryToStorage();

  if (state.templateId === managedTemplateId) {
    applyTemplateMetadata();
    syncResourcePresetScope();
    if (!state.resourcePresets.includes(state.resourcePreset)) {
      state.resourcePreset = state.resourcePresets[0];
    }
    resetBoxes();
    clearPreviewImages();
    render();
  }

  wizardSelectedTemplateId = state.templateId;
  fillTemplateSelect();
  fillResourcePresetSelect();
  renderTemplateManager();
  templateManagerStatus.textContent = "模板规范已保存，并已应用到当前浏览器。";
}

function duplicateManagedTemplate() {
  const source = deepClone(getTemplate(managedTemplateId));
  const nextId = `${source.id}-copy-${Date.now().toString(36)}`;
  source.id = nextId;
  source.name = `${source.name} 副本`;
  source.status = "Draft";
  source.version = "v1.0.0-draft";
  TEMPLATE_LIBRARY[nextId] = source;
  managedTemplateId = nextId;
  managedSizeId = Object.keys(getTemplateSizeSpecifications(nextId))[0] || "";
  saveTemplateLibraryToStorage();
  renderTemplateManager();
  templateManagerStatus.textContent = "已复制为新模板草稿。";
}

function addManagedSizeSpec() {
  const template = getTemplate(managedTemplateId);
  const sizeSpecs = { ...getTemplateSizeSpecifications(managedTemplateId) };
  const sourceSpec = deepClone(sizeSpecs[managedSizeId] || RESOURCE_PRESETS[DEFAULT_RESOURCE_PRESET]);
  const customSizeNumber = Object.values(sizeSpecs)
    .filter((spec) => String(spec.label || "").startsWith("自定义尺寸"))
    .length + 1;
  const nextId = `custom-size-${Date.now().toString(36)}`;
  sourceSpec.id = nextId;
  sourceSpec.label = `自定义尺寸 ${customSizeNumber} · ${sourceSpec.width} × ${sourceSpec.height}`;
  sourceSpec.output = {
    ...(sourceSpec.output || {}),
    filenamePattern: `${nextId}-{language}.png`,
  };
  sizeSpecs[nextId] = sourceSpec;
  TEMPLATE_LIBRARY[managedTemplateId] = {
    ...template,
    sizeSpecifications: sizeSpecs,
  };
  managedSizeId = nextId;
  saveTemplateLibraryToStorage();
  renderTemplateManager();
  templateManagerStatus.textContent = "已新增尺寸规范，请调整参数后保存。";
}

function openProjectWizard() {
  wizardProjectName.value = state.projectName || "MEXC 海报项目";
  syncResourcePresetScope();
  wizardSelectedTemplateId = state.templateId;
  wizardSelectedResourcePresetIds = [...state.resourcePresets];
  wizardSelectedLanguageCodes = [...state.selectedLanguageCodes];
  wizardLanguageMode = "csv";
  fillTemplateSelect();
  fillResourcePresetSelect();
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
        <span class="language-name">${getLanguageDisplayName(language)}</span>
      </button>
    `;
  }).join("");
  renderSourceCopyEditor();
  renderActiveLanguageEditor();
}

function renderSourceCopyEditor() {
  const englishVariant = getVariantForRender("en");
  if (sourceCopyPresetName) {
    sourceCopyPresetName.textContent = getActivePresetLabel();
  }
  titleInput.value = englishVariant.title || "";
  subtitleInput.value = englishVariant.subtitle || "";
  tagInput.value = englishVariant.tag || "";
}

function renderActiveLanguageEditor() {
  const language = getLanguage(state.activeLanguage);
  const variant = getVariantForRender(language.code);
  activeLanguageName.textContent = `${getLanguageDisplayName(language)} · ${getActivePresetLabel()}`;
  activeTitleInput.value = variant.title || "";
  activeSubtitleInput.value = variant.subtitle || "";
  activeTagInput.value = variant.tag || "";
  activeReviewStatus.value = variant.reviewStatus || "待检查";
  activeNoteInput.value = variant.note || "";
}

function renderPosterPreviewGrid() {
  posterPreviewGrid.innerHTML = LANGUAGES.map((language) => {
    const preview = state.previewImages[language.code];
    const activeClass = language.code === state.activeLanguage ? " active" : "";
    const previewMarkup = preview
      ? `<img src="${preview}" alt="${getLanguageDisplayName(language)} 海报预览" />`
      : `<div class="poster-preview-empty">待预览</div>`;

    return `
      <button class="poster-preview-card${activeClass}" type="button" data-code="${language.code}">
        ${previewMarkup}
        <span class="poster-preview-name">${getLanguageDisplayName(language)}</span>
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
  return ALL_LANGUAGES.find((language) => {
    const aliases = [
      language.code,
      language.name,
      language.zhName,
      getLanguageDisplayName(language),
      ...(language.csvCodes || []),
    ].filter(Boolean);
    return aliases.some((code) => code.toLowerCase() === normalizedCode);
  });
}

function applyCsvRows(rows) {
  const headerRow = rows[0] || [];
  const titleRow = rows.find((row) => normalizeCell(row[0]).toLowerCase() === "header");
  const subtitleRow = rows.find((row) => normalizeCell(row[0]).toLowerCase() === "subhead");
  const tagRow = rows.find((row) => normalizeCell(row[0]).toLowerCase() === "tag");

  if (!titleRow || !subtitleRow) {
    throw new Error("CSV 需要包含 Header 和 Subhead 两行");
  }

  let importedCount = 0;
  const importedLanguageCodes = [];

  headerRow.forEach((rawCode, columnIndex) => {
    const csvCode = normalizeCell(rawCode);
    if (!csvCode) {
      return;
    }

    const language = getCsvLanguage(csvCode);
    const title = normalizeCell(titleRow[columnIndex]);
    const subtitle = normalizeCell(subtitleRow[columnIndex]);
    const tag = normalizeCell(tagRow?.[columnIndex]);

    if (!language || (!title && !subtitle && !tag)) {
      return;
    }

    state.variants[language.code] = {
      ...(state.variants[language.code] || {}),
      title: title || state.variants[language.code]?.title || "",
      subtitle: subtitle || state.variants[language.code]?.subtitle || "",
      tag: tag || state.variants[language.code]?.tag || state.sourceTag,
      reviewStatus: "待检查",
      note: "",
      status: "CSV导入",
    };
    if (!importedLanguageCodes.includes(language.code)) {
      importedLanguageCodes.push(language.code);
    }
    importedCount += 1;
  });

  if (!importedLanguageCodes.length) {
    throw new Error("CSV 没有识别到可导入的语言列，请检查表头语言代码或语言名称。");
  }

  state.selectedLanguageCodes = importedLanguageCodes;
  if (!state.selectedLanguageCodes.includes(state.activeLanguage)) {
    state.activeLanguage = state.selectedLanguageCodes[0];
  }
  syncLanguageScope();
  fillLanguageSelect();

  const englishVariant = state.variants.en;
  if (englishVariant) {
    state.sourceTitle = englishVariant.title;
    state.sourceSubtitle = englishVariant.subtitle;
    state.sourceTag = englishVariant.tag || state.sourceTag;
    titleInput.value = state.sourceTitle;
    subtitleInput.value = state.sourceSubtitle;
    tagInput.value = state.sourceTag;
    syncEnglishVariant();
    state.variants.en.status = "CSV导入";
  }

  clearPreviewImages();
  renderLanguageList();
  renderPosterPreviewGrid();
  render();
  translationStatus.textContent = `已从 CSV 识别并导入 ${importedLanguageCodes.length} 个语言版本。`;
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
    const [title, subtitle, tag] = await Promise.all([
      translateWithMyMemoryClient(titleSource, language.code),
      translateWithMyMemoryClient(state.sourceSubtitle, language.code),
      translateWithMyMemoryClient(state.sourceTag, language.code),
    ]);
    return {
      title: title || state.sourceTitle,
      subtitle: subtitle || state.sourceSubtitle,
      tag: tag || state.sourceTag,
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
      tag: state.sourceTag,
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
    tag: data.tag || state.sourceTag,
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
      const previousSizeCopies = state.variants[language.code]?.sizeCopies;
      state.variants[language.code] = {
        ...(await optimizeTitleForTwoLines(translatedVariant, language)),
        sizeCopies: previousSizeCopies,
      };
    } catch {
      state.variants[language.code] = {
        ...(state.variants[language.code] || {}),
        title: state.sourceTitle,
        subtitle: state.sourceSubtitle,
        tag: state.sourceTag,
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

function filenameForLanguage(language, presetId = state.resourcePreset) {
  const spec = getTemplateSizeSpecifications()[presetId] || RESOURCE_PRESETS[presetId] || getResourcePreset();
  const pattern = spec.output?.filenamePattern || `${presetId}-{language}.png`;
  return pattern
    .replace("{language}", language.code)
    .replace("{size}", presetId)
    .replace("{template}", state.templateId);
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

  const previousPreset = state.resourcePreset;
  const previousImageBoxStyle = getBoxInlineStyle(imageBox);
  const previousTitleBoxStyle = getBoxInlineStyle(titleBox);
  const previousSubtitleBoxStyle = getBoxInlineStyle(subtitleBox);

  for (const presetId of state.resourcePresets) {
    state.resourcePreset = presetId;
    setBoxLayoutPx(imageBox, getImageLayout());
    for (const language of LANGUAGES) {
      state.activeLanguage = language.code;
      languageSelect.value = language.code;
      renderLanguageList();
      render();
      files.push({
        name: filenameForLanguage(language, presetId),
        data: dataUrlToBytes(getPosterDataUrl()),
      });
      await wait(30);
    }
  }

  downloadBlob(createZip(files), "posters-all-languages.zip");
  state.resourcePreset = previousPreset;
  state.activeLanguage = previousLanguage;
  restoreBoxInlineStyle(imageBox, previousImageBoxStyle);
  restoreBoxInlineStyle(titleBox, previousTitleBoxStyle);
  restoreBoxInlineStyle(subtitleBox, previousSubtitleBoxStyle);
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
  const preset = getResourcePreset();
  const template = getTemplate();
  return {
    templateId: template.id,
    templateVersion: template.version,
    businessLine: template.businessLine,
    templateSnapshot: {
      id: template.id,
      name: template.name,
      businessLine: template.businessLine,
      version: template.version,
      fields: template.fields,
      assetSlots: template.assetSlots,
      sizeSpecifications: Object.fromEntries(
        state.resourcePresets.map((id) => [id, template.sizeSpecifications[id]]).filter(([, spec]) => Boolean(spec)),
      ),
    },
    baseImageData: optimizeSharedImage(
      state.baseImage,
      state.baseImageData,
      preset.width,
      preset.height,
    ),
    rtlBaseImageData: optimizeSharedImage(
      state.rtlBaseImage,
      state.rtlBaseImageData,
      preset.width,
      preset.height,
    ),
    contentImageData: optimizeSharedImage(
      state.contentImage,
      state.contentImageData,
      1200,
      1200,
    ),
    rtlContentImageData: optimizeSharedImage(
      state.rtlContentImage,
      state.rtlContentImageData,
      1200,
      1200,
    ),
    sourceTitle: state.sourceTitle,
    sourceSubtitle: state.sourceSubtitle,
    sourceTag: state.sourceTag,
    variants: state.variants,
    activeLanguage: state.activeLanguage,
    resourcePreset: state.resourcePreset,
    resourcePresets: state.resourcePresets,
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
  state.rtlBaseImageData = data.rtlBaseImageData || "";
  state.contentImageData = data.contentImageData || "";
  state.rtlContentImageData = data.rtlContentImageData || "";
  state.baseImage = await loadImageFromDataUrl(state.baseImageData);
  state.rtlBaseImage = await loadImageFromDataUrl(state.rtlBaseImageData);
  state.contentImage = await loadImageFromDataUrl(state.contentImageData);
  state.rtlContentImage = await loadImageFromDataUrl(state.rtlContentImageData);
  state.sourceTitle = data.sourceTitle || titleInput.value;
  state.sourceSubtitle = data.sourceSubtitle || subtitleInput.value;
  state.sourceTag = data.sourceTag || tagInput.value;
  state.variants = data.variants || {};
  state.templateId = normalizeTemplateId(data.templateId || DEFAULT_TEMPLATE_ID);
  applyTemplateMetadata();
  state.resourcePresets = normalizeResourcePresetIds(data.resourcePresets || data.resourcePreset || DEFAULT_RESOURCE_PRESET);
  state.resourcePreset = normalizeResourcePresetId(data.resourcePreset || state.resourcePresets[0]);
  syncResourcePresetScope();
  const supportedLanguageCodes = getTemplateLanguageCodes();
  state.selectedLanguageCodes = (data.selectedLanguageCodes || supportedLanguageCodes)
    .filter((code) => supportedLanguageCodes.includes(code));
  if (!state.selectedLanguageCodes.length) {
    state.selectedLanguageCodes = ["en"];
  }
  state.progressStatus = data.progressStatus || "制作中";
  state.activeLanguage = data.activeLanguage || "en";
  syncLanguageScope();

  const style = data.style || {};
  const preset = getResourcePreset();
  state.titleFont = style.titleFont || state.titleFont;
  state.titleSize = Number(style.titleSize || preset.defaultStyle.titleSize);
  state.titleColor = style.titleColor || state.titleColor;
  state.subtitleFont = style.subtitleFont || state.subtitleFont;
  state.subtitleSize = Number(style.subtitleSize || preset.defaultStyle.subtitleSize);
  state.subtitleColor = style.subtitleColor || state.subtitleColor;

  titleInput.value = state.sourceTitle;
  subtitleInput.value = state.sourceSubtitle;
  tagInput.value = state.sourceTag;
  titleFont.value = state.titleFont;
  titleSize.value = state.titleSize;
  titleColor.value = state.titleColor;
  subtitleFont.value = state.subtitleFont;
  subtitleSize.value = state.subtitleSize;
  subtitleColor.value = state.subtitleColor;
  wizardSelectedTemplateId = state.templateId;
  wizardSelectedResourcePresetIds = [...state.resourcePresets];
  fillTemplateSelect();
  fillResourcePresetSelect();
  fillLanguageSelect();
  languageSelect.value = state.activeLanguage;
  refreshProjectChrome();

  if (data.imageLayout) {
    setBoxLayoutPx(imageBox, data.imageLayout);
  } else {
    setBoxLayoutPx(imageBox, getImageLayout());
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
  state.templateId = normalizeTemplateId(config.templateId || DEFAULT_TEMPLATE_ID);
  applyTemplateMetadata();
  state.resourcePresets = normalizeResourcePresetIds(config.resourcePresets || config.resourcePreset || DEFAULT_RESOURCE_PRESET);
  state.resourcePreset = normalizeResourcePresetId(config.resourcePreset || state.resourcePresets[0]);
  syncResourcePresetScope();
  const supportedLanguageCodes = getTemplateLanguageCodes();
  state.selectedLanguageCodes = config.selectedLanguageCodes?.length
    ? config.selectedLanguageCodes.filter((code) => supportedLanguageCodes.includes(code))
    : supportedLanguageCodes;
  if (!state.selectedLanguageCodes.length) {
    state.selectedLanguageCodes = ["en"];
  }
  state.progressStatus = "制作中";
  syncLanguageScope();
  projectNameInput.value = state.projectName;
  state.baseImage = null;
  state.baseImageData = "";
  state.rtlBaseImage = null;
  state.rtlBaseImageData = "";
  state.contentImage = null;
  state.contentImageData = "";
  state.rtlContentImage = null;
  state.rtlContentImageData = "";
  state.sourceTitle = "Equip the\n$100,000 Exo Suit";
  state.sourceSubtitle = "Epic Gear Arena S3";
  state.sourceTag = "0 Fees";
  state.variants = {};
  state.activeLanguage = LANGUAGES.some((language) => language.code === "en")
    ? "en"
    : LANGUAGES[0].code;
  const preset = getResourcePreset();
  state.titleSize = preset.defaultStyle.titleSize;
  state.subtitleSize = preset.defaultStyle.subtitleSize;
  titleInput.value = state.sourceTitle;
  subtitleInput.value = state.sourceSubtitle;
  tagInput.value = state.sourceTag;
  titleSize.value = state.titleSize;
  subtitleSize.value = state.subtitleSize;
  wizardSelectedTemplateId = state.templateId;
  wizardSelectedResourcePresetIds = [...state.resourcePresets];
  fillTemplateSelect();
  fillResourcePresetSelect();
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
  const selectedResourcePresets = getSelectedResourcePresetIdsFromWizard();
  createNewProject({
    name: wizardProjectName.value.trim() || "MEXC 海报项目",
    templateId: wizardSelectedTemplateId,
    resourcePreset: selectedResourcePresets[0],
    resourcePresets: selectedResourcePresets,
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
  backgroundUploadStatus.textContent = `LTR 底图已上传：${result.image.width} × ${result.image.height}。`;
  clearPreviewImages();
  render();
});

rtlBaseUpload.addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) {
    return;
  }
  const result = await readImageFile(file);
  state.rtlBaseImage = result.image;
  state.rtlBaseImageData = result.dataUrl;
  backgroundUploadStatus.textContent = `RTL 底图已上传：${result.image.width} × ${result.image.height}。`;
  clearPreviewImages();
  render();
});

boxImageUpload.addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) {
    return;
  }
  const result = await readImageFile(file);
  if (!isSquareImage(result.image)) {
    event.target.value = "";
    foregroundUploadStatus.textContent = `LTR 前景图必须为 1:1，当前文件为 ${result.image.width} × ${result.image.height}。`;
    return;
  }
  state.contentImage = result.image;
  state.contentImageData = result.dataUrl;
  foregroundUploadStatus.textContent = `LTR 前景图已上传：${result.image.width} × ${result.image.height}。`;
  clearPreviewImages();
  render();
});

rtlBoxImageUpload.addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) {
    return;
  }
  const result = await readImageFile(file);
  if (!isSquareImage(result.image)) {
    event.target.value = "";
    foregroundUploadStatus.textContent = `RTL 前景图必须为 1:1，当前文件为 ${result.image.width} × ${result.image.height}。`;
    return;
  }
  state.rtlContentImage = result.image;
  state.rtlContentImageData = result.dataUrl;
  foregroundUploadStatus.textContent = `RTL 前景图已上传：${result.image.width} × ${result.image.height}。`;
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
  updateSourceCopyField("title", event.target.value);
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
  updateSourceCopyField("subtitle", event.target.value);
});

tagInput.addEventListener("input", (event) => {
  updateSourceCopyField("tag", event.target.value);
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
openTemplateManager.addEventListener("click", openTemplateManagerPanel);

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
  if (field === "title" || field === "subtitle" || field === "tag") {
    const sizeCopy = ensureSizeCopyForLanguage(code);
    sizeCopy[field] = value;
  } else {
    variant[field] = value;
  }
  variant.status = code === "en" ? "源文案" : "已编辑";

  delete state.previewImages[code];
  renderLanguageList();
  renderPosterPreviewGrid();
  render();
}

function updateSourceCopyField(field, value) {
  const sizeCopy = ensureSizeCopyForLanguage("en");
  sizeCopy[field] = value;
  state.variants.en.status = "源文案";
  if (state.activeLanguage === "en") {
    delete state.previewImages.en;
  }
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

activeTagInput.addEventListener("input", (event) => {
  updateActiveVariantField("tag", event.target.value);
});

activeReviewStatus.addEventListener("input", (event) => {
  updateActiveVariantField("reviewStatus", event.target.value);
});

activeNoteInput.addEventListener("input", (event) => {
  updateActiveVariantField("note", event.target.value);
});

resourceArtboards.addEventListener("click", (event) => {
  const card = event.target.closest(".resource-artboard-card");
  if (!card) {
    return;
  }
  selectResourcePresetForEditing(card.dataset.preset);
});

let canvasPan = null;
canvasViewport.addEventListener("pointerdown", (event) => {
  if (
    event.target.closest(".stage")
    || event.target.closest(".resource-artboard-card")
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
closeTemplateManager.addEventListener("click", closeTemplateManagerPanel);
templateManager.addEventListener("click", (event) => {
  if (event.target === templateManager) {
    closeTemplateManagerPanel();
  }
});
managedTemplateSelect.addEventListener("input", (event) => {
  managedTemplateId = normalizeTemplateId(event.target.value);
  managedSizeId = Object.keys(getTemplateSizeSpecifications(managedTemplateId))[0] || "";
  renderTemplateManager();
});
managedSizeList.addEventListener("click", (event) => {
  const card = event.target.closest(".managed-size-card");
  if (!card) {
    return;
  }
  managedSizeId = card.dataset.sizeId;
  renderTemplateManager();
});
saveTemplateConfig.addEventListener("click", saveManagedTemplate);
createTemplate.addEventListener("click", createBlankTemplate);
duplicateTemplate.addEventListener("click", duplicateManagedTemplate);
addSizeSpec.addEventListener("click", addManagedSizeSpec);
selectAllLanguages.addEventListener("click", () => {
  wizardLanguageMode = "manual";
  wizardSelectedLanguageCodes = getTemplateLanguageCodes(wizardSelectedTemplateId);
  renderWizardLanguageList();
});
clearLanguages.addEventListener("click", () => {
  wizardLanguageMode = "manual";
  wizardSelectedLanguageCodes = ["en"];
  renderWizardLanguageList();
});
wizardLanguageList.addEventListener("input", () => {
  wizardLanguageMode = "manual";
  wizardSelectedLanguageCodes = getSelectedLanguageCodesFromWizard();
  renderWizardLanguageMode();
});
wizardLanguageModeInputs.forEach((input) => {
  input.addEventListener("input", () => {
    wizardLanguageMode = input.value;
    if (wizardLanguageMode === "manual" && !wizardSelectedLanguageCodes.length) {
      wizardSelectedLanguageCodes = ["en"];
    }
    renderWizardLanguageList();
  });
});
templateSelect.addEventListener("input", () => {
  wizardSelectedTemplateId = normalizeTemplateId(templateSelect.value);
  wizardSelectedResourcePresetIds = normalizeResourcePresetIds(wizardSelectedResourcePresetIds, wizardSelectedTemplateId);
  wizardSelectedLanguageCodes = wizardSelectedLanguageCodes
    .filter((code) => getTemplateLanguageCodes(wizardSelectedTemplateId).includes(code));
  if (!wizardSelectedLanguageCodes.includes("en")) {
    wizardSelectedLanguageCodes.unshift("en");
  }
  fillResourcePresetSelect();
  renderWizardLanguageList();
});
resourcePreset.addEventListener("input", () => {
  wizardSelectedResourcePresetIds = getSelectedResourcePresetIdsFromWizard();
  fillResourcePresetSelect();
});
createProjectFromWizard.addEventListener("click", submitProjectWizard);
window.addEventListener("resize", fitCanvasView);

init();

async function init() {
  hydrateTemplateLibrary();
  applyTemplateMetadata();
  syncResourcePresetScope();
  syncLanguageScope();
  syncEnglishVariant();
  wizardSelectedTemplateId = state.templateId;
  wizardSelectedResourcePresetIds = [...state.resourcePresets];
  fillTemplateSelect();
  fillResourcePresetSelect();
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
