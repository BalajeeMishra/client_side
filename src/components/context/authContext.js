import React, { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { spinnerContext } from "./spinnerContext";
import axios from "axios";
export const authContext = createContext();
const { Provider } = authContext;

export const AuthProvider = ({ children }) => {
  const { loading, setLoading } = useContext(spinnerContext);
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  const navigate = useNavigate();
  //for spinner purpose.
  const SignOut = async () => {
    setLoading(true);
    const signout = await axios.get("/api/user/logout");
    if (signout.status == 200) {
      localStorage.removeItem("authtoken");
      // alert("you are signed out successfully");
      setLoading(false);
    }
  };

  // for registeration
  const SignUp = async (phoneInput, passwordValue) => {
    setLoading(true);
    const dataTosubmit = await axios.post("/api/user/register", {
      phoneInput,
      passwordValue,
    });
    if (dataTosubmit.status == 200) {
      localStorage.setItem("authtoken", dataTosubmit.data.token);
      setLoading(false);
      alert("Thanks for sign up");
    }
  };
  // for login
  const SignIn = async (phoneInput, passwordValue) => {
    setLoading(true);
    // navigate("/home");
    const dataTosubmit = await axios.post("/api/user/login", {
      phoneInput,
      passwordValue,
    });
    if (dataTosubmit.status == 200) {
      localStorage.setItem("authtoken", dataTosubmit.data.token);
      setLoading(false);
      alert("You are logged in");
    }
  };
  // currentuser

  const getCurrentUser = () => {
    const decodedJwt = JSON.parse(atob(authtoken.split(".")[1]));
    if (decodedJwt.exp * 1000 < Date.now()) {
      localStorage.removeItem("authtoken");
    }
    return localStorage.getItem("authtoken");
  };
  const authtoken = localStorage.getItem("authtoken");
  return (
    <Provider
      value={{
        SignIn,
        SignOut,
        SignUp,
        loading,
        isRevealPwd,
        setIsRevealPwd,
        getCurrentUser,
        authtoken,
      }}
    >
      {children}
    </Provider>
  );
};
