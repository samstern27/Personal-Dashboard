import { useState, useEffect } from "react";
import "../pages/HomePage/Home.css";

export default function TimeDate() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentDate = new Date();

  // Function to get the ordinal suffix
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th"; // Covers 11th to 19th
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

  // Format the date
  const options = { weekday: "long", month: "long", year: "numeric" };
  const day = currentDate.getDate();
  const ordinalSuffix = getOrdinalSuffix(day);
  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
    currentDate
  );

  // Construct the final formatted date string
  const finalFormattedDate = `${
    formattedDate.split(" ")[0]
  }, ${day}${ordinalSuffix} ${formattedDate.split(" ").slice(1).join(" ")}`;

  return (
    <div className="time-date-container">
      <time className="time">
        {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </time>
      <time className="date">{finalFormattedDate}</time>
    </div>
  );
}
