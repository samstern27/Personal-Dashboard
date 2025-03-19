import React, { useState, useEffect, createContext, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import TopStocks from "./TopStocks";
import StockDetails from "./StockDetails";
import formatVolume from "./formatVolume";
import "./Stocks.css";

// Create the context
export const StockContext = createContext();

// Custom hook to use the stock context
export const useStock = () => {
  const context = useContext(StockContext);
  if (!context) {
    throw new Error("useStock must be used within a StockProvider");
  }
  return context;
};

const Stocks = () => {
  const [stocks, setStocks] = useState([]);
  const [timeSeries, setTimeSeries] = useState("TIME_SERIES_DAILY");
  const [interval, setInterval] = useState("5min");
  const [search, setSearch] = useState("IBM");
  const [selectedStock, setSelectedStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stockData, setStockData] = useState(null);
  const [popularStocks, setPopularStocks] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search.trim()) {
      await searchStock(search);
      navigate(`/stocks/${search}`);
    }
  };

  const searchStock = async (term) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=${timeSeries}&symbol=${term}${
          timeSeries === "TIME_SERIES_INTRADAY" ? `&interval=${interval}` : ""
        }&apikey=${import.meta.env.VITE_ALPHA_VANTAGE_API_KEY}`
      );
      const data = await response.json();

      // Check for API limit error (matches the exact response structure)
      if (data.Information && data.Information.includes("API key")) {
        throw new Error("RATE_LIMIT");
      }

      // Check if we got valid data
      if (!data["Meta Data"]) {
        throw new Error("INVALID_SYMBOL");
      }

      setSelectedStock(data);
      setStockData(data);
    } catch (error) {
      if (error.message === "RATE_LIMIT") {
        setError(
          "Network Error: API request limit reached. Please try again in a few minutes."
        );
      } else if (error.message === "INVALID_SYMBOL") {
        setError(`No stock found with symbol: ${term}`);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      setStockData(null);
      setSelectedStock(null);
    } finally {
      setLoading(false);
    }
  };

  // Create the context value object
  const contextValue = {
    stockData,
    setStockData,
    selectedStock,
    setSelectedStock,
    loading,
    setLoading,
    error,
    setError,
    searchStock,
  };

  return (
    <StockContext.Provider value={contextValue}>
      <div className="stocks-container">
        <h1>Stocks</h1>
        <div className="search-section">
          <form
            onSubmit={handleSubmit}
            className="stocks-container-content-search"
          >
            <div className="search-container">
              <label htmlFor="stock-search" className="search-label">
                Please enter a stock ticker:
              </label>
              <input
                id="stock-search"
                type="text"
                value={search}
                onChange={handleInputChange}
                placeholder="e.g. AAPL"
                className="search-input"
              />
            </div>
            <button className="stocks-search-button" type="submit">
              Search
            </button>
          </form>
        </div>
        <Outlet />
      </div>
    </StockContext.Provider>
  );
};

export default Stocks;

// {!selectedStock ? (
//   <TopStocks />
// ) : (
//   <StockDetails stockData={selectedStock} />
// )}
