import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthMiddleware from "./pages/auth/auth/AuthMiddleware";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthMiddleware>
        <App />
      </AuthMiddleware>
    </BrowserRouter>
  </React.StrictMode>
);
