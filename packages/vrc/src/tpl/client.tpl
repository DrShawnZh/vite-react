import { renderClient } from '@virc/virc-rebuild/lib/render-router/index.js';
import React from 'react';

{{{imports}}}

const routes = {{{importRoutes}}};

export default renderClient({routes, history: '{{history}}', rootEle: "{{rootEle}}"})