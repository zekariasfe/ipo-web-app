// src/features/admin/components/CommissionRulesTable.tsx
import { type CommissionRule } from '../../../types/commission';

interface CommissionRulesTableProps {
    commissionRules: CommissionRule[];
    onActivate: (ruleId: string) => void;
    onDeactivate: (ruleId: string) => void;
    onDelete: (ruleId: string) => void;
}

export default function CommissionRulesTable({
    commissionRules,
    onActivate,
    onDeactivate,
    onDelete
}: CommissionRulesTableProps) {
    const formatRuleValue = (rule: CommissionRule) => {
        if (rule.type === 'percentage') {
            return `${rule.value}%`;
        } else {
            return `ETB ${rule.value.toLocaleString()}`;
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicable To</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {commissionRules.map((rule) => (
                        <tr key={rule.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                                <div>
                                    <p className="font-medium text-gray-900">{rule.name}</p>
                                    <p className="text-xs text-gray-500">Effective: {new Date(rule.effectiveFrom).toLocaleDateString()}</p>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {rule.type}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="font-semibold">{formatRuleValue(rule)}</span>
                                {rule.minAmount && (
                                    <p className="text-xs text-gray-500">Min: ETB {rule.minAmount.toLocaleString()}</p>
                                )}
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-wrap gap-1">
                                    {rule.applicableTo.map(type => (
                                        <span key={type} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                                            {type.replace('_', ' ')}
                                        </span>
                                    ))}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    rule.status === 'active'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-gray-100 text-gray-800'
                                }`}>
                                    {rule.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex space-x-2">
                                    {rule.status === 'active' ? (
                                        <button
                                            onClick={() => onDeactivate(rule.id)}
                                            className="text-sm text-amber-600 hover:text-amber-800"
                                        >
                                            Deactivate
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => onActivate(rule.id)}
                                            className="text-sm text-green-600 hover:text-green-800"
                                        >
                                            Activate
                                        </button>
                                    )}
                                    <button
                                        onClick={() => onDelete(rule.id)}
                                        className="text-sm text-red-600 hover:text-red-800"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}