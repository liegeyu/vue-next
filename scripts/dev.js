// 打包
// monorepo 获取需要打包的包
import { execa } from "execa";

// 1) 获取打包文件

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
  console.log("target----", target);
  await execa("rollup", ["-cw", "--environment", `TARGET:${target}`], {
    stdio: "inherit",
  }); // 子进程的输出在父包输出
}

build("reactivity");
build("shared");