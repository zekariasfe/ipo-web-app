// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { WalletProvider } from "./context/WalletContext"; // Add this import
import { router } from "./app/routes/router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <WalletProvider> {/* Add WalletProvider here */}
        <RouterProvider router={router} />
      </WalletProvider>
    </AuthProvider>
  </React.StrictMode>
);