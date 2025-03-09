import React from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";
import weatherIcon from "../../assets/icons/cloud-line.svg";
import newsIcon from "../../assets/icons/newspaper-line.svg";
import stocksIcon from "../../assets/icons/stock-line.svg";
import eventsIcon from "../../assets/icons/calendar-line.svg";
import notesIcon from "../../assets/icons/sticky-note-line.svg";
import financeIcon from "../../assets/icons/money-dollar-circle-line.svg";
import TimeDate from "../../components/TimeDate";

const Home = () => {
  return (
    <main className="home-container">
      <section className="home-content">
        <TimeDate />
      </section>
    </main>
  );
};

export default Home;
