// src/types/commission.ts
export interface CommissionRule {
    id: string;
    name: string;
    type: 'percentage' | 'fixed' | 'tiered';
    value: number; // Percentage or fixed amount
    minAmount?: number;
    maxAmount?: number;
    applicableTo: ('ipo_subscription' | 'dividend' | 'withdrawal' | 'deposit')[];
    status: 'active' | 'inactive';
    effectiveFrom: string;
    effectiveUntil?: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
}

export interface FeeStructure {
    id: string;
    name: string;
    description: string;
    fees: CommissionRule[];
    status: 'active' | 'draft' | 'archived';
    version: number;
}

export interface CommissionCalculation {
    transactionType: string;
    amount: number;
    commissionAmount: number;
    netAmount: number;
    ruleApplied: CommissionRule;
}

export interface CommissionSummary {
    totalCommission: number;
    commissionByType: Record<string, number>;
    transactionsCount: number;
    period: {
        start: string;
        end: string;
    };
}