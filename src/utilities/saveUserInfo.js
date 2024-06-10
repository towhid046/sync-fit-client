import useAxiosPublic from "../hooks/useAxiosPublic";

const saveUserInfo = (userEmail) => {
  const axiosPublic = useAxiosPublic();
  if (!userEmail) {
    return;
  }
  const saveData = async () => {
    const loggedUser = { email: userEmail, role: "Member" };
    await axiosPublic.post("/users", loggedUser);
  };
  saveData();
};

export default saveUserInfo;
