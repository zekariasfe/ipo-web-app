// src/types/wallet.ts
export interface Wallet {
    id: string;
    userId: string;
    balance: number;        // ETB
    currency: 'ETB';
    lastUpdated: string;
}

export interface Transaction {
    id: string;
    walletId: string;
    amount: number;
    type: 'deposit' | 'withdrawal' | 'subscription' | 'refund';
    status: 'pending' | 'completed' | 'failed';
    description: string;
    timestamp: string;
    referenceId?: string;  // For linking to IPO subscription
}