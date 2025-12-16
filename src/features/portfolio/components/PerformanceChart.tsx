// src/features/portfolio/components/PerformanceChart.tsx
import { type Investment } from '../../../types/portfolio';

interface PerformanceChartProps {
    investments: Investment[];
}

export default function PerformanceChart({ investments }: PerformanceChartProps) {
    // Simple chart simulation
    const chartData = [
        { month: 'Sep', value: 50000 },
        { month: 'Oct', value: 65000 },
        { month: 'Nov', value: 82000 },
        { month: 'Dec', value: 98500 }
    ];

    const maxValue = Math.max(...chartData.map(d => d.value));
    const minValue = Math.min(...chartData.map(d => d.value));

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">Portfolio Performance</h3>
                    <p className="text-sm text-gray-600">Last 4 months overview</p>
                </div>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                    <option>Last 4 Months</option>
                    <option>Last 6 Months</option>
                    <option>Year to Date</option>
                    <option>All Time</option>
                </select>
            </div>

            {/* Chart Area */}
            <div className="relative h-64">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                    {[100, 75, 50, 25, 0].map((percent) => (
                        <div key={percent} className="border-t border-gray-100"></div>
                    ))}
                </div>

                {/* Bars */}
                <div className="absolute inset-0 flex items-end justify-between px-8">
                    {chartData.map((item, index) => {
                        const heightPercent = ((item.value - minValue) / (maxValue - minValue)) * 80 + 10;
                        return (
                            <div key={index} className="flex flex-col items-center">
                                <div className="relative">
                                    <div 
                                        className="w-12 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:opacity-90"
                                        style={{ height: `${heightPercent}%` }}
                                    ></div>
                                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-700">
                                        ETB {(item.value / 1000).toFixed(0)}K
                                    </div>
                                </div>
                                <div className="mt-2 text-sm text-gray-600">{item.month}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t">
                <div className="flex items-center">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-blue-400 rounded mr-2"></div>
                    <span className="text-sm text-gray-700">Portfolio Value</span>
                </div>
                <div className="text-sm text-gray-500">
                    Growth: +{(chartData[chartData.length - 1].value / chartData[0].value * 100 - 100).toFixed(1)}%
                </div>
            </div>
        </div>
    );
}