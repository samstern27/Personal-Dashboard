import axios from "axios";

export default async function handler(req, res) {
  // Log incoming request details for debugging
  console.log("API Request received:", {
    method: req.method,
    query: req.query,
    headers: req.headers,
  });

  // CORS (Cross-Origin Resource Sharing) headers are necessary when your frontend
  // and backend are on different domains/ports. Without these, the browser would
  // block requests from your React app to this API for security reasons.
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

  // Tell the client to expect JSON data in the response
  res.setHeader("Content-Type", "application/json");

  // The OPTIONS method is a preflight request that browsers send before the actual request
  // to check if the server will accept the real request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // This endpoint only handles GET requests - good practice for RESTful APIs
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Extract query parameters from the request URL
    // Example URL: /api/events?lat=40.7128&lng=-74.0060&radius=5
    const { lat, lng, radius } = req.query;

    // Validate that all required parameters are present
    if (!lat || !lng || !radius) {
      return res.status(400).json({
        error: "Missing required parameters: lat, lng, and radius are required",
      });
    }

    // Check for API key in environment variables
    // This is a security best practice - never hardcode API keys in your code
    if (!process.env.TICKETMASTER_API_KEY) {
      console.error("API key not found in environment");
      return res.status(500).json({
        error: "API key not configured on server",
      });
    }

    // Make request to external Ticketmaster API
    // This is a common pattern: your server acts as a middleware between
    // your frontend and third-party APIs, allowing you to hide API keys
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

    // Forward the Ticketmaster API response to the client
    return res.status(200).json(response.data);
  } catch (error) {
    // Detailed error logging helps with debugging production issues
    console.error("Detailed error information:", {
      error: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
    });

    // Handle different types of errors with appropriate status codes
    // This helps the frontend understand what went wrong
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
