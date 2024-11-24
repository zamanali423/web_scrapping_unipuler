import React, { useContext, useState } from "react";
import { userContext } from "../context/userContext/userContext";
import shortid from "shortid";

const AddProjects = ({ setShowAddProject, setprojects }) => {
  const [formData, setFormData] = useState({
    city: "",
    businessCategory: "",
    projectName: "",
  });
  const [isLoading, setIsLoading] = useState(false); 
  const { user } = useContext(userContext);
  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const email = user.user?.email;
  //! add project
  const addProject = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const newProject = {
        vendorId: email,
        projectId: shortid.generate(),
        projectName: formData.projectName,
        city: formData.city,
        businessCategory: formData.businessCategory,
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

      // Update the projects state to include the newly created project
      setprojects((prevProjects) => [...prevProjects, newProject]);

      // Close the add project form
      setShowAddProject(false);
    } catch (error) {
      console.error("Error adding project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0 text-light">Add Project</h4>
        </div>
        <div className="card-body">
          <form onSubmit={addProject}>
            {/* Project Name Field */}
            <div className="mb-3">
              <label htmlFor="projectName" className="form-label">
                Project Name
              </label>
              <input
                type="text"
                className="form-control"
                id="projectName"
                placeholder="Enter project name"
                required
                name="projectName"
                value={formData.projectName}
                onChange={handleInput}
              />
            </div>

            {/* City Field */}
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                City
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="Enter city"
                required
                name="city"
                value={formData.city}
                onChange={handleInput}
              />
            </div>

            {/* Business Category Field */}
            <div className="mb-3">
              <label htmlFor="businessCategory" className="form-label">
                Business Category
              </label>
              <select
                className="form-select"
                id="businessCategory"
                required
                name="businessCategory"
                value={formData.businessCategory}
                onChange={handleInput}
              >
                <option value="">Select category</option>
                <option value="retail">Retail</option>
                <option value="technology">Technology</option>
                <option value="hospitality">Hospitality</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                {/* Add more categories as needed */}
              </select>
            </div>

            {/* Submit Button */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                {isLoading ? (
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
              <button
                className="btn btn-primary mt-1"
                onClick={() => setShowAddProject(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProjects;
