import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { fetchCryptoHistory } from '../services/cryptoService';
import './PriceChart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface PriceChartProps {
  crypto: {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
  };
}

const PriceChart: React.FC<PriceChartProps> = ({ crypto }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(7);

  useEffect(() => {
    const loadChartData = async () => {
      try {
        setLoading(true);
        const history = await fetchCryptoHistory(crypto.id, days);

        const labels = history.map((item) => {
          const date = new Date(item[0]);
          return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          });
        });

        const prices = history.map((item) => item[1]);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        setChartData({
          labels,
          datasets: [
            {
              label: `${crypto.name} (${crypto.symbol.toUpperCase()}) Price`,
              data: prices,
              borderColor: '#60a5fa',
              backgroundColor: 'rgba(96, 165, 250, 0.1)',
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: '#60a5fa',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointHoverRadius: 6,
            },
          ],
        });
      } catch (error) {
        console.error('Error loading chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChartData();
  }, [crypto.id, crypto.name, crypto.symbol, days]);

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#e2e8f0',
          font: {
            size: 12,
            weight: 'bold',
          },
        },
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.8)',
        titleColor: '#e2e8f0',
        bodyColor: '#e2e8f0',
        borderColor: '#60a5fa',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            return `$${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          color: '#94a3b8',
          callback: function (value: any) {
            return '$' + value.toLocaleString();
          },
        },
      },
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.05)',
        },
        ticks: {
          color: '#94a3b8',
        },
      },
    },
  };

  return (
    <div className="price-chart">
      <div className="chart-header">
        <h2>
          {crypto.name} ({crypto.symbol.toUpperCase()}) Price Chart
        </h2>
        <div className="time-range-buttons">
          {[7, 14, 30, 90].map((day) => (
            <button
              key={day}
              className={`time-btn ${days === day ? 'active' : ''}`}
              onClick={() => setDays(day)}
              disabled={loading}
            >
              {day}d
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="chart-loading">Loading chart...</div>
      ) : chartData ? (
        <div className="chart-container">
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <div className="chart-error">Failed to load chart data</div>
      )}
    </div>
  );
};

export default PriceChart;
