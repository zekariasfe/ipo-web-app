// src/features/portfolio/components/PortfolioSummary.tsx
import { type PortfolioSummary } from '../../../types/portfolio';

interface PortfolioSummaryProps {
    summary: PortfolioSummary;
}

export default function PortfolioSummary({ summary }: PortfolioSummaryProps) {
    const formatCurrency = (amount: number) => {
        return `ETB ${amount.toLocaleString()}`;
    };

    const formatPercentage = (percentage: number) => {
        return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
    };

    return (
        <div className="bg-gradient-to-r from-lime-900 to-emerald-900 rounded-2xl shadow-2xl p-6 text-white">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Total Investment */}
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <p className="text-sm text-lime-200">Total Investment</p>
                    <p className="text-2xl font-bold mt-2">{formatCurrency(summary.totalInvestment)}</p>
                </div>

                {/* Current Value */}
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <p className="text-sm text-blue-200">Current Value</p>
                    <p className="text-2xl font-bold mt-2">{formatCurrency(summary.currentValue)}</p>
                </div>

                {/* Total P&L */}
                <div className={`text-center p-4 rounded-xl backdrop-blur-sm ${
                    summary.totalProfitLoss >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                    <p className="text-sm">Total P&L</p>
                    <div className="flex items-center justify-center mt-2 space-x-2">
                        <span className={`text-2xl font-bold ${
                            summary.totalProfitLoss >= 0 ? 'text-green-300' : 'text-red-300'
                        }`}>
                            {formatCurrency(summary.totalProfitLoss)}
                        </span>
                        <span className={`text-lg ${
                            summary.totalProfitLoss >= 0 ? 'text-green-300' : 'text-red-300'
                        }`}>
                            {formatPercentage(summary.totalProfitLossPercentage)}
                        </span>
                    </div>
                </div>

                {/* Investments Count */}
                <div className="text-center p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <p className="text-sm text-blue-200">Investments</p>
                    <div className="flex items-center justify-center space-x-4 mt-2">
                        <div>
                            <p className="text-2xl font-bold">{summary.numberOfInvestments}</p>
                            <p className="text-xs text-blue-300">Total</p>
                        </div>
                        <div className="h-8 w-px bg-white/30"></div>
                        <div>
                            <p className="text-xl font-bold">{summary.allottedInvestments}</p>
                            <p className="text-xs text-blue-300">Active</p>
                        </div>
                        <div className="h-8 w-px bg-white/30"></div>
                        <div>
                            <p className="text-xl font-bold">{summary.pendingInvestments}</p>
                            <p className="text-xs text-blue-300">Pending</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Performance Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {summary.bestPerformer && (
                    <div className="bg-green-500/10 p-4 rounded-xl border border-green-500/30">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-300">Best Performer</p>
                                <p className="font-semibold">{summary.bestPerformer.ipoSymbol}</p>
                                <p className="text-xs text-green-200">{summary.bestPerformer.companyName}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-green-300">
                                    +{summary.bestPerformer.profitLossPercentage.toFixed(1)}%
                                </p>
                                <p className="text-sm text-green-200">
                                    ETB {summary.bestPerformer.profitLoss.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {summary.worstPerformer && summary.worstPerformer.profitLossPercentage < 0 && (
                    <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/30">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-red-300">Worst Performer</p>
                                <p className="font-semibold">{summary.worstPerformer.ipoSymbol}</p>
                                <p className="text-xs text-red-200">{summary.worstPerformer.companyName}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-red-300">
                                    {summary.worstPerformer.profitLossPercentage.toFixed(1)}%
                                </p>
                                <p className="text-sm text-red-200">
                                    ETB {summary.worstPerformer.profitLoss.toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}