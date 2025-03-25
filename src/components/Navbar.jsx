import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import weatherIcon from "../assets/icons/cloud-line.svg";
import newsIcon from "../assets/icons/newspaper-line.svg";
import stocksIcon from "../assets/icons/stock-line.svg";
import eventsIcon from "../assets/icons/calendar-line.svg";
import notesIcon from "../assets/icons/sticky-note-line.svg";
import financeIcon from "../assets/icons/money-dollar-circle-line.svg";
import "../pages/HomePage/Home.css";

// ------------------------------ Navbar component ------------------------------

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLeaving, setIsLeaving] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleHomeClick = () => {
    setIsLeaving(true);
    // Wait for fade out animation before closing menu
    setTimeout(() => {
      closeMenu();
      setIsLeaving(false);
    }, 300); // Match the transition duration
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { to: "/weather", icon: weatherIcon, label: "Weather", color: "#e3e198" },
    { to: "/news", icon: newsIcon, label: "News", color: "#9CA3E2" },
    { to: "/stocks", icon: stocksIcon, label: "Stocks", color: "#DC9798" },
    { to: "/events", icon: eventsIcon, label: "Events", color: "#97DADC" },
  ];

  // Render the navigation bar with header and navigation links
  return (
    <>
      <header className="home-header gradient-border">
        <div className="header-content">
          {!isMobile && location.pathname !== "/" && (
            <NavLink
              to="/"
              className={`nav-link ${isLeaving ? "leaving" : ""}`}
              onClick={handleHomeClick}
            >
              <i className="fas fa-arrow-left"></i>
              <span>Home</span>
            </NavLink>
          )}
          <button
            className="mobile-menu-button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`menu-line ${isMenuOpen ? "open" : ""}`}></span>
            <span className={`menu-line ${isMenuOpen ? "open" : ""}`}></span>
            <span className={`menu-line ${isMenuOpen ? "open" : ""}`}></span>
          </button>

          <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                style={({ isActive }) =>
                  isActive
                    ? { color: link.color, fontWeight: "400" }
                    : { color: "#cbcbcb", fontWeight: "200" }
                }
              >
                <div className="nav-link">
                  <img
                    className={`nav-icon-${link.label.toLowerCase()}`}
                    src={link.icon}
                    alt={link.label}
                  />
                  {link.label}
                </div>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
