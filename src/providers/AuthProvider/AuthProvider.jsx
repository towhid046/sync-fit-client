import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../../firebase/firebase.config";
import PropTypes from "prop-types";
import useAxiosPublic from "./../../hooks/useAxiosPublic";

export const UserContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
    return signOut(auth);
  };

  // Truck the current user:
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // send a http request if the current user have:
      if (currentUser) {
        const userInfo = { email: currentUser?.email };
        const setToken = async () => {
          try {
            // set token:
            const response = await axiosPublic.post("/jwt", userInfo);
            const token = response?.data?.token;
            if (token) {
              localStorage.setItem("access-token", token);
            }
          } catch (error) {
            console.error(error.message);
          } finally {
            setLoading(false);
          }
        };
        setToken();
      } else {
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
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
  };

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
