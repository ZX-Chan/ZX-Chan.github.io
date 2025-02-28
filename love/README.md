源码来自某个交流论坛 没有找到原作者或开源仓库
如您知道作者的Github仓库 请提issues或pull修改md 我将标注作者信息

# 项目运行指南

## 前提条件
1. 确保你已经安装了一个现代浏览器（如 Chrome, Firefox）。
2. 确保你已经下载了项目的所有文件，并且文件结构完整。

## 运行步骤
1. 打开项目文件夹 。
2. 找到 `index.html` 文件。
3. 双击 `index.html` 文件，使用浏览器打开它。
4. 你将看到一个包含 Yes 和 No 按钮的页面，点击按钮体验互动效果。

## 文件说明
- `index.html`: 项目的主页面。
- `script.js`: 包含按钮点击事件的逻辑。
- `styles.css`: 页面样式文件。
- `images/`: 存放项目中使用的图片资源。

## 注意事项
- 确保 `script.js` 和 `styles.css` 文件在 `index.html` 中正确引用。
- 确保 `images` 文件夹中的图片路径正确。

## 示例
```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>表白页面</title>
    <link rel="stylesheet" href="./styles.css">
</head>
<body>
    <div id="mainContent">
        <h1 id="question">你愿意做我的女朋友吗？</h1>
        <button id="yes">Yes</button>
        <button id="no">No</button>
        <img id="mainImage" src="./images/default.png" alt="表情图片">
    </div>
    <script src="./script.js"></script>
</body>
</html>
```
