import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import { useEffect } from "react";
// import {  } from "react-router-dom";

import "./index.css";
import App from "./App";

function AppWithDynamicTitle() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/browse") {
      document.title = "DreamFrame | Browse";
    } else {
      document.title = "DreamFrame | Create Your Master Piece";
    }
  }, [location]);

  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename="/4651-web">
      <AppWithDynamicTitle />
    </BrowserRouter>
  </React.StrictMode>
);
