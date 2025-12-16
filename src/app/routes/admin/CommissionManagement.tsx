// src/app/routes/admin/CommissionManagement.tsx
import { useState } from 'react';
import { type CommissionRule, type FeeStructure } from '../../../types/commission';
import { mockCommissionRules, mockFeeStructures, getCommissionSummary } from '../../../services/commissionService';
import CommissionCalculator from '../../../features/admin/components/CommissionCalculator';
import CommissionRulesTable from '../../../features/admin/components/CommissionRulesTable';
import FeeStructuresPanel from '../../../features/admin/components/FeeStructuresPanel';
import CommissionSummary from '../../../features/admin/components/CommissionSummary';
import NewRuleModal from '../../../features/admin/components/NewRuleModal';

export default function CommissionManagement() {
    const [commissionRules, setCommissionRules] = useState<CommissionRule[]>(mockCommissionRules);
    const [feeStructures, setFeeStructures] = useState<FeeStructure[]>(mockFeeStructures);
    const [showNewRuleModal, setShowNewRuleModal] = useState(false);
    const [activeTab, setActiveTab] = useState<'rules' | 'structures' | 'calculator'>('rules');

    // Get summary for current month
    const currentDate = new Date();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString().split('T')[0];
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).toISOString().split('T')[0];
    
    const commissionSummary = getCommissionSummary(firstDay, lastDay);

    const handleActivateRule = (ruleId: string) => {
        setCommissionRules(rules => 
            rules.map(rule => 
                rule.id === ruleId 
                    ? { ...rule, status: 'active' as const }
                    : rule
            )
        );
        alert('Rule activated successfully');
    };

    const handleDeactivateRule = (ruleId: string) => {
        setCommissionRules(rules => 
            rules.map(rule => 
                rule.id === ruleId 
                    ? { ...rule, status: 'inactive' as const }
                    : rule
            )
        );
        alert('Rule deactivated successfully');
    };

    const handleDeleteRule = (ruleId: string) => {
        if (window.confirm('Are you sure you want to delete this commission rule?')) {
            setCommissionRules(rules => rules.filter(rule => rule.id !== ruleId));
            alert('Rule deleted successfully');
        }
    };

    const handleNewRuleSubmit = (newRule: Omit<CommissionRule, 'id' | 'createdAt' | 'updatedAt'>) => {
        // In real app, this would call API
        const ruleWithId: CommissionRule = {
            ...newRule,
            id: `comm-${Date.now()}`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        setCommissionRules(prev => [...prev, ruleWithId]);
        setShowNewRuleModal(false);
        alert('New commission rule created successfully!');
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Commission & Fees Management</h2>
                    <p className="text-gray-600">Configure platform fees and commission rules</p>
                </div>
                <div className="flex items-center space-x-3">
                    <button
                        onClick={() => setShowNewRuleModal(true)}
                        className="px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700"
                    >
                        + New Rule
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        Export Report
                    </button>
                </div>
            </div>

            {/* Commission Summary */}
            <CommissionSummary summary={commissionSummary} />

            {/* Tabs */}
            <div className="bg-white rounded-xl shadow">
                <div className="flex border-b">
                    <button
                        onClick={() => setActiveTab('rules')}
                        className={`flex-1 px-6 py-3 text-sm font-medium ${
                            activeTab === 'rules'
                                ? 'border-b-2 border-lime-500 text-lime-700 bg-lime-50'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                        Commission Rules
                    </button>
                    <button
                        onClick={() => setActiveTab('structures')}
                        className={`flex-1 px-6 py-3 text-sm font-medium ${
                            activeTab === 'structures'
                                ? 'border-b-2 border-lime-500 text-lime-700 bg-lime-50'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                        Fee Structures
                    </button>
                    <button
                        onClick={() => setActiveTab('calculator')}
                        className={`flex-1 px-6 py-3 text-sm font-medium ${
                            activeTab === 'calculator'
                                ? 'border-b-2 border-lime-500 text-lime-700 bg-lime-50'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                        Calculator
                    </button>
                </div>

                <div className="p-6">
                    {activeTab === 'rules' && (
                        <CommissionRulesTable
                            commissionRules={commissionRules}
                            onActivate={handleActivateRule}
                            onDeactivate={handleDeactivateRule}
                            onDelete={handleDeleteRule}
                        />
                    )}

                    {activeTab === 'structures' && (
                        <FeeStructuresPanel 
                            feeStructures={feeStructures} 
                            commissionRules={commissionRules}
                        />
                    )}

                    {activeTab === 'calculator' && (
                        <CommissionCalculator />
                    )}
                </div>
            </div>

            {/* New Rule Modal */}
            {showNewRuleModal && (
                <NewRuleModal
                    onClose={() => setShowNewRuleModal(false)}
                    onSubmit={handleNewRuleSubmit}
                />
            )}

            {/* Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h4 className="font-semibold text-blue-800 mb-3">💡 Commission Rules Information</h4>
                <ul className="text-sm text-blue-700 space-y-2">
                    <li>• <strong>Percentage fees</strong> are calculated as a percentage of the transaction amount</li>
                    <li>• <strong>Fixed fees</strong> are charged as a flat amount per transaction</li>
                    <li>• <strong>Tiered fees</strong> (coming soon) will allow different rates based on amount ranges</li>
                    <li>• Rules can be applied to multiple transaction types (IPO subscriptions, dividends, etc.)</li>
                    <li>• Only <strong>active</strong> rules are applied to transactions</li>
                    <li>• Effective dates control when rules become active/inactive automatically</li>
                </ul>
            </div>
        </div>
    );
}