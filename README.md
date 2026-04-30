# 色彩心事 — 部署说明

## 项目结构

```
色彩心事/
├── index.html       # 单页应用（首页 + 测试 + 结果）
├── css/
│   └── style.css    # 完整样式（水彩色块、动画）
├── js/
│   ├── data.js      # 人格数据 + 题库
│   └── app.js       # 核心逻辑（测试/结果/海报/历史）
└── vercel.json      # Vercel 部署配置
```

## 本地预览

```bash
# 方式 1：Python
cd 色彩心事
python -m http.server 8080
# 浏览器打开 http://localhost:8080

# 方式 2：Node
npx serve .
```

## 部署到 Vercel（免费）

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录
vercel login

# 3. 部署
cd 色彩心事
vercel

# 首次部署会问几个问题，按回车默认即可
# 第二次部署用 vercel --prod 直接上线
```

或者直接用 GitHub 方式：
1. 把项目推到 GitHub
2. 在 Vercel 导入项目
3. 自动部署

## 在 Codex 中继续迭代

如果你想用 Codex 继续优化，可以直接把项目目录给 Codex 看，它会理解当前代码结构。

推荐的 Codex 优化方向：
- 修改题库内容（编辑 `js/data.js`）
- 调整人格文案（编辑 `js/data.js` 中的 PERSONALITIES）
- 修改视觉风格（编辑 `css/style.css`）
- 添加新的结果页元素（编辑 `index.html` + `js/app.js`）

