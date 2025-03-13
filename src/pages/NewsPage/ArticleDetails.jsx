import React from "react";
import newsIcon from "../../assets/icons/newspaper-line.svg";
import "./News.css";

const ArticleDetails = React.forwardRef(({ data }, ref) => {
  if (!data || !data.text) {
    return (
      <div className="please-select">
        <p>Please select a news article</p>
        <img className="please-select-news-icon" src={newsIcon} alt="news" />
      </div>
    );
  }

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
    console.log(finalParagraphs);
    // Join paragraphs with double newlines to separate them
    return finalParagraphs;
  }
  const formattedText = splitIntoParagraphs(data.text);

  return (
    <div className="news-details" ref={ref}>
      <h2>{data.title}</h2>
      <img src={data.image} alt={data.title} />
      <p className="news-details-publish-date">{data.publish_date}</p>
      <div>
        {formattedText.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
});

export default ArticleDetails;
