import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import NewsButtons from "./NewsButtons";
import ArticleDetails from "./ArticleDetails";
import { useLocation } from "../../contexts/LocationContext";
import "./News.css";

// News component that displays top news articles based on user's location
const News = () => {
  // State management for news data and UI states
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isError, setIsError] = useState(null); // Error state
  const [countryCode, setCountryCode] = useState(""); // User's country code
  const [newsData, setNewsData] = useState({ top_news: [] }); // News data from API
  const [selectedNews, setSelectedNews] = useState(null); // Currently selected article
  const newsDetailsRef = useRef(null); // Reference to article details section for scrolling

  // Get location data from context
  const {
    coords,
    isLoading: locationLoading,
    error: locationError,
  } = useLocation();

  const newsApiKey = import.meta.env.VITE_WORLD_NEWS_API_KEY;

  // Effect hook to get user's country code based on location from context
  useEffect(() => {
    if (coords) {
      getCountryCode(coords.lat, coords.lng);
    }
  }, [coords]);

  // Function to get country code from coordinates
  const getCountryCode = async (latitude, longitude) => {
    try {
      // Fetch country code from coordinates
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const data = await res.json();
      setCountryCode(data.countryCode.toLowerCase());
    } catch (error) {
      console.error("Failed to get country code from coordinates: ", error);
      setIsError(error);
      setCountryCode("uk"); // Default to UK if geocoding fails
    }
  };

  // Effect hook to fetch news data when country code is available
  useEffect(() => {
    if (countryCode) {
      const fetchNewsData = async () => {
        try {
          // Fetch top news for user's country
          const res = await fetch(
            `https://api.worldnewsapi.com/top-news?source-country=${countryCode}&language=en&api-key=${newsApiKey}`
          );
          const data = await res.json();
          console.log(data);
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

  // Handler for selecting a news article
  const handleSelectedNews = (id) => {
    const selected = newsData.top_news.find((story) => story.news[0].id === id);
    if (selected) {
      setSelectedNews(selected.news[0]);
      // Scroll to top of article details when selecting new article
      if (newsDetailsRef.current) {
        console.log(newsDetailsRef.current);
        newsDetailsRef.current.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  // Create news button elements from filtered news data
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

  // Determine if we're still loading
  const showLoading = locationLoading || isLoading;

  // Determine if there's an error
  const errorToShow = locationError || isError;

  // Render news component with conditional rendering based on state
  return (
    <section className="news-container">
      <div className="news-container-content">
        <h1>News</h1>
        {showLoading ? (
          // Show loading spinner while fetching data
          <div className="loading-container">
            <Spinner animation="border" variant="secondary" />
            <p>Loading news for your area...</p>
          </div>
        ) : errorToShow ? (
          // Show error message if there's an error
          <p>Error: {errorToShow}</p>
        ) : (
          // Show news content if data is available
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
