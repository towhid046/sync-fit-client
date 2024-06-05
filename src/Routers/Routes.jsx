import { createBrowserRouter } from "react-router-dom";
import HomePage from "./../pages/HomePage/HomePage";
import Root from "../Root/Root/Root";
import Registration from "../pages/Registration/Registration";
import LogInPage from "./../pages/LogInPage/LogInPage";
import ForumDetails from "./../pages/ForumDetails/ForumDetails";
import Trainers from "../pages/TrainersPage/Trainers/Trainers";
import TrainerDetails from "../pages/TrainerDetails/TrainerDetails";
import TrainerBookedPage from "../pages/TrainerBookedPage/TrainerBookedPage";
import PrivateRoutes from "./PrivateRoutes/PrivateRoutes";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import BeATrainer from "../pages/BeATrainer/BeATrainer";
import ClassesPage from "../pages/ClassesPage/ClassesPage";
import AllForums from "../pages/AllForums/AllForums";
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
        path: "/forums-details/:newId",
        loader: async ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/news/${params.newId}`),
        element: <ForumDetails />,
      },
      {
        path: "/all-trainers",
        element: <Trainers />,
      },
      {
        path: "/trainer-details/:trainerId",
        loader: async ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/trainers/${params.trainerId}`),
        element: <TrainerDetails />,
      },
      {
        path: "/all-classes",
        loader: async () =>
          fetch(`${import.meta.env.VITE_API_URL}/total-classes-count`),
        element: <ClassesPage />,
      },
      {
        path: "/all-forums",
        loader: async () =>
          fetch(`${import.meta.env.VITE_API_URL}/total-forums-count`),
        element: <AllForums />,
      },

      // Private routers:

      {
        path: "/trainer-booking/:trainerId",
        loader: async ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/trainers/${params.trainerId}`),
        element: (
          <PrivateRoutes>
            <TrainerBookedPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/payment/:trainerId",
        loader: async ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/trainers/${params.trainerId}`),
        element: (
          <PrivateRoutes>
            <PaymentPage />
          </PrivateRoutes>
        ),
      },
      {
        path: "/be-a-trainer",
        element: (
          <PrivateRoutes>
            <BeATrainer />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default routers;
