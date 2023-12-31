import React, { useState, useEffect } from "react";
import authService from "../services/auth.service";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };
  const storedToken = localStorage.getItem("authToken");

  const authenticateUser = () => {
    // Get the stored token from the localStorage

    // If the token exists in the localStorage
    if (storedToken) {
      // axios.get(
      //  `${API_URL}/auth/verify`,
      //  { headers: { Authorization: `Bearer ${storedToken}`} }
      // )

      authService
        .verify()
        .then((response) => {
          const user = response.data;
          // Update state variables
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          // If the server sends an error response (invalid token) ❌
          // Update state variables
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser({});
        });
    } else {
      // If the token is not available
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const removeToken = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    // Run the function after the initial render,
    // after the components in the App render for the first time.
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        user,
        sidebarOpen,
        storeToken,
        authenticateUser,
        logOutUser,
        setSidebarOpen,
        updateUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
