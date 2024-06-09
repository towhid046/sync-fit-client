import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "./../../components/shared/LoadingSpinner/LoadingSpinner";

import PropTypes from "prop-types";

const TrainerRoutes = ({ children }) => {
  const { user, loading, userRole, logOutUser } = useAuth();
  if (loading) {
    return <LoadingSpinner />;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (userRole !== "Trainer") {
    const logOut = async () => {
      await logOutUser();
    };
    logOut();
    return <Navigate to={"/login"} />;
  }
  return children;
};

TrainerRoutes.propTypes = {
  children: PropTypes.node,
};

export default TrainerRoutes;