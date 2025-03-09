import React from "react";

const NewsDetails = ({ newsData }) => {
  console.log(newsData);

  return (
    <div className="news-details">
      <h2>{newsData.title}</h2>
      <img src={newsData.image} alt={newsData.title} />
      <p className="news-details-publish-date">{newsData.publish_date}</p>
      <p>{newsData.text}</p>
    </div>
  );
};

export default NewsDetails;
