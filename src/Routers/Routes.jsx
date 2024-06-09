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
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import NewsLetterSubscribers from "../pages/AdminDashboard/NewsletterSubscribers/NewsLetterSubscribers";
import AllTrainers from "../pages/AdminDashboard/AllTrainers/AllTrainers";
import AppliedTrainers from "../pages/AdminDashboard/AppliedTrainers/AppliedTrainers";
import AppliedTrainerDetails from "../pages/AdminDashboard/AppliedTrainerDetails/AppliedTrainerDetails";
import Balance from "../pages/AdminDashboard/Balance/Balance";
import AddNewClass from "../pages/AdminDashboard/AddNewClass/AddNewClass";
import TrainerDashboard from "../pages/TrainerDashboard/TrainerDashboard";
import ManageSlots from "./../pages/TrainerDashboard/ManageSlots/ManageSlots";
import AddNewSlot from "../pages/TrainerDashboard/AddNewSlot/AddNewSlot";
import AddNewForum from "../pages/AddNewForum/AddNewForum";
import ActivityLog from "../pages/UserRoutes/ActivityLog/ActivityLog";
import UserProfile from "../pages/UserRoutes/UserProfile/UserProfile";
import BookedTrainer from "../pages/UserRoutes/BookedTrainer/BookedTrainer";
import AdminRoutes from "./AdminRoutes/AdminRoutes";
import TrainerRoutes from "./TrainerRoutes/TrainerRoutes";
import AdminTrainerCommonRoutes from "./AdminTrainerCommonRoutes/AdminTrainerCommonRoutes";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

const routers = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFoundPage />,
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

      // user specific routes those whose role is user only access
      {
        path: "/activity-log",
        element: (
          <PrivateRoutes>
            <ActivityLog />
          </PrivateRoutes>
        ),
      },
      {
        path: "/user-profile",
        element: (
          <PrivateRoutes>
            <UserProfile />
          </PrivateRoutes>
        ),
      },
      {
        path: "/booked-trainer",
        element: (
          <PrivateRoutes>
            <BookedTrainer />
          </PrivateRoutes>
        ),
      },
    ],
  },

  // Admin Dashboard related routes:
  {
    path: "/admin-dashboard",
    errorElement: <NotFoundPage />,
    element: (
      <AdminRoutes>
        <AdminDashboard />
      </AdminRoutes>
    ),
    children: [
      {
        path: "/admin-dashboard/newsletter-subscribers",
        element: (
          <AdminRoutes>
            <NewsLetterSubscribers />
          </AdminRoutes>
        ),
      },
      {
        path: "/admin-dashboard/all-trainers",
        element: (
          <AdminRoutes>
            <AllTrainers />
          </AdminRoutes>
        ),
      },
      {
        path: "/admin-dashboard/applied-trainers",
        element: (
          <AdminRoutes>
            <AppliedTrainers />
          </AdminRoutes>
        ),
      },
      {
        path: "/admin-dashboard/applied-trainer-details/:appliedTrainerId",
        loader: async ({ params }) =>
          fetch(
            `${import.meta.env.VITE_API_URL}/applied-trainers/${
              params.appliedTrainerId
            }`
          ),
        element: (
          <AdminRoutes>
            <AppliedTrainerDetails />,
          </AdminRoutes>
        ),
      },
      {
        path: "/admin-dashboard/balance",
        element: (
          <AdminRoutes>
            <Balance />
          </AdminRoutes>
        ),
      },
      {
        path: "/admin-dashboard/add-new-class",
        element: (
          <AdminRoutes>
            <AddNewClass />
          </AdminRoutes>
        ),
      },
      {
        path: "/admin-dashboard/add-new-forum",
        element: (
          <AdminTrainerCommonRoutes>
            <AddNewForum />
          </AdminTrainerCommonRoutes>
        ),
      },
    ],
  },

  // Trainer Dashboard relate routes:
  {
    path: "/trainer-dashboard",
    errorElement: <NotFoundPage />,
    element: (
      <TrainerRoutes>
        <TrainerDashboard />
      </TrainerRoutes>
    ),
    children: [
      {
        path: "/trainer-dashboard/manage-slots",
        element: (
          <TrainerRoutes>
            <ManageSlots />
          </TrainerRoutes>
        ),
      },
      {
        path: "/trainer-dashboard/add-new-slot",
        element: (
          <TrainerRoutes>
            <AddNewSlot />
          </TrainerRoutes>
        ),
      },
      {
        path: "/trainer-dashboard/add-new-forum",
        element: (
          <AdminTrainerCommonRoutes>
            <AddNewForum />
          </AdminTrainerCommonRoutes>
        ),
      },
    ],
  },
]);

export default routers;
