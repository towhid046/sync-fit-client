import { useState } from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUserRole = () => {
  const { user } = useAuth();
  const [userRole, setUserRole] = useState("Member");
  const axiosPublic = useAxiosPublic();

  if (user) {
    const getUserRole = async () => {
      const loggedUser = { email: user?.email, role: "Member" };
      const response = await axiosPublic.post("/users", loggedUser);
      if (response?.status === 200) {
        const res = await axiosPublic.get(`/user-role/${user?.email}`);
        // console.log("Save User: ", res?.data?.role);
        if (res?.data?.role === "Admin") {
          setUserRole("Admin");
          return;
        }
        if (res?.data?.role === "Trainer") {
          setUserRole("Trainer");
        }
      }
    };
    getUserRole();
  }

  return { userRole, setUserRole };
};

export default useUserRole;
