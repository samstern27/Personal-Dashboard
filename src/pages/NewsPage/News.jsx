import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import NewsButtons from "./NewsButtons";
import ArticleDetails from "./ArticleDetails";
import "./News.css";

const News = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  const [newsData, setNewsData] = useState({ top_news: [] });
  const [selectedNews, setSelectedNews] = useState(null);
  const newsDetailsRef = useRef(null);

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

  const handleSelectedNews = (id) => {
    const selected = newsData.top_news.find((story) => story.news[0].id === id);
    if (selected) {
      setSelectedNews(selected.news[0]);
      if (newsDetailsRef.current) {
        console.log(newsDetailsRef.current);
        newsDetailsRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  const newsElements = newsData.top_news
    ? newsData.top_news
        .filter(
          (story) =>
            !story.news[0].text.includes("You don't have permission to access")
        )
        .map((story) => (
          <NewsButtons
            key={story.news[0].id}
            newsData={story.news[0]}
            id={story.news[0].id}
            handleSelectedNews={handleSelectedNews}
          />
        ))
    : null;

  return (
    <section className="news-container">
      <div className="news-container-content">
        <h1>News</h1>
        {isLoading ? (
          <div className="loading-container">
            <Spinner animation="border" variant="secondary" />
            <p>Loading news for your area...</p>
          </div>
        ) : isError ? (
          <p>Error: {isError}</p>
        ) : (
          <div className="news-section">
            <div className="news-details-button-container">{newsElements}</div>
            <div className="article-content">
              <ArticleDetails data={selectedNews} ref={newsDetailsRef} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
