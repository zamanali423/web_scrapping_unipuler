// components/ProjectTable.js
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { userContext } from "../context/userContext/userContext";
import { toast } from "react-toastify";

const socket = io("wss://webscrappingbackend.vercel.app", {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 2000
});

socket.on("connect_error", (error) => {
  console.error("WebSocket connection error:", error);
});


socket.on("connect", () => {
  console.log("Connected to WebSocket server");
});

const ProjectTable = ({ projects, setprojects }) => {
  const [projectStatus, setProjectStatus] = useState({});
  const [ifNoCategory, setifNoCategory] = useState(false);
  const { setShowSpecificProject } = useContext(userContext);

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
  //       `https://webscrappingbackend.vercel.app/api/projects/delete/${id}`,
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

  //! retry project
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

      const res = await fetch("https://webscrappingbackend.vercel.app/api/projects/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });

      if (!res.ok) {
        throw new Error("Failed to add project");
      }
      const createdProject = await res.json();
      console.log(createdProject);
      // handleDelete(project._id);

      // Update the projects state to include the newly created project
      setprojects((prevProjects) => [...prevProjects, createdProject]);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };
  //! specific project
  const handleSpecificProject = async (project) => {
    console.log("specific", project.businessCategory);
    try {
      const response = await fetch(
        `https://webscrappingbackend.vercel.app/specific-lead/${encodeURIComponent(
          project.businessCategory
        )}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.error(
          `Failed to show project. Status: ${response.status} ${response.statusText}`
        );
        setifNoCategory(true);
        setShowSpecificProject([]);
        toast(`No project found for ${project.businessCategory}`);
        return;
      }

      const projectData = await response.json();

      if (projectData.length === 0) {
        setifNoCategory(true);
        setShowSpecificProject([]);
        toast.info(`No project found for ${project.businessCategory}`);
      } else {
        setShowSpecificProject(projectData);
        setifNoCategory(false);
      }
    } catch (error) {
      console.error("Error showing project:", error.message);
      setifNoCategory(false);
      toast.error("An error occurred while fetching project data");
    }
  };

  //! cancel project
  const handleCancel = async (project) => {
    try {
      console.log("cancel", project.projectId);
      const lead = await fetch(
        `https://webscrappingbackend.vercel.app/cancelLead?projectId=${project.projectId}`
      );
      if (!lead.ok) {
        console.log("Failed to cancel project");
        return;
      }
      console.log(lead);
      /* when cancel project status will change to canceled */
      setProjectStatus((prevStatus) => ({
        ...prevStatus,
        [project.id]: "Canceled",
      }));
      toast("Cancel Your Project Successfully");
    } catch (error) {
      console.error("Error adding project:", error);
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
    </div>
  );
};

export default ProjectTable;
