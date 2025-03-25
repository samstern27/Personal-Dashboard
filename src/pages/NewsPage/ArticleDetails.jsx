import React from "react";
import newsIcon from "../../assets/icons/newspaper-line.svg";
import "./News.css";

// ArticleDetails component that displays the full content of a selected news article
const ArticleDetails = React.forwardRef(({ data }, ref) => {
  // Show placeholder if no article is selected
  if (!data || !data.text) {
    return (
      <div className="please-select">
        <p>Please select a news article</p>
        <img className="please-select-news-icon" src={newsIcon} alt="news" />
      </div>
    );
  }

  // Function to format article text into paragraphs
  function splitIntoParagraphs(text) {
    // Regular expression to match sentence endings, considering initials
    const sentenceRegex = /(?<!\b[A-Z])(?<=[.!?])\s+(?=[A-Z])/g;

    // Split the text into sentences
    const sentences = text.split(sentenceRegex);

    // Group sentences into paragraphs of 5 sentences each
    const paragraphs = [];
    for (let i = 0; i < sentences.length; i += 5) {
      paragraphs.push(sentences.slice(i, i + 5).join(" "));
    }
    const finalParagraphs = paragraphs.join("\n\n");

    // Join paragraphs with double newlines to separate them
    return finalParagraphs;
  }

  // Format the article text into paragraphs
  const formattedText = splitIntoParagraphs(data.text);

  // Render the article details with title, image, publish date, and formatted text
  return (
    <div className="news-details" ref={ref}>
      <h2>{data.title}</h2>
      {/* Only render image if it exists and is not empty */}
      {data.image && data.image.trim() !== "" && (
        <img src={data.image} alt={data.title} />
      )}
      <p className="news-details-publish-date">{data.publish_date}</p>
      {/* Render each paragraph of the article */}
      <div>
        {formattedText.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
});

export default ArticleDetails;
