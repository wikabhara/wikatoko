import React from "react";
import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      {/* navbar */}
      <header>---Home Page Side---</header>
      {/* navbar */}
      <Outlet />
    </>
  );
}
