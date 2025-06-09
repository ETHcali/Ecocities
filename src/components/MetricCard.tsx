import React from 'react';
import { MetricCard as StyledMetricCard, MetricTitle, MetricValue, MetricChange } from '../styles/StyledComponents';
import type { TokenMetric } from '../types';

interface MetricCardProps {
  metric: TokenMetric;
}

const MetricCard: React.FC<MetricCardProps> = ({ metric }) => {
  const { title, value, change, isPositive, icon } = metric;
  
  return (
    <StyledMetricCard>
      <MetricTitle>{title}</MetricTitle>
      <MetricValue>{value}</MetricValue>
      
      {change !== undefined && (
        <MetricChange isPositive={isPositive ?? false}>
          {isPositive ? '↑' : '↓'} {Math.abs(change).toFixed(2)}%
        </MetricChange>
      )}
      
      {icon && <div>{icon}</div>}
    </StyledMetricCard>
  );
};

export default MetricCard; 