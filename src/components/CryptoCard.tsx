import React from 'react';
import './CryptoCard.css';

interface CryptoCardProps {
  crypto: {
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
  };
  isSelected: boolean;
  onSelect: (crypto: any) => void;
}

const CryptoCard: React.FC<CryptoCardProps> = ({
  crypto,
  isSelected,
  onSelect,
}) => {
  const priceChange = crypto.price_change_percentage_24h;
  const isPositive = priceChange >= 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatLargeNumber = (num: number) => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + 'B';
    }
    if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + 'M';
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + 'K';
    }
    return num.toFixed(2);
  };

  return (
    <div
      className={`crypto-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(crypto)}
    >
      <div className="card-header">
        <div className="crypto-info">
          <h3>{crypto.name}</h3>
          <span className="symbol">{crypto.symbol.toUpperCase()}</span>
        </div>
        <div className="rank">#{crypto.market_cap_rank}</div>
      </div>

      <div className="price-section">
        <div className="current-price">
          {formatPrice(crypto.current_price)}
        </div>
        <div className={`price-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '📈' : '📉'} {Math.abs(priceChange).toFixed(2)}%
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <span className="label">24h High</span>
          <span className="value">{formatPrice(crypto.high_24h)}</span>
        </div>
        <div className="stat">
          <span className="label">24h Low</span>
          <span className="value">{formatPrice(crypto.low_24h)}</span>
        </div>
      </div>

      <div className="stats">
        <div className="stat">
          <span className="label">Market Cap</span>
          <span className="value">${formatLargeNumber(crypto.market_cap)}</span>
        </div>
        <div className="stat">
          <span className="label">Volume (24h)</span>
          <span className="value">${formatLargeNumber(crypto.total_volume)}</span>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;
