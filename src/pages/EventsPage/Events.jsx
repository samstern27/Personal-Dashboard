import React, { useState, useEffect } from "react";
import { useLocation } from "../../contexts/LocationContext";
import EventCard from "./EventCard";
import EventDetails from "./EventDetails";
import Spinner from "react-bootstrap/Spinner";
import "./Events.css";

const Events = () => {
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

  useEffect(() => {
    // Only fetch events if we have coordinates
    if (coords) {
      fetchEvents(coords.lat, coords.lng, distance);
    }
  }, [coords]);

  const fetchEvents = async (lat, lng, distance) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:5001/api/events?lat=${lat}&lng=${lng}&radius=${distance}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        let errorMessage;

        switch (response.status) {
          case 429:
            errorMessage = "Too many requests. Please try again later.";
            break;
          case 403:
            errorMessage = "API access forbidden. Check your API key.";
            break;
          case 404:
            errorMessage = "Event data not found.";
            break;
          default:
            errorMessage = `Server error: ${response.status}`;
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Check for API-specific error responses
      if (data.fault) {
        throw new Error(data.fault.faultstring || "API Error");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setEvents(data._embedded?.events || []);
    } catch (err) {
      console.error("Error fetching events:", err);
      if (err.message.includes("Failed to fetch")) {
        setError(
          "Cannot connect to server. Please make sure the server is running."
        );
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

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

      {/* Show error if there is one */}
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

      {/* Show loading state while getting location or fetching events */}
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

      {/* Show event details when an event is selected */}
      {selectedEvent && (
        <EventDetails event={selectedEvent} onClose={handleCloseDetails} />
      )}
    </section>
  );
};

export default Events;
