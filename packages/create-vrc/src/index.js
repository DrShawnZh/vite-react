import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import readLine from "readline";
import rimraf from "rimraf";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const pwd = process.cwd();
const args = process.argv.slice(2);
const [projectName] = args.length > 0 ? args : ["myApp"];

console.log("创建项目文件夹：", chalk.green(projectName));
console.log("在当前文件夹下新建文件夹", chalk.green(process.cwd()));

process.on("SIGINT", () => {
  handleExit();
  process.exit();
});

// const sleep = async (delay) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, delay);
//   });
// };

// await sleep(5000);

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

function handleExit() {
  if (fs.existsSync(pwd + `/${projectName}`)) {
    rimraf(pwd + `/${projectName}`);
  }
}

function rewriteName() {
  fs.readFile(pwd + `/${projectName}/package.json`, "utf-8").then((content) => {
    content.replace("test-react-app", projectName);
    fs.writeFileSync(pwd + `/${projectName}/package.json`, content);
  });
}

/**
 * 复制文件夹
 *
 * @param {string} source
 * @param {string} destiny
 */
function copyFiles(source, destiny) {
  const files = fs.readdirSync(source, { withFileTypes: true });

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = `${source}/${file.name}`;
    const fileStat = fs.statSync(filePath);
    if (fileStat.isDirectory()) {
      fs.mkdirSync(destiny + "/" + file.name);
      copyFiles(filePath, destiny + "/" + file.name);
    } else {
      console.log(chalk.green("copy "), destiny + "/" + file.name);
      fs.writeFileSync(
        destiny + "/" + file.name,
        fs.readFileSync(filePath, { encoding: "utf-8" })
      );
    }
  }
}
