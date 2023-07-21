import React, { useState, useEffect } from "react";
import projectsService from "../services/projects.service";

function Visualisation() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from the backend when the component mounts
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    projectsService
      .getProjects()
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => console.log(error));
  };

  const renderProjects = () => {
    return projects.map((project, index) => (
      <div
        key={index}
        style={{
          width: `${project.width}px`,
          height: `${project.height}px`,
          backgroundColor: project.color,
          border: "1px solid black",
          clear: "both",
          marginTop: "10px",
          position: "relative",
        }}
      >
        <div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p>Width: {project.width} cm</p>
          <p>Height: {project.height} cm</p>
          <p>Color: {project.color}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="HomePage">
      <h2>Welcome to the Homepage</h2>
      {renderProjects()}
    </div>
  );
}

export default Visualisation;
