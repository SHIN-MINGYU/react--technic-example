import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Error_404 from "./pages/error/404";

const modules = import.meta.glob("/src/pages/**/*.tsx");
const routes = Object.keys(modules).map((route) => {
  const path = route
    .replace(/\/src\/pages|index|\.tsx$/g, "") // prefix削除
    .replace(/\[\.{3}.+\]/, "*") //
    .replace(/\[(.+)\]/, ":$1");

  return { path, component: lazy(modules[route] as any) };
});

const DynamicRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, component: Component }) => {
        console.log(path, Component);
        return (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback="loading...">
                <Component />
              </Suspense>
            }
          />
        );
      })}
      <Route path="/*" element={<Error_404></Error_404>}></Route>
    </Routes>
  );
};

export default DynamicRouter;
