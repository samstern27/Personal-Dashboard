import axios from "axios";

export default async function handler(req, res) {
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
          apikey: process.env.TICKETMASTER_API_KEY,
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
}
