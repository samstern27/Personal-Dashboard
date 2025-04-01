# Personal Dashboard

Dashboard showcasing API usage, React Router, and React Context.

## Open in Vercel

- https://personal-dashboard-samstern27s-projects.vercel.app/

## Features

- Weather API integration
- News API integration
- Stock market API integration
- Event API integration

## Environment Variables

To run this project locally, you'll need to create a `.env` file in the root directory with the following variables:

```env
NODE_ENV=development
TICKETMASTER_API_KEY="your_ticketmaster_api_key"
VITE_ALPHA_VANTAGE_API_KEY="your_alpha_vantage_api_key"
VITE_GEOCODING_API_KEY="your_geocoding_api_key"
VITE_WORLD_NEWS_API_KEY="your_world_news_api_key"
VITE_API_PORT=5001  # Optional, defaults to 5001
```

You can get these API keys from:

- Ticketmaster API: https://developer.ticketmaster.com/
- Alpha Vantage API: https://www.alphavantage.co/
- Geocoding API: https://opencagedata.com/api/
- World News API: https://worldnewsapi.com/
- Weather API: https://openweathermap.org/api

Note: Make sure your backend server is running on the port specified in VITE_API_PORT (default: 5001)

## Libraries Used

- React
- React Router
- React Context API
- React Hooks
- React Memo
- React Bootstrap

## Important Notes

- For the Stocks API, I am using a free tier account. The maximum requests per day is 25.

## Installation

1. Clone the repository

```bash
git clone [your-repository-url]
cd personal-dashboard
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

- Create a `.env` file in the root directory
- Add the required environment variables as specified in the [Environment Variables](#environment-variables) section above
- Get your API keys from the respective services

4. Start the backend server

```bash
# The command to start your backend server
# (You'll need to specify the actual command)
npm run server
```

5. Start the development server

```bash
npm run dev
```

The application should now be running on `http://localhost:5173` (or your configured port)
