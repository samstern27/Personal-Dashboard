import React from "react";
import "./EventDetails.css";

const EventDetails = ({ event, onClose }) => {
  // This component displays detailed information about a selected event

  // In a real implementation:
  // - event: would be the event object from the API
  // - onClose: callback function to close the details view

  // Helper function to format date
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

  // Helper function to format time
  const formatTime = (timeString, label) => {
    if (!timeString) return `${label}: TBD`;
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return `${label}: ${new Date(`2000-01-01T${timeString}`).toLocaleTimeString(
      undefined,
      options
    )}`;
  };

  // Helper to get high-resolution image
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

  // Helper to format price ranges
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
      <div className="event-details__header">
        <button className="event-details__back-button" onClick={onClose}>
          &larr; Back to Events
        </button>
      </div>

      <div className="event-details__content">
        <div className="event-details__main">
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

          <div className="event-details__info-grid">
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

            <div className="event-details__info-item">
              <h3>Price Range</h3>
              {formatPriceRanges().map((price, index) => (
                <p key={index}>{price}</p>
              ))}
              {event.ticketLimit && <p>{event.ticketLimit.info}</p>}
            </div>

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

          <div className="event-details__description">
            <h2>About This Event</h2>
            {event.info || event.description ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: event.info || event.description,
                }}
              />
            ) : (
              <p>No description available for this event.</p>
            )}
          </div>
        </div>

        <div className="event-details__sidebar">
          <div className="event-details__actions">
            <a
              href={event.url || "#"}
              className="event-details__ticket-button"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy Tickets
            </a>

            <div className="event-details__share">
              <h3>Share This Event</h3>
              <div className="event-details__share-buttons">
                <button>Facebook</button>
                <button>Twitter</button>
                <button>Email</button>
              </div>
            </div>

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
