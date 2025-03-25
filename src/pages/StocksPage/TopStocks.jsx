import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { useContext } from "react";
import { StockContext } from "./Stocks";
import formatVolume from "./formatVolume";
import { useNavigate } from "react-router-dom";

const TopStocks = () => {
  const { loading, error, popularStocks, searchStock } =
    useContext(StockContext);
  const navigate = useNavigate();

  const handleStockClick = async (ticker) => {
    try {
      await searchStock(ticker);
      navigate(`/stocks/${ticker}`);
    } catch (error) {
      console.error("Error navigating to stock:", error);
    }
  };

  const popularStocksTable =
    popularStocks && popularStocks.top_gainers
      ? popularStocks.top_gainers.map((stock) => (
          <tr key={stock.ticker}>
            <td>
              <button
                onClick={() => handleStockClick(stock.ticker)}
                className="stocks-popular-button"
              >
                <span>{stock.ticker}</span>
              </button>
            </td>
            <td>${stock.price}</td>
            <td>{stock.change_percentage}</td>
            <td>{stock.change_amount}</td>
            <td>{formatVolume(stock.volume)}</td>
          </tr>
        ))
      : null;

  return (
    <>
      <h2 className="stocks-popular-title">Top Movers</h2>

      {loading ? (
        <div className="loading-container">
          <Spinner animation="border" variant="secondary" />
          <p>Loading top movers...</p>
        </div>
      ) : error ? (
        <div className="stocks-error">
          <p>{error}</p>
        </div>
      ) : popularStocksTable ? (
        <div className="stocks-table-wrapper">
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
        </div>
      ) : (
        <div className="stocks-error">
          <p>No stock data available at this time.</p>
          <p>Please try refreshing the page.</p>
        </div>
      )}
    </>
  );
};

export default TopStocks;
