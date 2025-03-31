import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "./LocationContext";

const WeatherContext = createContext();

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};

export const WeatherProvider = ({ children }) => {
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

  return (
    <WeatherContext.Provider value={{ weatherData, isLoading, isError }}>
      {children}
    </WeatherContext.Provider>
  );
};
