import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "./../../components/shared/LoadingSpinner/LoadingSpinner";

import PropTypes from "prop-types";

const AdminTrainerCommonRoutes = ({ children }) => {
  const { user, loading, userRole, logOutUser } = useAuth();
  if (loading) {
    return <LoadingSpinner />;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (userRole === "Member") {
    const logOut = async () => {
      await logOutUser();
    };
    logOut();
    return <Navigate to={"/login"} />;
  }
  
  if (userRole === "Admin" || userRole === "Trainer") {
    return children;
  }
};

AdminTrainerCommonRoutes.propTypes = {
  children: PropTypes.node,
};

export default AdminTrainerCommonRoutes;
