import React from "react";
import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div>
      <h1>Sidebar</h1>
      <Outlet />
    </div>
  );
};

export default AppLayout;
