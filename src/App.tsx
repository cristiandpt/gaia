import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import QuizFlow from "./pages/Quiz/Quiz";

function App() {
  const router = createBrowserRouter(routes);
  //return <RouterProvider router={router} />;
  return <QuizFlow />;
}

export default App;
