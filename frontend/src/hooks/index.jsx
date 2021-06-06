import React from "react";
import { AuthProvider } from "./auth";
import { ProjectProvider } from "./project";

const AppProvider = ({ children }) => (
  <AuthProvider>
    <ProjectProvider>{children}</ProjectProvider>
  </AuthProvider>
);

export default AppProvider;
