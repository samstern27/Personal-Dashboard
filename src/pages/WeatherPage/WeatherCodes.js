import ClearSky from "../../assets/icons/weatherIcons/ClearSky.svg";
import Foggy from "../../assets/icons/weatherIcons/Foggy.svg";
import HeavyRain from "../../assets/icons/weatherIcons/HeavyRain.svg";
import LightDrizzle from "../../assets/icons/weatherIcons/LightDrizzle.svg";
import Rain from "../../assets/icons/weatherIcons/Rain.svg";
import Snowing from "../../assets/icons/weatherIcons/Snowing.svg";
import Storm from "../../assets/icons/weatherIcons/Storm.svg";
import SunCloudy from "../../assets/icons/weatherIcons/SunCloudy.svg";

// Mapping of weather codes to corresponding weather icons
const weatherCodes = {
  // Clear sky conditions
  0: ClearSky,

  // Partly cloudy conditions
  1: SunCloudy,
  2: SunCloudy,
  3: SunCloudy,

  // Foggy conditions
  45: Foggy,
  48: Foggy,

  // Light drizzle conditions
  51: LightDrizzle,
  53: LightDrizzle,
  55: LightDrizzle,

  // Rain conditions
  61: Rain,
  63: Rain,
  65: Rain,

  // Snow conditions
  71: Snowing,
  73: Snowing,
  75: Snowing,

  // Heavy rain conditions
  80: HeavyRain,
  81: HeavyRain,
  82: HeavyRain,

  // Heavy snow conditions
  85: Snowing,
  86: Snowing,

  // Storm conditions
  95: Storm,
  96: Storm,
  99: Storm,
};

export default weatherCodes;
