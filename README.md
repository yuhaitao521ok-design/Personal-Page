# 个人主页（Personal Page）

一个简洁、现代、零依赖的个人网站框架，用于对外展示**个人成果、项目、兴趣与合作**。
纯静态 HTML/CSS/JS，无需构建步骤，可直接部署到 **GitHub Pages**（或任何静态托管服务）。

## 目录结构

```
.
├── index.html          # 单页站点：导航 + 所有内容区块
├── css/style.css       # 全部样式（明暗主题、响应式、动画）
├── js/main.js          # 主题切换、导航、项目筛选、滚动动画、联系表单
├── assets/avatar.svg   # 头像 / 照片占位图（替换为你自己的照片）
└── README.md
```

## 本地预览

```bash
# 任选其一
python3 -m http.server 8000
# 或
npx serve .
```

打开 <http://localhost:8000> 即可预览。

## 部署到 GitHub Pages

1. 推送代码到 GitHub 仓库。
2. 仓库 **Settings → Pages → Source** 选择 `Deploy from a branch`，分支选 `main`、目录选 `/ (root)`。
3. 保存后等待一分钟，访问 `https://<用户名>.github.io/<仓库名>/`。

## 如何填写你的资料

所有需要替换的内容都在 `index.html` 中用统一注释标出，搜索 `【占位内容】` 即可逐个替换：

| 区块 | 位置（section id） | 需要提供 |
| --- | --- | --- |
| 首屏 Hero | `hero` | 姓名、身份一句话、自我介绍、城市 / 状态、核心数据 |
| 关于我 | `about` | 详细介绍（2~3 段）、技能标签、常用工具 |
| 项目成果 | `projects` | 每个项目的标题、简介、标签、链接（代码 / 论文 / 演示） |
| 经历时间线 | `experience` | 教育 / 工作 / 里程碑经历 |
| 兴趣 | `interests` | 兴趣爱好卡片 |
| 合作 | `collab` | 合作方向、你能提供什么、期望的合作方式 |
| 联系 | `contact` | 邮箱、GitHub、Google Scholar、LinkedIn、微信等 |

**提示**：

- 头像/照片：把 `assets/avatar.svg` 替换为你自己的图片（如 `assets/avatar.jpg`），
  并把 `index.html` 中所有 `assets/avatar.svg` 改成新文件名。
- 项目卡片复制一块 `<article class="card">…</article>` 即可新增项目；
  `data-cat` 决定它属于哪个筛选分类（`research` / `dev` / `other`），
  分类按钮在 `.projects__filter` 中，可自行增删。
- 联系表单默认通过 `mailto:` 打开邮件客户端；若需要真正的后端收件，
  可将表单替换为 Formspree / Getform 等服务的地址。
- 站点支持**明暗主题**（跟随系统 + 手动切换，记忆用户偏好）与移动端自适应，
  无需额外配置。
