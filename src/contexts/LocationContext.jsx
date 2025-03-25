import { createContext, useState, useContext, useEffect } from "react";

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [coords, setCoords] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const geocodingApiKey = import.meta.env.VITE_GEOCODING_API_KEY;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCoords(locationCoords);
          fetchLocationName(locationCoords.lat, locationCoords.lng);
          setIsLoading(false);
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
          setError(errorMessage);
          setIsLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setIsLoading(false);
    }
  }, []);

  // Function to fetch location name from OpenCage Geocoding API
  const fetchLocationName = async (lat, long) => {
    if (lat && long) {
      try {
        const res = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${geocodingApiKey}`
        );
        const data = await res.json();
        // Extract town or city name from geocoding response
        const town =
          data.results[0].components.town || data.results[0].components.city;
        setLocationName(town);
      } catch (error) {
        console.error("Error fetching location name:", error);
        setError(error.message);
      }
    }
  };

  return (
    <LocationContext.Provider
      value={{
        coords,
        locationName,
        isLoading,
        error,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
