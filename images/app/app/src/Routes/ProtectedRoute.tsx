import React from "react";
import { Navigate, Outlet } from "react-router-dom";
export const ProtectedRoute = () => {
  const userIsConnected: string | null = sessionStorage.getItem("username");

  return (
    <>
      {!userIsConnected ? (
        <Navigate to={"/"} state={"Please enter username"} />
      ) : (
        <Outlet />
      )}
    </>
  );
};
