import chalk from "chalk";
import path from "path";
import fs from "fs-extra";
import * as T from "../types";

const renderFromConfig = (renders?: T.IRenderFromConfig) => {
  return {
    name: "trans-config",
    config(config, { command }) {
      const { theme = {} } = config;
      const { routerCallback } = renders;
      routerCallback && routerCallback(config);

      return {
        ...config,
        // 更改antd主题
        css: {
          preprocessorOptions: {
            less: {
              modifyVars: theme,
              javascriptEnabled: true,
              modules: true,
            },
          },
          modules: {
            generateScopedName: "[name]_[local]_[hash:base64:4]",
            hashPrefix: "prefix",
          },
        },
        root: path.join(process.cwd(), "/src/.varc"),
      };
    },
  };
};

export default renderFromConfig;
