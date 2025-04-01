import { createContext, useState, useContext, useEffect } from "react";

// Create a context to share location data across components
const LocationContext = createContext();

// Custom hook to consume the location context
// This makes it easy to access location data from any component
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

// Provider component that wraps the app and makes location data available
export const LocationProvider = ({ children }) => {
  // State to manage coordinates, location name, loading state, and errors
  const [coords, setCoords] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const geocodingApiKey = import.meta.env.VITE_GEOCODING_API_KEY;

  // Effect hook to get user's location when component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        // Success callback - when we get the user's position
        (position) => {
          const locationCoords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCoords(locationCoords);
          fetchLocationName(locationCoords.lat, locationCoords.lng);
          setIsLoading(false);
        },
        // Error callback - handle different geolocation errors
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
  }, []); // Empty dependency array means this only runs once on mount

  // Convert coordinates to a human-readable location name using OpenCage API
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

  // Provide location data to all child components
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
