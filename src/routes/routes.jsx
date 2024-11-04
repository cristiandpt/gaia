import getComponentByPath from "./routes-components";
import PrivateRoutes from "../shared/PrivateRoutes";
import NoAuthorizedLayout from "../shared/authentication/NoAuthorizedLayout";
import { Navigate } from "react-router-dom";
//** The authorized and unauthorized paths are defined here
const AuthorizedPaths = [
  "erosion",
  "home",
  "menu2",
  "menu",
  "loss-of-biodiversity",
  "deforest",
];
const UnauthorizedPaths = [
  "gaia",
  "login",
  "register",
  "google-signin",
  "signin",
];

/** Get the routes associated to the  determinade routes mode
 */
const getPathsMapping = (pathArray) => {
  return pathArray.map((path) => ({
    path: path,
    element: getComponentByPath(path),
  }));
};

/** Application routes definitions
 * Array that defined the authorized and aunathorized paths.
  The corresponding components is wrrapped in a layout for routing management ouput.
*/
const routes = [
  {
    path: "/unauthenticated",
    element: <NoAuthorizedLayout />, // Layout for unauthorized access
    children: getPathsMapping(UnauthorizedPaths),
  },
  {
    path: "/",
    element: <PrivateRoutes />,
    children: getPathsMapping(AuthorizedPaths),
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export default routes;
