# Dorayakiee.github.io — 文件结构速查

## 📂 项目结构

```
.
├── assets/
│   ├── img/avatar.png          ← 你的头像
│   └── scss/custom.scss        ← 所有自定义样式
├── config/_default/
│   ├── config.toml             ← 站点标题、语言、JSON输出
│   ├── menu.toml               ← 导航菜单
│   ├── params.toml             ← 主题参数（侧边栏、搜索栏、math）
│   └── permalinks.toml         ← URL 格式
├── content/
│   ├── _index.md               ← 主页（只留frontmatter，内容靠layouts）
│   ├── about.md                ← About 页面内容
│   ├── archives.md             ← Archives 页面配置
│   ├── search/
│   │   └── _index.md           ← Search 页面配置
│   └── post/                   ← 📝 所有笔记都在这里
│       ├── ch1-机器学习绪论.md
│       ├── ch19-逻辑寻址.md
│       └── ...
├── data/
│   └── profile.yaml            ← 🏠 主页内容（名字/简介/教育/News/Pub）
├── layouts/
│   ├── home.html               ← 主页 HTML 结构
│   ├── archives.html           ← Archives + 右边栏 ≡ 切换 + 分类颜色
│   ├── _default/
│   │   └── search.html         ← Search 页面 + JS 搜索逻辑
│   ├── index.json              ← 搜索用的 JSON 数据索引
│   └── partials/sidebar/
│       └── left.html           ← 左侧栏（支持 safeHTML 换行）
├── static/
│   ├── love/                   ← 💖 隐藏彩蛋页（仅 URL 访问）
│   └── images/notes/
│       └── 计算机网络/         ← 笔记中的图片
└── go.mod                      ← Hugo 模块依赖
```

## 📝 常用修改

| 操作 | 文件 |
|------|------|
| 改名字/简介/论文 | `data/profile.yaml` |
| 调字体大小/间距/颜色 | `assets/scss/custom.scss` |
| 新增一篇笔记 | 在 `content/post/` 加 `.md` 文件 |
| 删一篇笔记 | 删掉 `content/post/` 里的对应文件 |
| 改导航菜单项 | `config/_default/menu.toml` |
| 改 Archives 分类颜色 | `layouts/archives.html` 顶部 `$catColors` |
| 新分类要加颜色 | 同上，加一行 `"分类名" "#颜色代码"` |
| 修改 love 页 | 改 `static/love/` 下的文件 |
