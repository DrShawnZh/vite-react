import { renderClient } from '{{{importRender}}}';
import React from 'react';

const routes = {{{importRoutes}}};

export default renderClient({routes, history: '{{history}}', rootEle: "{{rootEle}}"})