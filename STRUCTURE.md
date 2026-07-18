# ZX-Chan.github.io - 文件结构速查

## 项目结构

```text
.
├── assets/
│   ├── img/avatar.png          # 头像
│   └── scss/custom.scss        # 全部站点自定义样式
├── config/_default/
│   ├── config.toml             # 站点标题、语言和输出格式
│   ├── menu.toml               # 主导航与社交链接
│   ├── params.toml             # 侧栏、文章、搜索和配色参数
│   └── permalinks.toml         # URL 格式
├── content/
│   ├── about.md                # About 页面
│   ├── archives.md             # Archives 页面配置
│   ├── search/_index.md        # Search 页面配置
│   └── post/                   # 笔记 Markdown
├── data/profile.yaml           # 主页资料、教育、新闻与论文
├── i18n/zh-cn.toml             # Stack 主题简体中文翻译
├── layouts/
│   ├── home.html               # 主页结构
│   ├── archives.html           # 分类与笔记归档
│   ├── _default/search.html    # 搜索页面与前端搜索逻辑
│   ├── _partials/article/      # 文章结构覆盖
│   ├── partials/sidebar/       # 左侧栏覆盖
│   └── index.json              # 搜索索引
├── static/
│   ├── love/                   # 隐藏彩蛋页
│   └── images/notes/           # 笔记图片
├── go.mod                      # Hugo Stack 主题模块
└── .github/workflows/deploy.yml
```

## 本地开发

需要 Hugo Extended 0.164.0 和 Go 1.26.5。

```powershell
hugo server --disableFastRender
```

正式构建：

```powershell
hugo --gc --minify
```

## 常用修改

| 操作 | 文件 |
|---|---|
| 修改个人资料、教育、新闻或论文 | `data/profile.yaml` |
| 调整颜色、字号、间距和响应式布局 | `assets/scss/custom.scss` |
| 新增笔记 | 在 `content/post/` 添加 Markdown 文件 |
| 修改导航与社交链接 | `config/_default/menu.toml` |
| 修改分类颜色和图标 | `layouts/archives.html` 顶部字典 |
| 修改隐藏彩蛋页 | `static/love/` |

文章标题由 front matter 的 `title` 生成，正文请从二级标题 `##` 开始，避免页面出现重复标题。
