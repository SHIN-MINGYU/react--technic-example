import { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

type Props = {
  pagesPath: string;
};

const DynamicRouter = ({ pagesPath }: Props) => {
  return (
    <Routes>
      <Route
        path="/*"
        element={<Renderer pagesPath={pagesPath}></Renderer>}></Route>
    </Routes>
  );
};

export default DynamicRouter;

const Renderer = ({ pagesPath }: Props) => {
  const location = useLocation();

  const Page = lazy(() =>
    import(pagesPath + location.pathname).catch((err) => {
      console.log(pagesPath);
      return import(pagesPath + "/error/404");
    })
  );

  return (
    <Suspense fallback="loading...">
      <Page></Page>
    </Suspense>
  );
};
