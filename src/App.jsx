import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import Weather from "./pages/WeatherPage/Weather";
import News from "./pages/NewsPage/News";
import Stocks from "./pages/StocksPage/Stocks";
import StockDetails from "./pages/StocksPage/StockDetails";
import TopStocks from "./pages/StocksPage/TopStocks";
import Events from "./pages/EventsPage/Events";
import "./App.css";
import Layout from "./components/Layout";
import { LocationProvider } from "./contexts/LocationContext";
import { WeatherProvider } from "./contexts/WeatherContext";

// Main App component that sets up routing and global context providers
// Uses React Router v6 for client-side routing and nested routes
const App = () => {
  return (
    // Wrap the entire app with context providers for location and weather data
    // These providers make location and weather data available throughout the app
    <LocationProvider>
      <WeatherProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/news" element={<News />} />
              <Route path="/stocks" element={<Stocks />}>
                <Route index element={<TopStocks />} />
                <Route path="/stocks/:symbol" element={<StockDetails />} />
              </Route>
              <Route path="/events" element={<Events />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </WeatherProvider>
    </LocationProvider>
  );
};

export default App;
