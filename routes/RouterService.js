import { createRef } from 'react';

const routerRef = createRef();
const isRouterReady = createRef();

const navigate = (name, params) => {
  if (isRouterReady.current && routerRef.current) {
    routerRef.current.navigate(name, params);
  }
};

export { routerRef, isRouterReady, navigate };
