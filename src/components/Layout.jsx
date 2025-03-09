import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "../pages/HomePage/Home.css";
export default function Layout() {
  return (
    <div className="layout-container">
      <Navbar />
      <Outlet />
    </div>
  );
}
