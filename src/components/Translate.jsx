import React from "react";
import translations from "./translations";
import "../pages/HomePage/Home.css";

const Translate = () => {
  const greeting =
    new Date().getHours() < 12
      ? "Good Morning"
      : new Date().getHours() < 18
      ? "Good Afternoon"
      : "Good Evening";
  console.log(greeting);
  const formattedGreeting = greeting
    .toLowerCase()
    .split(" ")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
  console.log(formattedGreeting);
  const randomLanguage =
    Object.keys(translations)[
      Math.floor(Math.random() * Object.keys(translations).length)
    ];
  console.log(randomLanguage);
  const translatedGreeting = translations[randomLanguage][formattedGreeting];
  console.log(translatedGreeting);

  return (
    <div className="translate-container">
      <h1>{translatedGreeting}</h1>
      <h2>{randomLanguage}</h2>
      <h3>{greeting}</h3>
    </div>
  );
};

export default Translate;
