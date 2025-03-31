import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
// Use process.env.PORT for deployment platforms
const port = process.env.PORT || 5001;

// Enable CORS with specific origin in production
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [
            "https://personal-dashboard-ogqq.netlify.app",
            "http://localhost:5173",
          ]
        : "http://localhost:5173",
  })
);

app.use(express.json());

// Add a test endpoint
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

// Add translation endpoint
app.post("/api/translate", async (req, res) => {
  try {
    const { text, target, source = "auto" } = req.body;

    if (!text || !target) {
      return res.status(400).json({
        error: "Missing required parameters: text and target are required",
      });
    }

    const response = await axios.post("https://libretranslate.de/translate", {
      q: text,
      source,
      target,
    });

    res.json({ translation: response.data.translatedText });
  } catch (error) {
    console.error("Translation error:", error.response?.data || error.message);
    res.status(500).json({ error: "Translation service error" });
  }
});

// Endpoint to fetch events
app.get("/api/events", async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;

    if (!lat || !lng || !radius) {
      return res.status(400).json({
        error: "Missing required parameters: lat, lng, and radius are required",
      });
    }

    if (!process.env.VITE_TICKETMASTER_API_KEY) {
      return res.status(500).json({
        error: "API key not configured on server",
      });
    }

    const response = await axios.get(
      `https://app.ticketmaster.com/discovery/v2/events.json`,
      {
        params: {
          latlong: `${lat},${lng}`,
          radius: radius,
          unit: "km",
          apikey: process.env.VITE_TICKETMASTER_API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching events:",
      error.response?.data || error.message
    );

    // Handle specific error cases
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Example frontend code to use the translation endpoint
