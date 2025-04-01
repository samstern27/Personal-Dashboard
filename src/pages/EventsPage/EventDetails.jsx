import React from "react";
import "./EventDetails.css";

const EventDetails = ({ event, onClose }) => {
  console.log("EventDetails received event:", event); // Debug log
  // This component displays detailed information about a selected event

  // In a real implementation:
  // - event: would be the event object from the API
  // - onClose: callback function to close the details view

  // Format date string into a detailed user-friendly format
  const formatDate = (dateString) => {
    if (!dateString) return "Date TBD";
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format time string with a label for different event times
  const formatTime = (timeString, label) => {
    if (!timeString) return `${label}: TBD`;
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return `${label}: ${new Date(`2000-01-01T${timeString}`).toLocaleTimeString(
      undefined,
      options
    )}`;
  };

  // Get the highest resolution image available for the event
  // Prefers widescreen format for better visual presentation
  const getHighResImage = () => {
    if (!event.images || event.images.length === 0) {
      return "https://placehold.co/800x450?text=No+Image";
    }

    // Find a high-res image, preferring widescreen format
    const suitable = event.images.find(
      (img) => img.ratio === "16_9" && img.width > 500
    );
    return suitable ? suitable.url : event.images[0].url;
  };

  // Format price ranges into a user-friendly string
  const formatPriceRanges = () => {
    if (!event.priceRanges || event.priceRanges.length === 0) {
      return ["Price information not available"];
    }

    return event.priceRanges.map((range) => {
      return `${range.min} - ${range.max} ${range.currency || "USD"}`;
    });
  };

  return (
    <div className="event-details">
      {/* Navigation header with back button */}
      <div className="event-details__header">
        <button className="event-details__back-button" onClick={onClose}>
          &larr; Back to Events
        </button>
      </div>

      <div className="event-details__content">
        {/* Main content area with event information */}
        <div className="event-details__main">
          {/* High-resolution event image */}
          <div className="event-details__image-container">
            <img
              src={getHighResImage()}
              alt={event.name || "Event cover"}
              className="event-details__image"
            />
          </div>

          <h1 className="event-details__name">
            {event.name || "Untitled Event"}
          </h1>

          {/* Grid layout for event details */}
          <div className="event-details__info-grid">
            {/* Date and time information */}
            <div className="event-details__info-item">
              <h3>Date and Time</h3>
              <p>{formatDate(event.dates?.start?.localDate)}</p>
              {event.dates?.start?.localTime && (
                <p>{formatTime(event.dates.start.localTime, "Show Starts")}</p>
              )}
              {event.dates?.doorTime && (
                <p>{formatTime(event.dates.doorTime, "Doors Open")}</p>
              )}
            </div>

            {/* Venue and location details */}
            <div className="event-details__info-item">
              <h3>Venue</h3>
              <p>{event._embedded?.venues?.[0]?.name || "Venue TBD"}</p>
              {event._embedded?.venues?.[0]?.address?.line1 && (
                <p>{event._embedded.venues[0].address.line1}</p>
              )}
              {event._embedded?.venues?.[0]?.city?.name && (
                <p>
                  {event._embedded.venues[0].city.name},
                  {event._embedded.venues[0].state?.stateCode || ""}
                  {event._embedded.venues[0].postalCode
                    ? ` ${event._embedded.venues[0].postalCode}`
                    : ""}
                </p>
              )}
            </div>

            {/* Pricing information */}
            <div className="event-details__info-item">
              <h3>Price Range</h3>
              {formatPriceRanges().map((price, index) => (
                <p key={index}>{price}</p>
              ))}
              {event.ticketLimit && <p>{event.ticketLimit.info}</p>}
            </div>

            {/* Age restrictions and additional notes */}
            <div className="event-details__info-item">
              <h3>Restrictions</h3>
              <p>
                {event.ageRestrictions?.legalAgeEnforced
                  ? "18+ Event"
                  : "All Ages"}
              </p>
              {event.pleaseNote && <p>{event.pleaseNote}</p>}
            </div>
          </div>
        </div>

        {/* Sidebar with actions and organizer info */}
        <div className="event-details__sidebar">
          <div className="event-details__actions">
            {/* Ticket purchase button */}
            <a
              href={event.url || "#"}
              className="event-details__ticket-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy Tickets
            </a>

            {/* Organizer information */}
            <div className="event-details__organizer">
              <h3>Event Organizer</h3>
              <p>
                {event.promoter?.name ||
                  event._embedded?.attractions?.[0]?.name ||
                  "Organizer information unavailable"}
              </p>
              {(event._embedded?.attractions?.[0]?.url ||
                event.promoter?.url) && (
                <a
                  href={
                    event._embedded?.attractions?.[0]?.url ||
                    event.promoter?.url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Organizer Website
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
