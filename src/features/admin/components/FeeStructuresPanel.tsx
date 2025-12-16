// src/features/admin/components/FeeStructuresPanel.tsx
export default function FeeStructuresPanel() {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Fee Structures</h3>
            <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                    <p className="font-medium">Standard Fees</p>
                    <p className="text-sm text-gray-600">1.5% + ETB 100</p>
                </div>
                <div className="p-3 border rounded-lg">
                    <p className="font-medium">Premium Fees</p>
                    <p className="text-sm text-gray-600">1.0% flat</p>
                </div>
            </div>
        </div>
    );
}