import React, { useState, useEffect } from "react";
import formatVolume from "./formatVolume";

const TopStocks = () => {
  const [topStocks, setTopStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularStocks = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${
            import.meta.env.VITE_ALPHA_VANTAGE_API_KEY
          }`
        );
        const data = await response.json();
        console.log("Popular Stocks:", data);
        setTopStocks(data);
      } catch (error) {
        console.error("Error fetching popular stocks:", error);
        setLoading(false);
      }
    };
    fetchPopularStocks();
  }, []);

  const popularStocksTable =
    topStocks && topStocks["most_actively_traded"]
      ? topStocks["most_actively_traded"].map((stock) => {
          return (
            <tr key={stock.ticker}>
              <td>
                <button className="stocks-popular-button">
                  <span>{stock.ticker}</span>
                </button>
              </td>
              <td>${stock.price}</td>
              <td>{stock.change_percentage}</td>
              <td>{stock.change_amount}</td>
              <td>{formatVolume(stock.volume)}</td>
            </tr>
          );
        })
      : null;
  return (
    <>
      <h2 className="stocks-popular-title">Most Popular Stocks</h2>
      <div className="stocks-table-wrapper">
        {loading ? (
          <p>Loading popular stocks...</p>
        ) : error ? (
          <div className="stocks-error">
            <p>{error}</p>
            {error.includes("API request limit") ? (
              <p>Please wait a few minutes before refreshing the page.</p>
            ) : (
              <p>Please try refreshing the page.</p>
            )}
          </div>
        ) : popularStocksTable ? (
          <table className="stocks-popular-table">
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Price</th>
                <th>Change %</th>
                <th>Change $</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>{popularStocksTable}</tbody>
          </table>
        ) : (
          <div className="stocks-error">
            <p>No stock data available at this time.</p>
            <p>Please try refreshing the page.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default TopStocks;
