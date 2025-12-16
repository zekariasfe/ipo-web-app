// src/services/commissionService.ts
import { type CommissionRule, type FeeStructure, type CommissionCalculation, type CommissionSummary } from '../types/commission';

// Mock commission rules
export const mockCommissionRules: CommissionRule[] = [
    {
        id: 'comm-001',
        name: 'IPO Subscription Fee',
        type: 'percentage',
        value: 1.5, // 1.5%
        applicableTo: ['ipo_subscription'],
        status: 'active',
        effectiveFrom: '2024-01-01',
        createdBy: 'admin@wcib.com',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-06-01T00:00:00Z'
    },
    {
        id: 'comm-002',
        name: 'Platform Maintenance Fee',
        type: 'fixed',
        value: 100, // ETB 100
        minAmount: 1000,
        applicableTo: ['ipo_subscription'],
        status: 'active',
        effectiveFrom: '2024-01-01',
        createdBy: 'admin@wcib.com',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 'comm-003',
        name: 'Dividend Processing Fee',
        type: 'percentage',
        value: 0.5, // 0.5%
        applicableTo: ['dividend'],
        status: 'active',
        effectiveFrom: '2024-01-01',
        createdBy: 'admin@wcib.com',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z'
    },
    {
        id: 'comm-004',
        name: 'Large Transaction Discount',
        type: 'percentage',
        value: -0.5, // -0.5% discount
        minAmount: 500000,
        applicableTo: ['ipo_subscription'],
        status: 'active',
        effectiveFrom: '2024-07-01',
        createdBy: 'admin2@wcib.com',
        createdAt: '2024-06-15T00:00:00Z',
        updatedAt: '2024-06-15T00:00:00Z'
    }
];

// Mock fee structures
export const mockFeeStructures: FeeStructure[] = [
    {
        id: 'fees-001',
        name: 'Standard IPO Fee Structure',
        description: 'Standard fees for IPO subscriptions and related services',
        fees: [mockCommissionRules[0], mockCommissionRules[1]],
        status: 'active',
        version: 2
    },
    {
        id: 'fees-002',
        name: 'Premium Investor Structure',
        description: 'Reduced fees for high-volume investors',
        fees: [mockCommissionRules[0], mockCommissionRules[3]],
        status: 'draft',
        version: 1
    }
];

// Calculate commission for a transaction
export const calculateCommission = (
    transactionType: CommissionRule['applicableTo'][0],
    amount: number
): CommissionCalculation | null => {
    const applicableRules = mockCommissionRules.filter(rule => 
        rule.applicableTo.includes(transactionType) && 
        rule.status === 'active'
    );

    if (applicableRules.length === 0) return null;

    // For now, take the first applicable rule
    // In reality, you might have logic to combine multiple rules
    const rule = applicableRules[0];
    
    let commissionAmount = 0;
    
    if (rule.type === 'percentage') {
        commissionAmount = (amount * rule.value) / 100;
    } else if (rule.type === 'fixed') {
        commissionAmount = rule.value;
    }

    // Check min/max constraints
    if (rule.minAmount && amount < rule.minAmount) {
        return null; // Rule doesn't apply
    }
    if (rule.maxAmount && amount > rule.maxAmount) {
        return null; // Rule doesn't apply
    }

    return {
        transactionType,
        amount,
        commissionAmount,
        netAmount: amount - commissionAmount,
        ruleApplied: rule
    };
};

// Get commission summary
export const getCommissionSummary = (startDate: string, endDate: string): CommissionSummary => {
    // Mock calculation - in real app, this would query transactions
    return {
        totalCommission: 1360625,
        commissionByType: {
            'ipo_subscription': 1234567,
            'dividend': 85678,
            'withdrawal': 41380
        },
        transactionsCount: 2375,
        period: { start: startDate, end: endDate }
    };
};

// Create new commission rule
export const createCommissionRule = (rule: Omit<CommissionRule, 'id' | 'createdAt' | 'updatedAt'>): Promise<CommissionRule> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const newRule: CommissionRule = {
                ...rule,
                id: `comm-${Date.now()}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            console.log('New commission rule created:', newRule);
            resolve(newRule);
        }, 800);
    });
};

// Update commission rule
export const updateCommissionRule = (id: string, updates: Partial<CommissionRule>): Promise<CommissionRule> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const updatedRule = {
                ...mockCommissionRules.find(r => r.id === id)!,
                ...updates,
                updatedAt: new Date().toISOString()
            };
            console.log('Commission rule updated:', updatedRule);
            resolve(updatedRule);
        }, 800);
    });
};