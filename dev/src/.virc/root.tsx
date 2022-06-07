import { renderClient } from '@virc/virc-rebuild/dist/index.js';
import React from 'react';

import Index from "./index"

const routes = [
  {
    "path": "/",
    "component": Index
  }
];

export default renderClient({routes, history: 'browser', rootEle: "root"})