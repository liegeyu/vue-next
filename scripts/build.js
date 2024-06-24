// 打包
// monorepo 获取需要打包的包
const fs = require("fs");
const execa = require("execa");

// 1) 获取打包文件
// 获取目录
const dirs = fs.readdirSync("packages").filter((dir) => {
    // 仅打包文件夹
    const isDirectory = fs.statSync(`packages/${dir}`).isDirectory();
    return isDirectory;
})

// 2) 打包
/**
 * 打包 build
 * @param {*} target 
 */
async function build(target) {
    // execa
    // 通过 rollup 进行打包
    // -c 表示执行 rollup 配置
    // --environment 表示环境配置
    console.log('target----', target);
    await execa('rollup', ["-c", "--environment", `TARGET:${target}`], {
        stdio: "inherit",
    }); // 子进程的输出在父包输出
}

/**
 * 并行打包 runParaller
 * @param {*} dirs 
 * @param {*} itemFn 
 */
function runParaller(dirs, itemFn) {
    let result = [];
    for (let item of dirs) {
        result.push(itemFn(item));
    }
    return Promise.all(result);
}

runParaller(dirs, build).then((res) => {
    console.log("success");
})

console.log('dirs--------', dirs);