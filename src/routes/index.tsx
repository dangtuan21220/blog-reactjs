/* eslint-disable no-constant-condition */
import BaseLayout from "components/Layouts/Base";
import { Fragment, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { RouteType } from "types";
import { PrivateRouter } from "./private";
import { PublicRouter } from "./public";
import Loading from "components/elements/Loading";
import { shallowEqual, useSelector } from "react-redux";
import { UserToken } from "store/selector";

const Router = () => {
  const userToken = useSelector(UserToken, shallowEqual);

  const checkLayout = (route: RouteType) => {
    let Layout: any = BaseLayout;
    if (route.layout) {
      Layout = route.layout;
    } else if (route.layout === null) {
      Layout = Fragment;
    }
    return Layout;
  };
  return (
    <Routes>
      {userToken
        ? PrivateRouter.map((route: RouteType, index: number) => {
            const Container = route.element;
            const Layout = checkLayout(route);
            return (
              <Route
                path={route.path}
                key={index}
                element={
                  <Layout>
                    <Suspense fallback={<Loading />}>
                      <Container />
                    </Suspense>
                  </Layout>
                }
              />
            );
          })
        : PublicRouter.map((route, index) => {
            const Container = route.element;
            const Layout = checkLayout(route);
            return (
              <Route
                path={route.path}
                key={index}
                element={
                  <Layout>
                    <Suspense fallback={<Loading />}>
                      <Container />
                    </Suspense>
                  </Layout>
                }
              />
            );
          })}
    </Routes>
  );
};

export default Router;
