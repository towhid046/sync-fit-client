import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "./../../components/shared/LoadingSpinner/LoadingSpinner";

import PropTypes from "prop-types";
import useUserRole from "../../hooks/useUserRole";

const AdminTrainerCommonRoutes = ({ children }) => {
  const { user, loading, logOutUser } = useAuth();
  const { userRole } = useUserRole();

  if (loading || userRole === 'Member') {
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
  return children;
};

AdminTrainerCommonRoutes.propTypes = {
  children: PropTypes.node,
};

export default AdminTrainerCommonRoutes;
