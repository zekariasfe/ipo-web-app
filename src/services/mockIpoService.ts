// src/services/mockIpoService.ts
import { type IPO } from '../types/ipo';

// Realistic Ethiopian IPO mock data
export const mockIPOs: IPO[] = [
    {
        id: 'ipo-001',
        companyName: 'Habesha Breweries S.C.',
        symbol: 'HABS',
        sector: 'Manufacturing',
        offeringPrice: 150,
        minInvestment: 5000,
        totalShares: 1000000,
        sharesSubscribed: 650000,
        subscriptionStart: '2024-12-01',
        subscriptionEnd: '2024-12-31',
        status: 'open',
        riskLevel: 'medium'
    },
    {
        id: 'ipo-002',
        companyName: 'Dashen Bank S.C.',
        symbol: 'DASH',
        sector: 'Banking',
        offeringPrice: 85,
        minInvestment: 8500,
        totalShares: 2000000,
        sharesSubscribed: 1850000,
        subscriptionStart: '2024-11-15',
        subscriptionEnd: '2024-12-15',
        status: 'open',
        riskLevel: 'low'
    },
    {
        id: 'ipo-003',
        companyName: 'Ethio Telecom',
        symbol: 'ETEL',
        sector: 'Telecommunications',
        offeringPrice: 45,
        minInvestment: 4500,
        totalShares: 5000000,
        sharesSubscribed: 5200000,
        subscriptionStart: '2024-12-10',
        subscriptionEnd: '2024-12-25',
        status: 'upcoming',
        riskLevel: 'low'
    },
    {
        id: 'ipo-004',
        companyName: 'Awash Insurance',
        symbol: 'AWIN',
        sector: 'Insurance',
        offeringPrice: 120,
        minInvestment: 6000,
        totalShares: 800000,
        sharesSubscribed: 800000,
        subscriptionStart: '2024-10-01',
        subscriptionEnd: '2024-10-31',
        status: 'closed',
        riskLevel: 'medium'
    }
];

// Simulate API delay
export const fetchIPOs = (): Promise<IPO[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockIPOs);
        }, 800); // Simulate network delay
    });
};

// Calculate subscription percentage
export const getSubscriptionPercentage = (ipo: IPO): number => {
    return Math.min(100, (ipo.sharesSubscribed / ipo.totalShares) * 100);
};