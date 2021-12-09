import chalk from "chalk";
import path from "path";
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
            },
          },
        },
        root: path.join(process.cwd(), "/src/.varc"),
      };
    },
  };
};

export default renderFromConfig;
