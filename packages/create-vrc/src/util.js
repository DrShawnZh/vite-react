import fs from "fs-extra";
import chalk from "chalk";

/**
 * 复制文件夹
 *
 * @param {string} source
 * @param {string} destiny
 */
export function copyFiles(source, destiny) {
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
