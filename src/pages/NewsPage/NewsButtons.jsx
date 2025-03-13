import { useRef } from "react";

const NewsButtons = ({ newsData, handleSelectedNews, id }) => {
  const handleClick = () => {
    handleSelectedNews(id);
  };
  return (
    <button className="news-details-button" onClick={handleClick}>
      <h2>{newsData.title}</h2>
      <img src={newsData.image} alt={newsData.title} />
    </button>
  );
};

export default NewsButtons;
