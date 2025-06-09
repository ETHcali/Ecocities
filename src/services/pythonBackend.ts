import axios from 'axios';
import type { TokenMetric } from '../types';

// Python backend URL
const API_URL = 'http://localhost:5000/api';

// Get token information
export const getTokenInfo = async () => {
  try {
    const response = await axios.get(`${API_URL}/token/info`);
    return response.data;
  } catch (error) {
    console.error('Error fetching token info from Python backend:', error);
    throw error;
  }
};

// Get token metrics
export const getTokenMetrics = async (): Promise<TokenMetric[]> => {
  try {
    const response = await axios.get(`${API_URL}/token/metrics`);
    return response.data;
  } catch (error) {
    console.error('Error fetching token metrics from Python backend:', error);
    return [
      { title: 'Price', value: '$0.00' },
      { title: 'Market Cap', value: '$0.00' },
      { title: '24h Volume', value: '$0.00' },
      { title: 'Holders', value: '0' },
    ];
  }
};

// Get token transfers
export const getTokenTransfers = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(`${API_URL}/token/transfers`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching token transfers from Python backend:', error);
    return [];
  }
};

// Get price history data
export const getPriceHistory = async (days = 7) => {
  try {
    const response = await axios.get(`${API_URL}/token/price/history/${days}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching price history from Python backend:', error);
    throw error;
  }
};

// Clear cache (for development)
export const clearCache = async () => {
  try {
    const response = await axios.get(`${API_URL}/clear-cache`);
    return response.data;
  } catch (error) {
    console.error('Error clearing cache:', error);
    throw error;
  }
}; 