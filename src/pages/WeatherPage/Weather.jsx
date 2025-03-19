import { useState, useEffect, memo } from "react";
import "./Weather.css";
import Spinner from "react-bootstrap/Spinner";
import WeatherDetails from "./WeatherDetails";
const geocodingApiKey = import.meta.env.VITE_GEOCODING_API_KEY;

const Weather = () => {
  const [positionCoords, setPositionCoords] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [weatherData, setWeatherData] = useState({});
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Position obtained:", position);
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setPositionCoords(coords);
          fetchWeather(coords.lat, coords.lng);
        },
        (error) => {
          console.error("Geolocation error: ", error);
          let errorMessage;
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "User denied the request for Geolocation.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "The request to get user location timed out.";
              break;
            case error.UNKNOWN_ERROR:
            default:
              errorMessage = "An unknown error occurred.";
              break;
          }
          setIsError(errorMessage);
          setIsLoading(false);
        }
      );
    } else {
      setIsError("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
    const fetchWeather = async (lat, long) => {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,precipitation,rain,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset`
        );
        const data = await res.json();
        console.log("Weather data fetched:", data);
        setWeatherData(data);
        await fetchLocationName(lat, long);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setIsError(error);
        setIsLoading(false);
      }
    };

    const fetchLocationName = async (lat, long) => {
      if (lat && long) {
        try {
          const res = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${geocodingApiKey}`
          );
          const data = await res.json();
          const town =
            data.results[0].components.town || data.results[0].components.city;
          setLocationName(town);
        } catch (error) {
          console.error("Error fetching location name:", error);
          setIsError(error);
          setIsLoading(false);
        }
      }
    };
  }, []);

  return (
    <div className="weather-container">
      <h2 className="weather-title">Weather</h2>
      {isLoading ? (
        <div className="loading-container">
          <Spinner animation="border" variant="secondary" />
          <p>Loading weather for your area...</p>
        </div>
      ) : isError ? (
        <p>Error: {isError}</p>
      ) : (
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
