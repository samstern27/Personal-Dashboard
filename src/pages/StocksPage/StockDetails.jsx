import React, { useEffect, useMemo, memo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Stocks.css"; // Import the CSS file
import { useParams, Navigate, NavLink } from "react-router-dom";
import { useContext } from "react";
import { StockContext } from "./Stocks";
import Spinner from "react-bootstrap/Spinner";

// Register Chart.js components for stock price visualization
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockDetails = () => {
  // Get stock data, error state, and loading state from context
  const { stockData, error, loading, searchStock } = useContext(StockContext);
  // Get stock symbol from URL parameters
  const { symbol } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (
        symbol &&
        (!stockData || stockData["Meta Data"]["2. Symbol"] !== symbol)
      ) {
        await searchStock(symbol);
      }
    };
    fetchData();
  }, [symbol, stockData, searchStock]);

  // Show loading state while data is being fetched
  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="secondary" />
        <p>Loading stock data...</p>
      </div>
    );
  }

  // Show error state if there's an error
  if (error) {
    return (
      <div className="stock-error">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  // Redirect to stocks page if no data is available
  if (!stockData) {
    return <Navigate to="/stocks" replace />;
  }

  // Get time series data from stock data
  const timeSeriesKey = Object.keys(stockData).find((key) =>
    key.includes("Time Series")
  );
  const timeSeries = timeSeriesKey ? stockData[timeSeriesKey] : null;

  if (!timeSeries) {
    return (
      <div className="stock-error">
        <h2>Error</h2>
        <p>No time series data available for this stock.</p>
      </div>
    );
  }

  // Extract dates and values from time series data
  let labels = Object.keys(timeSeries);
  let closeValues = Object.values(timeSeries).map((item) =>
    parseFloat(item["4. close"])
  );
  let volumeValues = Object.values(timeSeries).map((item) =>
    parseInt(item["5. volume"])
  );

  // Calculate percentage changes between consecutive closing prices
  let percentageChanges = closeValues.map((close, index) => {
    if (index === closeValues.length - 1) return 0;
    const nextClose = closeValues[index + 1];
    return ((close - nextClose) / nextClose) * 100;
  });

  // Reverse arrays to show data from oldest to newest
  labels = labels.reverse();
  closeValues = closeValues.reverse();
  volumeValues = volumeValues.reverse();
  percentageChanges = percentageChanges.reverse();

  // Configure chart data with three datasets: price, percentage change, and volume
  const chartData = useMemo(
    () => ({
      labels: labels,
      datasets: [
        {
          label: "Price (Close)",
          data: closeValues,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
          yAxisID: "y",
        },
        {
          label: "24hr % Change",
          data: percentageChanges,
          borderColor: "rgb(255, 99, 132)",
          tension: 0.1,
          yAxisID: "y1",
        },
        {
          label: "Volume",
          data: volumeValues,
          borderColor: "rgb(153, 102, 255)",
          tension: 0.1,
          yAxisID: "y2",
        },
      ],
    }),
    [labels, closeValues, percentageChanges, volumeValues]
  );

  // Configure chart options for styling and interaction
  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            font: {
              size: 12,
              color: "white",
            },
          },
        },
      },
      scales: {
        x: {
          ticks: {
            font: {
              size: 10,
              color: "white",
            },
            maxRotation: 90,
            minRotation: 90,
            autoSkip: true,
            maxTicksLimit: 20,
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
        y: {
          type: "linear",
          display: true,
          position: "left",
          title: {
            display: true,
            text: "Price ($)",
            color: "rgb(75, 192, 192)",
          },
          grid: {
            color: "rgba(255, 255, 255, 0.1)",
          },
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          title: {
            display: true,
            text: "% Change",
            color: "rgb(255, 99, 132)",
          },
          grid: {
            drawOnChartArea: false,
          },
        },
        y2: {
          type: "linear",
          display: true,
          position: "right",
          title: {
            display: true,
            text: "Volume",
            color: "rgb(153, 102, 255)",
          },
          grid: {
            drawOnChartArea: false,
          },
        },
      },
      layout: {
        padding: {
          bottom: 30,
        },
      },
    }),
    []
  ); // Empty dependency array since options are static

  // Render the stock details component with chart
  return (
    <div className="stock-details">
      <NavLink to="/stocks" className="stocks-back-button">
        <i className="fas fa-arrow-left back-button-icon"></i> Back to Stocks
      </NavLink>
      <h2>{stockData["Meta Data"]["2. Symbol"]}</h2>
      <div className="stock-chart-wrapper">
        {timeSeries ? (
          <div className="stock-chart-container">
            <h2 className="chart-title">Stock Price History (Daily)</h2>
            <Line className="stock-chart" data={chartData} options={options} />
          </div>
        ) : (
          <p className="loading-message">Loading stock data...</p>
        )}
      </div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(StockDetails);
