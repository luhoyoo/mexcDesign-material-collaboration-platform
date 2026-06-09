# Poster Collaboration Workbench

内网海报多语言协同工作台，用于设计、业务和翻译团队协作生成多语言海报。

## 功能

- 设计方上传底图和图片素材
- 业务方输入英文主标题、副标题
- 自动生成多语言文案
- 翻译方检查、编辑并确认每个语言
- 多语言海报预览
- 一键打包下载全部语言 PNG
- 无登录项目协同链接
- CSV 多语言主标题和副标题导入
- CSV 导入后会按表头自动识别语言数量，并同步更新左侧语言图层
- 新建项目支持选择语言来源：CSV 自动识别，或手动选择多语言
- 标准 CSV 多语言文案模板位于 `data/multilingual-copy-template.csv`
- CSV 导入会自动识别 UTF-8 / UTF-16 / GB18030 / Big5 编码，以及逗号、Tab、分号分隔符
- 模板选择、模板版本绑定和模板内尺寸规范
- 模板管理能力暂时隐藏，模板与尺寸规范由 Codex Figma MCP 同步维护
- 操作页按当前语言展示全部选中尺寸，不允许用户修改模板布局
- 中间画板可单独选中，左侧文案区会按“当前语言 + 当前尺寸”单独编辑文案
- 左栏统一处理文案与翻译，右栏统一处理底图与前景图素材
- 项目协同与打包下载位于右栏，标题颜色由模板尺寸规范控制
- Poster 与 INS Poster 使用 LTR / RTL 底图，其他尺寸使用 1:1 的 LTR / RTL 前景图
- 内置 Figma MCP 测试模板，可验证 Poster 与搜索页 banner 的设计规范导入
- 当前仅保留 Figma MCP 测试模板，后续尺寸统一通过 Codex Figma MCP 补充
- Figma MCP 测试模板已重新导入 5 个 LTR 尺寸，RTL 尺寸后续补充
- 支持可翻译的标签文案，banner 渐变胶囊会根据文案长度自动适配宽度
- Poster 与 INS Poster 的标签保持右对齐，文本框会随文案长度向左自动扩展
- 主副标题采用相同的动态跟随逻辑，每个尺寸的间距值由 Figma MCP 模板规范决定
- Poster / INS Poster / Announcement / Web 小 banner 的主副标题间距固定，副标题按主标题单行或双行自动上移/下移
- 多语言渲染按语言自动切换 Inter / Noto Sans 系列开源字体，导出前会等待字体加载
- Konva.js 画布渲染与 PNG 导出

## 本地启动

```bash
node server.js
```

访问：

```text
http://127.0.0.1:4173/
```

内网访问时使用服务器或本机内网 IP：

```text
http://内网IP:4173/
```

## 健康检查

```bash
curl http://127.0.0.1:4173/healthz
```

## 数据存储

本地启动时，项目数据默认保存在：

```text
data/projects.json
```

部署或升级时不要删除这个文件。

## 部署

Vercel 线上版使用 Vercel Blob 保存协同项目；详细步骤见 [DEPLOY.md](./DEPLOY.md)。
