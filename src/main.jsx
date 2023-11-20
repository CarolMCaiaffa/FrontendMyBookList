import React from "react";
import ReactDOM from "react-dom/client";
import { UserProvider } from "./context/UserContext";
import { App } from "./App.jsx";
import "./index.css";


const appContainer = document.getElementById("app-root");

ReactDOM.createRoot(appContainer).render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
