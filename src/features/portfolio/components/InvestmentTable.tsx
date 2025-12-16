// src/features/portfolio/components/InvestmentTable.tsx
import { type Investment } from '../../../types/portfolio';

interface InvestmentTableProps {
    investments: Investment[];
}

export default function InvestmentTable({ investments }: InvestmentTableProps) {
    const formatCurrency = (amount: number) => {
        return `ETB ${amount.toLocaleString()}`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-ET', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusBadge = (status: Investment['status']) => {
        const config = {
            listed: { label: 'Listed', color: 'bg-green-100 text-green-800', icon: '📈' },
            allotted: { label: 'Allotted', color: 'bg-blue-100 text-blue-800', icon: '✅' },
            pending_allotment: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: '⏳' },
            refunded: { label: 'Refunded', color: 'bg-gray-100 text-gray-800', icon: '↩️' }
        };
        
        const item = config[status] || { label: status, color: 'bg-gray-100 text-gray-800', icon: '📄' };
        return (
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${item.color}`}>
                <span className="mr-1">{item.icon}</span>
                {item.label}
            </span>
        );
    };

    const getProfitLossBadge = (profitLoss: number, percentage: number) => {
        const isPositive = profitLoss >= 0;
        return (
            <div className="text-right">
                <div className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {isPositive ? '+' : ''}{formatCurrency(profitLoss)}
                </div>
                <div className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? '+' : ''}{percentage.toFixed(2)}%
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-semibold text-gray-800">Investment Details</h3>
            </div>
            
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Company
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Shares
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Avg Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Current Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Investment
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Current Value
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                P&L
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {investments.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="px-6 py-12 text-center">
                                    <div className="text-gray-400">
                                        <div className="text-4xl mb-2">📊</div>
                                        <p className="text-lg">No investments found</p>
                                        <p className="text-sm">Start investing in IPOs to build your portfolio</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            investments.map((inv) => (
                                <tr key={inv.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-medium text-gray-900">{inv.companyName}</div>
                                            <div className="text-sm text-gray-500">{inv.ipoSymbol} • {inv.sector}</div>
                                            <div className="text-xs text-gray-400">
                                                Subscribed: {formatDate(inv.subscriptionDate)}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-lg font-semibold text-gray-900">
                                            {inv.shares.toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-900">{formatCurrency(inv.averagePrice)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-900 font-medium">{formatCurrency(inv.currentPrice)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-900 font-semibold">{formatCurrency(inv.totalInvestment)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-900 font-semibold">{formatCurrency(inv.currentValue)}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getProfitLossBadge(inv.profitLoss, inv.profitLossPercentage)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(inv.status)}
                                        {inv.listingDate && (
                                            <div className="text-xs text-gray-500 mt-1">
                                                Listed: {formatDate(inv.listingDate)}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
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