// src/app/routes/Transactions.tsx
import { useState, useEffect } from 'react';
import { type Transaction, type TransactionFilters } from '../../types/transaction';
import { fetchTransactions, getTransactionStats } from '../../services/transactionService';
import TransactionTable from '../../features/transactions/components/TransactionTable';
import TransactionFiltersPanel from '../../features/transactions/components/TransactionFiltersPanel';
import StatsCards from '../../features/transactions/components/StatsCards';

export default function Transactions() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<TransactionFilters>({});

    useEffect(() => {
        loadTransactions();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, transactions]);

    const loadTransactions = async () => {
        try {
            setLoading(true);
            const data = await fetchTransactions();
            setTransactions(data);
            setFilteredTransactions(data);
        } catch (err) {
            setError('Failed to load transactions');
            console.error('Transaction load error:', err);
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        const filtered = transactions.filter(tx => {
            if (filters.startDate && new Date(tx.timestamp) < new Date(filters.startDate)) return false;
            if (filters.endDate && new Date(tx.timestamp) > new Date(filters.endDate)) return false;
            if (filters.type && tx.type !== filters.type) return false;
            if (filters.status && tx.status !== filters.status) return false;
            return true;
        });
        setFilteredTransactions(filtered);
    };

    const handleFilterChange = (newFilters: TransactionFilters) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    const handleResetFilters = () => {
        setFilters({});
    };

    const stats = getTransactionStats(transactions);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading transaction history...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-red-800 font-semibold">Error Loading Transactions</h3>
                <p className="text-red-600 mt-2">{error}</p>
                <button 
                    onClick={loadTransactions}
                    className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Transaction History</h2>
                    <p className="text-gray-600">View and manage all your financial transactions</p>
                </div>
                <button
                    onClick={loadTransactions}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                    Refresh
                </button>
            </div>

            {/* Stats Cards */}
            <StatsCards stats={stats} />

            {/* Filters Panel */}
            <TransactionFiltersPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onReset={handleResetFilters}
            />

            {/* Results Summary */}
            <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="font-medium text-gray-700">
                            {filteredTransactions.length} transactions found
                        </span>
                        {Object.keys(filters).length > 0 && (
                            <span className="text-sm text-gray-500 ml-2">
                                (with filters applied)
                            </span>
                        )}
                    </div>
                    <div className="text-sm text-gray-500">
                        Total balance impact: ETB{' '}
                        <span className={`font-medium ${
                            filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0) >= 0 
                                ? 'text-green-600' 
                                : 'text-red-600'
                        }`}>
                            {filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            {/* Transaction Table */}
            <TransactionTable transactions={filteredTransactions} />

            {/* Export Option */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-blue-800 font-medium">Need transaction records?</p>
                        <p className="text-blue-700 text-sm">Export your transaction history for tax or accounting purposes.</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Export as CSV
                    </button>
                </div>
            </div>
        </div>
    );
}