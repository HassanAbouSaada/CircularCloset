import React, { useState } from "react";
import projectsService from "../services/projects.service";

function AddCloset() {
  const [closetWidth, setClosetWidth] = useState("");
  const [closetHeight, setClosetHeight] = useState("");
  const [columns, setColumns] = useState([]);

  const handleAddColumn = () => {
    setColumns((prevColumns) => [
      ...prevColumns,
      { width: "", compartments: "", compartmentHeights: [] },
    ]);
  };

  const handleRemoveColumn = (index) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      newColumns.splice(index, 1);
      return newColumns;
    });
  };

  const handleRemoveCompartment = (columnIndex, compartmentIndex) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      newColumns[columnIndex].compartmentHeights.splice(compartmentIndex, 1);
      return newColumns;
    });
  };

  const handleColumnChange = (e, index, field) => {
    const { value } = e.target;
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      if (field === "compartments") {
        newColumns[index].compartmentHeights = Array.from(
          { length: parseInt(value) },
          () => ""
        );
      }
      newColumns[index][field] = value;
      return newColumns;
    });
  };

  const handleCompartmentHeightChange = (e, columnIndex, compartmentIndex) => {
    const { value } = e.target;
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      newColumns[columnIndex].compartmentHeights[compartmentIndex] = value;
      return newColumns;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const width = parseInt(closetWidth);
    const height = parseInt(closetHeight);

    const requestBody = {
      width,
      height,
      columns: columns.map(({ width, compartments, compartmentHeights }) => ({
        width: parseInt(width),
        compartments: parseInt(compartments),
        compartmentHeights: compartmentHeights.map((height) => parseInt(height)),
      })),
    };

    projectsService
      .createCloset(requestBody)
      .then((response) => {
        setClosetWidth("");
        setClosetHeight("");
        setColumns([]);
      })
      .catch((error) => console.log(error));
  };

  const renderColumnCompartments = (compartments, compartmentHeights, columnIndex) => {
    return compartments > 0
      ? compartmentHeights.map((height, compartmentIndex) => (
          <div
            key={compartmentIndex}
            style={{
              width: "100%",
              height: `${height || 0}px`,
              border: "1px solid black",
              clear: "both",
              marginTop: "10px",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                cursor: "pointer",
              }}
              onClick={() => handleRemoveCompartment(columnIndex, compartmentIndex)}
            >
              ✖️
            </div>
          </div>
        ))
      : null;
  };

  const renderColumns = () => {
    return columns.map((column, columnIndex) => (
      <div
        key={columnIndex}
        style={{
          width: `${column.width}px`,
          height: "100%",
          border: "1px solid black",
          float: "left",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "5px",
            right: "5px",
            cursor: "pointer",
          }}
          onClick={() => handleRemoveColumn(columnIndex)}
        >
          ✖️
        </div>
        {renderColumnCompartments(column.compartments, column.compartmentHeights, columnIndex)}
      </div>
    ));
  };

  return (
    <div className="AddCloset">
      <h3>Add Closet</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Closet Width (cm):</label>
          <input
            type="number"
            value={closetWidth}
            onChange={(e) => setClosetWidth(e.target.value)}
          />
        </div>
        <div>
          <label>Closet Height (cm):</label>
          <input
            type="number"
            value={closetHeight}
            onChange={(e) => setClosetHeight(e.target.value)}
          />
        </div>

        <button type="button" onClick={handleAddColumn}>
          Add Column
        </button>

        {columns.map((column, index) => (
          <div key={index}>
            <div>
              <label>Column {index + 1} Width (cm):</label>
              <input
                type="number"
                value={column.width}
                onChange={(e) => handleColumnChange(e, index, "width")}
              />
            </div>
            <div>
              <label>Column {index + 1} Compartments:</label>
              <input
                type="number"
                value={column.compartments}
                onChange={(e) => handleColumnChange(e, index, "compartments")}
              />
            </div>
            {column.compartments > 0 &&
              Array.from({ length: column.compartments }).map((_, compartmentIndex) => (
                <div key={compartmentIndex}>
                  <label>
                    Compartment {compartmentIndex + 1} Height (cm) (Column {index + 1}):
                  </label>
                  <input
                    type="number"
                    value={column.compartmentHeights[compartmentIndex] || ""}
                    onChange={(e) =>
                      handleCompartmentHeightChange(e, index, compartmentIndex)
                    }
                  />
                </div>
              ))}
            {column.compartments > 0 && (
              <button onClick={() => handleRemoveColumn(index)}>Remove Column</button>
            )}
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>

      <div
        style={{
          width: `${closetWidth}px`,
          height: `${closetHeight}px`,
          border: "1px solid black",
          margin: "10px",
          overflow: "hidden",
        }}
      >
        {renderColumns()}
      </div>
    </div>
  );
}

export default AddCloset;
