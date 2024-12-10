import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import QuizFlow from "./pages/Quiz/Quiz";
import GaiaObjectCapture from "./components/questions/GaiaObjectCapture";

function App() {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
  //return <QuizFlow />;
  //return <GaiaObjectCapture />;
}

export default App;
