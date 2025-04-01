import React, { useMemo, memo } from "react";
import translations from "./translations";
import "../pages/HomePage/Home.css";

const Translate = () => {
  const greeting = useMemo(
    () =>
      new Date().getHours() < 12
        ? "Good Morning"
        : new Date().getHours() < 18
        ? "Good Afternoon"
        : "Good Evening",
    [] // Empty dependency array since this only depends on the current hour
  );

  const formattedGreeting = useMemo(
    () =>
      greeting
        .toLowerCase()
        .split(" ")
        .map((word, index) =>
          index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(""),
    [greeting]
  );

  const randomLanguage = useMemo(
    () =>
      Object.keys(translations)[
        Math.floor(Math.random() * Object.keys(translations).length)
      ],
    [] // Empty dependency array since this is a random selection
  );

  const translatedGreeting = useMemo(
    () => translations[randomLanguage][formattedGreeting],
    [randomLanguage, formattedGreeting]
  );

  return (
    <div className="translate-container">
      <h1>{translatedGreeting}</h1>
      <h2>{randomLanguage}</h2>
      <h3>{greeting}</h3>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(Translate);
