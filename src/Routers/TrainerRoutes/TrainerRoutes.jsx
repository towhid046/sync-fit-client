import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "./../../components/shared/LoadingSpinner/LoadingSpinner";

import PropTypes from "prop-types";
import useUserRole from "../../hooks/useUserRole";

const TrainerRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const {userRole, setUserRole} = useUserRole();
  
  if (loading || userRole === 'Member') {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (userRole !== "Trainer") {
    const logOut = async () => {
      await logOutUser();
      setUserRole('Member')
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
