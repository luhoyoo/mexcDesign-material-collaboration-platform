# 本地单机版使用说明

这个版本不需要服务器，也不需要团队协同。

## 使用方式

1. 解压 `mexc-poster-standalone-local.zip`。
2. 双击打开 `index.html`。
3. 上传底图和图片素材。
4. 如果已有多语言 CSV，上传 `CSV 多语言文案表`。
5. 如果没有 CSV，输入英文主标题、副标题，再点击 `生成多语言`。
6. 检查预览后点击 `打包下载`。

## CSV 格式

- 第一行放语言代码，例如 `en-US`、`zh-TW`、`zh-CN`、`ja-JP`。
- `Header` 行会导入为主标题。
- `Subhead` 行会导入为副标题。
- 当前模板不会使用 `CTA` 行。

## 注意事项

- 本地单机版不会保存协同项目。
- 本地单机版会隐藏项目协同功能。
- 免费翻译默认使用 MyMemory，浏览器需要能访问外网。
- 如果浏览器或网络拦截翻译接口，可以手动修改各语言文案后再导出。

## 包含文件

```text
index.html
styles.css
app.js
vendor/konva.min.js
vendor/KONVA-LICENSE.txt
LOCAL_STANDALONE.md
```
