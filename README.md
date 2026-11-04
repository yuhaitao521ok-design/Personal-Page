# 个人主页（Personal Page）

一个简洁、现代、零依赖的**中英双语**个人网站框架，用于对外展示**个人成果、项目、经历、兴趣与合作**。
纯静态 HTML/CSS/JS，无需构建步骤，可直接部署到 **GitHub Pages**（或任何静态托管服务）。

- 🌐 **中英双语**：默认英文，导航栏一键切换中文（偏好记忆到 localStorage）
- 🌗 **明暗主题**：跟随系统 + 手动切换
- 📱 **响应式**：桌面 / 平板 / 手机三档自适应

## 目录结构

```
.
├── index.html          # 单页站点：导航 + 所有内容区块（含中英双语文案）
├── css/style.css       # 全部样式（明暗主题、响应式、动画）
├── js/main.js          # 双语切换、主题切换、导航、筛选、动画、联系表单
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

1. 推送代码到 GitHub 仓库：`git push`
2. 仓库 **Settings → Pages → Source** 选择 `Deploy from a branch`，分支选 `main`、目录选 `/ (root)`。
3. 保存后等待一分钟，访问 `https://<用户名>.github.io/<仓库名>/`。

## 双语机制（如何修改文案）

所有文案直接写在 `index.html` 里，用三个属性维护两个语言版本：

```html
<p data-en="English text" data-zh="中文文案">English text</p>
```

- **`data-en`**：英文版文案（默认显示，HTML 标签内默认内容也写英文）
- **`data-zh`**：中文版文案
- 输入框占位符用 **`data-en-ph` / `data-zh-ph`**
- 页面标题用 `<title data-en="..." data-zh="...">`，描述文案在 `js/main.js` 的 `META_DESC` 中

修改文案时**三个地方保持一致**（data-en、标签内默认内容、以及 data-zh）。新增元素只需加上这两个属性即可自动支持双语切换。

## 内容来源

站点内容综合自两份简历（`Personal Resume(YU HAITAO)-data engineer.docx`、
`Personal Resume(YU HAITAO)—semicon.docx`），涵盖：

| 区块 | 内容 |
| --- | --- |
| Hero | 姓名、身份、简介、核心数据 |
| 关于我 | 履历综述、技能标签、工具箱 |
| 项目与成果 | 半导体工艺项目、数据与 AI 项目、软件项目（支持分类筛选） |
| 经历 | 工作经历时间线 + 教育背景时间线 |
| 兴趣 | 兴趣爱好卡片 |
| 合作 | 半导体工艺 / 数据与 AI / 咨询分享 三个合作方向 |
| 联系 | 邮箱、电话、GitHub、所在地 + 留言表单（mailto） |

**提示**：头像替换 `assets/avatar.svg`；联系信息在 `index.html` 联系区块和 `js/main.js` 的 `CONTACT_EMAIL` 中修改。
