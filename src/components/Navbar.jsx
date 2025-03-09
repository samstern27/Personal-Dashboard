import React from "react";
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
  const location = useLocation();
  return (
    <>
      <header className="home-header gradient-border">
        <NavLink to="/">
          <h1 className="home-header-title">
            {location.pathname === "/" ? "Dashboard" : "Home"}
          </h1>
        </NavLink>
        <nav className="nav-links">
          <NavLink
            to="/weather"
            style={({ isActive }) =>
              isActive
                ? { color: "#e3e198", fontWeight: "400" }
                : { color: "#cbcbcb", fontWeight: "200" }
            }
          >
            <div className="nav-link">
              <img
                className="nav-icon-weather"
                src={weatherIcon}
                alt="Weather"
              />
              Weather
            </div>
          </NavLink>
          <NavLink
            to="/news"
            style={({ isActive }) =>
              isActive
                ? { color: "#9CA3E2", fontWeight: "400" }
                : { color: "#cbcbcb", fontWeight: "200" }
            }
          >
            <div className="nav-link">
              <img className="nav-icon-news" src={newsIcon} alt="News" />
              News
            </div>
          </NavLink>
          <NavLink
            to="/stocks"
            style={({ isActive }) =>
              isActive
                ? { color: "#DC9798", fontWeight: "400" }
                : { color: "#cbcbcb", fontWeight: "200" }
            }
          >
            <div className="nav-link">
              <img className="nav-icon-stocks" src={stocksIcon} alt="Stocks" />
              Stocks
            </div>
          </NavLink>
          <NavLink
            to="/events"
            style={({ isActive }) =>
              isActive
                ? { color: "#97DADC", fontWeight: "400" }
                : { color: "#cbcbcb", fontWeight: "200" }
            }
          >
            <div className="nav-link">
              <img className="nav-icon-events" src={eventsIcon} alt="Events" />
              Events
            </div>
          </NavLink>
          <NavLink
            to="/notes"
            style={({ isActive }) =>
              isActive
                ? { color: "#DCB997", fontWeight: "400" }
                : { color: "#cbcbcb", fontWeight: "200" }
            }
          >
            <div className="nav-link">
              <img className="nav-icon-notes" src={notesIcon} alt="Notes" />
              Notes
            </div>
          </NavLink>
          <NavLink
            to="/finance"
            style={({ isActive }) =>
              isActive
                ? { color: "#98E39F", fontWeight: "400" }
                : { color: "#cbcbcb", fontWeight: "200" }
            }
          >
            <div className="nav-link">
              <img
                className="nav-icon-finance"
                src={financeIcon}
                alt="Finance"
              />
              Finance
            </div>
          </NavLink>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
