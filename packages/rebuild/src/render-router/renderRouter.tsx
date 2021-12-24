import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import React, { ReactNode, useEffect, useState } from "react";
import { render } from "react-dom";
import * as T from "./types";

const ComponentInRouter: React.FC<{
  // Component: React.ComponentClass | React.FC;
  route: T.IRoute;
}> = ({ children, route }) => {
  useEffect(() => {
    if (route.title) {
      console.log(route.title, "title");
      document.title = route.title;
    }
  }, []);

  return <>{children}</>;
};

const RoutesComponent: React.FC<{ route: T.IRoute }> = ({ route }) => {
  const { path, component, routes = [], redirect, ...restProps } = route;

  let Component: React.ComponentClass | React.FC;

  if (typeof component === "string") {
    // @ts-ignore
    Component = React.lazy(() => import(component + ".tsx"));
  }

  if (redirect) {
    return (
      <Redirect key={path} exact {...restProps} from={path} to={redirect} />
    );
  }

  if (!redirect && !component && routes.length > 0) {
    return renderSwitch({ routes });
  }

  return (
    <Route
      key={path}
      path={path}
      {...restProps}
      render={(props) => {
        console.log("object");

        if (!Component) {
          throw new Error(`path ${route.path} need components`);
          return;
        }

        return (
          <React.Suspense fallback={"loading"}>
            <ComponentInRouter route={route}>
              <Component {...props}>
                {routes.length > 0 && renderSwitch({ routes })}
              </Component>
            </ComponentInRouter>
          </React.Suspense>
        );
      }}
    ></Route>
  );
};

export const renderSwitch: React.FC<{ routes: T.IRoute[] }> = (props) => {
  const { routes } = props;
  return <Switch>{routes.map((route) => RoutesComponent({ route }))}</Switch>;
};
