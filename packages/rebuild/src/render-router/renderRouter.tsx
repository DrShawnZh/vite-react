import { Switch, Route, Redirect } from "react-router-dom";
import React, { useEffect } from "react";
import * as T from "./types";

const ComponentInRouter: React.FC<{
  // Component: React.ComponentClass | React.FC;
  route: Partial<T.IRoute>;
}> = ({ children, route }) => {
  useEffect(() => {
    if (route.title) {
      document.title = route.title;
    }
  }, []);

  return <>{children}</>;
};

const RoutesComponent: React.FC<{ route: Partial<T.IRoute> }> = ({ route }) => {
  const { path, component, routes = [], redirect, ...restProps } = route;

  let Component: React.ComponentClass | React.FC | string = component;

  if (redirect) {
    return (
      <Redirect key={path} exact {...restProps} from={path} to={redirect} />
    );
  }

  return (
    <Route
      path={path}
      {...restProps}
      render={(props) => {
        if (!component && routes.length > 0) {
          return renderSwitch({ routes });
        } else if (!component && routes.length === 0) {
          throw new Error(`path ${route.path} need components`);
        }

        return (
          <ComponentInRouter route={route}>
            <React.Suspense fallback={<div>loading</div>}>
              <Component {...props}>
                {routes.length > 0 && renderSwitch({ routes })}
              </Component>
            </React.Suspense>
          </ComponentInRouter>
        );
      }}
    ></Route>
  );
};

export const renderSwitch: React.FC<{ routes: Partial<T.IRoute>[] }> = (
  props
) => {
  const { routes } = props;
  return <Switch>{routes.map((route) => RoutesComponent({ route }))}</Switch>;
};
