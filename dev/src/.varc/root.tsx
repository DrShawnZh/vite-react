import { renderClient } from 'varc/lib/index';

const routes = JSON.parse('[{"path":"/","component":"/Users/zhangxiang/projects/vite-react/dev/src/index"}]')

export default renderClient({routes, history: 'browser', rootEle: "root"})


