import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import MetricCard from './MetricCard';
import PriceChart from './PriceChart';
import TransactionsTable from './TransactionsTable';

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.lg};
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const ModalContent = styled.div<{ isOpen: boolean }>`
  background: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.xl};
  max-width: 1000px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${props => props.theme.colors.shadow};
  border: 1px solid ${props => props.theme.colors.border};
  transform: ${props => props.isOpen ? 'scale(1)' : 'scale(0.9)'};
  transition: transform 0.3s ease;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${props => props.theme.spacing.xl};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.gradient};
  color: white;
  border-radius: ${props => props.theme.borderRadius.xl} ${props => props.theme.borderRadius.xl} 0 0;
`;

const ModalTitle = styled.h2`
  margin: 0;
  font-size: ${props => props.theme.fontSize.xxl};
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const CloseButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: ${props => props.theme.fontSize.xl};
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.md};
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }
`;

const ModalBody = styled.div`
  padding: ${props => props.theme.spacing.xl};
`;

const Section = styled.div`
  margin-bottom: ${props => props.theme.spacing.xxl};
`;

const SectionTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSize.xl};
  font-weight: 600;
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const PreLaunchBanner = styled.div`
  background: ${props => props.theme.colors.warning};
  color: white;
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.lg};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
`;

const ChartContainer = styled.div`
  background: ${props => props.theme.colors.cardBackground};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

interface TokenMetricsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TokenMetricsModal: React.FC<TokenMetricsModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Environmental Impact Metrics
  const environmentalMetrics = [
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
      title: t('metrics.activeCommunities'),
      value: '34',
      change: '+6.1%',
      icon: '🏘️',
      trend: 'up' as const,
    },
  ];

  // Economic Metrics
  const economicMetrics = [
    {
      title: t('metrics.dailyVolume'),
      value: '2,847,593',
      unit: t('units.cop'),
      change: '+5.4%',
      icon: '💰',
      trend: 'up' as const,
    },
    {
      title: t('metrics.copBacking'),
      value: '1:1',
      change: t('status.stable'),
      icon: '🏦',
      trend: 'neutral' as const,
    },
    {
      title: t('metrics.governanceProposals'),
      value: '18',
      change: '+3',
      icon: '🗳️',
      trend: 'up' as const,
    },
    {
      title: t('metrics.recyclingSites'),
      value: '127',
      change: '+12',
      icon: '🏭',
      trend: 'up' as const,
    },
  ];

  return (
    <ModalOverlay isOpen={isOpen} onClick={handleOverlayClick}>
      <ModalContent isOpen={isOpen}>
        <ModalHeader>
          <ModalTitle>
            🌱 {t('header.title')}
          </ModalTitle>
          <CloseButton onClick={onClose}>
            ✕
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          <PreLaunchBanner>
            🚀 {t('header.prelaunch')} - {t('header.comingSoon')}
          </PreLaunchBanner>

          <Section>
            <SectionTitle>
              🌍 {t('chart.environmentalImpact')}
            </SectionTitle>
            <MetricsGrid>
              {environmentalMetrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </MetricsGrid>
          </Section>

          <Section>
            <SectionTitle>
              💹 {t('chart.wasteRecovery')}
            </SectionTitle>
            <ChartContainer>
              <PriceChart />
            </ChartContainer>
          </Section>

          <Section>
            <SectionTitle>
              💰 {t('features.wasteToValue')} {t('metrics.dailyVolume')}
            </SectionTitle>
            <MetricsGrid>
              {economicMetrics.map((metric, index) => (
                <MetricCard key={index} {...metric} />
              ))}
            </MetricsGrid>
          </Section>

          <Section>
            <SectionTitle>
              📊 {t('transactions.title')}
            </SectionTitle>
            <TransactionsTable />
          </Section>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default TokenMetricsModal; 