import { useState } from "react";
import AddCloset from "../components/AddCloset";
import Visualisation from "../components/Visualisation";


function HomePage() {
  return (
    <div className="ProjectListPage">
      <h1>Home Page</h1>
      
      <div>
       {/*  <h1>Home Page</h1>
        <GeometricalForms /> */}
        <AddCloset />
       
      </div>
    </div>
  );
}

export default HomePage;
