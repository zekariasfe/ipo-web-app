// src/types/transaction.ts
export interface Transaction {
    id: string;
    walletId: string;
    amount: number;
    type: 'deposit' | 'withdrawal' | 'ipo_subscription' | 'dividend' | 'refund';
    status: 'pending' | 'completed' | 'failed' | 'cancelled';
    description: string;
    timestamp: string;
    referenceId?: string;
    ipoSymbol?: string;  // For IPO-related transactions
    shares?: number;     // For IPO subscriptions
}

export interface TransactionFilters {
    startDate?: string;
    endDate?: string;
    type?: Transaction['type'];
    status?: Transaction['status'];
    minAmount?: number;
    maxAmount?: number;
}