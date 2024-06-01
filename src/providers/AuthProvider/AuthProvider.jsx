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

export const UserContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register new user:
  const createNewUser = (email, password) => {
    setLoading(TbRuler2);
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
    setLoading(true);
    updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: photoUrl,
    });
  };

  // logout User:
  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Truck the current user:
  useEffect(() => {
    const unSubscribe = () => {
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
        console.log(currentUser)
      });
    };
    return () => unSubscribe();
  }, []);

  const userInfo = {
    user,
    createNewUser,
    logInUser,
    updateUserProfile,
    logOutUser,
    singInWithGoogle,
  };

  return (
    <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
