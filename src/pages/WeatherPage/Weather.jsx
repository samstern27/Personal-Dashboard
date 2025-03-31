import { useState, useEffect, memo } from "react";
import "./Weather.css";
import Spinner from "react-bootstrap/Spinner";
import WeatherDetails from "./WeatherDetails";
import { useLocation } from "../../contexts/LocationContext";
import { useWeather } from "../../contexts/WeatherContext";
// Weather component that displays weather information for user's location
const Weather = () => {
  // Get location data from context
  const { locationName } = useLocation();
  const { weatherData, isLoading, isError } = useWeather();

  // Render weather component with conditional rendering based on state
  return (
    <div className="weather-container">
      <h2 className="weather-title">Weather</h2>
      {isLoading ? (
        // Show loading spinner while fetching data
        <div className="loading-container">
          <Spinner animation="border" variant="secondary" />
          <p>Loading weather for your area...</p>
        </div>
      ) : isError ? (
        // Show error message if there's an error
        <p>Error: {isError}</p>
      ) : (
        // Show weather details if data is available
        <section className="weather-container">
          <h2 className="weather-details__title">7 Day Forecast</h2>
          <h3 className="weather-location">{locationName}</h3>

          <div className="weather">
            <WeatherDetails data={weatherData} />
          </div>
        </section>
      )}
    </div>
  );
};

export default memo(Weather);
