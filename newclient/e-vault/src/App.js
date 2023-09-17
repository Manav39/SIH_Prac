import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SideBar from "./pages/SideBar";
import { useEffect } from "react";

import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<SideBar />} />
      </Routes>
    </ChakraProvider>
  );
}
export default App;
