import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import NewsButtons from "./NewsButtons";
import ArticleDetails from "./ArticleDetails";
import { useLocation } from "../../contexts/LocationContext";
import "./News.css";

// News component that displays top news articles based on user's location
// Integrates with World News API to fetch location-specific news
const News = () => {
  // State management for news data and UI states
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  const [newsData, setNewsData] = useState({ top_news: [] });
  const [selectedNews, setSelectedNews] = useState(null);
  const newsDetailsRef = useRef(null);

  // Get location data from context for personalized news delivery
  const {
    coords,
    isLoading: locationLoading,
    error: locationError,
  } = useLocation();

  const newsApiKey = import.meta.env.VITE_WORLD_NEWS_API_KEY;

  // Get user's country code based on their coordinates
  // This is used to fetch location-specific news
  useEffect(() => {
    if (coords) {
      getCountryCode(coords.lat, coords.lng);
    }
  }, [coords]);

  // Convert coordinates to country code using reverse geocoding
  const getCountryCode = async (latitude, longitude) => {
    try {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const data = await res.json();
      setCountryCode(data.countryCode.toLowerCase());
    } catch (error) {
      console.error("Failed to get country code from coordinates: ", error);
      setIsError(error);
      setCountryCode("uk"); // Fallback to UK if geocoding fails
    }
  };

  // Fetch news data when country code is available
  // Uses World News API to get top news for the user's country
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
  }, [countryCode]);

  // Handle article selection and scroll to details
  const handleSelectedNews = (id) => {
    const selected = newsData.top_news.find((story) => story.news[0].id === id);
    if (selected) {
      setSelectedNews(selected.news[0]);
      // Smooth scroll to article details when selecting new article
      if (newsDetailsRef.current) {
        newsDetailsRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  // Filter and map news data to button components
  // Excludes articles with permission errors
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

  // Combine loading states from location and news fetching
  const showLoading = locationLoading || isLoading;
  const errorToShow = locationError || isError;

  return (
    <section className="news-container">
      <div className="news-container-content">
        <h1>News</h1>
        {showLoading ? (
          // Loading state with spinner
          <div className="loading-container">
            <Spinner animation="border" variant="secondary" />
            <p>Loading news for your area...</p>
          </div>
        ) : errorToShow ? (
          // Error state with message
          <p>Error: {errorToShow}</p>
        ) : (
          // Main news content with article list and details
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
