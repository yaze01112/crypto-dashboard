import React, { useEffect, useState } from 'react';
import { fetchTopCryptos } from './services/cryptoService';
import CryptoCard from './components/CryptoCard';
import PriceChart from './components/PriceChart';
import './App.css';

interface Crypto {
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

const App: React.FC = () => {
  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);

  useEffect(() => {
    const loadCryptos = async () => {
      try {
        setLoading(true);
        const data = await fetchTopCryptos();
        setCryptos(data);
        if (data.length > 0) {
          setSelectedCrypto(data[0]);
        }
      } catch (err) {
        setError('Failed to fetch cryptocurrency data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCryptos();
    // Refresh data every 60 seconds
    const interval = setInterval(loadCryptos, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="app loading">Loading cryptocurrency data...</div>;
  }

  if (error) {
    return <div className="app error">{error}</div>;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🪙 Crypto Dashboard</h1>
        <p>Real-time cryptocurrency prices and market data</p>
      </header>

      <div className="container">
        <div className="chart-section">
          {selectedCrypto && (
            <PriceChart crypto={selectedCrypto} />
          )}
        </div>

        <div className="cryptos-grid">
          {cryptos.map((crypto) => (
            <CryptoCard
              key={crypto.id}
              crypto={crypto}
              isSelected={selectedCrypto?.id === crypto.id}
              onSelect={setSelectedCrypto}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
