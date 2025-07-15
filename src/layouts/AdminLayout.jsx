import React from "react";
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <>
      {/* navbar */}
      <header>---Admin Side---</header>
      {/* navbar */}
      <Outlet />
    </>
  );
}
