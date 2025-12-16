// src/services/transactionService.ts
import { type Transaction, type TransactionFilters } from '../types/transaction';

// Extended mock transactions
export const mockTransactions: Transaction[] = [
    {
        id: 'txn_001',
        walletId: 'wallet_001',
        amount: 50000,
        type: 'deposit',
        status: 'completed',
        description: 'Initial deposit via Telebirr',
        timestamp: '2024-11-01T10:30:00Z'
    },
    {
        id: 'txn_002',
        walletId: 'wallet_001',
        amount: -15000,
        type: 'ipo_subscription',
        status: 'completed',
        description: 'IPO Subscription - HABS',
        timestamp: '2024-11-15T14:20:00Z',
        ipoSymbol: 'HABS',
        shares: 100
    },
    {
        id: 'txn_003',
        walletId: 'wallet_001',
        amount: -8500,
        type: 'ipo_subscription',
        status: 'completed',
        description: 'IPO Subscription - DASH',
        timestamp: '2024-11-20T09:15:00Z',
        ipoSymbol: 'DASH',
        shares: 100
    },
    {
        id: 'txn_004',
        walletId: 'wallet_001',
        amount: 20000,
        type: 'deposit',
        status: 'completed',
        description: 'Additional deposit',
        timestamp: '2024-11-25T16:45:00Z'
    },
    {
        id: 'txn_005',
        walletId: 'wallet_001',
        amount: -22500,
        type: 'ipo_subscription',
        status: 'pending',
        description: 'IPO Subscription - ETEL',
        timestamp: '2024-12-01T11:30:00Z',
        ipoSymbol: 'ETEL',
        shares: 500
    },
    {
        id: 'txn_006',
        walletId: 'wallet_001',
        amount: 1500,
        type: 'dividend',
        status: 'completed',
        description: 'Dividend payment - HABS',
        timestamp: '2024-12-05T14:00:00Z',
        ipoSymbol: 'HABS'
    }
];

// Filter transactions
export const filterTransactions = (
    transactions: Transaction[],
    filters: TransactionFilters
): Transaction[] => {
    return transactions.filter(tx => {
        if (filters.startDate && new Date(tx.timestamp) < new Date(filters.startDate)) return false;
        if (filters.endDate && new Date(tx.timestamp) > new Date(filters.endDate)) return false;
        if (filters.type && tx.type !== filters.type) return false;
        if (filters.status && tx.status !== filters.status) return false;
        if (filters.minAmount && Math.abs(tx.amount) < filters.minAmount) return false;
        if (filters.maxAmount && Math.abs(tx.amount) > filters.maxAmount) return false;
        return true;
    });
};

// Get transaction statistics
export const getTransactionStats = (transactions: Transaction[]) => {
    const totalDeposits = transactions
        .filter(tx => tx.type === 'deposit' && tx.status === 'completed')
        .reduce((sum, tx) => sum + tx.amount, 0);
    
    const totalInvested = transactions
        .filter(tx => tx.type === 'ipo_subscription' && tx.status === 'completed')
        .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    
    const totalDividends = transactions
        .filter(tx => tx.type === 'dividend' && tx.status === 'completed')
        .reduce((sum, tx) => sum + tx.amount, 0);

    return {
        totalDeposits,
        totalInvested,
        totalDividends,
        transactionCount: transactions.length,
        pendingTransactions: transactions.filter(tx => tx.status === 'pending').length
    };
};

// Simulate API call
export const fetchTransactions = (filters?: TransactionFilters): Promise<Transaction[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let filtered = [...mockTransactions];
            if (filters) {
                filtered = filterTransactions(filtered, filters);
            }
            resolve(filtered);
        }, 600);
    });
};