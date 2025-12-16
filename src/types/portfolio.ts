// src/types/portfolio.ts - COMPLETE FILE
export interface Investment {
    id: string;
    ipoId: string;
    ipoSymbol: string;
    companyName: string;
    sector: string;
    shares: number;
    averagePrice: number;
    currentPrice: number;
    totalInvestment: number;
    currentValue: number;
    profitLoss: number;
    profitLossPercentage: number;
    subscriptionDate: string;
    status: 'allotted' | 'pending_allotment' | 'listed' | 'refunded';
    allotmentDate?: string;
    listingDate?: string;
}

export interface PortfolioSummary {
    totalInvestment: number;
    currentValue: number;
    totalProfitLoss: number;
    totalProfitLossPercentage: number;
    totalDividends: number;
    numberOfInvestments: number;
    allottedInvestments: number;
    pendingInvestments: number;
    bestPerformer: Investment | null;
    worstPerformer: Investment | null;
}

export interface SectorAllocation {
    sector: string;
    amount: number;
    percentage: number;
    investmentCount: number;
}