import { useMemo, memo } from "react";
import "./Weather.css";
import { format } from "date-fns";
import weatherCodes from "./WeatherCodes";

// WeatherDetails component that displays detailed weather information
const WeatherDetails = ({ data }) => {
  // Create object for current day's weather data
  const currentDay = useMemo(
    () => ({
      date: data.daily.time[0],
      minTemperature: data.daily.temperature_2m_min[0],
      maxTemperature: data.daily.temperature_2m_max[0],
      weathercode: data.daily.weather_code[0],
      currentTemperature: data.current.temperature_2m,
      precipitation: data.current.precipitation,
    }),
    [
      data.daily.time[0],
      data.daily.temperature_2m_min[0],
      data.daily.temperature_2m_max[0],
      data.daily.weather_code[0],
      data.current.temperature_2m,
      data.current.precipitation,
    ]
  );

  // Create objects for next 6 days of weather data
  const day2 = useMemo(
    () => ({
      date: data.daily.time[1],
      minTemperature: data.daily.temperature_2m_min[1],
      maxTemperature: data.daily.temperature_2m_max[1],
      weathercode: data.daily.weather_code[1],
    }),
    [
      data.daily.time[1],
      data.daily.temperature_2m_min[1],
      data.daily.temperature_2m_max[1],
      data.daily.weather_code[1],
    ]
  );

  const day3 = useMemo(
    () => ({
      date: data.daily.time[2],
      minTemperature: data.daily.temperature_2m_min[2],
      maxTemperature: data.daily.temperature_2m_max[2],
      weathercode: data.daily.weather_code[2],
    }),
    [
      data.daily.time[2],
      data.daily.temperature_2m_min[2],
      data.daily.temperature_2m_max[2],
      data.daily.weather_code[2],
    ]
  );

  const day4 = useMemo(
    () => ({
      date: data.daily.time[3],
      minTemperature: data.daily.temperature_2m_min[3],
      maxTemperature: data.daily.temperature_2m_max[3],
      weathercode: data.daily.weather_code[3],
    }),
    [
      data.daily.time[3],
      data.daily.temperature_2m_min[3],
      data.daily.temperature_2m_max[3],
      data.daily.weather_code[3],
    ]
  );

  const day5 = useMemo(
    () => ({
      date: data.daily.time[4],
      minTemperature: data.daily.temperature_2m_min[4],
      maxTemperature: data.daily.temperature_2m_max[4],
      weathercode: data.daily.weather_code[4],
    }),
    [
      data.daily.time[4],
      data.daily.temperature_2m_min[4],
      data.daily.temperature_2m_max[4],
      data.daily.weather_code[4],
    ]
  );

  const day6 = useMemo(
    () => ({
      date: data.daily.time[5],
      minTemperature: data.daily.temperature_2m_min[5],
      maxTemperature: data.daily.temperature_2m_max[5],
      weathercode: data.daily.weather_code[5],
    }),
    [
      data.daily.time[5],
      data.daily.temperature_2m_min[5],
      data.daily.temperature_2m_max[5],
      data.daily.weather_code[5],
    ]
  );

  const day7 = useMemo(
    () => ({
      date: data.daily.time[6],
      minTemperature: data.daily.temperature_2m_min[6],
      maxTemperature: data.daily.temperature_2m_max[6],
      weathercode: data.daily.weather_code[6],
    }),
    [
      data.daily.time[6],
      data.daily.temperature_2m_min[6],
      data.daily.temperature_2m_max[6],
      data.daily.weather_code[6],
    ]
  );

  // Create array of weather data for the next 6 days
  const weatherElements = useMemo(
    () => [day2, day3, day4, day5, day6, day7],
    [day2, day3, day4, day5, day6, day7]
  );

  // Render weather details with current day and forecast
  return (
    <>
      {/* Current day weather display */}
      <div className="weather-details-current-day-container">
        <p className="weather-details-current-day-date">Today</p>
        <p className="weather-details-current-day-temperature">Current:</p>
        <p className="weather-details-current-day-temperature-value">
          {currentDay.currentTemperature}°C
        </p>
        <img
          src={weatherCodes[currentDay.weathercode]}
          alt="weather-icon"
          className="weather-details-current-day-icon"
        />
        <p className="weather-details-current-day-precipitation">
          Chance of precipitation: {currentDay.precipitation}%
        </p>
        <p className="weather-details-current-day-min">
          Min: {currentDay.minTemperature}°C
        </p>
        <p className="weather-details-current-day-max">
          Max: {currentDay.maxTemperature}°C
        </p>
      </div>

      {/* 6-day forecast display */}
      <div className="weather-details">
        {weatherElements.map((day, index) => (
          <div className="weather-details-day-container" key={index}>
            <p className="weather-details-day__date">
              {format(new Date(day.date), "EEE dd MMM")}
            </p>
            <p className="weather-details-day__average">
              Avg: {Math.round((day.minTemperature + day.maxTemperature) / 2)}°C
            </p>
            <img
              src={weatherCodes[day.weathercode]}
              alt="weather-icon"
              className="weather-details-day-icon"
            />
            <p className="weather-details-day__min">
              Min: {day.minTemperature}°C
            </p>
            <p className="weather-details-day__max">
              Max: {day.maxTemperature}°C
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(WeatherDetails);
