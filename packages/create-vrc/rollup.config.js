import path from "path";
import copy from "rollup-plugin-copy";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

export default {
  input: path.resolve(__dirname, "./src/index.js"),
  output: {
    dir: path.resolve(__dirname, "dist"),
    entryFileNames: `[name].js`,
    chunkFileNames: "dep-[hash].js",
    exports: "named",
    format: "cjs",
    externalLiveBindings: false,
    freeze: false,
    sourcemap: true,
  },
  plugins: [
    copy({
      targets: [{ src: "src/template", dest: "dist" }],
    }),
    resolve({ extensions: [".js", ".jsx", ".ts", ".tsx"] }),
    commonjs({
      include: /node_modules/,
    }),
  ],
  treeshake: {
    moduleSideEffects: "no-external",
    propertyReadSideEffects: false,
    tryCatchDeoptimization: false,
  },
};
