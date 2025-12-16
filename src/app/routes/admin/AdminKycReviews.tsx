// src/app/routes/admin/AdminKycReviews.tsx
import { useState } from 'react';

interface KYCSubmission {
    id: string;
    userId: string;
    userName: string;
    userEmail: string;
    submittedAt: string;
    status: 'pending' | 'approved' | 'rejected';
    documentCount: number;
    riskLevel: 'low' | 'medium' | 'high';
    details: {
        idType: 'national_id' | 'passport' | 'driving_license';
        idNumber: string;
        dateOfBirth: string;
        address: string;
    };
}

export default function AdminKycReviews() {
    const [submissions, setSubmissions] = useState<KYCSubmission[]>([
        {
            id: 'kyc-001',
            userId: 'user-001',
            userName: 'John Doe',
            userEmail: 'john.doe@email.com',
            submittedAt: '2024-12-15T10:30:00Z',
            status: 'pending',
            documentCount: 3,
            riskLevel: 'low',
            details: {
                idType: 'national_id',
                idNumber: 'ET12345678',
                dateOfBirth: '1990-05-15',
                address: 'Addis Ababa, Ethiopia'
            }
        },
        {
            id: 'kyc-002',
            userId: 'user-002',
            userName: 'Jane Smith',
            userEmail: 'jane.smith@email.com',
            submittedAt: '2024-12-14T14:20:00Z',
            status: 'pending',
            documentCount: 2,
            riskLevel: 'medium',
            details: {
                idType: 'passport',
                idNumber: 'P98765432',
                dateOfBirth: '1985-08-22',
                address: 'Adama, Ethiopia'
            }
        },
        {
            id: 'kyc-003',
            userId: 'user-003',
            userName: 'Michael Johnson',
            userEmail: 'michael@email.com',
            submittedAt: '2024-12-13T09:15:00Z',
            status: 'approved',
            documentCount: 4,
            riskLevel: 'low',
            details: {
                idType: 'national_id',
                idNumber: 'ET87654321',
                dateOfBirth: '1978-11-30',
                address: 'Dire Dawa, Ethiopia'
            }
        },
        {
            id: 'kyc-004',
            userId: 'user-004',
            userName: 'Sarah Williams',
            userEmail: 'sarah@email.com',
            submittedAt: '2024-12-12T16:45:00Z',
            status: 'rejected',
            documentCount: 2,
            riskLevel: 'high',
            details: {
                idType: 'driving_license',
                idNumber: 'DL45678901',
                dateOfBirth: '1992-03-10',
                address: 'Bahir Dar, Ethiopia'
            }
        }
    ]);

    const [filter, setFilter] = useState<string>('all');
    const [selectedSubmission, setSelectedSubmission] = useState<KYCSubmission | null>(null);
    const [reviewNote, setReviewNote] = useState('');

    const filteredSubmissions = filter === 'all' 
        ? submissions 
        : submissions.filter(sub => sub.status === filter);

    const handleApprove = (id: string) => {
        setSubmissions(prev => prev.map(sub => 
            sub.id === id ? { ...sub, status: 'approved' as const } : sub
        ));
        alert('KYC approved successfully!');
        setSelectedSubmission(null);
    };

    const handleReject = (id: string) => {
        if (!reviewNote.trim()) {
            alert('Please provide a rejection reason');
            return;
        }
        setSubmissions(prev => prev.map(sub => 
            sub.id === id ? { ...sub, status: 'rejected' as const } : sub
        ));
        alert('KYC rejected with note');
        setSelectedSubmission(null);
        setReviewNote('');
    };

    const getStatusBadge = (status: KYCSubmission['status']) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
                {status.toUpperCase()}
            </span>
        );
    };

    const getRiskBadge = (risk: KYCSubmission['riskLevel']) => {
        const styles = {
            low: 'bg-green-100 text-green-800',
            medium: 'bg-yellow-100 text-yellow-800',
            high: 'bg-red-100 text-red-800'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[risk]}`}>
                {risk.toUpperCase()}
            </span>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-ET', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const pendingCount = submissions.filter(s => s.status === 'pending').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">KYC Reviews</h2>
                    <p className="text-gray-600">Review and verify customer identity submissions</p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="text-right">
                        <p className="text-sm text-gray-600">Pending Reviews</p>
                        <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow p-4">
                    <p className="text-sm text-gray-600">Total Submissions</p>
                    <p className="text-2xl font-bold text-gray-900">{submissions.length}</p>
                </div>
                <div className="bg-white rounded-xl shadow p-4">
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-amber-600">
                        {submissions.filter(s => s.status === 'pending').length}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow p-4">
                    <p className="text-sm text-gray-600">Approved</p>
                    <p className="text-2xl font-bold text-green-600">
                        {submissions.filter(s => s.status === 'approved').length}
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow p-4">
                    <p className="text-sm text-gray-600">Rejected</p>
                    <p className="text-2xl font-bold text-red-600">
                        {submissions.filter(s => s.status === 'rejected').length}
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow p-4">
                <div className="flex space-x-2">
                    {['all', 'pending', 'approved', 'rejected'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                filter === status
                                    ? 'bg-lime-600 text-white'
                                    : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Submissions Table */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documents</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Risk Level</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredSubmissions.map((submission) => (
                                <tr key={submission.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-gray-900">{submission.userName}</p>
                                            <p className="text-sm text-gray-500">{submission.userEmail}</p>
                                            <p className="text-xs text-gray-400">ID: {submission.details.idNumber}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            {formatDate(submission.submittedAt)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-center">
                                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                                {submission.documentCount} docs
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getRiskBadge(submission.riskLevel)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(submission.status)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => setSelectedSubmission(submission)}
                                                className="px-3 py-1 text-sm bg-lime-100 text-lime-700 rounded-lg hover:bg-lime-200"
                                            >
                                                Review
                                            </button>
                                            {submission.status === 'pending' && (
                                                <>
                                                    <button
                                                        onClick={() => handleApprove(submission.id)}
                                                        className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedSubmission(submission);
                                                            setReviewNote('');
                                                        }}
                                                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Review Modal */}
            {selectedSubmission && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="px-6 py-4 border-b flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">KYC Review - {selectedSubmission.userName}</h3>
                                <p className="text-sm text-gray-600">{selectedSubmission.userEmail}</p>
                            </div>
                            <button
                                onClick={() => setSelectedSubmission(null)}
                                className="text-gray-400 hover:text-gray-600 text-xl"
                            >
                                ×
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* User Information */}
                            <div>
                                <h4 className="font-medium text-gray-800 mb-3">User Information</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Full Name</p>
                                        <p className="font-medium">{selectedSubmission.userName}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="font-medium">{selectedSubmission.userEmail}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">ID Type</p>
                                        <p className="font-medium">{selectedSubmission.details.idType.replace('_', ' ').toUpperCase()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">ID Number</p>
                                        <p className="font-medium">{selectedSubmission.details.idNumber}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Date of Birth</p>
                                        <p className="font-medium">{selectedSubmission.details.dateOfBirth}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Address</p>
                                        <p className="font-medium">{selectedSubmission.details.address}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Documents */}
                            <div>
                                <h4 className="font-medium text-gray-800 mb-3">Submitted Documents ({selectedSubmission.documentCount})</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-3">
                                                📄
                                            </div>
                                            <div>
                                                <p className="font-medium">National ID Card</p>
                                                <p className="text-sm text-gray-600">Front & Back copies</p>
                                            </div>
                                        </div>
                                        <button className="text-lime-600 hover:text-lime-700 text-sm">
                                            View
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mr-3">
                                                📄
                                            </div>
                                            <div>
                                                <p className="font-medium">Proof of Address</p>
                                                <p className="text-sm text-gray-600">Utility bill or bank statement</p>
                                            </div>
                                        </div>
                                        <button className="text-lime-600 hover:text-lime-700 text-sm">
                                            View
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Risk Assessment */}
                            <div>
                                <h4 className="font-medium text-gray-800 mb-3">Risk Assessment</h4>
                                <div className={`p-4 rounded-lg ${
                                    selectedSubmission.riskLevel === 'low' ? 'bg-green-50 border border-green-200' :
                                    selectedSubmission.riskLevel === 'medium' ? 'bg-yellow-50 border border-yellow-200' :
                                    'bg-red-50 border border-red-200'
                                }`}>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium">Risk Level: {selectedSubmission.riskLevel.toUpperCase()}</p>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {selectedSubmission.riskLevel === 'low' && 'Low risk - Standard verification required'}
                                                {selectedSubmission.riskLevel === 'medium' && 'Medium risk - Additional verification recommended'}
                                                {selectedSubmission.riskLevel === 'high' && 'High risk - Manual review required'}
                                            </p>
                                        </div>
                                        {getRiskBadge(selectedSubmission.riskLevel)}
                                    </div>
                                </div>
                            </div>

                            {/* Review Actions */}
                            {selectedSubmission.status === 'pending' && (
                                <div>
                                    <h4 className="font-medium text-gray-800 mb-3">Review Decision</h4>
                                    
                                    {/* Rejection Note */}
                                    <div className="mb-4">
                                        <label className="block text-sm text-gray-700 mb-2">
                                            Rejection Note (if rejecting)
                                        </label>
                                        <textarea
                                            value={reviewNote}
                                            onChange={(e) => setReviewNote(e.target.value)}
                                            placeholder="Provide reason for rejection..."
                                            className="w-full p-3 border border-gray-300 rounded-lg"
                                            rows={3}
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => handleApprove(selectedSubmission.id)}
                                            className="flex-1 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                                        >
                                            ✅ Approve KYC
                                        </button>
                                        <button
                                            onClick={() => handleReject(selectedSubmission.id)}
                                            disabled={!reviewNote.trim()}
                                            className={`flex-1 py-3 rounded-lg font-medium ${
                                                reviewNote.trim()
                                                    ? 'bg-red-600 text-white hover:bg-red-700'
                                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                            }`}
                                        >
                                            ❌ Reject KYC
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}