# EcoCity Token Dashboard 🌱

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ekinoxis/ecocity-token-dashboard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)

A professional dashboard for EcoCity Token (ECT) - The first waste-to-value token for smart cities in Colombia. This dashboard showcases environmental impact metrics, community governance, and the revolutionary concept of transforming urban waste into digital value.

🌐 **Live Demo**: [tokendashboard.ethcali.org](https://tokendashboard.ethcali.org)

## 🌍 About EcoCity Token

EcoCity Token represents a revolutionary approach to urban sustainability by:

- **♻️ Waste-to-Value**: Each token is backed 1:1 by the Colombian Peso value of recycled materials
- **🏛️ Community Governance**: Democratic decision-making for environmental initiatives
- **☀️ Renewable Energy**: Powered by solar panels and battery systems from [heratech.com](https://heratech.com)
- **🌱 Smart Cities**: Creating energy-autonomous waste collection points
- **📱 International Compliance**: Following latest environmental regulations

## ✨ Features

### 📊 Essential Metrics
- **Community Holders**: Track democratic participation
- **Daily Volume**: Monitor economic activity in COP
- **Waste Value Recovered**: Measure environmental impact (kg/day)
- **Active Communities**: Show decentralized governance adoption
- **Solar Energy Generated**: Renewable energy production (kWh)
- **Governance Proposals**: Democratic decision-making activity

### 📈 Interactive Charts
- Environmental impact trends
- Solar energy generation metrics
- Community participation growth
- Real-time price stability visualization

### 🎨 Professional Design
- Green color scheme reflecting environmental focus
- Responsive design for all devices
- Modern UI with proper accessibility
- Professional cards layout with growth indicators

## 🚀 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Styled Components
- **Charts**: Chart.js + React Chart.js 2
- **Data Fetching**: React Query + Axios
- **Blockchain**: Ethers.js (Optimism Network)
- **Build Tool**: Vite
- **Deployment**: Vercel

## 🏗️ Project Structure

```
ecocity-token-dashboard/
├── src/
│   ├── components/          # React components
│   │   ├── MetricCard.tsx   # Individual metric display
│   │   ├── PriceChart.tsx   # Environmental impact charts
│   │   └── TransactionsTable.tsx # Transaction history
│   ├── services/            # API services
│   │   ├── api.ts          # Etherscan API integration
│   │   └── pythonBackend.ts # Backend data service
│   ├── styles/             # Styling
│   │   ├── theme.ts        # Design system tokens
│   │   └── StyledComponents.ts # Styled components
│   ├── types/              # TypeScript definitions
│   │   └── index.ts        # Type definitions
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── dist/                   # Build output
└── README.md              # Project documentation
```

## 🛠️ Local Development

### Prerequisites

- Node.js >= 18.0.0
- npm >= 8.0.0

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ekinoxis/ecocity-token-dashboard.git
   cd ecocity-token-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:5173](http://localhost:5173)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:prod` - Type check + build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🌐 Deployment

### Deploy to Vercel

1. **One-click deploy**
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ekinoxis/ecocity-token-dashboard)

2. **Manual deployment**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

### Custom Domain Setup

To set up `tokendashboard.ethcali.org`:

1. Add the domain in Vercel dashboard
2. Configure DNS records:
   ```
   Type: CNAME
   Name: tokendashboard
   Value: cname.vercel-dns.com
   ```

### Environment Variables

For production deployment, set these environment variables in Vercel:

```env
VITE_ETHERSCAN_API_KEY=your_etherscan_api_key
VITE_BACKEND_URL=your_backend_url
```

## 🔧 Configuration

### Blockchain Configuration

The dashboard is configured for:
- **Network**: Optimism Mainnet
- **Token Address**: `0xfeef2ce2b94b8312eeb05665e2f03efbe3b0a916`
- **RPC**: Optimism public endpoints

### API Integration

- **Etherscan API**: Real-time token data
- **Python Backend**: Enhanced data processing and caching
- **Custom Metrics**: Environmental impact calculations

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Use TypeScript for all new code
- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure responsive design

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **EKINOXIS** - Project development and vision
- **[heratech.com](https://heratech.com)** - Renewable energy technology partner
- **Optimism Network** - Blockchain infrastructure
- **Open Source Community** - Tools and libraries

## 📞 Support

- **Website**: [ethcali.org](https://ethcali.org)
- **Email**: support@ekinoxis.com
- **Documentation**: [docs.ethcali.org](https://docs.ethcali.org)

---

**Built with 💚 for a sustainable future**

*Transforming cities through community-driven waste recovery and renewable energy*
