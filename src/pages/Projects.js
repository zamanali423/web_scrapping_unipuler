// pages/Projects.js
import React, { useContext, useEffect, useState } from "react";
import ProjectTable from "../components/ProjectTable";
import AddProjects from "../components/AddProjects";
import { userContext } from "../context/userContext/userContext";

const Projects = () => {
  const [showAddProject, setShowAddProject] = useState(false);
  const [projects, setprojects] = useState([]);
  const { user } = useContext(userContext);

  const handleAddProject = () => {
    setShowAddProject(true);
  };

  console.log("user", user.user);
  const email = user.user?.email;
  useEffect(() => {
    const getProject = async () => {
      try {
        console.log("user email", email);
        const res = await fetch(`https://webscrappingbackend.vercel.app/api/projects/${email}`);
        const projects = await res.json();
        setprojects(projects);
      } catch (error) {
        console.log(error);
      }
    };
    getProject();
  }, []);
  return (
    <div>
      <h2>
        All Projects{" "}
        <span className="btn btn-primary float-end" onClick={handleAddProject}>
          Add
        </span>
      </h2>

      {showAddProject ? (
        <AddProjects
          setShowAddProject={setShowAddProject}
          setprojects={setprojects}
        />
      ) : (
        <ProjectTable projects={projects} setprojects={setprojects} />
      )}
    </div>
  );
};

export default Projects;
