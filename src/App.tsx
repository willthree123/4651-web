//App.tsx

import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Browse from "./page/Browse"; // Import the Browse component
import Test from "./page/Test"; // Import the Browse component
import { useState } from "react";
import Navbar from "./component/Navbar";
import "./index.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    document.documentElement.setAttribute("data-theme", darkMode ? "light" : "dark");
    setDarkMode(!darkMode);
  };

  return (
    <div style={{ marginTop: 0 }}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} /> {/* Add Browse route */}
        <Route path="/test" element={<Test />} /> {/* Add Browse route */}
      </Routes>
    </div>
  );
}
