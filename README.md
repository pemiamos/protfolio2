# UI / 交互设计作品集

一个无需安装依赖的静态作品集框架，适合逐步替换为自己的真实项目。当前个人资料、两个案例与界面预览均为占位示例，不代表真实经历或研究成果。

## 本地预览

需要 Python 3；若有 Node.js，可运行：

```sh
npm run dev
```

或直接运行：

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

打开 http://127.0.0.1:4173 。请通过 HTTP 服务预览，直接双击 HTML 文件会受到浏览器 ES 模块访问限制。

## 页面

- `index.html`：介绍、精选作品、关于我摘要。
- `project.html?slug=campus-market`：第一个案例。
- `project.html?slug=daily-focus`：第二个案例。
- `about.html`：个人介绍与联系方式。
- `resume.html`：可打印的简历模板；浏览器打印可保存为 PDF。

## 替换内容

1. 编辑 `content/site.js` 的 `profile`：姓名、介绍、教育背景、技能、邮箱与更新时间。
2. 编辑 `projects`：项目名、描述、职责、周期、工具与章节。`slug` 应唯一，仅使用小写英文、数字和连字符。
3. 将封面放入 `assets/images/`，把案例的 `cover` 设置为 `assets/images/你的封面.webp`。留空时使用 CSS 绘制的示意界面。建议约 2.4:1 的封面，主体放在中央，兼顾手机端裁切。
4. 将真实案例图文写入 `sections`。当前 `body` 为纯文本；要添加图片或视频，可扩展 `assets/app.js` 中的案例章节模板。不要将不可信内容作为 HTML 插入。
5. 简历 PDF 可放到 `assets/resume.pdf`，将 `profile.resumeUrl` 设置为该路径；未配置时显示网页简历模板。
6. 编辑 `about()` 的观点和照片区域，使其与个人情况一致。
7. 发布前替换各 HTML 的标题与描述、`assets/favicon.svg`，并准备真实的社交分享封面与对应元数据。

`assets/style.css` 顶部定义主题颜色；文件中包含桌面、平板、手机、减少动效与打印样式。导航支持键盘焦点和跳转主要内容。

## 验证与部署

```sh
npm run check
```

检查页面资源、案例 slug、目录 id 和已配置的本地图片/PDF。还应人工核对手机显示、真实内容、邮箱和原型链接。

这是普通静态网站，无服务端、数据库或环境变量。部署时上传四个 HTML 文件以及 `assets/` 和 `content/`，保留目录结构即可。

### GitHub Pages

本仓库使用 `main` 分支的根目录发布，`.nojekyll` 用于跳过 Jekyll 处理。首次发布需在仓库 Settings → Pages 中选择 `Deploy from a branch`、`main` 和 `/(root)`。之后推送 `main` 分支即可触发网站更新。
