// src/features/ipo/components/IpoTable.tsx
import { type IPO } from '../../../types/ipo';
import { getSubscriptionPercentage } from '../../../services/mockIpoService';

interface IpoTableProps {
    ipos: IPO[];
    onSubscribe: (ipo: IPO) => void;
}

export default function IpoTable({ ipos, onSubscribe }: IpoTableProps) {
    const formatCurrency = (amount: number) => {
        return `ETB ${amount.toLocaleString()}`;
    };

    const getStatusBadge = (status: IPO['status']) => {
        const styles = {
            open: 'bg-green-100 text-green-800',
            upcoming: 'bg-blue-100 text-blue-800',
            closed: 'bg-gray-100 text-gray-800'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
                {status.toUpperCase()}
            </span>
        );
    };

    const getRiskBadge = (risk: IPO['riskLevel']) => {
        const styles = {
            low: 'bg-green-100 text-green-800',
            medium: 'bg-yellow-100 text-yellow-800',
            high: 'bg-red-100 text-red-800'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[risk]}`}>
                {risk.toUpperCase()}
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
                                Company
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Sector
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Subscription
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Risk
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {ipos.map((ipo) => {
                            const subscriptionPercent = getSubscriptionPercentage(ipo);
                            const daysRemaining = Math.max(0, Math.ceil(
                                (new Date(ipo.subscriptionEnd).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                            ));

                            return (
                                <tr key={ipo.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-medium text-gray-900">{ipo.companyName}</div>
                                            <div className="text-sm text-gray-500">{ipo.symbol}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {ipo.sector}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-semibold text-gray-900">
                                            {formatCurrency(ipo.offeringPrice)}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Min: {formatCurrency(ipo.minInvestment)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="w-32">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span>{subscriptionPercent.toFixed(1)}%</span>
                                                <span>{daysRemaining} days left</span>
                                            </div>
                                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-green-500 rounded-full"
                                                    style={{ width: `${Math.min(100, subscriptionPercent)}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getRiskBadge(ipo.riskLevel)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(ipo.status)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => onSubscribe(ipo)}
                                            disabled={ipo.status !== 'open'}
                                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                                                ipo.status === 'open'
                                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                        >
                                            {ipo.status === 'open' ? 'Subscribe' : 'Not Available'}
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}