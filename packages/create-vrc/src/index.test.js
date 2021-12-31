import { copyFiles } from "./util.js";
import "./index";
import fs from "fs-extra";
import rimraf from "rimraf";

// describe("copy", () => {
//   const rootPath = process.cwd();

//   afterAll(() => {
//     rimraf.sync(rootPath + "/testTemplate");
//   });

//   test("copy files", () => {
//     const appPath = rootPath + "/testTemplate";
//     fs.mkdirSync(appPath);

//     copyFiles(rootPath + "/src/template", appPath);

//     expect(fs.existsSync(appPath + "/package.json")).toBeTruthy();
//     expect(fs.existsSync(appPath + "/src/App.tsx")).toBeTruthy();
//   });
// });

describe("cli", () => {
  const rootPath = process.cwd();

  afterAll(() => {
    rimraf.sync(rootPath + "/myApp");
  }, 5000);

  test("cli", () => {
    const appPath = rootPath + "/myApp";

    expect(fs.existsSync(appPath + "/package.json")).toBeTruthy();
    expect(fs.existsSync(appPath + "/src/App.tsx")).toBeTruthy();
  });

  test("package.json name", () => {
    const appPath = rootPath + "/myApp";

    const packageJson = JSON.parse(fs.readFileSync(appPath + "/package.json"));
    
    expect(packageJson.name).toBe("myApp");
  }, 1000);
});
