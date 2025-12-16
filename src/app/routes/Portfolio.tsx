// src/app/routes/Portfolio.tsx
import { useState, useEffect } from 'react';
import { type Investment } from '../../types/portfolio';
import { fetchPortfolio, getPortfolioSummary, getSectorAllocation } from '../../services/portfolioService';
import PortfolioSummary from '../../features/portfolio/components/PortfolioSummary';
import InvestmentTable from '../../features/portfolio/components/InvestmentTable';
import SectorAllocation from '../../features/portfolio/components/SectorAllocation';
import PerformanceChart from '../../features/portfolio/components/PerformanceChart';

export default function Portfolio() {
    const [investments, setInvestments] = useState<Investment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState<'all' | 'listed' | 'pending'>('all');

    useEffect(() => {
        loadPortfolio();
    }, []);

    const loadPortfolio = async () => {
        try {
            setLoading(true);
            const data = await fetchPortfolio();
            setInvestments(data);
        } catch (err) {
            setError('Failed to load portfolio data');
            console.error('Portfolio load error:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredInvestments = investments.filter(inv => {
        if (activeFilter === 'listed') return inv.status === 'listed';
        if (activeFilter === 'pending') return inv.status === 'pending_allotment';
        return true;
    });

    const portfolioSummary = getPortfolioSummary(filteredInvestments);
    const sectorAllocation = getSectorAllocation(filteredInvestments);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading your portfolio...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-red-800 font-semibold">Error Loading Portfolio</h3>
                <p className="text-red-600 mt-2">{error}</p>
                <button 
                    onClick={loadPortfolio}
                    className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">My Portfolio</h2>
                    <p className="text-gray-600">Track your IPO investments and performance</p>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={loadPortfolio}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                        Refresh
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Download Report
                    </button>
                </div>
            </div>

            {/* Portfolio Summary */}
            <PortfolioSummary summary={portfolioSummary} />

            {/* Filter Tabs */}
            <div className="bg-white rounded-xl shadow p-2">
                <div className="flex border-b">
                    {[
                        { key: 'all', label: 'All Investments', count: investments.length },
                        { key: 'listed', label: 'Listed & Active', count: investments.filter(i => i.status === 'listed').length },
                        { key: 'pending', label: 'Pending Allotment', count: investments.filter(i => i.status === 'pending_allotment').length }
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveFilter(tab.key as any)}
                            className={`flex-1 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                activeFilter === tab.key
                                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                            {tab.label}
                            <span className="ml-2 bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Charts and Allocation */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Performance Chart */}
                <div className="lg:col-span-2">
                    <PerformanceChart investments={filteredInvestments} />
                </div>

                {/* Sector Allocation */}
                <div>
                    <SectorAllocation allocations={sectorAllocation} />
                </div>
            </div>

            {/* Investment Table */}
            <InvestmentTable investments={filteredInvestments} />

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="flex items-start space-x-3">
                    <div className="text-amber-600 text-xl">📊</div>
                    <div>
                        <h4 className="font-semibold text-amber-800">Portfolio Information</h4>
                        <p className="text-amber-700 text-sm mt-1">
                            • Prices shown are indicative and may not reflect real-time market values.<br/>
                            • Pending allotment investments are shown at subscription price.<br/>
                            • Past performance is not indicative of future results.<br/>
                            • Consult your financial advisor before making investment decisions.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}