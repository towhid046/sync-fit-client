import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routers from "./Routers/Routes";
import AuthProvider from "./providers/AuthProvider/AuthProvider";

import "react-tooltip/dist/react-tooltip.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={routers} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
