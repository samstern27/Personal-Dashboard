import { useRef } from "react";

// NewsButtons component that renders clickable buttons for news articles
// Each button displays the article title and thumbnail image
const NewsButtons = ({ newsData, handleSelectedNews, id }) => {
  // Handle button click to select and display the article
  const handleClick = () => {
    handleSelectedNews(id);
  };

  // Render a button with article preview
  return (
    <button className="news-details-button" onClick={handleClick}>
      <h2>{newsData.title}</h2>
      {/* Display article thumbnail if available */}
      {newsData.image && newsData.image.trim() !== "" && (
        <img src={newsData.image} alt={newsData.title} />
      )}
    </button>
  );
};

export default NewsButtons;
