import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import UsersDetailsPage from "./pages/UsersDetailsPage";
//import EditProjectPage from "./pages/EditProjectPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

// Sandbox
import Closet from "./pages/closet";
import ClosetDetails from "./pages/closet/ClosetDetails";
import NewCloset from "./pages/closet/NewCloset";
import { ClosetProvider } from "./context/ClosetContext";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ClosetProvider>
        <Routes>
          <Route path="/closet" element={<Closet />} />
          <Route path="/closet/new" element={<NewCloset />} />
          <Route path="/closet/:closetId" element={<ClosetDetails />} />

          <Route
            path="/"
            element={
              <IsPrivate>
                <HomePage />
              </IsPrivate>
            }
          />

          {/* the discover page */}
          <Route path="/userspage" element={<UsersPage />} />
          <Route path="/userspage/:userId" element={<UsersDetailsPage />} />

          {/*       <Route
            path="/projects/edit/:projectId"
            element={
              <IsPrivate>
                {" "}
                <EditProjectPage />{" "}
              </IsPrivate>
            }
          /> */}

          <Route
            path="/signup"
            element={
              <IsAnon>
                {" "}
                <SignupPage />{" "}
              </IsAnon>
            }
          />
          <Route
            path="/login"
            element={
              <IsAnon>
                {" "}
                <LoginPage />{" "}
              </IsAnon>
            }
          />
        </Routes>
      </ClosetProvider>
    </div>
  );
}

export default App;
