import React, { createContext, useState, useCallback, useEffect } from "react";
import { baseUrl, postRequest } from "../utils/services";
export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
  /* States */
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  console.log("loginInfo:", loginInfo);
  useEffect(() => {
    const user = localStorage.getItem("User");
    setUser(JSON.parse(user));
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  /* Register User CallBack */
  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setRegisterInfo(true);
      setRegisterError(null);
      const response = await postRequest(
        `${baseUrl}/user/register`,
        JSON.stringify(registerInfo)
      );
      setRegisterInfo(false);

      if (response.error) {
        return setRegisterError(response);
      }
      setUser(response);
      localStorage.setItem("User", JSON.stringify(response));
    },
    [registerInfo]
  );

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);
      const response = await postRequest(
        `${baseUrl}/user/login`,
        JSON.stringify(loginInfo)
      );
      setIsLoginLoading(false);

      if (response.error) {
        return setLoginError(response);
      }
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [loginInfo]
  );
  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
