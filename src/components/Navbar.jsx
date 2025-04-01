import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
// Import SVG icons for navigation items
import weatherIcon from "../assets/icons/cloud-line.svg";
import newsIcon from "../assets/icons/newspaper-line.svg";
import stocksIcon from "../assets/icons/stock-line.svg";
import eventsIcon from "../assets/icons/calendar-line.svg";
import "../pages/HomePage/Home.css";

/**
 * Navbar Component
 *
 * A navigation bar that provides easy access to different sections of the application.
 * Features:
 * - Active route highlighting with custom colors
 * - Animated transitions
 * - Dynamic home button visibility
 */
const Navbar = () => {
  const [isLeaving, setIsLeaving] = useState(false);
  const location = useLocation();

  // Handle transition animation when clicking home
  const handleHomeClick = () => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsLeaving(false);
    }, 300); // Duration matches CSS transition
  };

  // Navigation configuration array for maintainable link management
  const navLinks = [
    { to: "/weather", icon: weatherIcon, label: "Weather", color: "#e3e198" },
    { to: "/news", icon: newsIcon, label: "News", color: "#9CA3E2" },
    { to: "/stocks", icon: stocksIcon, label: "Stocks", color: "#DC9798" },
    { to: "/events", icon: eventsIcon, label: "Events", color: "#97DADC" },
  ];

  return (
    <header className="home-header gradient-border">
      <div className="header-content">
        {/* Show home button when not on home page */}
        {location.pathname !== "/" && (
          <NavLink
            to="/"
            className={`nav-link ${isLeaving ? "leaving" : ""}`}
            onClick={handleHomeClick}
          >
            <i className="fas fa-arrow-left"></i>
            <span>Home</span>
          </NavLink>
        )}

        {/* Navigation links with dynamic styling based on active route */}
        <nav className="nav-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
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
  );
};

export default Navbar;
