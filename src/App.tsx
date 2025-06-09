import { useState, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { DashboardContainer, Header, Title, TokenSymbol, Grid } from './styles/StyledComponents'
import MetricCard from './components/MetricCard'
import PriceChart from './components/PriceChart'
import TransactionsTable from './components/TransactionsTable'
import type { TokenMetric } from './types'
import { getTokenInfo } from './services/pythonBackend'
import styled from 'styled-components'
import { theme } from './styles/theme'

// Create a client
const queryClient = new QueryClient()

// New styled components for environmental focus
const EcoLaunchBanner = styled.div`
  background: linear-gradient(135deg, #2e7d32, #66bb6a, #4caf50); 
  color: white;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
  font-weight: bold;
  font-size: ${theme.fontSizes.lg};
  box-shadow: ${theme.shadows.elevated};
`;

const SmartCityInfo = styled.div`
  background-color: ${theme.colors.card};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.card};
  border-left: 4px solid #4caf50;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const FeatureCard = styled.div`
  background-color: ${theme.colors.card};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.card};
  border-top: 3px solid #4caf50;
`;

const InfoTitle = styled.h2`
  font-size: ${theme.fontSizes.xl};
  color: ${theme.colors.text};
  margin-top: 0;
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const InfoContent = styled.p`
  font-size: ${theme.fontSizes.md};
  color: ${theme.colors.text};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.md};
`;

const HighlightText = styled.span`
  color: #4caf50;
  font-weight: bold;
`;

const LaunchCountdown = styled.div`
  background: linear-gradient(135deg, #1b5e20, #388e3c);
  color: white;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
  box-shadow: ${theme.shadows.elevated};
`;

const CountdownValue = styled.div`
  font-size: ${theme.fontSizes.xxl};
  font-weight: bold;
  margin: ${theme.spacing.md} 0;
`;

const CountdownLabel = styled.div`
  font-size: ${theme.fontSizes.md};
  opacity: 0.9;
`;

const PartnerBadge = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #e8f5e8;
  color: #2e7d32;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.lg};
  font-size: ${theme.fontSizes.sm};
  font-weight: bold;
  margin-top: ${theme.spacing.sm};
`;

function Dashboard() {
  const [tokenInfo, setTokenInfo] = useState({
    name: 'Loading...',
    symbol: '...',
    totalSupply: '0',
    decimals: '18',
  })
  
  const [metrics, setMetrics] = useState<TokenMetric[]>([
    { title: 'Community Holders', value: '0', icon: '👥' },
    { title: 'Daily Volume', value: '0 COP', icon: '📊' },
    { title: 'Waste Value Recovered', value: '0 kg', icon: '♻️' },
    { title: 'Active Communities', value: '0', icon: '🏘️' },
    { title: 'Solar Energy Generated', value: '0 kWh', icon: '☀️' },
    { title: 'Governance Proposals', value: '0', icon: '🗳️' },
  ])
  
  // Simulate days until launch
  const [daysUntilLaunch, setDaysUntilLaunch] = useState(45);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch token info from Python backend
        const infoResponse = await getTokenInfo()
        setTokenInfo({
          name: infoResponse.name || 'EcoCity Token',
          symbol: infoResponse.symbol || 'ECT',
          totalSupply: infoResponse.totalSupply || '0',
          decimals: infoResponse.decimals || '18',
        })
        
        // Generate realistic pre-launch metrics for environmental token
        const holders = Math.floor(Math.random() * 150) + 50; // 50-200 early holders
        const dailyVolume = Math.floor(Math.random() * 50000) + 10000; // 10k-60k COP daily
        const wasteRecovered = Math.floor(Math.random() * 500) + 100; // 100-600 kg
        const activeCommunities = Math.floor(Math.random() * 8) + 3; // 3-11 communities
        const solarEnergy = Math.floor(Math.random() * 1000) + 200; // 200-1200 kWh
        const proposals = Math.floor(Math.random() * 5) + 1; // 1-6 proposals
        
        setMetrics([
          { 
            title: 'Community Holders', 
            value: holders.toLocaleString(),
            change: 15.2,
            isPositive: true,
            icon: '👥'
          },
          { 
            title: 'Daily Volume', 
            value: `${dailyVolume.toLocaleString()} COP`,
            change: 8.7,
            isPositive: true,
            icon: '📊'
          },
          { 
            title: 'Waste Value Recovered', 
            value: `${wasteRecovered.toLocaleString()} kg`,
            change: 23.1,
            isPositive: true,
            icon: '♻️'
          },
          { 
            title: 'Active Communities', 
            value: activeCommunities.toString(),
            change: 12.5,
            isPositive: true,
            icon: '🏘️'
          },
          { 
            title: 'Solar Energy Generated', 
            value: `${solarEnergy.toLocaleString()} kWh`,
            change: 18.9,
            isPositive: true,
            icon: '☀️'
          },
          { 
            title: 'Governance Proposals', 
            value: proposals.toString(),
            change: 25.0,
            isPositive: true,
            icon: '🗳️'
          },
        ])
        
        // Simulate countdown to launch
        setDaysUntilLaunch(Math.floor(Math.random() * 31) + 30); // 30-60 days
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }
    
    fetchData()
    
    // Refresh data every 2 minutes
    const intervalId = setInterval(fetchData, 120000)
    
    return () => clearInterval(intervalId)
  }, [])

  return (
    <DashboardContainer>
      <Header>
        <Title>
          {tokenInfo.name} <TokenSymbol>({tokenInfo.symbol})</TokenSymbol>
        </Title>
        <div>🌱 Smart City Governance Dashboard</div>
      </Header>
      
      <EcoLaunchBanner>
        🌍 Coming Soon: The First Waste-to-Value Token for Smart Cities in Colombia 🇨🇴
      </EcoLaunchBanner>
      
      <SmartCityInfo>
        <InfoTitle>
          ♻️ Transforming Cities Through Community-Driven Waste Recovery
        </InfoTitle>
        <InfoContent>
          <HighlightText>{tokenInfo.symbol}</HighlightText> is a revolutionary token that represents the real value recovered from urban waste. 
          Each token is backed 1:1 by the Colombian Peso value of recycled materials and environmental services, 
          creating a sustainable economy where communities are rewarded for maintaining clean public and natural spaces.
        </InfoContent>
        <PartnerBadge>
          ⚡ Powered by Renewable Energy - Partner: heratech.com
        </PartnerBadge>
      </SmartCityInfo>
      
      <InfoGrid>
        <FeatureCard>
          <InfoTitle>🏛️ Self-Governing Communities</InfoTitle>
          <InfoContent>
            Token holders participate in democratic governance, voting on environmental initiatives, 
            resource allocation, and community improvement projects. Each token represents a voice in building sustainable cities.
          </InfoContent>
        </FeatureCard>
        
        <FeatureCard>
          <InfoTitle>🔋 Smart Infrastructure</InfoTitle>
          <InfoContent>
            Integrated with solar panels and battery systems from heratech.com, creating energy-autonomous 
            waste collection points that power smart recycling systems and community services.
          </InfoContent>
        </FeatureCard>
        
        <FeatureCard>
          <InfoTitle>📱 International Compliance</InfoTitle>
          <InfoContent>
            Built following the latest international environmental regulations and waste management protocols, 
            ensuring global standards for sustainable urban development and circular economy practices.
          </InfoContent>
        </FeatureCard>
      </InfoGrid>
      
      <LaunchCountdown>
        <CountdownLabel>🚀 Community Governance Launch In</CountdownLabel>
        <CountdownValue>{daysUntilLaunch} Days</CountdownValue>
        <div style={{ opacity: 0.9, fontSize: theme.fontSizes.sm }}>
          Join the revolution in urban sustainability and community empowerment
        </div>
      </LaunchCountdown>
      
      <Grid>
        {metrics.map((metric, index) => (
          <MetricCard key={index} metric={metric} />
        ))}
      </Grid>
      
      <PriceChart preLaunch={true} tokenType="environmental" />
      
      <TransactionsTable />
    </DashboardContainer>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  )
}

export default App
