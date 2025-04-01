import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
} from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import "./Stocks.css";

// Create the context for sharing stock data across components
// This enables state management and API calls to be shared between parent and child components
export const StockContext = createContext();

const Stocks = () => {
  console.log("Stocks component initializing");
  // State management for various aspects of the stock application
  const [timeSeries, setTimeSeries] = useState("TIME_SERIES_DAILY"); // Type of time series data to fetch
  const [interval, setInterval] = useState("5min"); // Time interval for intraday data
  const [search, setSearch] = useState("IBM"); // Current search term
  const [selectedStock, setSelectedStock] = useState(null); // Currently selected stock
  const [loading, setLoading] = useState(true); // Initialize as true since we fetch on mount
  const [error, setError] = useState(null); // Error state for handling API errors
  const [stockData, setStockData] = useState(null); // Current stock data
  const [popularStocks, setPopularStocks] = useState([]); // List of popular stocks
  const [isRateLimited, setIsRateLimited] = useState(false); // Track rate limit status
  const navigate = useNavigate(); // React Router navigation hook

  // Initialize refs for cleanup and component lifecycle management
  const abortController = useRef(null);
  const apiTimeout = useRef(null);
  const isComponentMounted = useRef(true);

  // Track component mount status for cleanup
  useEffect(() => {
    isComponentMounted.current = true;
    return () => {
      console.log("Component unmounting, cleaning up mount status");
      isComponentMounted.current = false;
    };
  }, []);

  // Cleanup function to abort pending API calls and clear timeouts
  const cleanup = () => {
    console.log("Cleanup called");
    if (abortController.current) {
      console.log("Aborting previous request");
      abortController.current.abort();
    }
    if (apiTimeout.current) {
      console.log("Clearing timeout");
      clearTimeout(apiTimeout.current);
    }
  };

  // Handle input changes in the search field
  const handleInputChange = (e) => {
    setSearch(e.target.value);
    // Reset error when user starts typing
    if (error) {
      setError(null);
    }
  };

  // Handle form submission for stock search
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (search.trim()) {
      // Don't proceed if rate limited
      if (isRateLimited) {
        setError("API rate limit reached. Please try again later.");
        return;
      }
      await searchStock(search);
      navigate(`/stocks/${search}`);
    }
  };

  // Function to fetch stock data from Alpha Vantage API with rate limiting
  const searchStock = async (term) => {
    console.log("searchStock called with term:", term);
    console.log("Current isComponentMounted:", isComponentMounted.current);

    cleanup(); // Clean up any existing API calls
    setLoading(true);
    setError(null);

    // Create new abort controller for this request
    abortController.current = new AbortController();

    try {
      console.log("Making API call to fetch stock data");
      const response = await fetch(
        `https://www.alphavantage.co/query?function=${timeSeries}&symbol=${term}${
          timeSeries === "TIME_SERIES_INTRADAY" ? `&interval=${interval}` : ""
        }&apikey=${import.meta.env.VITE_ALPHA_VANTAGE_API_KEY}`,
        { signal: abortController.current.signal }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received stock data:", data);

      // Handle API rate limit error
      if (data.Information && data.Information.includes("API key")) {
        console.log("API rate limit reached");
        setIsRateLimited(true);
        throw new Error("RATE_LIMIT");
      }

      // Validate received data
      if (!data["Meta Data"]) {
        console.log("Invalid data structure - no Meta Data:", data);
        throw new Error("INVALID_SYMBOL");
      }

      // Only update state if component is still mounted
      if (isComponentMounted.current) {
        console.log("Component is mounted, updating state with stock data");
        setSelectedStock(data);
        setStockData(data);
        setIsRateLimited(false); // Reset rate limit if successful
      } else {
        console.log("Component not mounted, skipping state update");
      }
    } catch (error) {
      console.log("Error in searchStock:", error);
      // Only update error state if component is mounted and error isn't from abort
      if (isComponentMounted.current && error.name !== "AbortError") {
        console.error("Stock search error:", error);
        if (error.message === "RATE_LIMIT") {
          setError(
            "Network Error: API request limit reached. Please try again later."
          );
          setIsRateLimited(true);
        } else if (error.message === "INVALID_SYMBOL") {
          setError(`No stock found with symbol: ${term}`);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
        setStockData(null);
        setSelectedStock(null);
      }
    } finally {
      console.log(
        "In searchStock finally block, isComponentMounted:",
        isComponentMounted.current
      );
      if (isComponentMounted.current) {
        console.log("Setting loading to false in searchStock");
        setLoading(false);
      }
    }
  };

  // Effect hook to fetch popular stocks on component mount with cleanup
  useEffect(() => {
    console.log(
      "Component mounted, isComponentMounted:",
      isComponentMounted.current
    );

    const controller = new AbortController();

    const fetchPopularStocks = async () => {
      console.log("Starting fetchPopularStocks");
      // Don't fetch if already rate limited
      if (isRateLimited) {
        setError("API rate limit reached. Please try again later.");
        setLoading(false);
        return;
      }

      setError(null);

      try {
        console.log("Making API call to fetch popular stocks");
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${
            import.meta.env.VITE_ALPHA_VANTAGE_API_KEY
          }`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Received API response:", data);

        // Handle API rate limit error
        if (data.Information && data.Information.includes("API key")) {
          setIsRateLimited(true);
          throw new Error("RATE_LIMIT");
        }

        // Update state regardless of mount status for initial load
        setPopularStocks(data);
        setIsRateLimited(false);
        setLoading(false);
      } catch (error) {
        console.log("Error in fetchPopularStocks:", error);
        if (error.name !== "AbortError") {
          console.error("Popular stocks fetch error:", error);
          if (error.message === "RATE_LIMIT") {
            setError(
              "Network Error: API request limit reached. Please try again later."
            );
            setIsRateLimited(true);
          } else {
            setError("An unexpected error occurred. Please try again.");
          }
          setPopularStocks([]);
          setLoading(false);
        }
      }
    };

    fetchPopularStocks();

    // Only cleanup the specific controller for this effect
    return () => {
      console.log("Popular stocks effect cleanup");
      controller.abort();
    };
  }, []);

  // Create context value object to share with child components
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
    popularStocks,
    isRateLimited,
  };

  // Render the main stocks component with context provider
  return (
    <StockContext.Provider value={contextValue}>
      <div className="stocks-container">
        <div className="stocks-search-section">
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
                  disabled={isRateLimited}
                />
              </div>
              <button
                className="stocks-search-button"
                type="submit"
                disabled={isRateLimited}
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <Outlet />
      </div>
    </StockContext.Provider>
  );
};

export default Stocks;
