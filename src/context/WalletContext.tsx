// src/context/WalletContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { type Wallet, type Transaction } from '../types/wallet';

interface WalletContextType {
    wallet: Wallet | null;
    transactions: Transaction[];
    isLoading: boolean;
    refreshWallet: () => Promise<void>;
    makeTransaction: (amount: number, type: Transaction['type'], description: string) => Promise<boolean>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Mock wallet data
const initialWallet: Wallet = {
    id: 'wallet_001',
    userId: 'usr_001',
    balance: 75000,  // 75,000 ETB
    currency: 'ETB',
    lastUpdated: new Date().toISOString()
};

const mockTransactions: Transaction[] = [
    {
        id: 'txn_001',
        walletId: 'wallet_001',
        amount: 50000,
        type: 'deposit',
        status: 'completed',
        description: 'Initial deposit',
        timestamp: '2024-11-01T10:30:00Z'
    },
    {
        id: 'txn_002',
        walletId: 'wallet_001',
        amount: -15000,
        type: 'subscription',
        status: 'completed',
        description: 'IPO Subscription - HABS',
        timestamp: '2024-11-15T14:20:00Z'
    }
];

export function WalletProvider({ children }: { children: ReactNode }) {
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadWalletData();
    }, []);

    const loadWalletData = async () => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setWallet(initialWallet);
            setTransactions(mockTransactions);
            setIsLoading(false);
        }, 500);
    };

    const refreshWallet = async () => {
        await loadWalletData();
    };

    const makeTransaction = async (
        amount: number, 
        type: Transaction['type'], 
        description: string
    ): Promise<boolean> => {
        if (!wallet) return false;
        
        // Check if sufficient balance for withdrawal/subscription
        if ((type === 'withdrawal' || type === 'subscription') && wallet.balance < amount) {
            return false;
        }

        // Create new transaction
        const newTransaction: Transaction = {
            id: `txn_${Date.now()}`,
            walletId: wallet.id,
            amount: type === 'deposit' ? Math.abs(amount) : -Math.abs(amount),
            type,
            status: 'pending',
            description,
            timestamp: new Date().toISOString()
        };

        // Update wallet balance
        const newBalance = wallet.balance + newTransaction.amount;
        const updatedWallet = { ...wallet, balance: newBalance, lastUpdated: new Date().toISOString() };

        // Simulate API call
        return new Promise((resolve) => {
            setTimeout(() => {
                setWallet(updatedWallet);
                setTransactions(prev => [newTransaction, ...prev]);
                
                // Update transaction status to completed
                setTimeout(() => {
                    setTransactions(prev => 
                        prev.map(tx => 
                            tx.id === newTransaction.id 
                                ? { ...tx, status: 'completed' }
                                : tx
                        )
                    );
                }, 1000);
                
                resolve(true);
            }, 800);
        });
    };

    const value = {
        wallet,
        transactions,
        isLoading,
        refreshWallet,
        makeTransaction
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
}

export function useWallet() {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
}