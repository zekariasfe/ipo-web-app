// src/types/ipo.ts
export interface IPO {
    id: string;
    companyName: string;
    symbol: string;
    sector: string;
    offeringPrice: number;      // Price per share in ETB
    minInvestment: number;      // Minimum investment amount
    totalShares: number;        // Total shares offered
    sharesSubscribed: number;   // Already subscribed shares
    subscriptionStart: string;  // ISO date string
    subscriptionEnd: string;    // ISO date string
    status: 'open' | 'upcoming' | 'closed';
    riskLevel: 'low' | 'medium' | 'high';
}

export interface Subscription {
    ipoId: string;
    shares: number;
    amount: number;
    timestamp: string;
    status: 'pending' | 'confirmed' | 'rejected';
}