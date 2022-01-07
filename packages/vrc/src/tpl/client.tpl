import { renderClient } from '@virc/virc-rebuild/dist/render-router';
import React from 'react';

{{{imports}}}

const routes = {{{importRoutes}}};

export default renderClient({routes, history: '{{history}}', rootEle: "{{rootEle}}"})