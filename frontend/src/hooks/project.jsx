import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "./auth";

const ProjectContext = createContext();

const ProjectProvider = ({ children }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.id) {
      (async () => {
        setLoading(true);
        const response = await api.get(`projects/${user.id}`);
        setProjects(response.data);
        setLoading(false);
      })();
    }
  }, [user]);

  const addProject = (newProject) => {
    setProjects([...projects, { ...newProject }]);
  };

  const deleteProject = (id) => {
    const newProjects = projects.filter((project) => project.id !== id);
    setProjects([...newProjects]);
  };

  return (
    <ProjectContext.Provider
      value={{ projects, loading, addProject, deleteProject }}
    >
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
