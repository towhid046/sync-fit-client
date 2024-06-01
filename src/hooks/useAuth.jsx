import { useContext } from "react";
import { UserContext } from "../providers/AuthProvider/AuthProvider";

const useAuth = () => {
  return useContext(UserContext);
};

export default useAuth;
