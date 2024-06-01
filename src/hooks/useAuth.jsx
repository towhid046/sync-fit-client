import { useContext } from "react";
import { UserContext } from "../providers/AuthProvider/AuthProvider";

const useAuth = () => {
  const userAuth = useContext(UserContext);
  return userAuth && userAuth;
};

export default useAuth;
