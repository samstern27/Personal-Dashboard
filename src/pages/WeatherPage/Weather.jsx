import { useState, useEffect, memo } from "react";
import "./Weather.css";
import Spinner from "react-bootstrap/Spinner";
import WeatherDetails from "./WeatherDetails";
import { useLocation } from "../../contexts/LocationContext";
import { useWeather } from "../../contexts/WeatherContext";
// Weather component that displays weather information for user's location
// Uses context for location and weather data management
const Weather = () => {
  // Get location data from context for displaying the user's area
  const { locationName } = useLocation();
  // Get weather data, loading state, and error state from context
  const { weatherData, isLoading, isError } = useWeather();

  // Render weather component with conditional rendering based on state
  return (
    <div className="weather-container">
      <h2 className="weather-title">Weather</h2>
      {isLoading ? (
        // Show loading spinner while fetching weather data
        <div className="loading-container">
          <Spinner animation="border" variant="secondary" />
          <p>Loading weather for your area...</p>
        </div>
      ) : isError ? (
        // Show error message if weather data fetch failed
        <p>Error: {isError}</p>
      ) : (
        // Show weather details if data is successfully loaded
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

// Memoize the component to prevent unnecessary re-renders
export default memo(Weather);
