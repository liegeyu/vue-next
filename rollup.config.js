// const ts = require("rollup-plugin-typescript2");
// const json = require("@rollup/plugin-json");
// const resolvePlugin = require("@rollup/plugin-node-resolve");   // 解析其它第三方插件
// const path = require("path");
import path from "path";
import ts from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import resolvePlugin from "@rollup/plugin-node-resolve";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const __dirname = path.resolve();

// 1) 获取打包文件
let packagesDir = path.resolve(__dirname, "packages"); // 获取 packages 的绝对路径
// 1.1) 获取包
let packageDir = path.resolve(packagesDir, process.env.TARGET);
// 1.2) 获取包配置信息
let resolve = (p) => path.resolve(packageDir, p);
const pkg = require(resolve("package.json"));
const options = pkg.buildOptions || {}
const name = path.basename(packageDir);

// 创建表
const outOptions = {
  "esm-bundler": {
    file: resolve(`dist/${name}.esm-bunlder.js`),
    format: "es",
  },
  cjs: {
    file: resolve(`dist/${name}.cjs.js`),
    format: "cjs",
  },
  global: {
    file: resolve(`dist/${name}.global.js`),
    format: "iife",
  },
};

function createConfig(format, output) {
    output.name = options.name;
    output.sourcemap = true;
    return {
        input: resolve("src/index.ts"),
        output,
        plugins: [
            json(),
            ts({
                tsconfig: path.resolve(__dirname, "tsconfig.json")
            }),
            resolvePlugin()
        ]
    }
}

export default options.formats.map((format) => {
    return createConfig(format, outOptions[format]);
})
