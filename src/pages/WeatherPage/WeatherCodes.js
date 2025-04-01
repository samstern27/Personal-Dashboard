// Mapping of weather codes to corresponding weather icons
// This mapping follows the WMO (World Meteorological Organization) weather code standard
// Each code corresponds to a specific weather condition and its visual representation
const weatherCodes = {
  // Clear sky conditions (code 0)
  0: "/weatherIcons/Clear-sky.svg",

  // Partly cloudy conditions (codes 1-3)
  // Different levels of cloud coverage but still with some sun visibility
  1: "/weatherIcons/Sun-cloudy.svg",
  2: "/weatherIcons/Sun-cloudy.svg",
  3: "/weatherIcons/Sun-cloudy.svg",

  // Foggy conditions (codes 45, 48)
  // Different types of fog (fog and depositing rime fog)
  45: "/weatherIcons/Foggy.svg",
  48: "/weatherIcons/Foggy.svg",

  // Light drizzle conditions (codes 51-55)
  // Different intensities of light drizzle
  51: "/weatherIcons/Light-drizzle.svg",
  53: "/weatherIcons/Light-drizzle.svg",
  55: "/weatherIcons/Light-drizzle.svg",

  // Rain conditions (codes 61-65)
  // Different intensities of rain
  61: "/weatherIcons/Rain.svg",
  63: "/weatherIcons/Rain.svg",
  65: "/weatherIcons/Rain.svg",

  // Snow conditions (codes 71-75)
  // Different intensities of snowfall
  71: "/weatherIcons/Snowing.svg",
  73: "/weatherIcons/Snowing.svg",
  75: "/weatherIcons/Snowing.svg",

  // Heavy rain conditions (codes 80-82)
  // Different intensities of heavy rainfall
  80: "/weatherIcons/Heavy-rain.svg",
  81: "/weatherIcons/Heavy-rain.svg",
  82: "/weatherIcons/Heavy-rain.svg",

  // Heavy snow conditions (codes 85-86)
  // Different intensities of heavy snowfall
  85: "/weatherIcons/Snowing.svg",
  86: "/weatherIcons/Snowing.svg",

  // Storm conditions (codes 95-99)
  // Thunderstorm with or without hail
  95: "/weatherIcons/Storm.svg",
  96: "/weatherIcons/Storm.svg",
  99: "/weatherIcons/Storm.svg",
};

export default weatherCodes;
