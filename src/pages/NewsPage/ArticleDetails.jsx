import React from "react";
import newsIcon from "../../assets/icons/newspaper-line.svg";
import "./News.css";

// ArticleDetails component that displays the full content of a selected news article
// Uses forwardRef to enable scrolling to the component when a new article is selected
const ArticleDetails = React.forwardRef(({ data }, ref) => {
  // Show placeholder UI when no article is selected
  if (!data || !data.text) {
    return (
      <div className="please-select">
        <p>Please select a news article</p>
        <img className="please-select-news-icon" src={newsIcon} alt="news" />
      </div>
    );
  }

  // Format article text into readable paragraphs
  // Groups sentences into paragraphs of 5 sentences each for better readability
  function splitIntoParagraphs(text) {
    // Regular expression to match sentence endings while preserving initials
    const sentenceRegex = /(?<!\b[A-Z])(?<=[.!?])\s+(?=[A-Z])/g;

    // Split text into sentences and group them into paragraphs
    const sentences = text.split(sentenceRegex);
    const paragraphs = [];
    for (let i = 0; i < sentences.length; i += 5) {
      paragraphs.push(sentences.slice(i, i + 5).join(" "));
    }
    const finalParagraphs = paragraphs.join("\n\n");

    return finalParagraphs;
  }

  // Format the article text for display
  const formattedText = splitIntoParagraphs(data.text);

  // Render the article with title, image, publish date, and formatted content
  return (
    <div className="news-details" ref={ref}>
      <h2>{data.title}</h2>
      {/* Render article image if available */}
      {data.image && data.image.trim() !== "" && (
        <img src={data.image} alt={data.title} />
      )}
      <p className="news-details-publish-date">{data.publish_date}</p>
      {/* Render formatted article paragraphs */}
      <div>
        {formattedText.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
});

export default ArticleDetails;
