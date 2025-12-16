// src/features/portfolio/components/SectorAllocation.tsx
import { type SectorAllocation } from '../../../types/portfolio';

interface SectorAllocationProps {
    allocations: SectorAllocation[];
}

export default function SectorAllocation({ allocations }: SectorAllocationProps) {
    const formatCurrency = (amount: number) => {
        return `ETB ${amount.toLocaleString()}`;
    };

    const getSectorColor = (sector: string) => {
        const colors: Record<string, string> = {
            'Banking': 'bg-blue-500',
            'Manufacturing': 'bg-green-500',
            'Telecommunications': 'bg-purple-500',
            'Insurance': 'bg-amber-500',
            'Energy': 'bg-red-500',
            'Technology': 'bg-indigo-500',
            'Real Estate': 'bg-pink-500',
            'Healthcare': 'bg-teal-500'
        };
        return colors[sector] || 'bg-gray-500';
    };

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Sector Allocation</h3>
            
            {allocations.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                    <p>No sector data available</p>
                </div>
            ) : (
                <>
                    {/* Progress Bars */}
                    <div className="space-y-4 mb-6">
                        {allocations.map((allocation) => (
                            <div key={allocation.sector}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-gray-700">{allocation.sector}</span>
                                    <span className="text-gray-600">
                                        {allocation.percentage.toFixed(1)}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full ${getSectorColor(allocation.sector)}`}
                                        style={{ width: `${allocation.percentage}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>{formatCurrency(allocation.amount)}</span>
                                    <span>{allocation.investmentCount} investment(s)</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sector Summary */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-600">Total Sectors</p>
                                <p className="text-xl font-bold text-gray-900">{allocations.length}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Top Sector</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {allocations[0]?.sector || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}