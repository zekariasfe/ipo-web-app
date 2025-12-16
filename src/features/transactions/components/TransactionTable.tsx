// src/features/transactions/components/TransactionTable.tsx
import { type Transaction } from '../../../types/transaction';

interface TransactionTableProps {
    transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
    const formatCurrency = (amount: number) => {
        return `ETB ${Math.abs(amount).toLocaleString()}`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-ET', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTypeBadge = (type: Transaction['type']) => {
        const typeConfig = {
            deposit: { label: 'Deposit', color: 'bg-green-100 text-green-800' },
            withdrawal: { label: 'Withdrawal', color: 'bg-red-100 text-red-800' },
            ipo_subscription: { label: 'IPO Subscription', color: 'bg-lime-100 text-lime-800' },
            dividend: { label: 'Dividend', color: 'bg-purple-100 text-purple-800' },
            refund: { label: 'Refund', color: 'bg-amber-100 text-amber-800' }
        };
        
        const config = typeConfig[type] || { label: type, color: 'bg-gray-100 text-gray-800' };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
                {config.label}
            </span>
        );
    };

    const getStatusBadge = (status: Transaction['status']) => {
        const statusConfig = {
            completed: { label: 'Completed', color: 'bg-green-100 text-green-800' },
            pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
            failed: { label: 'Failed', color: 'bg-red-100 text-red-800' },
            cancelled: { label: 'Cancelled', color: 'bg-gray-100 text-gray-800' }
        };
        
        const config = statusConfig[status] || { label: status, color: 'bg-gray-100 text-gray-800' };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
                {config.label}
            </span>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date & Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Details
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center">
                                    <div className="text-gray-400">
                                        <div className="text-4xl mb-2">📄</div>
                                        <p className="text-lg">No transactions found</p>
                                        <p className="text-sm">Try adjusting your filters</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {formatDate(tx.timestamp)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {tx.description}
                                        </div>
                                        {tx.ipoSymbol && (
                                            <div className="text-xs text-gray-500">
                                                IPO: {tx.ipoSymbol} • {tx.shares ? `${tx.shares} shares` : ''}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getTypeBadge(tx.type)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className={`text-sm font-semibold ${
                                            tx.amount >= 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {tx.amount >= 0 ? '+' : '-'}{formatCurrency(tx.amount)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(tx.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button className="text-sm text-blue-600 hover:text-blue-800">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}