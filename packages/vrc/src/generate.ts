import path, { resolve, join } from "path";
import fs from "fs-extra";
import mustache from "mustache";
import chalk from "chalk";
import { resolveRouteConfig } from "./config";
import rimraf from "rimraf";
import * as T from "./types";

const log = console.log;
const rootPath = process.cwd();

export default class GenerateCache {
  private root: string;
  private cachePath: string;
  constructor(root: string) {
    this.root = root;
    this.cacheDirPath();
    this.cache();
    this.generateHtml();
    // this.generateClient();
  }

  async generateHtml() {
    // log(chalk.green("writing index.html..."));

    const ejsPath = resolve(__dirname, "src/pages/document.ejs");
    let code: string;

    if (fs.existsSync(ejsPath)) {
      code = fs.readFileSync(ejsPath, { encoding: "utf-8" });
      // code.replace()
    } else {
      const htmlTpl = fs.readFileSync(
        resolve(__dirname, "./tpl/html.tpl"),
        "utf-8"
      );
      code = mustache.render(htmlTpl, {});
    }

    try {
      fs.writeFileSync(path.join(this.cachePath, "/index.html"), code, "utf-8");
      log(chalk.green("writing index.html success"));
    } catch (e) {
      log(chalk.red("Err: writing index.html failed"));
    }
  }

  generateClient(that: GenerateCache) {
    // log(chalk.green("writing root.tsx..."))
    const { root, cachePath } = that;

    return async (config?: {
      history: string;
      routes: Partial<T.IRoute>[];
    }) => {
      const { history = "browser", routes = [] } = config;

      const tplPath = resolve(__dirname, "./tpl/client.tpl");
      const code = fs.readFileSync(tplPath, "utf-8");

      const { routes: fomattedRoutes, imports } = formatRouter(routes, root);

      try {
        fs.writeFileSync(
          join(cachePath, "/root.tsx"),
          mustache.render(code, {
            imports: imports.join(";\n"),
            importRender: "virc/lib/index",
            importRoutes: JSON.stringify(fomattedRoutes, null, 2).replace(
              /\"component\": (\"(.+?)\")/g,
              (global, m1, m2) => {
                return `"component": ${m2.replace(/\^/g, '"')}`;
              }
            ),
            rootEle: "root",
            history,
          }),
          "utf-8"
        );
        log(chalk.green("writing root.tsx success"));
      } catch (e) {
        log(
          chalk.red(`Err: writing root.tsx failed; \n
          e
        `)
        );
      }
    };
  }

  cache(): void {
    const { cachePath } = this;
    if (fs.existsSync(cachePath)) {
      rimraf.sync(cachePath);
    }
    fs.mkdirSync(cachePath);
  }

  cacheDirPath() {
    const { root } = this;
    this.cachePath = join(
      rootPath,
      root === "dev" ? "/dev/src/.virc/" : "/src/.virc/"
    );
  }
}

export const formatRouter = (
  routes: Partial<T.IRoute>[],
  root: string,
  imports = []
) => {
  const rootPath = root === "dev" ? "/dev/src" : "/src";

  routes.forEach((item) => {
    if (item.component) {
      let filePath = join(
        process.cwd(),
        rootPath,
        (item.component as string).slice(2)
      );
      const compsName = (item.component as string)
        .slice(2)
        .split("/")
        .map((it) => firstToUpper(it))
        .join("");
      try {
        const stat = fs.lstatSync(filePath);
        if (stat.isDirectory()) {
          imports.push(`import ${compsName} from "${item.component}"`);
          // item.component = `React.lazy(() => import('${filePath}/index'))`;
          item.component = compsName;
        }
      } catch (e) {
        imports.push(`import ${compsName} from "${item.component}"`);
        // item.component = `React.lazy(() => import('${filePath}'))`;
        item.component = compsName;
      }
    }

    if (item.routes && item.routes.length > 0) {
      formatRouter(item.routes, root, imports);
    }
  });
  return { routes, imports };
};

export function firstToUpper(s: string) {
  const formatedS = s.replace(/(-|_|@)/g, "");
  return formatedS.slice(0, 1).toUpperCase() + formatedS.slice(1);
}
