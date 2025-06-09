import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import styled, { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import TokenMetricsModal from './components/TokenMetricsModal'
import MetricCard from './components/MetricCard'
import PriceChart from './components/PriceChart'
import TransactionsTable from './components/TransactionsTable'
import './i18n'

// Create a client
const queryClient = new QueryClient()

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    transition: all 0.3s ease;
  }

  html {
    scroll-behavior: smooth;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.primary};
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  padding-top: 70px; /* Account for fixed navbar */
`;

const HeroSection = styled.section`
  background: ${props => props.theme.colors.gradient};
  color: white;
  padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.lg};
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: ${props => props.theme.spacing.lg};
  line-height: 1.2;
`;

const HeroSubtitle = styled.p`
  font-size: ${props => props.theme.fontSize.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
  opacity: 0.9;
  line-height: 1.6;
`;

const PreLaunchBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.xl};
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.xl};
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xxl} ${props => props.theme.spacing.lg};
`;

const Section = styled.section`
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.fontSize.xxl};
  font-weight: 700;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xl};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const ChartContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.xl};
  padding: ${props => props.theme.spacing.xl};
  box-shadow: ${props => props.theme.colors.shadow};
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.xl};
  margin-top: ${props => props.theme.spacing.xl};
`;

const FeatureCard = styled.div`
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.colors.shadow};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const FeatureTitle = styled.h3`
  font-size: ${props => props.theme.fontSize.xl};
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
`;

const AppContent: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWatchToken = () => {
    setIsModalOpen(true);
  };

  // Sample metrics data for the new design

  const mainMetrics = [
    {
      title: t('metrics.communityHolders'),
      value: '2,547',
      change: '+15.2%',
      icon: '👥',
      trend: 'up' as const,
    },
    {
      title: t('metrics.wasteRecovered'),
      value: '12,847',
      unit: t('units.kg') + t('units.daily'),
      change: '+8.7%',
      icon: '♻️',
      trend: 'up' as const,
    },
    {
      title: t('metrics.solarEnergy'),
      value: '4,523',
      unit: t('units.kwh'),
      change: '+12.3%',
      icon: '☀️',
      trend: 'up' as const,
    },
    {
      title: t('metrics.dailyVolume'),
      value: '2,847,593',
      unit: t('units.cop'),
      change: '+5.4%',
      icon: '💰',
      trend: 'up' as const,
    },
  ];

  const features = [
    {
      icon: '♻️',
      title: t('features.wasteToValue'),
      description: t('features.wasteToValueDesc'),
    },
    {
      icon: '🏛️',
      title: t('features.communityGov'),
      description: t('features.communityGovDesc'),
    },
    {
      icon: '☀️',
      title: t('features.renewableEnergy'),
      description: t('features.renewableEnergyDesc'),
    },
    {
      icon: '🌱',
      title: t('features.smartCities'),
      description: t('features.smartCitiesDesc'),
    },
  ];

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Navbar onWatchToken={handleWatchToken} />
        
        <HeroSection id="home">
          <HeroContent>
            <PreLaunchBadge>
              🚀 {t('header.prelaunch')} - {t('header.comingSoon')}
            </PreLaunchBadge>
            <HeroTitle>{t('header.title')}</HeroTitle>
            <HeroSubtitle>{t('header.subtitle')}</HeroSubtitle>
            <p>{t('header.description')}</p>
          </HeroContent>
        </HeroSection>

        <MainContent>
          <Section id="dashboard">
            <SectionTitle>
              📊 {t('nav.dashboard')}
            </SectionTitle>
            <MetricsGrid>
              {mainMetrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </MetricsGrid>
          </Section>

          <Section>
            <SectionTitle>
              📈 {t('chart.environmentalImpact')}
            </SectionTitle>
            <ChartContainer>
              <PriceChart />
            </ChartContainer>
          </Section>

          <Section>
            <SectionTitle>
              📊 {t('transactions.title')}
            </SectionTitle>
            <ChartContainer>
              <TransactionsTable />
            </ChartContainer>
          </Section>

          <Section id="about">
            <SectionTitle>
              🌍 {t('nav.about')} EcoCity Token
            </SectionTitle>
            <FeatureGrid>
              {features.map((feature, index) => (
                <FeatureCard key={index}>
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureCard>
              ))}
            </FeatureGrid>
          </Section>
        </MainContent>

        <TokenMetricsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </AppContainer>
    </>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
