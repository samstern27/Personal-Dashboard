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
- Geocoding API: https://rapidapi.com/geoapify-gmbh-geocoding/api/geocoding/
- World News API: https://rapidapi.com/contextualwebsearch/api/web-search/

Note: Make sure your backend server is running on the port specified in VITE_API_PORT (default: 5001)

## Libraries Used

- React
- React Router
- React Context API
- React Hooks
- React Memo
- React Bootstrap
- Vercel
- Ticketmaster API
- Alpha Vantage API
- World News API
- Geocoding API

## Important Notes

- For the Stocks API, I am using a free tier account. The maximum requests per day is 25.

## Installation

1. Clone the repository
2. Install dependencies
3. Run the development server
