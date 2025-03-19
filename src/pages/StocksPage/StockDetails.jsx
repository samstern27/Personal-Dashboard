import React from "react";
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
import { useParams, Navigate } from "react-router-dom";
import { useStock } from "./Stocks";

// Register the required components
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
  const { stockData, error, loading } = useStock();
  const { symbol } = useParams();

  if (loading) {
    return (
      <div className="stock-loading">
        <h2>Loading stock data...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stock-error">
        <h2>Error</h2>
        <p>{error}</p>
        {error.includes("We have detected your API key") ? (
          <p>Please wait a few minutes before trying again.</p>
        ) : (
          <p>Please try searching for a different stock symbol.</p>
        )}
      </div>
    );
  }

  if (!stockData) {
    return <Navigate to="/stocks" replace />;
  }

  console.log(stockData);

  // Check if stockData and timeSeries exist before using them
  const timeSeries = stockData && stockData["Time Series (Daily)"];

  // Get the dates and values
  let labels = timeSeries ? Object.keys(timeSeries) : [];
  let closeValues = timeSeries
    ? Object.values(timeSeries).map((item) => item["4. close"])
    : [];
  let volumeValues = timeSeries
    ? Object.values(timeSeries).map((item) => item["5. volume"])
    : [];

  // Calculate percentage changes
  let percentageChanges = closeValues.map((close, index) => {
    if (index === closeValues.length - 1) return 0;
    const nextClose = closeValues[index + 1];
    return ((close - nextClose) / nextClose) * 100;
  });

  // Reverse all arrays to show oldest to newest
  labels = labels.reverse();
  closeValues = closeValues.reverse();
  volumeValues = volumeValues.reverse();
  percentageChanges = percentageChanges.reverse();

  // Create chart data object with proper checks
  const chartData = {
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
  };

  const options = {
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
  };

  return (
    <div className="stock-details">
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

export default StockDetails;
