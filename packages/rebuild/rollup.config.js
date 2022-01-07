import path from "path";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import babel, { getBabelOutputPlugin } from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import typescript2 from "rollup-plugin-typescript2";
import rolluppostcss from "rollup-plugin-postcss";

const basicConfig = {
  output: {},
};

export default [
  {
    input: { index: path.resolve(__dirname, "./src/rebuild-antd/index.tsx") },
    output: {
      dir: path.resolve(__dirname, "dist"),
      entryFileNames: `rebuild-antd/[name].js`,
      chunkFileNames: "rebuild-antd/chunks/dep-[hash].js",
      exports: "named",
      format: "es",
      externalLiveBindings: false,
      freeze: false,
      sourcemap: true,
    },
    plugins: [
      resolve({ extensions: [".js", ".jsx", ".ts", ".tsx"] }),
      typescript2(),
      babel({
        presets: ["@babel/preset-env", "@babel/preset-react"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        exclude: /node_modules/,
      }),
      commonjs({
        include: /node_modules/,
      }),
      rolluppostcss({
        extensions: [".less"],
        use: {
          less: {
            javascriptEnabled: true,
          },
        },
      }),
    ],
    /**
     * import dayjsGenerateConfig from 'rc-picker/es/generate/dayjs';
import generateCalendar from 'antd/es/calendar/generateCalendar';
import 'antd/es/calendar/style';
import dayjsGenerateConfig from "rc-picker/es/generate/dayjs";
import generatePicker from "antd/es/date-picker/generatePicker";
import "antd/es/date-picker/style/index";
     */
    external: [
      ...Object.keys(require("./package.json").dependencies),
      "rc-picker/es/generate/dayjs",
      "antd/es/calendar/generateCalendar",
      "antd/es/calendar/style",
      "antd/es/date-picker/generatePicker",
      "antd/es/date-picker/style/index",
    ],
  },
  {
    input: { index: path.resolve(__dirname, "./src/render-router/index.tsx") },
    output: {
      dir: path.resolve(__dirname, "dist"),
      name: "index",
      entryFileNames: `render-router/[name].js`,
      format: "es",
      sourcemap: true,
    },
    plugins: [
      resolve({ extensions: [".js", ".jsx", ".ts", ".tsx"] }),
      typescript2({
        tsconfig: "./tsconfig.json", // 导入本地ts配置
        extensions: [".js", ".ts"],
      }),
      commonjs({
        include: /node_modules/,
      }),
    ],
    external: [...Object.keys(require("./package.json").dependencies)],
  },
];
