import Spinner from "react-bootstrap/Spinner";
import { useContext } from "react";
import { StockContext } from "./Stocks";
import formatVolume from "./formatVolume";
import { useNavigate } from "react-router-dom";

// TopStocks component that displays a table of top gaining stocks
// Uses context to access shared stock data and navigation
const TopStocks = () => {
  const { loading, error, popularStocks, searchStock } =
    useContext(StockContext);
  const navigate = useNavigate();

  // Handle stock selection and navigation to details view
  const handleStockClick = async (ticker) => {
    try {
      await searchStock(ticker);
      navigate(`/stocks/${ticker}`);
    } catch (error) {
      console.error("Error navigating to stock:", error);
    }
  };

  // Create table rows for top gaining stocks
  const popularStocksTable =
    !loading && popularStocks && popularStocks.top_gainers
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

  // Render the top stocks component with conditional states
  return (
    <>
      <h2 className="stocks-popular-title">Top Movers</h2>

      {loading ? (
        // Show loading spinner while fetching data
        <div className="loading-container">
          <Spinner animation="border" variant="secondary" />
          <p>Loading top movers...</p>
        </div>
      ) : error ? (
        // Show error message if there's an error
        <div className="stocks-error">
          <p>{error}</p>
        </div>
      ) : popularStocksTable ? (
        // Show table of top gaining stocks
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
        // Show message when no data is available
        <div className="stocks-error">
          <p>No stock data available at this time.</p>
          <p>Please try refreshing the page.</p>
        </div>
      )}
    </>
  );
};

export default TopStocks;
