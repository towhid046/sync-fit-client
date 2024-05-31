import { createBrowserRouter } from "react-router-dom";
import HomePage from "./../pages/HomePage/HomePage";
import Root from "../Root/Root/Root";
import Registration from "../pages/Registration/Registration";
const routers = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/registration",
        element: <Registration />,
      },
    ],
  },
]);

export default routers;
