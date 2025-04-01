import { useMemo, memo } from "react";
import translations from "./translations";
import "../pages/HomePage/Home.css";

const Translate = () => {
  // useMemo is used here to cache the greeting calculation
  // It will only recalculate when the hour changes, saving unnecessary computations
  const greeting = useMemo(
    () =>
      new Date().getHours() < 12
        ? "Good Morning"
        : new Date().getHours() < 18
        ? "Good Afternoon"
        : "Good Evening",
    [] // Empty dependency array means this value is cached and only updates on component mount
  );

  // Transform greeting into camelCase format (e.g., "Good Morning" -> "goodMorning")
  // This matches the keys in our translations object
  const formattedGreeting = useMemo(
    () =>
      greeting
        .toLowerCase()
        .split(" ")
        .map((word, index) =>
          index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(""),
    [greeting] // Only recalculate if greeting changes
  );

  // Randomly select a language from our translations object
  // useMemo ensures we don't pick a new random language on every render
  const randomLanguage = useMemo(
    () =>
      Object.keys(translations)[
        Math.floor(Math.random() * Object.keys(translations).length)
      ],
    [] // Empty dependency array means language only changes on component mount
  );

  // Get the translated greeting for our randomly selected language
  const translatedGreeting = useMemo(
    () => translations[randomLanguage][formattedGreeting],
    [randomLanguage, formattedGreeting] // Only recalculate if language or greeting changes
  );

  return (
    <div className="translate-container">
      <h1>{translatedGreeting}</h1>
      <h2>{randomLanguage}</h2>
      <h3>{greeting}</h3>
    </div>
  );
};

// memo prevents re-renders if the component's props haven't changed
// In this case, there are no props, but it's still good practice for performance
export default memo(Translate);
