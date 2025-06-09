export interface TokenInfo {
  contractAddress: string;
  tokenName: string;
  symbol: string;
  totalSupply: string;
  decimals: string;
  tokenType: string;
}

export interface TokenPrice {
  usd?: number;
  eth?: number;
  [key: string]: number | undefined;
}

export interface TokenTransfer {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  gasUsed: string;
  confirmations: string;
}

export interface TokenMarketData {
  marketCap: string;
  volume24h: string;
  circulatingSupply: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
    tension: number;
  }[];
}

export interface TokenMetric {
  title: string;
  value: string | number;
  change?: number;
  isPositive?: boolean;
  icon?: React.ReactNode;
} 