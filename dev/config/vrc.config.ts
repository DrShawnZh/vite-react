import routes from "./routes.config";
import theme from './theme.config';

export default {
  root: ".virc/index.html",
  history: "browser",
  routes,
  theme,
  build: {
    dynamicImportVarsOptions: {
      excludes: ["src/**/*"],
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
};
