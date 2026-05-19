# 海报协同工作台上线说明

## 1. 直接在内网服务器启动

```bash
cd /path/to/poster-collaboration-workbench
npm run start:lan
```

访问：

```text
http://服务器内网IP:4173/
```

项目数据会保存在：

```text
data/projects.json
```

## 2. 用 PM2 常驻运行

```bash
npm install -g pm2
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

查看状态：

```bash
pm2 status
pm2 logs poster-workbench
```

## 3. Docker 部署

```bash
docker build -t poster-workbench .
docker run -d \
  --name poster-workbench \
  -p 4173:4173 \
  -v $(pwd)/data:/app/data \
  poster-workbench
```

访问：

```text
http://服务器内网IP:4173/
```

## 4. 健康检查

```bash
curl http://127.0.0.1:4173/healthz
```

返回：

```json
{"ok":true}
```

## 5. 翻译接口

默认使用 MyMemory 免费翻译，无需配置 API Key。

如果要切换到 OpenAI-compatible API，可以在页面左侧选择对应翻译引擎并填写：

- API Key
- API Base URL
- 模型名

## 6. 团队协同方式

1. 设计方打开网页，上传底图和图片内容。
2. 业务方输入英文标题和副标题，生成多语言。
3. 翻译方打开同一个协同链接，检查文案并修改状态。
4. 业务方点击打包下载，导出所有语言海报 ZIP。

## 7. 上线注意事项

- 公司内网试跑可以直接使用 HTTP。
- 如果开放到公网，建议放到 Nginx 后面并配置 HTTPS。
- `data/projects.json` 是业务数据，部署升级时不要删除。
- 大图片会写入项目 JSON，建议底图和素材控制在合理大小。
