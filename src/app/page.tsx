'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Token contract details
const TOKEN_ADDRESS = '0xfeEF2ce2B94B8312EEB05665e2F03efbe3B0a916';
const OPTIMISM_RPC = 'https://mainnet.optimism.io';

// ERC20 ABI (minimal)
const ERC20_ABI = [
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
];

interface TokenData {
  totalSupply: string;
  totalHolders: number;
  communityHolders: number;
  wasteRecovered: string;
  loading: boolean;
}

interface DistributorAddress {
  address: string;
  label: string;
  balance: string;
}

export default function Dashboard() {
  const [tokenData, setTokenData] = useState<TokenData>({
    totalSupply: '0',
    totalHolders: 0,
    communityHolders: 0,
    wasteRecovered: '0',
    loading: true,
  });

  const [distributors, setDistributors] = useState<DistributorAddress[]>([
    { address: '0x1234...5678', label: 'Main Distributor', balance: '0' },
    { address: '0xabcd...efgh', label: 'Reserve Wallet', balance: '0' },
  ]);

  const [showManagement, setShowManagement] = useState(false);

  useEffect(() => {
    fetchTokenData();
  }, []);

  const fetchTokenData = async () => {
    try {
      const provider = new ethers.JsonRpcProvider(OPTIMISM_RPC);
      const contract = new ethers.Contract(TOKEN_ADDRESS, ERC20_ABI, provider);

      const totalSupply = await contract.totalSupply();
      const decimals = await contract.decimals();
      
      // Format total supply
      const formattedSupply = ethers.formatUnits(totalSupply, decimals);
      
      // Calculate distributor total (mock for now - would need to fetch real balances)
      const distributorTotal = distributors.reduce((sum, dist) => sum + parseFloat(dist.balance || '0'), 0);
      
      // Community tokens = Total supply - Distributor holdings
      const communityTokens = parseFloat(formattedSupply) - distributorTotal;

      setTokenData({
        totalSupply: parseFloat(formattedSupply).toLocaleString(),
        totalHolders: 2847, // Would need indexer service for real data
        communityHolders: Math.floor(communityTokens),
        wasteRecovered: communityTokens.toLocaleString(),
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching token data:', error);
      setTokenData(prev => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-green-400">
                🌱 EcoCity PPY Token Analytics
              </h1>
              <p className="text-gray-400 mt-1">
                Real-time on-chain data • Optimism Mainnet
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">
                Contract: {TOKEN_ADDRESS.slice(0, 6)}...{TOKEN_ADDRESS.slice(-4)}
              </div>
              <button
                onClick={() => setShowManagement(!showManagement)}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-sm font-medium"
              >
                {showManagement ? 'Hide' : 'Show'} Management
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Economic Model Banner */}
        <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-lg p-6 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Economic Model</h2>
            <div className="text-xl font-mono">
              1 PPY = 1 KG = 1K COP = 1K COPe
            </div>
            <p className="text-green-100 mt-2">
              Each token represents 1kg of waste recovered and 1,000 Colombian Pesos value
            </p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Supply"
            value={tokenData.loading ? 'Loading...' : `${tokenData.totalSupply} PPY`}
            subtitle="Total tokens minted"
            icon="🪙"
            color="blue"
          />
          <MetricCard
            title="Community Holders"
            value={tokenData.loading ? 'Loading...' : tokenData.communityHolders.toLocaleString()}
            subtitle="Excluding distributor addresses"
            icon="👥"
            color="green"
          />
          <MetricCard
            title="Waste Recovered"
            value={tokenData.loading ? 'Loading...' : `${tokenData.wasteRecovered} kg`}
            subtitle="Total environmental impact"
            icon="♻️"
            color="emerald"
          />
          <MetricCard
            title="Value Created"
            value={tokenData.loading ? 'Loading...' : `${(parseFloat(tokenData.wasteRecovered.replace(/,/g, '')) * 1000).toLocaleString()} COP`}
            subtitle="Economic value generated"
            icon="💰"
            color="yellow"
          />
        </div>

        {/* Management Panel */}
        {showManagement && (
          <ManagementPanel 
            distributors={distributors}
            setDistributors={setDistributors}
            onUpdate={fetchTokenData}
          />
        )}

        {/* Distribution Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold">Token Distribution</h3>
              <p className="text-gray-400 text-sm">Community vs Distributor Holdings</p>
            </div>
            <div className="p-6">
              <DistributionChart tokenData={tokenData} distributors={distributors} />
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold">Environmental Impact</h3>
              <p className="text-gray-400 text-sm">Waste recovered over time</p>
            </div>
            <div className="p-6">
              <div className="text-center py-12 text-gray-400">
                Chart visualization coming soon...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, subtitle, icon, color }: {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  color: string;
}) {
  const colorClasses = {
    blue: 'border-blue-500 bg-blue-500/10',
    green: 'border-green-500 bg-green-500/10',
    emerald: 'border-emerald-500 bg-emerald-500/10',
    yellow: 'border-yellow-500 bg-yellow-500/10',
  };

  return (
    <div className={`bg-gray-800 rounded-lg border-l-4 ${colorClasses[color as keyof typeof colorClasses]} border border-gray-700 p-6`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-lg font-semibold text-gray-200 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-sm text-gray-400">{subtitle}</p>
    </div>
  );
}

function ManagementPanel({ distributors, setDistributors, onUpdate }: {
  distributors: DistributorAddress[];
  setDistributors: (distributors: DistributorAddress[]) => void;
  onUpdate: () => void;
}) {
  const [newAddress, setNewAddress] = useState('');
  const [newLabel, setNewLabel] = useState('');

  const addDistributor = () => {
    if (newAddress && newLabel) {
      setDistributors([...distributors, { address: newAddress, label: newLabel, balance: '0' }]);
      setNewAddress('');
      setNewLabel('');
      onUpdate();
    }
  };

  const removeDistributor = (index: number) => {
    setDistributors(distributors.filter((_, i) => i !== index));
    onUpdate();
  };

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 mb-8">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-semibold">Distributor Address Management</h3>
        <p className="text-gray-400 text-sm">Manage addresses to exclude from community holder calculations</p>
      </div>
      <div className="p-6">
        {/* Add new distributor */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Ethereum Address (0x...)"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Label (e.g., Main Distributor)"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400"
          />
          <button
            onClick={addDistributor}
            className="bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2 font-medium"
          >
            Add Distributor
          </button>
        </div>

        {/* Distributor list */}
        <div className="space-y-3">
          {distributors.map((distributor, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
              <div>
                <div className="font-medium">{distributor.label}</div>
                <div className="text-sm text-gray-400 font-mono">{distributor.address}</div>
              </div>
              <button
                onClick={() => removeDistributor(index)}
                className="bg-red-600 hover:bg-red-700 rounded px-3 py-1 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DistributionChart({ tokenData, distributors }: {
  tokenData: TokenData;
  distributors: DistributorAddress[];
}) {
  const totalSupply = parseFloat(tokenData.totalSupply.replace(/,/g, '')) || 1;
  const communityHoldings = parseFloat(tokenData.wasteRecovered.replace(/,/g, '')) || 0;
  const distributorHoldings = totalSupply - communityHoldings;

  const communityPercentage = (communityHoldings / totalSupply) * 100;
  const distributorPercentage = (distributorHoldings / totalSupply) * 100;

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-green-400">Community Holdings</span>
          <span className="font-medium">{communityPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-green-500 h-3 rounded-full" 
            style={{ width: `${communityPercentage}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-yellow-400">Distributor Holdings</span>
          <span className="font-medium">{distributorPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-yellow-500 h-3 rounded-full" 
            style={{ width: `${distributorPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
