import styled from 'styled-components';
import { theme } from './theme';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.lg};
  font-family: ${theme.fonts.body};
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Title = styled.h1`
  font-size: ${theme.fontSizes.xxl};
  color: ${theme.colors.text};
  margin: 0;
`;

export const TokenSymbol = styled.span`
  color: ${theme.colors.primary};
  margin-left: ${theme.spacing.sm};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background-color: ${theme.colors.card};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.card};
`;

export const MetricCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

export const MetricTitle = styled.h3`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
  margin: 0 0 ${theme.spacing.sm} 0;
`;

export const MetricValue = styled.div`
  font-size: ${theme.fontSizes.xl};
  font-weight: bold;
  color: ${theme.colors.text};
`;

export const MetricChange = styled.div<{ isPositive: boolean }>`
  font-size: ${theme.fontSizes.sm};
  color: ${props => props.isPositive ? theme.colors.positive : theme.colors.negative};
  display: flex;
  align-items: center;
  margin-top: ${theme.spacing.xs};
`;

export const ChartCard = styled(Card)`
  grid-column: 1 / -1;
`;

export const ChartTitle = styled.h3`
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.text};
  margin: 0 0 ${theme.spacing.md} 0;
`;

export const TableCard = styled(Card)`
  grid-column: 1 / -1;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  border-bottom: 1px solid ${theme.colors.border};
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${theme.colors.background};
  }
`;

export const TableHeader = styled.th`
  text-align: left;
  padding: ${theme.spacing.md};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textSecondary};
`;

export const TableCell = styled.td`
  padding: ${theme.spacing.md};
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.text};
  border-bottom: 1px solid ${theme.colors.border};
`;

export const Address = styled.span`
  font-family: ${theme.fonts.monospace};
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
  display: inline-block;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${theme.spacing.md};
`;

export const PaginationButton = styled.button<{ isActive?: boolean }>`
  background-color: ${props => props.isActive ? theme.colors.primary : 'transparent'};
  color: ${props => props.isActive ? theme.colors.card : theme.colors.text};
  border: 1px solid ${props => props.isActive ? theme.colors.primary : theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  margin-left: ${theme.spacing.xs};
  cursor: pointer;
  font-size: ${theme.fontSizes.sm};
  
  &:hover {
    background-color: ${props => props.isActive ? theme.colors.primary : theme.colors.background};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`; 