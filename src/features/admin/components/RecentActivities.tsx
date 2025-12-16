// src/features/admin/components/RecentActivities.tsx
import { useState } from 'react';

interface Activity {
    id: string;
    type: 'document_upload' | 'commission_change' | 'user_registration' | 'ipo_subscription' | 'kyc_approval' | 'system_alert';
    title: string;
    description: string;
    timestamp: string;
    user: string;
    userRole: 'admin' | 'user' | 'system';
    status: 'completed' | 'pending' | 'failed';
    details?: Record<string, any>;
}

export default function RecentActivities() {
    const [activities, setActivities] = useState<Activity[]>([
        {
            id: 'act-001',
            type: 'document_upload',
            title: 'New Prospectus Uploaded',
            description: 'Habesha Breweries IPO prospectus v2.0 uploaded',
            timestamp: '2024-12-15T10:30:00Z',
            user: 'admin@wcib.com',
            userRole: 'admin',
            status: 'completed',
            details: { fileName: 'habesha_prospectus_v2.pdf', size: '25.4MB' }
        },
        {
            id: 'act-002',
            type: 'commission_change',
            title: 'Commission Rule Updated',
            description: 'IPO subscription fee changed from 2% to 1.5%',
            timestamp: '2024-12-15T09:15:00Z',
            user: 'admin@wcib.com',
            userRole: 'admin',
            status: 'completed',
            details: { oldValue: '2%', newValue: '1.5%' }
        },
        {
            id: 'act-003',
            type: 'user_registration',
            title: 'New User Registered',
            description: 'John Doe registered via Telebirr',
            timestamp: '2024-12-15T08:45:00Z',
            user: 'john.doe@email.com',
            userRole: 'user',
            status: 'completed'
        },
        {
            id: 'act-004',
            type: 'ipo_subscription',
            title: 'Large IPO Subscription',
            description: 'ETB 250,000 subscription to Dashen Bank IPO',
            timestamp: '2024-12-14T16:20:00Z',
            user: 'premium_user@email.com',
            userRole: 'user',
            status: 'completed',
            details: { amount: '250,000 ETB', ipo: 'DASH' }
        },
        {
            id: 'act-005',
            type: 'kyc_approval',
            title: 'KYC Approved',
            description: 'KYC verification completed for Jane Smith',
            timestamp: '2024-12-14T14:10:00Z',
            user: 'admin2@wcib.com',
            userRole: 'admin',
            status: 'completed'
        },
        {
            id: 'act-006',
            type: 'system_alert',
            title: 'High Server Load',
            description: 'API server CPU usage exceeded 80% threshold',
            timestamp: '2024-12-14T11:30:00Z',
            user: 'system',
            userRole: 'system',
            status: 'pending',
            details: { cpuUsage: '82%', server: 'api-server-01' }
        }
    ]);

    const [filter, setFilter] = useState<string>('all');
    const [showDetails, setShowDetails] = useState<string | null>(null);

    const activityTypes = [
        { value: 'all', label: 'All Activities', icon: '📊' },
        { value: 'document_upload', label: 'Documents', icon: '📄' },
        { value: 'commission_change', label: 'Commissions', icon: '💰' },
        { value: 'user_registration', label: 'Users', icon: '👥' },
        { value: 'ipo_subscription', label: 'Subscriptions', icon: '📈' },
        { value: 'kyc_approval', label: 'KYC', icon: '✅' },
        { value: 'system_alert', label: 'System', icon: '🚨' }
    ];

    const filteredActivities = filter === 'all' 
        ? activities 
        : activities.filter(activity => activity.type === filter);

    const getActivityIcon = (type: Activity['type']) => {
        const icons = {
            document_upload: '📄',
            commission_change: '💰',
            user_registration: '👤',
            ipo_subscription: '📈',
            kyc_approval: '✅',
            system_alert: '🚨'
        };
        return icons[type] || '📋';
    };

    const getStatusColor = (status: Activity['status']) => {
        const colors = {
            completed: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            failed: 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getUserRoleColor = (role: Activity['userRole']) => {
        const colors = {
            admin: 'bg-lime-100 text-lime-800',
            user: 'bg-blue-100 text-blue-800',
            system: 'bg-purple-100 text-purple-800'
        };
        return colors[role] || 'bg-gray-100 text-gray-800';
    };

    const formatTimeAgo = (timestamp: string) => {
        const now = new Date();
        const past = new Date(timestamp);
        const diffMs = now.getTime() - past.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) {
            return `${diffMins}m ago`;
        } else if (diffHours < 24) {
            return `${diffHours}h ago`;
        } else {
            return `${diffDays}d ago`;
        }
    };

    const formatDateTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleString('en-ET', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const toggleDetails = (activityId: string) => {
        setShowDetails(showDetails === activityId ? null : activityId);
    };

    const markAsResolved = (activityId: string) => {
        setActivities(prev => prev.map(activity => 
            activity.id === activityId 
                ? { ...activity, status: 'completed' as const }
                : activity
        ));
    };

    return (
        <div className="bg-white rounded-xl shadow">
            {/* Header */}
            <div className="px-6 py-4 border-b">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">Recent Activities</h3>
                        <p className="text-sm text-gray-600">Latest platform events and actions</p>
                    </div>
                    <button className="text-sm text-lime-600 hover:text-lime-700 font-medium">
                        View All →
                    </button>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="px-6 py-3 border-b bg-gray-50">
                <div className="flex space-x-1 overflow-x-auto">
                    {activityTypes.map((type) => (
                        <button
                            key={type.value}
                            onClick={() => setFilter(type.value)}
                            className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                                filter === type.value
                                    ? 'bg-lime-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <span className="mr-2">{type.icon}</span>
                            {type.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Activities List */}
            <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
                {filteredActivities.length === 0 ? (
                    <div className="p-8 text-center">
                        <div className="text-4xl text-gray-300 mb-3">📋</div>
                        <p className="text-gray-500">No activities found</p>
                        <p className="text-sm text-gray-400 mt-1">Activities will appear here as they happen</p>
                    </div>
                ) : (
                    filteredActivities.map((activity) => (
                        <div key={activity.id} className="px-6 py-4 hover:bg-gray-50">
                            <div className="flex items-start">
                                {/* Activity Icon */}
                                <div className="flex-shrink-0 mr-4">
                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg">
                                        {getActivityIcon(activity.type)}
                                    </div>
                                </div>

                                {/* Activity Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-medium text-gray-900">{activity.title}</h4>
                                            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-gray-500">{formatTimeAgo(activity.timestamp)}</div>
                                            <div className="text-xs text-gray-400 mt-1">{formatDateTime(activity.timestamp)}</div>
                                        </div>
                                    </div>

                                    {/* Meta Info */}
                                    <div className="flex items-center mt-3 space-x-3">
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(activity.status)}`}>
                                            {activity.status}
                                        </span>
                                        <span className={`px-2 py-1 rounded text-xs font-medium ${getUserRoleColor(activity.userRole)}`}>
                                            {activity.userRole === 'system' ? 'System' : activity.user.split('@')[0]}
                                        </span>
                                        
                                        {activity.status === 'pending' && activity.userRole === 'system' && (
                                            <button
                                                onClick={() => markAsResolved(activity.id)}
                                                className="text-xs text-green-600 hover:text-green-800 font-medium"
                                            >
                                                Mark as resolved
                                            </button>
                                        )}
                                    </div>

                                    {/* Details Toggle */}
                                    {activity.details && (
                                        <div className="mt-3">
                                            <button
                                                onClick={() => toggleDetails(activity.id)}
                                                className="text-xs text-lime-600 hover:text-lime-700 font-medium flex items-center"
                                            >
                                                {showDetails === activity.id ? 'Hide details' : 'Show details'}
                                                <svg 
                                                    className={`w-3 h-3 ml-1 transition-transform ${
                                                        showDetails === activity.id ? 'rotate-180' : ''
                                                    }`} 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </button>

                                            {/* Details Panel */}
                                            {showDetails === activity.id && activity.details && (
                                                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        {Object.entries(activity.details).map(([key, value]) => (
                                                            <div key={key} className="text-sm">
                                                                <span className="font-medium text-gray-700">{key}:</span>
                                                                <span className="text-gray-600 ml-2">{value}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t bg-gray-50">
                <div className="flex justify-between items-center text-sm text-gray-600">
                    <div>
                        Showing {filteredActivities.length} of {activities.length} activities
                    </div>
                    <div className="flex items-center space-x-2">
                        <button className="p-1 hover:bg-gray-200 rounded">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button className="p-1 hover:bg-gray-200 rounded">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}