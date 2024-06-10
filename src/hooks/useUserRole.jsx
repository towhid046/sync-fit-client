import { useState } from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUserRole = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState("Member");
  const axiosPublic = useAxiosPublic();

  if (user) {
    const getUserRole = async () => {
      const res = await axiosPublic.get(`/user-role/${user?.email}`);
      if (res?.data?.role === "Admin") {
        setUserRole("Admin");
        return;
      }
      if (res?.data?.role === "Trainer") {
        setUserRole("Trainer");
      }
    };
    getUserRole();
  }

  return { userRole, setUserRole };
};

export default useUserRole;
