#!/usr/bin/env node

import chalk from "chalk";
import path from "path";

console.log(`
使用说明: iconfont <Font class url>

- 在 iconfont 我的项目能够看到 Font class url（如 //at.alicdn.com/t/font_2103601_hmqduz3ijg8.css）
- 导入后，会自动生成 iconfont 样式文件（src/styles/iconfont.scss）
- 使用时，添加样式 iconfont-xxx 即可
`);
