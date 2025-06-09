import React, { useState, useEffect } from 'react';
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
} from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';
import { ChartCard, ChartTitle } from '../styles/StyledComponents';
import { getPriceHistory } from '../services/pythonBackend';
import { theme } from '../styles/theme';
import styled from 'styled-components';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const timeRanges = [
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
  { label: '90D', days: 90 },
  { label: '1Y', days: 365 },
];

const PrelaunchMessage = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg};
  color: ${theme.colors.textSecondary};
`;

interface PriceChartProps {
  preLaunch?: boolean;
  tokenType?: 'environmental' | 'stablecoin';
}

const PriceChart: React.FC<PriceChartProps> = ({ preLaunch = false, tokenType = 'stablecoin' }) => {
  const [selectedRange, setSelectedRange] = useState(timeRanges[0]);
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        if (preLaunch) {
          // For pre-launch, we'll generate appropriate data based on token type
          const data = tokenType === 'environmental' 
            ? generateEnvironmentalValueData(selectedRange.days)
            : generateStablePriceData(selectedRange.days);
          setChartData(data);
        } else {
          // Normal flow for launched tokens
          const data = await getPriceHistory(selectedRange.days);
          
          setChartData({
            labels: data.labels,
            datasets: [
              {
                label: 'Price (COP)',
                data: data.prices,
                borderColor: theme.colors.chart.primary,
                backgroundColor: theme.colors.chart.primary,
                fill: false,
                tension: 0.4,
              },
            ],
          });
        }
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchChartData();
  }, [selectedRange, preLaunch, tokenType]);

  // Generate environmental value data for pre-launch tokens
  const generateEnvironmentalValueData = (days: number): ChartData<'line'> => {
    const now = new Date();
    const labels = [];
    const wasteRecoveryData = [];
    const energyGenerationData = [];
    const communityGrowthData = [];

    // Generate historical data
    for (let i = days; i > 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      
      // Simulate growing environmental impact over time
      const growthFactor = 1 + ((days - i) / days) * 0.5; // Growing impact
      const randomVariation = 0.8 + Math.random() * 0.4; // ±20% variation
      
      wasteRecoveryData.push(Math.round(100 * growthFactor * randomVariation));
      energyGenerationData.push(Math.round(50 * growthFactor * randomVariation));
      communityGrowthData.push(Math.round(20 * growthFactor * randomVariation));
    }

    return {
      labels: labels,
      datasets: [
        {
          label: 'Waste Recovery Value (kg/day)',
          data: wasteRecoveryData,
          borderColor: '#4caf50',
          backgroundColor: '#4caf50',
          fill: false,
          tension: 0.4,
        },
        {
          label: 'Solar Energy (kWh/day)',
          data: energyGenerationData,
          borderColor: '#ff9800',
          backgroundColor: '#ff9800',
          fill: false,
          tension: 0.4,
        },
        {
          label: 'Community Participation',
          data: communityGrowthData,
          borderColor: '#2196f3',
          backgroundColor: '#2196f3',
          fill: false,
          tension: 0.4,
        }
      ],
    };
  };

  // Generate stable price data for pre-launch tokens
  const generateStablePriceData = (days: number): ChartData<'line'> => {
    const now = new Date();
    const labels = [];
    const stableData = [];
    const projectedData = [];

    // Generate labels for the past days
    for (let i = days; i > 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      
      // For pre-launch, show projected stability
      // Add very small random noise (±0.005) to make it look realistic
      const noise = (Math.random() - 0.5) * 0.01;
      stableData.push(1 + noise);
    }

    // Add today's date
    labels.push(now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    stableData.push(1); // Today's value is exactly 1 COP
    
    // Add some future dates for projection
    for (let i = 1; i <= 7; i++) {
      const date = new Date();
      date.setDate(now.getDate() + i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      
      // Projected stable value
      const noise = (Math.random() - 0.5) * 0.01;
      projectedData.push(1 + noise);
    }

    return {
      labels: labels,
      datasets: [
        {
          label: 'Historical COP',
          data: [...stableData, ...new Array(7).fill(null)],
          borderColor: theme.colors.chart.primary,
          backgroundColor: theme.colors.chart.primary,
          fill: false,
          tension: 0.4,
        },
        {
          label: 'Projected Value',
          data: [...new Array(stableData.length).fill(null), ...projectedData],
          borderColor: theme.colors.chart.secondary,
          backgroundColor: theme.colors.chart.secondary,
          borderDash: [5, 5],
          fill: false,
          tension: 0.4,
        }
      ],
    };
  };
  
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: theme.colors.chart.grid,
        },
        ticks: {
          color: theme.colors.textSecondary,
        },
      },
      y: {
        grid: {
          color: theme.colors.chart.grid,
        },
        ticks: {
          color: theme.colors.textSecondary,
        },
        // Different scaling for different token types
        ...(preLaunch && tokenType === 'stablecoin' ? {
          min: 0.97,
          max: 1.03,
        } : {}),
      },
    },
    plugins: {
      legend: {
        display: preLaunch,
      },
      tooltip: {
        backgroundColor: theme.colors.card,
        titleColor: theme.colors.text,
        bodyColor: theme.colors.text,
        borderColor: theme.colors.border,
        borderWidth: 1,
      },
    },
  };

  const getChartTitle = () => {
    if (!preLaunch) return 'Price History';
    return tokenType === 'environmental' 
      ? 'Environmental Impact Metrics' 
      : 'Projected Price Stability';
  };

  const getPrelaunchMessage = () => {
    if (tokenType === 'environmental') {
      return 'This chart shows the projected environmental impact and community engagement metrics based on waste recovery and renewable energy generation';
    }
    return 'This chart shows the projected price stability of 1 COP per token based on the 1:1 peg to the Colombian Peso';
  };

  return (
    <ChartCard>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.md }}>
        <ChartTitle>{getChartTitle()}</ChartTitle>
        <div style={{ display: 'flex' }}>
          {timeRanges.map((range) => (
            <button
              key={range.label}
              onClick={() => setSelectedRange(range)}
              style={{
                padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                margin: `0 ${theme.spacing.xs}`,
                border: `1px solid ${range === selectedRange ? '#4caf50' : theme.colors.border}`,
                borderRadius: theme.borderRadius.sm,
                background: range === selectedRange ? '#4caf50' : 'transparent',
                color: range === selectedRange ? 'white' : theme.colors.text,
                cursor: 'pointer',
              }}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
      
      {preLaunch && (
        <PrelaunchMessage>
          {getPrelaunchMessage()}
        </PrelaunchMessage>
      )}
      
      <div style={{ height: '300px', position: 'relative' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            Loading chart data...
          </div>
        ) : (
          <Line data={chartData} options={options} />
        )}
      </div>
    </ChartCard>
  );
};

export default PriceChart; 