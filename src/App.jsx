import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Weather from "./pages/WeatherPage/Weather";
import News from "./pages/NewsPage/News";
import Stocks from "./pages/StocksPage/Stocks";
import Events from "./pages/EventsPage/Events";
import Notes from "./pages/NotesPage/Notes";
import Finance from "./pages/FinancePage/Finance";
import "./App.css";
import Layout from "./components/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/news" element={<News />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/events" element={<Events />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/finance" element={<Finance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
