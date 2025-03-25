import { useState, useEffect } from "react";
import "../pages/HomePage/Home.css";

export default function TimeDate() {
  // State to store current time, updates every second
  const [time, setTime] = useState(new Date());

  // Effect hook to update time every second
  useEffect(() => {
    // Set up interval to update time every 1000ms (1 second)
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  // Get current date for formatting
  const currentDate = new Date();

  // Helper function to determine the correct ordinal suffix for a day number
  const getOrdinalSuffix = (day) => {
    // Special case for numbers 11-19 which all use 'th'
    if (day > 3 && day < 21) return "th";
    // For all other numbers, determine suffix based on last digit
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  // Configure date formatting options
  const options = { weekday: "long", month: "long", year: "numeric" };
  // Extract day number from current date
  const day = currentDate.getDate();
  // Get appropriate ordinal suffix for the day
  const ordinalSuffix = getOrdinalSuffix(day);
  // Format date using British English locale
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
    currentDate
  );

  // Construct final date string with ordinal suffix
  const finalFormattedDate = `${
    formattedDate.split(" ")[0]
  }, ${day}${ordinalSuffix} ${formattedDate.split(" ").slice(1).join(" ")}`;

  // Render time and date display
  return (
    <div className="time-date-container">
      {/* Display current time in 12-hour format */}
      <time className="time">
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </time>
      {/* Display formatted date with ordinal suffix */}
      <time className="date">{finalFormattedDate}</time>
    </div>
  );
}
