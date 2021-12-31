import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import readLine from "readline";
import rimraf from "rimraf";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { copyFiles } from "util";

console.log(process.env.NODE_ENV === "test");
const pwd = process.cwd();
const args = process.argv.slice(2);
const [projectName] = args.length > 0 ? args : ["myApp"];

(function core() {
  let __dirname;
  if (process.env.NODE_ENV !== "test") {
    __dirname = dirname(fileURLToPath(import.meta.url));
  }

  console.log("创建项目文件夹：", chalk.green(projectName));
  console.log("在当前文件夹下新建文件夹", chalk.green(process.cwd()));

  process.on("SIGINT", () => {
    handleExit();
    process.exit();
  });

  try {
    if (fs.existsSync(pwd + `/${projectName}`)) {
      console.log(chalk.red(`Err`), " 此项目下已有相同文件夹");
    } else {
      fs.mkdirSync(pwd + `/${projectName}`);
      copyFiles(path.resolve(__dirname, "./template"), pwd + `/${projectName}`);
      rewriteName();

      console.log(chalk.green("success loaded!"));

      console.log(`
        ${chalk.gray("cd project-name")}
  
        ${chalk.yellow("yarn")} or ${chalk.yellow("npm install")}
  
      then
  
        ${chalk.yellow("yarn start")} or ${chalk.yellow("npm start")}
      `);
    }
  } catch (err) {
    console.log(err);
    console.log(chalk.red("Err"), " Init Failed");
  }
})();

export function handleExit() {
  if (fs.existsSync(pwd + `/${projectName}`)) {
    rimraf(pwd + `/${projectName}`);
  }
}

export function rewriteName() {
  fs.readFile(pwd + `/${projectName}/package.json`, "utf-8").then((content) => {
    content.replace("test-react-app", projectName);
    fs.writeFileSync(pwd + `/${projectName}/package.json`, content);
  });
}
