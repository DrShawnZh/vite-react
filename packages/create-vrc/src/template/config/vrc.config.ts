import routes from "./route.config";
import path from "path";
import theme from "./theme.config";

export default {
  routes,
  theme,
  // esbuild: {
  //   jsxInject: `import React from 'react'`,
  // },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  server: {
    proxy: {
      "/tenant": {
        // target: "http://172.23.0.102:9200/",
        target: "http://172.22.6.3:9200/",
        changeOrigin: true,
      },
    },
  },
};
