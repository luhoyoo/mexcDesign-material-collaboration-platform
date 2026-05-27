# 海报协同工作台上线说明

## 1. Vercel 免费试用部署

本项目已适配 Vercel：

- 网页文件由 Vercel 静态托管。
- `/api/translate` 负责线上翻译请求。
- `/api/projects` 通过 Vercel Blob 保存协同项目。
- 分享的 `?project=...` 链接可以继续供设计、翻译和业务协作使用。

### 部署步骤

1. 将代码推送到 GitHub 仓库。
2. 在 Vercel 选择 `Add New > Project`，导入该 GitHub 仓库。
3. 保持 Framework Preset 为 `Other`，然后完成首次部署。
4. 进入项目页面的 `Storage`，创建并连接一个 Blob store。
5. Vercel 会为项目增加 `BLOB_READ_WRITE_TOKEN` 环境变量；重新部署一次。
6. 打开线上域名，点击 `新建项目` 和 `保存项目` 验证协同链接。

### 翻译配置

- 默认的 MyMemory 翻译无需设置密钥。
- 如切换到 OpenAI-compatible API，可以在界面中填写 API 设置，或在 Vercel 环境变量中添加 `OPENAI_API_KEY`、`OPENAI_BASE_URL` 和 `OPENAI_MODEL`。

### 线上限制

- 这是无登录协同版本，持有网址的人都可能访问保存的项目，不要放入敏感素材。
- 保存项目时，上传图片会自动压缩到当前海报所需尺寸，减少云端请求体积。
- Hobby 与 Blob 的免费额度和限制以 Vercel 当前套餐页为准。

## 2. 直接在内网服务器启动

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

## 3. 用 PM2 常驻运行

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

## 4. Docker 部署

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

## 5. 健康检查

```bash
curl http://127.0.0.1:4173/healthz
```

返回：

```json
{"ok":true}
```

## 6. 翻译接口

默认使用 MyMemory 免费翻译，无需配置 API Key。

如果要切换到 OpenAI-compatible API，可以在页面左侧选择对应翻译引擎并填写：

- API Key
- API Base URL
- 模型名

## 7. 团队协同方式

1. 设计方打开网页，上传底图和图片内容。
2. 业务方输入英文标题和副标题，生成多语言。
3. 翻译方打开同一个协同链接，检查文案并修改状态。
4. 业务方点击打包下载，导出所有语言海报 ZIP。

## 8. 上线注意事项

- 公司内网试跑可以直接使用 HTTP。
- 如果开放到公网，建议放到 Nginx 后面并配置 HTTPS。
- `data/projects.json` 是业务数据，部署升级时不要删除。
- 大图片会写入项目 JSON，建议底图和素材控制在合理大小。
