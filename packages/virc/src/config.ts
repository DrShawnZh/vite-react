import path from "path";
import fs from "fs-extra";
import chalk from "chalk";
import { ResolvedConfig } from "vite";
import * as T from "./types";
import { loadConfigFromFile } from "vite";
import react from "@vitejs/plugin-react";
import vitePluginImport from "vite-plugin-babel-import";
import resolveTheme from "./css";
import viteStyleImport, { AntdResolve } from "vite-plugin-style-import";
import RenderFromConfigPlugin from "./plugins/config";
import TransCssFile from './plugins/css';

export function resolveAppConfig(cb: T.IPluginCallback): T.UserConfigExport {
  return {
    plugins: [
      RenderFromConfigPlugin({
        routerCallback: cb.configPluginCallback.routerCallback,
      }),
      // TransCssFile(),
      // vitePluginImport([
      //   {
      //     libraryName: "antd",
      //     libraryDirectory: "es",
      //     style(name) {
      //       return `antd/lib/${name}/style/index.less`;
      //     },
      //     ignoreStyles: [],
      //   },
      // ]),
      viteStyleImport({
        resolves: [AntdResolve()],
        libs: [
          {
            libraryName: "antd",
            esModule: true,
            resolveStyle: (name) => {
              return `antd/es/${name}/style/index`;
            },
          },
        ],
      }),
      react(),
    ],
  };
}

export function splitViteConfig(configPath: string = "", root?: string) {
  let resolvePath: string;

  if (configPath && fs.existsSync(path.resolve(__dirname, configPath))) {
    resolvePath = configPath;
  } else {
    const basePath = process.cwd();
    const jsConfig = path.resolve(
      basePath,
      root === "dev" ? "dev/config/virc.config.js" : "config/virc.config.js"
    );
    const tsConfig = path.resolve(
      basePath,
      root === "dev" ? "dev/config/virc.config.ts" : "config/virc.config.ts"
    );

    if (fs.existsSync(jsConfig)) {
      resolvePath = jsConfig;
    } else if (fs.existsSync(tsConfig)) {
      resolvePath = tsConfig;
    } else {
      console.log(chalk.red(`please provide config files!`));
      throw new Error(`please provide config files!`);
    }
  }

  return resolvePath;
}

/**
 * 获取路由配置文件地址
 * @returns
 */
export function resolveRouteConfig(root: string): string {
  const routePath = path.join(
    process.cwd(),
    root === "dev" ? "/dev/config/routes.config.ts" : "/config/routes.config.ts"
  );
  let resolvePath: string;
  if (fs.existsSync(routePath)) {
    resolvePath = routePath;
  } else {
    resolvePath = "";
  }

  return resolvePath;
}
