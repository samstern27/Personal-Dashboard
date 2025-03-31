import axios from "axios";

export default async function handler(req, res) {
  console.log("API Request received:", {
    method: req.method,
    query: req.query,
    headers: req.headers,
  });

  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  // Always set JSON content type
  res.setHeader("Content-Type", "application/json");

  // Handle OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Only allow GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { lat, lng, radius } = req.query;

    if (!lat || !lng || !radius) {
      return res.status(400).json({
        error: "Missing required parameters: lat, lng, and radius are required",
      });
    }

    if (!process.env.TICKETMASTER_API_KEY) {
      console.error("API key not found in environment");
      return res.status(500).json({
        error: "API key not configured on server",
      });
    }

    console.log("Making request to Ticketmaster API with params:", {
      latlong: `${lat},${lng}`,
      radius,
      unit: "km",
    });

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

    console.log("Ticketmaster API response status:", response.status);
    console.log("Ticketmaster API response headers:", response.headers);

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Detailed error information:", {
      error: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
    });

    // Handle specific error cases
    if (error.response?.status === 429) {
      return res
        .status(429)
        .json({ error: "Rate limit exceeded. Please try again later." });
    } else if (error.response?.status === 401) {
      return res.status(401).json({ error: "Invalid API key" });
    } else if (error.code === "ECONNREFUSED") {
      return res
        .status(503)
        .json({ error: "Cannot connect to Ticketmaster API" });
    } else {
      return res.status(500).json({
        error: "Failed to fetch events",
        details: error.message,
      });
    }
  }
}
