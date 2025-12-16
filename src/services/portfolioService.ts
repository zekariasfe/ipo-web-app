// src/services/portfolioService.ts
import { type Investment, type PortfolioSummary, type SectorAllocation } from '../types/portfolio';

// Mock investment data
export const mockInvestments: Investment[] = [
    {
        id: 'inv_001',
        ipoId: 'ipo-001',
        ipoSymbol: 'HABS',
        companyName: 'Habesha Breweries S.C.',
        sector: 'Manufacturing',
        shares: 100,
        averagePrice: 150,
        currentPrice: 165, // Increased 10%
        totalInvestment: 15000,
        currentValue: 16500,
        profitLoss: 1500,
        profitLossPercentage: 10.0,
        subscriptionDate: '2024-11-15',
        status: 'listed',
        allotmentDate: '2024-12-01',
        listingDate: '2024-12-15'
    },
    {
        id: 'inv_002',
        ipoId: 'ipo-002',
        ipoSymbol: 'DASH',
        companyName: 'Dashen Bank S.C.',
        sector: 'Banking',
        shares: 100,
        averagePrice: 85,
        currentPrice: 92, // Increased 8.2%
        totalInvestment: 8500,
        currentValue: 9200,
        profitLoss: 700,
        profitLossPercentage: 8.2,
        subscriptionDate: '2024-11-20',
        status: 'listed',
        allotmentDate: '2024-12-05',
        listingDate: '2024-12-20'
    },
    {
        id: 'inv_003',
        ipoId: 'ipo-003',
        ipoSymbol: 'ETEL',
        companyName: 'Ethio Telecom',
        sector: 'Telecommunications',
        shares: 500,
        averagePrice: 45,
        currentPrice: 45, // No change yet
        totalInvestment: 22500,
        currentValue: 22500,
        profitLoss: 0,
        profitLossPercentage: 0,
        subscriptionDate: '2024-12-01',
        status: 'pending_allotment',
        allotmentDate: '2024-12-26' // Future date
    },
    {
        id: 'inv_004',
        ipoId: 'ipo-004',
        ipoSymbol: 'AWIN',
        companyName: 'Awash Insurance',
        sector: 'Insurance',
        shares: 50,
        averagePrice: 120,
        currentPrice: 115, // Decreased 4.2%
        totalInvestment: 6000,
        currentValue: 5750,
        profitLoss: -250,
        profitLossPercentage: -4.2,
        subscriptionDate: '2024-10-05',
        status: 'listed',
        allotmentDate: '2024-10-20',
        listingDate: '2024-11-05'
    }
];

// Calculate portfolio summary
export const getPortfolioSummary = (investments: Investment[]): PortfolioSummary => {
    const totalInvestment = investments.reduce((sum, inv) => sum + inv.totalInvestment, 0);
    const currentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
    const totalProfitLoss = currentValue - totalInvestment;
    const totalProfitLossPercentage = totalInvestment > 0 ? (totalProfitLoss / totalInvestment) * 100 : 0;
    
    const allottedInvestments = investments.filter(inv => inv.status === 'listed' || inv.status === 'allotted').length;
    const pendingInvestments = investments.filter(inv => inv.status === 'pending_allotment').length;
    
    const bestPerformer = investments.length > 0 
        ? [...investments].sort((a, b) => b.profitLossPercentage - a.profitLossPercentage)[0]
        : null;
    
    const worstPerformer = investments.length > 0 
        ? [...investments].sort((a, b) => a.profitLossPercentage - b.profitLossPercentage)[0]
        : null;

    return {
        totalInvestment,
        currentValue,
        totalProfitLoss,
        totalProfitLossPercentage,
        totalDividends: 1500, // Mock dividends from transaction service
        numberOfInvestments: investments.length,
        allottedInvestments,
        pendingInvestments,
        bestPerformer,
        worstPerformer
    };
};

// Calculate sector allocation
export const getSectorAllocation = (investments: Investment[]): SectorAllocation[] => {
    const sectorMap = new Map<string, { amount: number, count: number }>();
    
    investments.forEach(inv => {
        const existing = sectorMap.get(inv.sector) || { amount: 0, count: 0 };
        sectorMap.set(inv.sector, {
            amount: existing.amount + inv.currentValue,
            count: existing.count + 1
        });
    });
    
    const totalValue = Array.from(sectorMap.values()).reduce((sum, item) => sum + item.amount, 0);
    
    return Array.from(sectorMap.entries()).map(([sector, data]) => ({
        sector,
        amount: data.amount,
        percentage: totalValue > 0 ? (data.amount / totalValue) * 100 : 0,
        investmentCount: data.count
    })).sort((a, b) => b.amount - a.amount);
};

// Simulate API call
export const fetchPortfolio = (): Promise<Investment[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockInvestments);
        }, 700);
    });
};