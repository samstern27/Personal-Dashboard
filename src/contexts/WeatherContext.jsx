import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "./LocationContext";

// Create a context for managing weather-related state across the application
const WeatherContext = createContext();

// Custom hook to consume the WeatherContext
// This pattern ensures proper error handling if the context is used outside its provider
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};

export const WeatherProvider = ({ children }) => {
  // Destructure location data from LocationContext
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

  // Fetch weather data whenever coordinates change
  // This ensures weather data stays in sync with location updates
  useEffect(() => {
    if (coords) {
      fetchWeather(coords.lat, coords.lng);
    }
  }, [coords]);

  // Fetch weather data from Open-Meteo API
  // Returns both current conditions and 7-day forecast
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

  // Combine loading states from both location and weather fetching
  // This prevents premature rendering when either data is still loading
  const showLoading = locationLoading || isLoading;

  // Aggregate errors from both location and weather services
  const errorToShow = locationError || isError;

  // Provide weather data and status to consuming components
  return (
    <WeatherContext.Provider value={{ weatherData, isLoading, isError }}>
      {children}
    </WeatherContext.Provider>
  );
};
