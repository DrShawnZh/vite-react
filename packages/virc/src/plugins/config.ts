import chalk from "chalk";
import path from "path";
import fs from "fs-extra";
import * as T from "../types";
import pxtorem from "postcss-pxtorem";

const renderFromConfig = (renders?: T.IRenderFromConfig) => {
  return {
    name: "trans-config",
    config(config, { command }) {
      const { theme = {}, build = {}, css = {}, ...rest } = config;
      const { routerCallback } = renders;
      routerCallback && routerCallback(config);

      return {
        ...rest,
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
          ...css,
        },
        root: path.join(process.cwd(), "/src/.virc"),
        build: {
          outDir:
            config.build && config.build.outDir
              ? config.build.outDir
              : `../../dist`,
          ...build,
        },
      };
    },
  };
};

export default renderFromConfig;
