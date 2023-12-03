import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoute } from "./Routes/ProtectedRoute.tsx";
import { getRegisteredUsers, Users } from "./Routes/Users.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/users",
    element: <ProtectedRoute />,
    children: [
      {
        path: "",
        element: <Users />,
        loader: getRegisteredUsers,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
