# 🪙 Crypto Dashboard

A real-time cryptocurrency dashboard built with **React**, **TypeScript**, and **Chart.js**, powered by the CoinGecko API. Display the top 10 cryptocurrencies with live price data, market statistics, and interactive price charts.

## ✨ Features

- 📊 **Real-time Price Data** - Top 10 cryptocurrencies by market cap
- 📈 **Interactive Charts** - 7, 14, 30, and 90-day price history
- 💱 **Market Statistics** - 24-hour high/low, market cap, trading volume
- 🎨 **Modern UI** - Dark theme with gradient animations
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🔄 **Auto-refresh** - Updates every 60 seconds

## 🚀 Getting Started

### Prerequisites
- Node.js 14+ and npm/yarn installed
- Git installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yaze01112/crypto-dashboard.git
   cd crypto-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (irreversible)

## 📁 Project Structure

```
crypto-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CryptoCard.tsx
│   │   ├── CryptoCard.css
│   │   ├── PriceChart.tsx
│   │   └── PriceChart.css
│   ├── services/
│   │   └── cryptoService.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── README.md
```

## 🔌 API

This project uses the **CoinGecko API** (free tier, no authentication required):

- **Endpoint**: `https://api.coingecko.com/api/v3`
- **Rate Limit**: 10-50 calls/minute
- **Documentation**: [CoinGecko API Docs](https://docs.coingecko.com/reference/introduction)

### API Calls

1. **Get Top 10 Cryptocurrencies**
   ```
   GET /coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1
   ```

2. **Get Historical Price Data**
   ```
   GET /coins/{id}/market_chart?vs_currency=usd&days={days}
   ```

## 🎨 Customization

### Change the Number of Cryptocurrencies
Edit `src/services/cryptoService.ts`, line 28:
```typescript
per_page: 10, // Change this value (max 250)
```

### Change the Refresh Interval
Edit `src/App.tsx`, line 48:
```typescript
const interval = setInterval(loadCryptos, 60000); // 60000ms = 60 seconds
```

### Modify Styling
- Global styles: `src/index.css`
- App styles: `src/App.css`
- Component styles: `src/components/*.css`

## 📦 Dependencies

- **react** (^18.2.0) - UI library
- **react-dom** (^18.2.0) - React DOM utilities
- **typescript** (^5.0.0) - Type safety
- **axios** (^1.6.0) - HTTP client
- **chart.js** (^4.4.0) - Charting library
- **react-chartjs-2** (^5.2.0) - React wrapper for Chart.js
- **tailwindcss** (^3.3.0) - Utility-first CSS

## 🌐 Deployment

### Deploy to GitHub Pages

1. Update `package.json`:
   ```json
   "homepage": "https://yaze01112.github.io/crypto-dashboard"
   ```

2. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Add deploy scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

### Deploy to Vercel

1. Import the repository in [Vercel](https://vercel.com)
2. Vercel automatically detects React and configures the build
3. Your app is live!

### Deploy to Netlify

1. Push code to GitHub
2. Connect repository in [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `build`

## 🐛 Troubleshooting

### Port 3000 already in use
```bash
PORT=3001 npm start
```

### API rate limit exceeded
- Wait a few minutes before retrying
- Consider upgrading to a premium API tier

### Chart not displaying
- Check browser console for errors
- Ensure Chart.js dependencies are installed: `npm install chart.js react-chartjs-2`

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues or questions, please open an [GitHub Issue](https://github.com/yaze01112/crypto-dashboard/issues).

---

**Happy Tracking!** 🚀📊
