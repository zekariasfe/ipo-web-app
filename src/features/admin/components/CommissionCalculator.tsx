// src/features/admin/components/CommissionCalculator.tsx
import { useState } from 'react';
import { calculateCommission } from '../../../services/commissionService';

export default function CommissionCalculator() {
    const [amount, setAmount] = useState<string>('10000');
    const [transactionType, setTransactionType] = useState<'ipo_subscription' | 'dividend' | 'withdrawal' | 'deposit'>('ipo_subscription');
    const [result, setResult] = useState<any>(null);

    const handleCalculate = () => {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount) || numAmount <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        const calculation = calculateCommission(transactionType, numAmount);
        setResult(calculation);
    };

    const transactionTypes = [
        { value: 'ipo_subscription', label: 'IPO Subscription', icon: '📈' },
        { value: 'dividend', label: 'Dividend', icon: '💰' },
        { value: 'withdrawal', label: 'Withdrawal', icon: '🏧' },
        { value: 'deposit', label: 'Deposit', icon: '💳' }
    ];

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Commission Calculator</h3>
            
            <div className="space-y-4">
                {/* Transaction Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transaction Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {transactionTypes.map((type) => (
                            <button
                                key={type.value}
                                type="button"
                                onClick={() => setTransactionType(type.value as any)}
                                className={`p-3 rounded-lg border-2 text-left transition-all ${
                                    transactionType === type.value
                                        ? 'border-lime-500 bg-lime-50'
                                        : 'border-gray-200 hover:border-gray-300'
                                }`}
                            >
                                <div className="flex items-center">
                                    <span className="text-xl mr-2">{type.icon}</span>
                                    <span className="text-sm font-medium">{type.label}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Amount Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Transaction Amount (ETB)
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">ETB</span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                            placeholder="Enter amount"
                        />
                    </div>
                </div>

                {/* Calculate Button */}
                <button
                    onClick={handleCalculate}
                    className="w-full py-3 bg-lime-600 text-white rounded-lg hover:bg-lime-700 font-medium"
                >
                    Calculate Commission
                </button>

                {/* Results */}
                {result && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-lime-50 to-green-50 rounded-xl border border-lime-200">
                        <h4 className="font-semibold text-gray-800 mb-3">Commission Calculation</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Transaction Amount:</span>
                                <span className="font-semibold">ETB {result.amount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Commission Rate:</span>
                                <span className="font-semibold">
                                    {result.ruleApplied.type === 'percentage' 
                                        ? `${result.ruleApplied.value}%`
                                        : `ETB ${result.ruleApplied.value.toLocaleString()}`
                                    }
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Commission Amount:</span>
                                <span className="font-semibold text-red-600">
                                    ETB {result.commissionAmount.toLocaleString()}
                                </span>
                            </div>
                            <div className="pt-3 border-t">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-600">Net Amount:</span>
                                    <span className="text-xl font-bold text-green-600">
                                        ETB {result.netAmount.toLocaleString()}
                                    </span>
                                </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                                Applied rule: "{result.ruleApplied.name}"
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}