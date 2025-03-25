import { useRef } from "react";

// NewsButtons component that renders clickable buttons for news articles
const NewsButtons = ({ newsData, handleSelectedNews, id }) => {
  // Handler for button click that selects the news article
  const handleClick = () => {
    handleSelectedNews(id);
  };

  // Render button with article title and image (if available)
  return (
    <button className="news-details-button" onClick={handleClick}>
      <h2>{newsData.title}</h2>
      {/* Only render image if it exists and is not empty */}
      {newsData.image && newsData.image.trim() !== "" && (
        <img src={newsData.image} alt={newsData.title} />
      )}
    </button>
  );
};

export default NewsButtons;
