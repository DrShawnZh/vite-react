import routes from "./route.config";
import path from "path";
import theme from "./theme.config";
import legacy from "@vitejs/plugin-legacy";

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
  build: {
    target: "es2015",
    emptyOutDir: true,
    manifest: true,
    optimizeDeps: {
      include: [""],
    },
    rollupOptions: {
      plugins: [
        legacy({
          targets: ["defaults", "not IE 11"],
        }),
      ],
    },
  },
};
