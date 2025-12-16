// src/features/admin/components/DocumentTable.tsx
import { type Document } from '../../../types/documents';
import { formatFileSize } from '../../../services/documentService';

interface DocumentTableProps {
    documents: Document[];
    onDelete?: (documentId: string) => void;
    onPublish?: (documentId: string) => void;
    onDownload?: (documentId: string) => void;
}

export default function DocumentTable({ 
    documents, 
    onDelete, 
    onPublish, 
    onDownload 
}: DocumentTableProps) {
    
    const getTypeBadge = (type: Document['type']) => {
        const typeConfig = {
            prospectus: { label: 'Prospectus', color: 'bg-blue-100 text-blue-800', icon: '📋' },
            financial_statement: { label: 'Financial', color: 'bg-green-100 text-green-800', icon: '📊' },
            legal_document: { label: 'Legal', color: 'bg-purple-100 text-purple-800', icon: '⚖️' },
            announcement: { label: 'Announcement', color: 'bg-amber-100 text-amber-800', icon: '📢' },
            other: { label: 'Other', color: 'bg-gray-100 text-gray-800', icon: '📄' }
        };
        
        const config = typeConfig[type] || typeConfig.other;
        return (
            <div className="flex items-center">
                <span className="mr-1">{config.icon}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${config.color}`}>
                    {config.label}
                </span>
            </div>
        );
    };

    const getStatusBadge = (status: Document['status']) => {
        const statusConfig = {
            published: { label: 'Published', color: 'bg-green-100 text-green-800', icon: '✅' },
            draft: { label: 'Draft', color: 'bg-yellow-100 text-yellow-800', icon: '✏️' },
            archived: { label: 'Archived', color: 'bg-gray-100 text-gray-800', icon: '📁' }
        };
        
        const config = statusConfig[status] || statusConfig.draft;
        return (
            <div className="flex items-center">
                <span className="mr-1">{config.icon}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${config.color}`}>
                    {config.label}
                </span>
            </div>
        );
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-ET', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Document
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Type
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                IPO
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Size
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Upload Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {documents.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center">
                                    <div className="text-gray-400">
                                        <div className="text-4xl mb-2">📄</div>
                                        <p className="text-lg">No documents found</p>
                                        <p className="text-sm">Upload your first document to get started</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            documents.map((doc) => (
                                <tr key={doc.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-medium text-gray-900">{doc.name}</div>
                                            <div className="text-sm text-gray-500">
                                                {doc.fileName}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">
                                                Version: {doc.version} • Uploaded by: {doc.uploadedBy}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getTypeBadge(doc.type)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {doc.ipoId ? (
                                            <span className="px-3 py-1 bg-lime-100 text-lime-800 rounded-full text-xs font-medium">
                                                {doc.ipoId.toUpperCase()}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">—</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900">
                                            {formatFileSize(doc.fileSize)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">
                                            {formatDate(doc.uploadDate)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(doc.status)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            {/* Download Button */}
                                            <button
                                                onClick={() => onDownload?.(doc.id)}
                                                className="text-lime-600 hover:text-lime-800"
                                                title="Download"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                            </button>
                                            
                                            {/* Publish/Edit Button */}
                                            {doc.status === 'draft' && (
                                                <button
                                                    onClick={() => onPublish?.(doc.id)}
                                                    className="text-green-600 hover:text-green-800"
                                                    title="Publish"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </button>
                                            )}
                                            
                                            {/* Edit Button for published docs */}
                                            {doc.status === 'published' && (
                                                <button
                                                    onClick={() => onPublish?.(doc.id)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                    title="Edit"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                            )}
                                            
                                            {/* Delete Button */}
                                            <button
                                                onClick={() => onDelete?.(doc.id)}
                                                className="text-red-600 hover:text-red-800"
                                                title="Delete"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination (Optional) */}
            {documents.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">{Math.min(documents.length, 10)}</span> of{' '}
                            <span className="font-medium">{documents.length}</span> documents
                        </div>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
                                Previous
                            </button>
                            <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}