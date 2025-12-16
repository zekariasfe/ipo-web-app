// src/features/admin/components/CommissionSummary.tsx
import { type CommissionSummary } from '../../../types/commission';

interface CommissionSummaryProps {
    summary: CommissionSummary;
}

export default function CommissionSummary({ summary }: CommissionSummaryProps) {
    const formatCurrency = (amount: number) => {
        return `ETB ${amount.toLocaleString()}`;
    };

    return (
        <div className="bg-gradient-to-r from-lime-900 to-emerald-900 rounded-2xl shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Commission Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <p className="text-sm text-lime-200">Total Commission</p>
                    <p className="text-2xl font-bold mt-2">{formatCurrency(summary.totalCommission)}</p>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <p className="text-sm text-lime-200">Transactions</p>
                    <p className="text-2xl font-bold mt-2">{summary.transactionsCount.toLocaleString()}</p>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <p className="text-sm text-lime-200">IPO Subscriptions</p>
                    <p className="text-2xl font-bold mt-2">{formatCurrency(summary.commissionByType.ipo_subscription || 0)}</p>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <p className="text-sm text-lime-200">Period</p>
                    <p className="text-lg font-bold mt-2">
                        {new Date(summary.period.start).toLocaleDateString('en-US', { month: 'short' })} - 
                        {new Date(summary.period.end).toLocaleDateString('en-US', { day: 'numeric' })}
                    </p>
                </div>
            </div>
        </div>
    );
}