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
