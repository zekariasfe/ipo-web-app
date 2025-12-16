// src/features/admin/components/NewRuleModal.tsx
export default function NewRuleModal() {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">New Commission Rule</h3>
                <div className="space-y-4">
                    <input type="text" className="w-full p-2 border rounded-lg" placeholder="Rule Name" />
                    <select className="w-full p-2 border rounded-lg">
                        <option>Percentage</option>
                        <option>Fixed</option>
                    </select>
                    <button className="w-full py-2 bg-lime-600 text-white rounded-lg">
                        Create Rule
                    </button>
                </div>
            </div>
        </div>
    );
}