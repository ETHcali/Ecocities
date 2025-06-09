import React, { useState, useEffect } from 'react';
import { getTokenTransfers } from '../services/pythonBackend';
import type { TokenTransfer } from '../types';
import { 
  TableCard, 
  Table, 
  TableHead, 
  TableRow, 
  TableHeader, 
  TableCell, 
  Address,
  PaginationContainer,
  PaginationButton
} from '../styles/StyledComponents';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl};
  text-align: center;
  color: ${theme.colors.textSecondary};
`;

const EmptyStateTitle = styled.h3`
  margin-bottom: ${theme.spacing.md};
  font-size: ${theme.fontSizes.lg};
  color: ${theme.colors.primary};
`;

const EmptyStateText = styled.p`
  font-size: ${theme.fontSizes.md};
  max-width: 600px;
  line-height: 1.5;
`;

const TransactionsTable: React.FC = () => {
  const [transactions, setTransactions] = useState<TokenTransfer[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const isPreLaunch = true; // Pre-launch mode

  useEffect(() => {
    // For a pre-launch token, we don't need to fetch real transactions
    // But we'll keep the code for when the token launches
    if (!isPreLaunch) {
      const fetchTransactions = async () => {
        setLoading(true);
        try {
          const response = await getTokenTransfers(page, ITEMS_PER_PAGE);
          if (response && Array.isArray(response)) {
            setTransactions(response);
            setTotalPages(Math.max(Math.ceil(response.length > 0 ? 100 : 0 / ITEMS_PER_PAGE), 1));
          } else {
            console.error('Error fetching transactions: Invalid response format');
            setTransactions([]);
          }
        } catch (error) {
          console.error('Error fetching transactions:', error);
          setTransactions([]);
        } finally {
          setLoading(false);
        }
      };
      
      fetchTransactions();
    } else {
      // For pre-launch, just set loading to false
      setLoading(false);
    }
  }, [page, isPreLaunch]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(parseInt(timestamp) * 1000);
    return date.toLocaleString();
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const formatValue = (value: string, decimals = 18) => {
    const valueInEth = parseInt(value) / Math.pow(10, decimals);
    return valueInEth.toFixed(4);
  };

  const renderPreLaunchState = () => {
    return (
      <EmptyStateContainer>
        <EmptyStateTitle>No Transactions Yet</EmptyStateTitle>
        <EmptyStateText>
          This token is in pre-launch phase and has not been released to the public yet. 
          Once the token launches, you'll be able to see all transactions here.
        </EmptyStateText>
        <EmptyStateText>
          Stay tuned for the official launch! The first Colombian Peso stablecoin 
          on Optimism is coming soon.
        </EmptyStateText>
      </EmptyStateContainer>
    );
  };

  return (
    <TableCard>
      <h3>Recent Transactions</h3>
      {loading ? (
        <div>Loading transactions...</div>
      ) : isPreLaunch ? (
        renderPreLaunchState()
      ) : transactions.length === 0 ? (
        <div>No transactions found.</div>
      ) : (
        <>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>Tx Hash</TableHeader>
                <TableHeader>Time</TableHeader>
                <TableHeader>From</TableHeader>
                <TableHeader>To</TableHeader>
                <TableHeader>Value</TableHeader>
              </TableRow>
            </TableHead>
            <tbody>
              {transactions.map((tx, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Address>
                      <a 
                        href={`https://optimistic.etherscan.io/tx/${tx.hash}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {formatAddress(tx.hash)}
                      </a>
                    </Address>
                  </TableCell>
                  <TableCell>{formatTimestamp(tx.timeStamp)}</TableCell>
                  <TableCell>
                    <Address>
                      <a 
                        href={`https://optimistic.etherscan.io/address/${tx.from}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {formatAddress(tx.from)}
                      </a>
                    </Address>
                  </TableCell>
                  <TableCell>
                    <Address>
                      <a 
                        href={`https://optimistic.etherscan.io/address/${tx.to}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        {formatAddress(tx.to)}
                      </a>
                    </Address>
                  </TableCell>
                  <TableCell>{formatValue(tx.value)} {tx.tokenSymbol || 'CPT'}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
          
          <PaginationContainer>
            <PaginationButton 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </PaginationButton>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = page <= 3 
                ? i + 1 
                : page >= totalPages - 2 
                  ? totalPages - 4 + i 
                  : page - 2 + i;
              
              if (pageNum <= totalPages && pageNum > 0) {
                return (
                  <PaginationButton
                    key={pageNum}
                    isActive={pageNum === page}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </PaginationButton>
                );
              }
              return null;
            })}
            
            <PaginationButton 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </PaginationButton>
          </PaginationContainer>
        </>
      )}
    </TableCard>
  );
};

export default TransactionsTable; 