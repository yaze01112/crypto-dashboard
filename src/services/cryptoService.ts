import axios from 'axios';

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_percentage_24h: number;
  ath: number;
  atl: number;
  last_updated: string;
}

export const fetchTopCryptos = async (): Promise<CryptoData[]> => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: true,
        price_change_percentage: '24h',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    throw error;
  }
};

export const fetchCryptoHistory = async (
  cryptoId: string,
  days: number = 7
): Promise<[number, number][]> => {
  try {
    const response = await axios.get(
      `${COINGECKO_API_URL}/coins/${cryptoId}/market_chart`,
      {
        params: {
          vs_currency: 'usd',
          days: days,
        },
      }
    );
    return response.data.prices;
  } catch (error) {
    console.error(`Error fetching history for ${cryptoId}:`, error);
    throw error;
  }
};
