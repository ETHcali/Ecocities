import axios from 'axios';

// Token address on Optimism
const TOKEN_ADDRESS = '0xfeef2ce2b94b8312eeb05665e2f03efbe3b0a916';
const ETHERSCAN_API_KEY = '4EEA4YTQFVXZMRE91SBCA7234EBVW733DT'; // Updated API key

// Base URL for Optimism Etherscan API
const API_BASE_URL = 'https://api-optimistic.etherscan.io/api';

// Get token information
export const getTokenInfo = async () => {
  try {
    // This is a proxy request - in production, you should use your backend to make this call
    // as you shouldn't expose your API key in frontend code
    const response = await axios.get(`${API_BASE_URL}`, {
      params: {
        module: 'token',
        action: 'tokeninfo',
        contractaddress: TOKEN_ADDRESS,
        apikey: ETHERSCAN_API_KEY,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching token info:', error);
    throw error;
  }
};

// Get token price
export const getTokenPrice = async () => {
  // In a real app, you might use CoinGecko, CoinMarketCap, or another price API
  try {
    // Etherscan doesn't directly provide token price, this is a placeholder
    // You'll need to integrate with a price API
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/token_price/optimistic-ethereum', {
      params: {
        contract_addresses: TOKEN_ADDRESS,
        vs_currencies: 'usd',
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching token price:', error);
    throw error;
  }
};

// Get token transfers
export const getTokenTransfers = async (page = 1, offset = 10) => {
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      params: {
        module: 'account',
        action: 'tokentx',
        contractaddress: TOKEN_ADDRESS,
        page,
        offset,
        sort: 'desc',
        apikey: ETHERSCAN_API_KEY,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching token transfers:', error);
    throw error;
  }
};

// Get token holders count - Note: Etherscan API might not directly provide this
// You might need to use a different service or scrape the data
export const getTokenHolders = async () => {
  // This is a placeholder - in a real app, you would need to find an API 
  // that provides token holder information or scrape it
  try {
    // Example mock data
    return {
      status: "1",
      message: "OK",
      result: {
        holderCount: "Unknown" // You'll need a different source for this
      }
    };
  } catch (error) {
    console.error('Error fetching token holders:', error);
    throw error;
  }
};

// Get token market data - You would typically use CoinGecko or similar
export const getTokenMarketData = async () => {
  // Placeholder function
  try {
    // Mock data
    return {
      marketCap: "Unknown",
      volume24h: "Unknown",
      circulatingSupply: "Unknown"
    };
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw error;
  }
};

// Get historical price data for charts
export const getHistoricalPriceData = async (days = 7) => {
  try {
    // This is a placeholder - you would use CoinGecko or similar
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/optimistic-ethereum/contract/${TOKEN_ADDRESS}/market_chart/`, 
      {
        params: {
          vs_currency: 'usd',
          days
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching historical price data:', error);
    // Return mock data for demonstration
    return {
      prices: Array(days).fill(0).map((_, i) => [
        Date.now() - (days - i) * 86400000,
        Math.random() * 10 + 90
      ]),
      market_caps: [],
      total_volumes: []
    };
  }
}; 