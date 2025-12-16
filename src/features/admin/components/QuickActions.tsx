// src/features/admin/components/QuickActions.tsx
export default function QuickActions() {
    const quickActions = [
        { 
            label: 'Create New IPO', 
            description: 'Launch a new IPO offering',
            icon: '📈',
            path: '/admin/ipos/new',
            color: 'bg-lime-100 text-lime-800'
        },
        { 
            label: 'Review KYCs', 
            description: 'Pending verifications',
            icon: '✅',
            path: '/admin/kyc',
            color: 'bg-blue-100 text-blue-800'
        },
        { 
            label: 'Upload Documents', 
            description: 'Add prospectus or reports',
            icon: '📄',
            path: '/admin/documents',
            color: 'bg-purple-100 text-purple-800'
        },
        { 
            label: 'Configure Fees', 
            description: 'Update commission rules',
            icon: '💰',
            path: '/admin/commissions',
            color: 'bg-amber-100 text-amber-800'
        }
    ];

    const recentTasks = [
        { task: 'Approve 5 pending KYCs', priority: 'high', due: 'Today' },
        { task: 'Review system alerts', priority: 'medium', due: 'Today' },
        { task: 'Monthly revenue report', priority: 'medium', due: 'Tomorrow' },
        { task: 'Update Dashen Bank IPO', priority: 'low', due: 'This week' }
    ];

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
            
            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
                {quickActions.map((action, index) => (
                    <button
                        key={index}
                        onClick={() => window.location.href = action.path}
                        className="w-full p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors group"
                    >
                        <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg mr-3 ${action.color}`}>
                                {action.icon}
                            </div>
                            <div>
                                <div className="font-medium text-gray-900">{action.label}</div>
                                <div className="text-sm text-gray-600">{action.description}</div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Recent Tasks */}
            <div>
                <h4 className="font-medium text-gray-700 mb-3">Pending Tasks</h4>
                <div className="space-y-3">
                    {recentTasks.map((task, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <div className="font-medium text-gray-900 text-sm">{task.task}</div>
                                <div className="flex items-center mt-1">
                                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                        task.priority === 'high' ? 'bg-red-500' :
                                        task.priority === 'medium' ? 'bg-yellow-500' :
                                        'bg-green-500'
                                    }`}></span>
                                    <span className="text-xs text-gray-500">Due: {task.due}</span>
                                </div>
                            </div>
                            <button className="text-xs text-lime-600 hover:text-lime-700 font-medium">
                                Start
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}