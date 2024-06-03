import { createBrowserRouter } from "react-router-dom";
import HomePage from "./../pages/HomePage/HomePage";
import Root from "../Root/Root/Root";
import Registration from "../pages/Registration/Registration";
import LogInPage from "./../pages/LogInPage/LogInPage";
import ForumDetails from "./../pages/ForumDetails/ForumDetails";
import Trainers from "../pages/TrainersPage/Trainers/Trainers";
import TrainerDetails from "../pages/TrainerDetails/TrainerDetails";
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
      {
        path: "/login",
        element: <LogInPage />,
      },
      {
        path: "/forums-details/:forumId",
        loader: async ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/forums/${params.forumId}`),
        element: <ForumDetails />,
      },
      {
        path: '/all-trainers',
        element: <Trainers/>
      },
      {
        path: "/trainer-details/:trainerId",
        loader: async ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/trainers/${params.trainerId}`),
        element: <TrainerDetails />,
      },
    ],
  },
]);

export default routers;
