# SBTI Spectral Edition

一个重做视觉与动效层的 SBTI 静态站版本。

这个仓库保留了原始测试的题库与匹配逻辑，但把页面结构、风格系统、动效节奏和图像资源组织整体重做成更适合公开展示的版本。

## What Changed

- 重新设计首页、答题页、结果页的布局和视觉层级
- 去掉原脚本里体积巨大的 base64 结果图，改为外链高质量图片
- 为主视觉和结果图补上可点击来源链接
- 增加滚动显隐、浮动光晕、玻璃面板和更强的质感氛围
- 保持纯静态结构，可直接放到 GitHub Pages

## Files

- `index.html`: 页面结构
- `styles.css`: 新的视觉与动效系统
- `main.js`: 原始题库与计算逻辑，已移除内嵌大图
- `overrides.js`: 图片映射、来源链接和界面增强逻辑

## Run

直接打开 `index.html` 即可，或者在本地启动任意静态文件服务。

## Image Credits

- [Hallway / Spencer Lee](https://www.pexels.com/photo/white-and-black-hallway-with-glass-windows-8445619/)
- [Night Skyline / Arnold Nagy](https://www.pexels.com/photo/nighttime-cityscape-with-illuminated-skyscrapers-35886056/)
- [Portrait / Ivan Aguilar](https://www.pexels.com/photo/portrait-of-woman-with-shadows-on-face-5224561/)
- [Lion Statue / Peter Dyllong](https://www.pexels.com/photo/majestic-lion-statue-with-architectural-shadow-36352244/)
- [Corridor / Vika Glitter](https://www.pexels.com/photo/corridor-of-modern-building-with-glass-walls-6208143/)

## License Note

图片来自 Pexels，使用前请自行复核其最新授权条款：

- [Pexels License](https://www.pexels.com/license/)
