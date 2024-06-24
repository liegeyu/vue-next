const ts = require("rollup-plugin-typescript2");
const json = require("@rollup/plugin-json");
const resolvePlugin = require("@rollup/plugin-node-resolve");   // 解析其它第三方插件
const path = require("path");

// 1) 获取打包文件
let packagesDir = path.resolve(__dirname, "packages");// 获取 packages 的绝对路径 
// 1.1) 获取包
let packageDir = path.resolve(packagesDir, process.env.TARGET);
// 1.2) 获取包配置信息
let resolve = p => path.resolve(packageDir, p);

console.log('packageDir', packageDir);