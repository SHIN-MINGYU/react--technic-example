import Layout from "./components/Layouts";
import DynamicRouter from "./Router";

function App() {
  return (
    <Layout>
      <DynamicRouter pagesPath="./pages"></DynamicRouter>
    </Layout>
  );
}

export default App;
