import { copyFiles } from "./util.js";
import fs from "fs-extra";
import rimraf from "rimraf";

describe("copy", () => {
  const rootPath = process.cwd();

  afterAll(() => {
    rimraf.sync(rootPath + "/testTemplate");
  });

  test("copy files", () => {
    const appPath = rootPath + "/testTemplate";
    fs.mkdirSync(appPath);

    copyFiles(rootPath + "/src/template", appPath);

    expect(fs.existsSync(appPath + "/package.json")).toBeTruthy();
    expect(fs.existsSync(appPath + "/src/App.tsx")).toBeTruthy();
  });
});
