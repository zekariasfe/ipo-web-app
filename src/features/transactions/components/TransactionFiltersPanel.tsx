// src/features/transactions/components/TransactionFiltersPanel.tsx
import { type TransactionFilters } from '../../../types/transaction';

interface TransactionFiltersPanelProps {
    filters: TransactionFilters;
    onFilterChange: (filters: TransactionFilters) => void;
    onReset: () => void;
}

export default function TransactionFiltersPanel({
    filters,
    onFilterChange,
    onReset
}: TransactionFiltersPanelProps) {
    const transactionTypes = [
        { value: 'deposit', label: 'Deposit' },
        { value: 'ipo_subscription', label: 'IPO Subscription' },
        { value: 'dividend', label: 'Dividend' },
        { value: 'withdrawal', label: 'Withdrawal' },
        { value: 'refund', label: 'Refund' }
    ];

    const statusOptions = [
        { value: 'completed', label: 'Completed' },
        { value: 'pending', label: 'Pending' },
        { value: 'failed', label: 'Failed' },
        { value: 'cancelled', label: 'Cancelled' }
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800">Filter Transactions</h3>
                <button
                    onClick={onReset}
                    className="text-sm text-gray-600 hover:text-gray-800"
                >
                    Clear all filters
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Date Range */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                    </label>
                    <input
                        type="date"
                        value={filters.startDate || ''}
                        onChange={(e) => onFilterChange({ startDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                    </label>
                    <input
                        type="date"
                        value={filters.endDate || ''}
                        onChange={(e) => onFilterChange({ endDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                </div>

                {/* Type Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transaction Type
                    </label>
                    <select
                        value={filters.type || ''}
                        onChange={(e) => onFilterChange({ 
                            type: e.target.value as TransactionFilters['type'] || undefined 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">All Types</option>
                        {transactionTypes.map(type => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Status Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                    </label>
                    <select
                        value={filters.status || ''}
                        onChange={(e) => onFilterChange({ 
                            status: e.target.value as TransactionFilters['status'] || undefined 
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="">All Statuses</option>
                        {statusOptions.map(status => (
                            <option key={status.value} value={status.value}>
                                {status.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}