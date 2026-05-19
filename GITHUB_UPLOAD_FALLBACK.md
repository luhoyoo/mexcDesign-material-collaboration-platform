# GitHub 上传备用方案

当前环境无法直连 GitHub，也没有 GitHub 插件写权限时，可以用下面两种方式之一上传。

## 方案 A：用源码 ZIP 上传

文件：

```text
mexcDesign-material-collaboration-platform-source.zip
```

操作：

1. 解压这个 ZIP。
2. 打开 GitHub 仓库：
   `https://github.com/luhoyoo/mexcDesign-material-collaboration-platform`
3. 点击 `uploading an existing file` 或 `Add file -> Upload files`。
4. 把解压后的所有文件拖进去。
5. 提交到 `main` 分支。

## 方案 B：用 git bundle 保留提交历史

文件：

```text
mexcDesign-material-collaboration-platform.gitbundle
```

在一台能访问 GitHub 的电脑上运行：

```bash
git clone mexcDesign-material-collaboration-platform.gitbundle mexcDesign-material-collaboration-platform
cd mexcDesign-material-collaboration-platform
git remote add origin https://github.com/luhoyoo/mexcDesign-material-collaboration-platform.git
git push -u origin main
```

