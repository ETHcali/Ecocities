import React from 'react';
import styled from 'styled-components';
import type { TokenMetric } from '../types';

// Enhanced styled components for the new design
const Card = styled.div`
  background: ${props => props.theme.colors.cardBackground};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.theme.spacing.xl};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.colors.shadow};
    border-color: ${props => props.theme.colors.primary};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.theme.colors.gradient};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const MetricIcon = styled.span`
  font-size: ${props => props.theme.fontSize.xl};
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
`;

const MetricTitle = styled.h3`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSize.sm};
  font-weight: 600;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MetricValue = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.fontSize.xxl};
  font-weight: 700;
  margin: ${props => props.theme.spacing.sm} 0;
  line-height: 1.2;
`;

const MetricUnit = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: ${props => props.theme.fontSize.md};
  font-weight: 500;
  margin-left: ${props => props.theme.spacing.xs};
`;

const MetricChange = styled.div<{ trend: 'up' | 'down' | 'neutral' }>`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  font-size: ${props => props.theme.fontSize.sm};
  font-weight: 600;
  color: ${props => {
    switch(props.trend) {
      case 'up': return props.theme.colors.success;
      case 'down': return props.theme.colors.error;
      default: return props.theme.colors.textSecondary;
    }
  }};
`;

const TrendIcon = styled.span<{ trend: 'up' | 'down' | 'neutral' }>`
  font-size: ${props => props.theme.fontSize.sm};
`;

// Props interfaces for both old and new usage
interface NewMetricCardProps {
  title: string;
  value: string;
  unit?: string;
  change: string;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
}

interface OldMetricCardProps {
  metric: TokenMetric;
}

type MetricCardProps = NewMetricCardProps | OldMetricCardProps;

const MetricCard: React.FC<MetricCardProps> = (props) => {
  // Handle both prop structures
  const isOldProps = 'metric' in props;
  
  const data = isOldProps ? {
    title: props.metric.title,
    value: props.metric.value,
    unit: undefined,
    change: props.metric.change ? `${props.metric.change > 0 ? '+' : ''}${props.metric.change.toFixed(1)}%` : '',
    icon: props.metric.icon || '📊',
    trend: (props.metric.isPositive === undefined ? 'neutral' : (props.metric.isPositive ? 'up' : 'down')) as 'up' | 'down' | 'neutral'
  } : props;

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch(trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '📊';
    }
  };

  return (
    <Card>
      <CardHeader>
        <MetricTitle>{data.title}</MetricTitle>
        <MetricIcon>{data.icon}</MetricIcon>
      </CardHeader>
      
      <MetricValue>
        {data.value}
        {data.unit && <MetricUnit>{data.unit}</MetricUnit>}
      </MetricValue>
      
      {data.change && (
        <MetricChange trend={data.trend}>
          <TrendIcon trend={data.trend}>
            {getTrendIcon(data.trend)}
          </TrendIcon>
          {data.change}
        </MetricChange>
      )}
    </Card>
  );
};

export default MetricCard; 