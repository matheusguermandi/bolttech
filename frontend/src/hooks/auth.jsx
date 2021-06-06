import React, { useEffect, createContext, useState, useContext } from "react";
import api from "../services/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem("@bolttech:token");
    const user = localStorage.getItem("@bolttech:user");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return { token: "", user: {} };
  });

  useEffect(() => {
    (async () => {
      try {
        await api.post("/sessions/verify", {
          token: localStorage.getItem("@bolttech:token"),
        });
      } catch (error) {
        signOut();
      }
    })();
  }, []);

  const signIn = async (email, password) => {
    const response = await api.post("/sessions", {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    window.localStorage.setItem("@bolttech:token", token);
    window.localStorage.setItem("@bolttech:user", JSON.stringify(user));

    setData({ token, user });
  };

  const signOut = async () => {
    delete api.defaults.headers.authorization;

    window.localStorage.removeItem("@bolttech:token");
    window.localStorage.removeItem("@bolttech:user");

    setData({});
  };

  const setUser = async (data) => {
    const { token, user } = data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    window.localStorage.setItem("@bolttech:token", token);
    window.localStorage.setItem("@bolttech:user", JSON.stringify(user));

    setData({ token, user });
  };

  const isAuthenticated = () =>
    localStorage.getItem("@bolttech:token") !== null;

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, setUser, isAuthenticated, user: data.user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
