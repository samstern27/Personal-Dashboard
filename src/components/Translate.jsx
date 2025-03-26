import React, { useState, useEffect } from "react";

const Translate = () => {
  const [greeting, setGreeting] = useState("Hello");
  const [translatedGreeting, setTranslatedGreeting] = useState("");
  const [translationSource, setTranslationSource] = useState(""); // Track which API we're using

  const languageCodes = [
    "sq",
    "az",
    "eu",
    "bn",
    "bg",
    "ca",
    "zh",
    "zh-TW",
    "cs",
    "da",
    "nl",
    "en",
    "eo",
    "et",
    "fi",
    "fr",
    "gl",
    "de",
    "el",
    "he",
    "hi",
    "hu",
    "id",
    "ga",
    "it",
    "ja",
    "ko",
    "lv",
    "lt",
    "ms",
    "no",
    "fa",
    "pl",
    "pt",
    "ro",
    "ru",
    "sr",
    "sk",
    "sl",
    "es",
    "sv",
    "tl",
    "th",
    "tr",
    "uk",
    "ur",
    "vi",
  ];

  useEffect(() => {
    const time = new Date();
    if (time.getHours() < 12) {
      setGreeting("Good Morning");
    } else if (time.getHours() < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  useEffect(() => {
    const translateGreeting = async () => {
      const randomLanguage =
        languageCodes[Math.floor(Math.random() * languageCodes.length)];

      // Try multiple translation services in order
      const translationServices = [
        {
          name: "Backend Service",
          url:
            process.env.NODE_ENV === "production"
              ? "https://your-backend-url.onrender.com/api/translate" // You'll update this with your actual backend URL
              : "http://localhost:5001/api/translate",
          transform: (data) => ({
            text: data.text,
            source: data.source,
            target: data.target,
          }),
        },
        {
          name: "LibreTranslate",
          url: "https://libretranslate.de/translate",
          transform: (data) => ({
            q: data.text,
            source: data.source,
            target: data.target,
          }),
        },
      ];

      for (const service of translationServices) {
        try {
          const response = await fetch(service.url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(
              service.transform({
                text: greeting,
                target: randomLanguage,
                source: "auto",
              })
            ),
          });

          const data = await response.json();

          if (data.translatedText) {
            setTranslatedGreeting(data.translatedText);
            setTranslationSource(service.name);
            break;
          }
        } catch (error) {
          console.error(`${service.name} translation error:`, error);
          continue; // Try next service if available
        }
      }
    };

    if (greeting) {
      translateGreeting();
    }
  }, [greeting]);

  return (
    <div className="translate-container">
      <h1>{translatedGreeting}</h1>
      <h2>{greeting}</h2>
      {translationSource && (
        <small className="translation-source">
          Translated using {translationSource}
        </small>
      )}
    </div>
  );
};

export default Translate;
