import fs from "fs-extra";
import path from "path";
import chalk from "chalk";

const pwd = process.cwd();
const args = process.argv.slice(2);
const [projectName] = args.length > 0 ? args : ["myApp"];

console.log("创建项目文件夹：", chalk.green(projectName));
console.log("在当前文件夹下新建文件夹", chalk.green(process.cwd()));

try {
  // console.log(__dirname);
  if (fs.existsSync(pwd + `/${projectName}`)) {
    console.log(chalk.red(`Err: 此项目下已有相同文件夹`));
  } else {
    fs.mkdirSync(pwd + `/${projectName}`);
    copyFiles(path.resolve(__dirname, "./template"), pwd + `/${projectName}`);
  }
} catch (err) {
  console.log(err);
  console.log(chalk.red("Message: Init Failed"));
}

/**
 * 复制文件夹
 *
 * @param {string} source
 * @param {string} destiny
 */
function copyFiles(source, destiny) {
  const files = fs.readdirSync(source, { withFileTypes: true });

  // console.log(files);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = `${source}/${file.name}`;
    const fileStat = fs.statSync(filePath);
    if (fileStat.isDirectory()) {
      fs.mkdirSync(destiny + "/" + file.name);
      copyFiles(filePath, destiny + "/" + file.name);
      return;
    } else {
      console.log(chalk.green("download "), destiny + "/" + file.name);
      fs.writeFileSync(
        destiny + "/" + file.name,
        fs.readFileSync(filePath, { encoding: "utf-8" })
      );
    }
  }
  console.log(chalk.green("success loaded!"))
}
