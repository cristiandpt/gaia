import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import Home from "./pages/LandingPage/LandingPage";

function App() {
  const router = createBrowserRouter(routes);
  //return <RouterProvider router={router} />;
  <Home />;
}

export default App;
