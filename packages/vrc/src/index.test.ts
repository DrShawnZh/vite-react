import customtheme from "./css";
import fs from "fs-extra";
import GenerateCache, { formatRouter } from "./generate";
import rimraf from "rimraf";

test("antd theme", () => {
  const theme = { "@primary-color": "#fff" };
  expect(customtheme(theme)).toEqual(expect.objectContaining(theme));
});

test("routes", () => {
  expect(
    formatRouter(
      [
        {
          path: "/",
          component: "./index",
        },
      ],
      "dev"
    )
  ).toEqual([
    {
      path: "/",
      component: process.cwd() + "/dev/src/index",
    },
  ]);
});

describe("generate", () => {
  const Gen = new GenerateCache("");

  afterAll(() => {
    rimraf.sync(process.cwd() + "/src/.virc");
  });

  test("generate html", () => {
    const htmlPath = process.cwd() + "/src/.virc/index.html";
    expect(fs.existsSync(htmlPath)).toBeTruthy();
  });

  test("generate client.ts", () => {
    const generateCLient = Gen.generateClient(Gen);
    generateCLient({
      history: "browser",
      routes: [
        {
          path: "/",
          component: "./index",
        },
      ],
    });
    const clientPath = process.cwd() + "/src/.virc/root.tsx";
    expect(fs.existsSync(clientPath)).toBeTruthy();
    expect(fs.readFileSync(clientPath, "utf-8")).toBe(
      `
import { renderClient } from 'virc/lib/index';

const routes = [
  {
    "path": "/",
    "component": "/Users/zhangxiang/projects/vite-react/packages/vrc/src/index"
  }
];

export default renderClient({routes, history: 'browser', rootEle: "root"})
    `.trim()
    );
  });
});
