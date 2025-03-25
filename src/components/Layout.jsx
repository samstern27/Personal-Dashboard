// Import necessary React components and styles
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "../pages/HomePage/Home.css";

// Layout component that provides the common structure for all pages
export default function Layout() {
  return (
    <div className="layout-container">
      {/* Navigation bar component */}
      <Navbar />
      {/* Outlet for rendering nested routes */}
      <Outlet />
    </div>
  );
}
