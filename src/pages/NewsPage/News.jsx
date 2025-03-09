import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import NewsDetails from "./NewsDetails";
import "./News.css";
import "../HomePage/Home.css";

const News = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  const [newsData, setNewsData] = useState({});

  const newsApiKey = import.meta.env.VITE_WORLD_NEWS_API_KEY;

  useEffect(() => {
    const getCountryCode = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            try {
              const res = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );
              const data = await res.json();
              setCountryCode(data.countryCode.toLowerCase());
            } catch (error) {
              console.error(
                "Failed to get user location, please enable location access: ",
                error
              );
              setIsError(error);
              setCountryCode("uk");
            }
          },
          (error) => {
            console.error("Geolocation error: ", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getCountryCode();
  }, []);

  useEffect(() => {
    if (countryCode) {
      const fetchNewsData = async () => {
        try {
          const res = await fetch(
            `https://api.worldnewsapi.com/top-news?source-country=${countryCode}&language=en&api-key=${newsApiKey}`
          );
          const data = await res.json();
          setNewsData(data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error retrieving News data: ", error);
          setIsError(error);
          setIsLoading(false);
        }
      };

      fetchNewsData();
    }
  }, [countryCode]); // Run when countryCode changes

  console.log(newsData);
  const newsElements = newsData.top_news
    ? newsData.top_news.map((story, index) => (
        <NewsDetails key={index} newsData={story.news[0]} />
      ))
    : null;

  return (
    <section className="news-container">
      <div className="news-container-content">
        <h1>News</h1>

        {newsElements}
      </div>
    </section>
  );
};

export default News;
