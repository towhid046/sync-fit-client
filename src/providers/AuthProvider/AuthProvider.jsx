import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "./../../config/firebase";
import PropTypes from "prop-types";
import { TbRuler2 } from "react-icons/tb";
import useAxiosPublic from "./../../hooks/useAxiosPublic";

export const UserContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState("Member");
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedPackage, setSelectedPackage] = useState({});

  const axiosPublic = useAxiosPublic();

  // Register new user:
  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user:
  const logInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // login user with Google:
  const singInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // update user profile:
  const updateUserProfile = (userName, photoUrl) => {
    updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: photoUrl,
    });
  };

  // logout User:
  const logOutUser = () => {
    setLoading(false);
    setUserRole("Member");
    return signOut(auth);
  };

  // Truck the current user:
  useEffect(() => {
    const unSubscribe = () => {
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);

        // send a http request if the current user have:
        if (currentUser) {
          const userInfo = { email: currentUser?.email };
          const loggedUser = {
            email: currentUser.email,
            role: "Member",
          };

          const sendData = async () => {
            try {
              const res = await axiosPublic.get(
                `/user-role/${loggedUser?.email}`
              );
              if (res.data.role === "Admin") {
                setUserRole("Admin");
                return;
              }

              if (res.data.role === "Trainer") {
                setUserRole("Trainer");
                return;
              } else {
                setUserRole("Member");
              }
              // get token:
              const response = await axiosPublic.post("/jwt", userInfo);
              const token = response?.data?.token;
              if (token) {
                localStorage.setItem("access-token", token);
              }

              // save user:
              await axiosPublic.post("/users", loggedUser);
            } catch (error) {
              console.error(error.message);
            } finally {
              setLoading(false);
            }
          };
          sendData();
        } else {
          localStorage.removeItem("access-token");
        }
      });
    };
    return () => unSubscribe();
  }, [axiosPublic]);

  // handle User selected Slot:
  const handleUserSelectedSlot = (slot) => {
    setSelectedSlot(slot);
  };

  // handle User selected Package:
  const handleUserSelectedPackage = (pack) => {
    setSelectedPackage(pack);
  };

  const userInfo = {
    user,
    createNewUser,
    logInUser,
    updateUserProfile,
    logOutUser,
    singInWithGoogle,
    loading,
    setLoading,
    handleUserSelectedSlot,
    selectedSlot,
    handleUserSelectedPackage,
    selectedPackage,
    userRole,
  };

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
