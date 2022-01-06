import { renderClient } from '{{{importRender}}}';
import React from 'react';

{{{imports}}}

const Comps: React.FC = () => {

  return <div>tessssss</div>
}

const routes = {{{importRoutes}}};

export default renderClient({routes, history: '{{history}}', rootEle: "{{rootEle}}"})