// components/ProjectTable.js
import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import io from "socket.io-client";
import { userContext } from "../context/userContext/userContext";
import { toast } from "react-toastify";
import RealTimeUpdates from "../pages/RealTimeUpdates";

const socket = io("ws://webscrappingbackend.vercel.app");

const ProjectTable = ({ projects, setprojects }) => {
  const [projectStatus, setProjectStatus] = useState({});
  const [ifNoCategory, setifNoCategory] = useState(false);
  const { setShowSpecificProject, logout } = useContext(userContext);

  useEffect(() => {
    socket.on("projectStatusUpdate", (data) => {
      // Update project status in the local state
      setProjectStatus((prevStatus) => {
        const updatedStatus = { ...prevStatus, [data.projectId]: data.status };

        // Update the projects state with the new status from socket
        setprojects((prevProjects) =>
          prevProjects.map((project) =>
            project.id === data.projectId
              ? { ...project, status: data.status } // Update project status in the list
              : project
          )
        );

        return updatedStatus;
      });
    });

    // Clean up the effect
    return () => {
      socket.off("projectStatusUpdate");
    };
  }, [setprojects]);

  //! delete project
  // const handleDelete = async (id) => {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:5000/api/projects/delete/${id}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );

  //     if (!res.ok) {
  //       throw new Error("Failed to delete project");
  //     }

  //     const delProject = await res.json();
  //     console.log(delProject);
  //     // Update the projects state to remove the deleted project
  //     setprojects((prevProjects) => prevProjects.filter((p) => p._id !== id));
  //   } catch (error) {
  //     console.error("Error deleting project:", error);
  //   }
  // };

  // Utility function to check for token expiration
  const handleTokenExpiration = (res, data) => {
    if (
      res.status === 401 ||
      data?.msg === "Token Expired. Please log in again."
    ) {
      logout();
      Navigate("/login");
      return true; // Indicates token has expired
    }
    return false; // Token is valid
  };

  // Handle retry with token expiration check
  const handleRetry = async (project) => {
    try {
      const newProject = {
        vendorId: project.vendorId,
        projectName: project.projectName,
        city: project.city,
        businessCategory: project.businessCategory,
        status: "Running",
        date: new Date(),
      };

      const res = await fetch(
        "https://webscrappingbackend.vercel.app/api/projects/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(newProject),
        }
      );

      const data = await res.json();

      if (handleTokenExpiration(res, data)) return;

      if (!res.ok) throw new Error(data.message || "Failed to add project");

      setprojects((prevProjects) => [...prevProjects, data]);
    } catch (error) {
      console.error("Error adding project:", error.message);
    }
  };
  // Handle fetching specific projects
  const handleSpecificProject = async (project) => {
    try {
      const res = await fetch(
        `https://webscrappingbackend.vercel.app/specific-lead/${encodeURIComponent(
          project.businessCategory
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      if (handleTokenExpiration(res, data)) return;

      if (!res.ok) {
        setifNoCategory(true);
        setShowSpecificProject([]);
        toast(`No project found for ${project.businessCategory}`);
        return;
      }

      if (data.length === 0) {
        setifNoCategory(true);
        setShowSpecificProject([]);
        toast.info(`No project found for ${project.businessCategory}`);
      } else {
        setShowSpecificProject(data);
        setifNoCategory(false);
      }
    } catch (error) {
      console.error("Error showing project:", error.message);
      toast.error("An error occurred while fetching project data");
    }
  };

  // Handle canceling a project
  const handleCancel = async (project) => {
    try {
      const res = await fetch(
        `https://webscrappingbackend.vercel.app/cancelLead?projectId=${project.projectId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await res.json();

      if (handleTokenExpiration(res, data)) return;

      if (!res.ok) throw new Error(data.message || "Failed to cancel project");

      setProjectStatus((prevStatus) => ({
        ...prevStatus,
        [project.projectId]: "Canceled",
      }));

      toast.success("Project canceled successfully");
    } catch (error) {
      console.error("Error canceling project:", error.message);
      toast.error("An error occurred while canceling the project");
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>City</th>
            <th>Category</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <tr key={index}>
                <td>{project.projectName}</td>
                <td>{project.city}</td>
                <td>{project.businessCategory}</td>
                <td>
                  {projectStatus[project.id]
                    ? projectStatus[project.id]
                    : project.status}
                </td>

                <td>
                  {project.status === "Running" ? (
                    <>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleCancel(project)}
                      >
                        Cancel
                      </button>
                      <Link
                        to="/specificleads"
                        className="btn btn-success"
                        onClick={() => handleSpecificProject(project)}
                      >
                        View Leads
                      </Link>
                    </>
                  ) : project.status === "Finished" ? (
                    <Link
                      to="/specificleads"
                      className="btn btn-success"
                      onClick={() => handleSpecificProject(project)}
                    >
                      View Leads
                    </Link>
                  ) : (
                    <button
                      className="btn btn-warning"
                      onClick={() => handleRetry(project)}
                    >
                      Retry
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <h1>
              {ifNoCategory
                ? "No Project Found for this Category"
                : "Loading..."}
            </h1>
          )}
        </tbody>
      </table>
      <h1>Please wait a few minutes until the data is scraped.</h1>
    </div>
  );
};

export default ProjectTable;
