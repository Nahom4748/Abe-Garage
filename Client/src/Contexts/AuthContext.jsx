// src/Contexts/AuthContext.js

import React, { useState, useEffect, useContext } from "react";
import getAuth from "../util/employeeAuthHeader";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [userType, setUserType] = useState();

  useEffect(() => {
    const checkAuth = async () => {
      const loggedInEmployee = await getAuth();

      if (loggedInEmployee.employee_token) {
        setIsLogged(true);
        setEmployee(loggedInEmployee);
        setUserType(loggedInEmployee.employee_role);
        if (loggedInEmployee.employee_role === 3) {
          setIsAdmin(true);
        }
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    setIsLogged(false);
    setIsAdmin(false);
    setEmployee(null);
    localStorage.removeItem("employee");
  };

  const value = {
    isLogged,
    isAdmin,
    setIsAdmin,
    setIsLogged,
    setEmployee,
    employee,
    logout,
    userType,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
