export interface IRoute {
  redirect: string;
  path: string;
  component: string | React.ComponentClass | React.FC;
  title: string;
  routes: IRoute[];
}

export interface IRouterConfig {
  routes: IRoute[];
  rootEle: string;
  history: "browser" | "hash";
}
