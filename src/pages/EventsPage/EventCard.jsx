import React from "react";
import "./EventCard.css";

const EventCard = ({ event, onSelect }) => {
  // Format date string into a user-friendly format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time string into a user-friendly format with AM/PM
  const formatTime = (timeString) => {
    if (!timeString) return "TBD";
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString(
      undefined,
      options
    );
  };

  // Get the most appropriate image URL for the card
  // Prefers smaller images for better performance
  const getImageUrl = () => {
    if (!event.images || event.images.length === 0) {
      return "https://placehold.co/300x200?text=No+Image";
    }

    // Find a suitable image, preferring smaller ones for the card
    const suitable = event.images.find((img) => img.width < 500);
    return suitable ? suitable.url : event.images[0].url;
  };

  // Determine the CSS class based on the event's sale status
  // Used for visual indication of ticket availability
  const getSaleStatusClass = () => {
    const status = event.dates?.status?.code?.toLowerCase() || "";

    if (status.includes("onsale")) {
      return "event-card__status--onsale";
    } else if (
      status.includes("offsale") ||
      status.includes("cancelled") ||
      status.includes("canceled")
    ) {
      return "event-card__status--offsale";
    } else if (status.includes("rescheduled")) {
      return "event-card__status--rescheduled";
    } else if (status.includes("postponed")) {
      return "event-card__status--postponed";
    }

    // Default on sale if we can't determine
    return "event-card__status--onsale";
  };

  return (
    <div className="event-card" onClick={() => onSelect(event)}>
      {/* Event image with fallback */}
      <div className="event-card__image-container">
        <img
          src={getImageUrl()}
          alt={event.name || "Event thumbnail"}
          className="event-card__image"
        />
      </div>

      <div className="event-card__content">
        <h3 className="event-card__name">{event.name || "Untitled Event"}</h3>

        <div className="event-card__details">
          {/* Date and time information */}
          <div className="event-card__date-time">
            <p className="event-card__date">
              {event.dates?.start?.localDate
                ? formatDate(event.dates.start.localDate)
                : "Date TBD"}
            </p>
            <p className="event-card__time">
              {formatTime(event.dates?.start?.localTime)}
            </p>
          </div>

          {/* Venue and location information */}
          <div className="event-card__location">
            <p className="event-card__venue">
              {event._embedded?.venues?.[0]?.name || "Venue TBD"}
            </p>
            <p className="event-card__city">
              {event._embedded?.venues?.[0]?.city?.name
                ? `${event._embedded.venues[0].city.name}, ${
                    event._embedded.venues[0].state?.stateCode || ""
                  }`
                : "Location TBD"}
            </p>
          </div>

          {/* Age restrictions and ticket status */}
          <div className="event-card__restrictions">
            <p className="event-card__age">
              {event.ageRestrictions?.legalAgeEnforced ? "18+" : "All Ages"}
            </p>
            <p className={`event-card__status ${getSaleStatusClass()}`}>
              {event.dates?.status?.code || "On Sale"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
