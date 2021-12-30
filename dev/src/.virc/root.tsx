import { renderClient } from 'virc/lib/index';

const routes = [
  {
    "path": "/",
    "component": "/Users/zhangxiang/projects/vite-react/dev/src/index"
  }
];

export default renderClient({routes, history: 'browser', rootEle: "root"})


