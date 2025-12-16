// src/features/transactions/components/StatsCards.tsx
interface StatsCardsProps {
    stats: {
        totalDeposits: number;
        totalInvested: number;
        totalDividends: number;
        transactionCount: number;
        pendingTransactions: number;
    };
}

export default function StatsCards({ stats }: StatsCardsProps) {
    const formatCurrency = (amount: number) => {
        return `ETB ${amount.toLocaleString()}`;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Total Transactions */}
            <div className="bg-white p-4 rounded-xl shadow text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.transactionCount}</div>
                <p className="text-sm text-gray-600 mt-1">Total Transactions</p>
            </div>

            {/* Total Deposited */}
            <div className="bg-white p-4 rounded-xl shadow text-center">
                <div className="text-2xl font-bold text-green-600">{formatCurrency(stats.totalDeposits)}</div>
                <p className="text-sm text-gray-600 mt-1">Total Deposited</p>
            </div>

            {/* Total Invested */}
            <div className="bg-white p-4 rounded-xl shadow text-center">
                <div className="text-2xl font-bold text-purple-600">{formatCurrency(stats.totalInvested)}</div>
                <p className="text-sm text-gray-600 mt-1">Total Invested</p>
            </div>

            {/* Total Dividends */}
            <div className="bg-white p-4 rounded-xl shadow text-center">
                <div className="text-2xl font-bold text-amber-600">{formatCurrency(stats.totalDividends)}</div>
                <p className="text-sm text-gray-600 mt-1">Total Dividends</p>
            </div>

            {/* Pending Transactions */}
            <div className="bg-white p-4 rounded-xl shadow text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.pendingTransactions}</div>
                <p className="text-sm text-gray-600 mt-1">Pending</p>
            </div>
        </div>
    );
}