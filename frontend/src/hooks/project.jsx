import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "./auth";

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await api.get(`projects/${user.id}`);
      setProjects(response.data);
    })();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

function useProject() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("useProject must be used within an ProjectProvider");
  }

  return context;
}

export { ProjectProvider, useProject };
