import ClearSky from "../../assets/icons/weatherIcons/clear-sky.svg";
import Foggy from "../../assets/icons/weatherIcons/foggy.svg";
import HeavyRain from "../../assets/icons/weatherIcons/heavy-rain.svg";
import LightDrizzle from "../../assets/icons/weatherIcons/light-drizzle.svg";
import Rain from "../../assets/icons/weatherIcons/rain.svg";
import Snowing from "../../assets/icons/weatherIcons/snowing.svg";
import Storm from "../../assets/icons/weatherIcons/storm.svg";
import SunCloudy from "../../assets/icons/weatherIcons/sun-cloudy.svg";

const weatherCodes = {
  0: ClearSky,
  1: SunCloudy,
  2: SunCloudy,
  3: SunCloudy,
  45: Foggy,
  48: Foggy,
  51: LightDrizzle,
  53: LightDrizzle,
  55: LightDrizzle,
  61: Rain,
  63: Rain,
  65: Rain,
  71: Snowing,
  73: Snowing,
  75: Snowing,
  80: HeavyRain,
  81: HeavyRain,
  82: HeavyRain,
  85: Snowing,
  86: Snowing,
  95: Storm,
  96: Storm,
  99: Storm,
};

export default weatherCodes;
