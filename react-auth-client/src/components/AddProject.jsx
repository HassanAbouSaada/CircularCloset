/* import { useState } from "react";
import projectsService from "../services/projects.service";

function AddProject(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [color, setColor] = useState("#000000"); // Default color is black

  console.log(width, height, color);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { title, description, width, height, color };
    projectsService
      .createProject(requestBody)
      .then((response) => {
        console.log(response);
        // Reset the state
        setTitle("");
        setDescription("");
        setWidth("");
        setHeight("");
        setColor("#000000");
        props.refreshProjects();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddProject">
      <h3>Add Project</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Width (cm):</label>
        <input
          type="number"
          name="width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />

        <label>Height (cm):</label>
        <input
          type="number"
          name="height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <label>Color:</label>
        <input
          type="color"
          name="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProject;
 */