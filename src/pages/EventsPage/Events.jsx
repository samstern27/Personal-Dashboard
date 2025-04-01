import React, { useState, useEffect } from "react";
import { useLocation } from "../../contexts/LocationContext";
import EventCard from "./EventCard";
import EventDetails from "./EventDetails";
import Spinner from "react-bootstrap/Spinner";
import "./Events.css";

// Use environment variables for API base URL, with proper fallback for production
const API_BASE_URL =
  process.env.NODE_ENV === "development" ? "http://localhost:5001/api" : "/api";

const Events = () => {
  // State management for events data and UI states
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [distance, setDistance] = useState(5);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Get location data from context
  const {
    coords,
    isLoading: locationLoading,
    error: locationError,
  } = useLocation();

  // Fetch events whenever coordinates or distance changes
  // This ensures the event list stays in sync with user's location and search preferences
  useEffect(() => {
    if (coords) {
      fetchEvents(coords.lat, coords.lng, distance);
    }
  }, [coords]);

  // Fetch events from the Ticketmaster API
  // Handles error cases and response validation
  const fetchEvents = async (lat, lng, distance) => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching events with params:", { lat, lng, distance });

      const response = await fetch(
        `${API_BASE_URL}/events?lat=${lat}&lng=${lng}&radius=${distance}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      // Validate response and handle different error cases
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch events");
        } else {
          const text = await response.text();
          throw new Error("Server error: Failed to fetch events");
        }
      }

      // Ensure response is JSON before parsing
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error("Invalid response format from server");
      }

      const data = await response.json();

      // Handle the Ticketmaster API's embedded response format
      if (data._embedded && data._embedded.events) {
        setEvents(data._embedded.events);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setError(error.message);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  // Event handlers for user interactions
  const handleSearch = (e) => {
    e.preventDefault();
    fetchEvents(coords.lat, coords.lng, distance);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <section className="events-container">
      <h1 className="events-title">Events Near You</h1>

      {/* Search form for adjusting the search radius */}
      <form className="events-search" onSubmit={handleSearch}>
        <label htmlFor="distance">Distance in km:</label>
        <input
          type="number"
          id="distance"
          placeholder="10"
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Error handling UI with retry option */}
      {(locationError || error) && (
        <div className="events-error">
          <p>{locationError || error}</p>
          {error && error.includes("Too many requests") && (
            <p className="events-error-help">
              The Ticketmaster API has a limited number of requests per day.
              Please try again later or reduce the frequency of searches.
            </p>
          )}
          <button
            className="events-retry-button"
            onClick={() =>
              coords && fetchEvents(coords.lat, coords.lng, distance)
            }
          >
            Try Again
          </button>
        </div>
      )}

      {/* Loading state with spinner */}
      {locationLoading || loading ? (
        <div className="events-list-container">
          <div className="events-loading">
            <Spinner animation="border" variant="light" />
            <span className="loading-text">Loading events...</span>
          </div>
        </div>
      ) : (
        <div className="events-list">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onSelect={handleSelectEvent}
              />
            ))
          ) : (
            <div className="events-empty">
              <p>
                No events found in your area. Try increasing the search
                distance.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Modal for displaying detailed event information */}
      {selectedEvent && (
        <EventDetails event={selectedEvent} onClose={handleCloseDetails} />
      )}
    </section>
  );
};

export default Events;
