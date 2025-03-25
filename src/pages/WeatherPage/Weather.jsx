import { useState, useEffect, memo } from "react";
import "./Weather.css";
import Spinner from "react-bootstrap/Spinner";
import WeatherDetails from "./WeatherDetails";
import { useLocation } from "../../contexts/LocationContext";

// Weather component that displays weather information for user's location
const Weather = () => {
  // Get location data from context
  const {
    coords,
    locationName,
    isLoading: locationLoading,
    error: locationError,
  } = useLocation();

  // State management for weather data and UI states
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isError, setIsError] = useState(null); // Error state
  const [weatherData, setWeatherData] = useState({}); // Weather data from API

  // Effect hook to fetch weather data when coordinates are available
  useEffect(() => {
    if (coords) {
      fetchWeather(coords.lat, coords.lng);
    }
  }, [coords]);

  // Function to fetch weather data from Open-Meteo API
  const fetchWeather = async (lat, long) => {
    try {
      // Fetch current weather and 7-day forecast
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,precipitation,rain,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset`
      );
      const data = await res.json();
      setWeatherData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setIsError(error);
      setIsLoading(false);
    }
  };

  // Determine if we're still loading data
  const showLoading = locationLoading || isLoading;

  // Determine if there's an error to show
  const errorToShow = locationError || isError;

  // Render weather component with conditional rendering based on state
  return (
    <div className="weather-container">
      <h2 className="weather-title">Weather</h2>
      {showLoading ? (
        // Show loading spinner while fetching data
        <div className="loading-container">
          <Spinner animation="border" variant="secondary" />
          <p>Loading weather for your area...</p>
        </div>
      ) : errorToShow ? (
        // Show error message if there's an error
        <p>Error: {errorToShow}</p>
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
