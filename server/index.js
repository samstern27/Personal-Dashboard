// Import required packages:
// express: Framework for building web servers in Node.js
// cors: Enables Cross-Origin Resource Sharing (allows frontend to talk to backend)
// axios: Used for making HTTP requests to external APIs
// dotenv: Loads environment variables from a .env file
import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
// Set server port - use environment variable in production or 5001 for local development
const port = process.env.PORT || 5001;

// Configure CORS (Cross-Origin Resource Sharing)
// This is crucial for development because your React app (localhost:5173)
// needs permission to talk to your backend (localhost:5001)
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://personal-dashboard-ebon-pi.vercel.app" // Production URL
        : ["http://localhost:5173", "http://127.0.0.1:5173"], // Development URLs
    credentials: true,
  })
);

// Enable parsing of JSON bodies in requests
app.use(express.json());

// Basic test endpoint to verify server is running
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Translation endpoint - handles POST requests to /api/translate
app.post("/api/translate", async (req, res) => {
  try {
    // Extract required data from request body
    const { text, target, source = "auto" } = req.body;

    // Validate required fields
    if (!text || !target) {
      return res.status(400).json({
        error: "Missing required parameters: text and target are required",
      });
    }

    // Make request to external translation service
    const response = await axios.post("https://libretranslate.de/translate", {
      q: text,
      source,
      target,
    });

    // Send translated text back to frontend
    res.json({ translation: response.data.translatedText });
  } catch (error) {
    console.error("Translation error:", error.response?.data || error.message);
    res.status(500).json({ error: "Translation service error" });
  }
});

// Events endpoint - handles GET requests to /api/events
app.get("/api/events", async (req, res) => {
  try {
    // Extract query parameters from URL
    // Example: /api/events?lat=40.7128&lng=-74.0060&radius=5
    const { lat, lng, radius } = req.query;

    // Validate required parameters
    if (!lat || !lng || !radius) {
      return res.status(400).json({
        error: "Missing required parameters: lat, lng, and radius are required",
      });
    }

    // Check for API key in environment variables
    if (!process.env.TICKETMASTER_API_KEY) {
      return res.status(500).json({
        error: "API key not configured on server",
      });
    }

    // Make request to Ticketmaster API
    // The server acts as a middleware to:
    // 1. Keep API key secure (never exposed to frontend)
    // 2. Transform/validate data if needed
    // 3. Handle errors in a consistent way
    const response = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json`,
      {
        params: {
          latlong: `${lat},${lng}`,
          radius: radius,
          unit: "km",
          apikey: process.env.TICKETMASTER_API_KEY,
        },
      }
    );

    // Ensure client knows to expect JSON response
    res.setHeader("Content-Type", "application/json");
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching events:",
      error.response?.data || error.message
    );

    // Handle different types of errors with appropriate HTTP status codes
    // This helps the frontend understand what went wrong
    if (error.response?.status === 429) {
      res
        .status(429)
        .json({ error: "Rate limit exceeded. Please try again later." });
    } else if (error.response?.status === 401) {
      res.status(401).json({ error: "Invalid API key" });
    } else if (error.code === "ECONNREFUSED") {
      res.status(503).json({ error: "Cannot connect to Ticketmaster API" });
    } else {
      res.status(500).json({ error: "Failed to fetch events" });
    }
  }
});

// Start the server and listen for incoming requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Example frontend code to use the translation endpoint
