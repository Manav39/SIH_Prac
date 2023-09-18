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

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>

      <SideBar>
        <Routes>
          <Route path="/Dashboard" Component={Dashboard} />
          <Route path="/Cases" Component={Cases} />
        </Routes>
      </SideBar>
    </ChakraProvider>
  );
}
export default App;
