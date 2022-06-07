import customtheme from "./css";
import fs from "fs-extra";
import GenerateCache, { formatRouter, firstToUpper } from "./generate";
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
          component: "@/pages/app/index",
        },
      ],
      "dev"
    )
  ).toEqual({
    routes: [
      {
        path: "/",
        component: "PagesAppIndex",
      },
    ],
    imports: [`import PagesAppIndex from "@/pages/app/index"`],
  });
});

test("dynamic routes", () => {
  expect(
    formatRouter(
      [
        {
          path: "/",
          component: "@/pages/app/index",
        },
      ],
      "dev"
    )
  ).toEqual({
    routes: [
      {
        path: "/",
        component: "PagesAppIndex",
      },
    ],
    imports: [`import PagesAppIndex from "@/pages/app/index"`],
  });
});

test("to upper case", () => {
  expect(firstToUpper("app-test")).toBe("Apptest");
  expect(firstToUpper("app_test")).toBe("Apptest");
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
          component: "@/pages/app/index",
        },
      ],
      dynamic: false,
    });
    const clientPath = process.cwd() + "/src/.virc/root.tsx";
    expect(fs.existsSync(clientPath)).toBeTruthy();
    expect(fs.readFileSync(clientPath, "utf-8")).toBe(
      `
import { renderClient } from 'virc/lib/index';
import React from 'react';

import PagesAppIndex from "@/pages/app/index"

const routes = [
  {
    "path": "/",
    "component": PagesAppIndex
  }
];

export default renderClient({routes, history: 'browser', rootEle: "root"})
    `.trim()
    );
  });

  test("generate dynamic client.ts", () => {
    const generateCLient = Gen.generateClient(Gen);
    generateCLient({
      history: "browser",
      routes: [
        {
          path: "/",
          component: "@/pages/app/index",
        },
      ],
      dynamic: true,
    });
    const clientPath = process.cwd() + "/src/.virc/root.tsx";
    expect(fs.existsSync(clientPath)).toBeTruthy();
    expect(fs.readFileSync(clientPath, "utf-8")).toBe(
      `
import { renderClient } from 'virc/lib/index';
import React from 'react';



const routes = [
  {
    "path": "/",
    "component": React.lazy(() => import('/Users/zhangxiang/projects/vite-react/packages/vrc/src/pages/app/index'))
  }
];

export default renderClient({routes, history: 'browser', rootEle: "root"})
    `.trim()
    );
  });
});
