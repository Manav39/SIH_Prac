import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SideBar from "./pages/SideBar";
import Cases from "./pages/Cases";
import { useEffect } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import Dashboard from "./pages/Dashboard";
import AddNewJudge from "./components/AddNewJudge";
import Judges from "./pages/Judges";
import Lawyers from "./pages/Lawyers";
import Clients from "./pages/Clients";
import ViewCase from "./components/ViewCase";
import Profile from "./pages/Profile";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/Dashboard"
          element={
            <>
              <SideBar>
                <Dashboard />
              </SideBar>
            </>
          }
        />

        <Route
          path="/Cases"
          element={
            <>
              <SideBar>
                <Cases />
              </SideBar>
            </>
          }
        />

        <Route
          path="/Judge"
          element={
            <>
              <SideBar>
                <Judges />
              </SideBar>
            </>
          }
        />

        <Route
          path="/Lawyer"
          element={
            <>
              <SideBar>
                <Lawyers />
              </SideBar>
            </>
          }
        />

        <Route
          path="/Client"
          element={
            <>
              <SideBar>
                <Clients />
              </SideBar>
            </>
          }
        />

        <Route
          path="/Cases/:id"
          element={
            <>
              <SideBar>
                <ViewCase />
              </SideBar>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <SideBar>
              <Profile />
            </SideBar>
          }
        />
      </Routes>
    </ChakraProvider>
  );
}
export default App;
