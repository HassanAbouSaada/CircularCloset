import React, { useContext } from "react";
import Closet from "../pages/closet";
import { AuthContext } from '../context/auth.context';

function HomePage() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div>
   
      <Closet />
    </div>
  );
}

export default HomePage;