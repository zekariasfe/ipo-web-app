// src/services/documentService.ts
import { type Document, type DocumentCategory, type DocumentUpload } from '../types/documents';

// Document categories
export const documentCategories: DocumentCategory[] = [
    {
        type: 'prospectus',
        label: 'IPO Prospectus',
        icon: '📋',
        description: 'Official IPO offering document',
        allowedFormats: ['.pdf'],
        maxSize: 50 // 50MB
    },
    {
        type: 'financial_statement',
        label: 'Financial Statements',
        icon: '📊',
        description: 'Audited financial reports',
        allowedFormats: ['.pdf', '.xlsx', '.xls'],
        maxSize: 30
    },
    {
        type: 'legal_document',
        label: 'Legal Documents',
        icon: '⚖️',
        description: 'Legal agreements and filings',
        allowedFormats: ['.pdf', '.doc', '.docx'],
        maxSize: 20
    },
    {
        type: 'announcement',
        label: 'Announcements',
        icon: '📢',
        description: 'Public announcements and notices',
        allowedFormats: ['.pdf', '.doc', '.docx', '.txt'],
        maxSize: 10
    }
];

// Mock documents
export const mockDocuments: Document[] = [
    {
        id: 'doc-001',
        name: 'Habesha Breweries IPO Prospectus',
        type: 'prospectus',
        fileName: 'habesha_prospectus_v2.pdf',
        fileSize: 25480320, // 25.5MB
        fileType: 'application/pdf',
        uploadDate: '2024-11-15T10:30:00Z',
        uploadedBy: 'admin@wcib.com',
        status: 'published',
        ipoId: 'ipo-001',
        version: 2
    },
    {
        id: 'doc-002',
        name: 'Dashen Bank Financial Statements 2024',
        type: 'financial_statement',
        fileName: 'dashen_financials_2024.xlsx',
        fileSize: 15204300, // 15.2MB
        fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        uploadDate: '2024-11-10T14:20:00Z',
        uploadedBy: 'admin@wcib.com',
        status: 'published',
        ipoId: 'ipo-002',
        version: 1
    },
    {
        id: 'doc-003',
        name: 'Ethio Telecom Legal Agreement',
        type: 'legal_document',
        fileName: 'ethio_telecom_legal.pdf',
        fileSize: 8502400, // 8.5MB
        fileType: 'application/pdf',
        uploadDate: '2024-11-20T09:15:00Z',
        uploadedBy: 'admin2@wcib.com',
        status: 'draft',
        ipoId: 'ipo-003',
        version: 1
    }
];

// Simulate file upload
export const uploadDocument = async (upload: DocumentUpload): Promise<Document> => {
    return new Promise((resolve, reject) => {
        // Validate file
        const category = documentCategories.find(cat => cat.type === upload.type);
        if (!category) {
            reject(new Error('Invalid document type'));
            return;
        }

        // Check file size
        const maxSizeBytes = category.maxSize * 1024 * 1024;
        if (upload.file.size > maxSizeBytes) {
            reject(new Error(`File size exceeds ${category.maxSize}MB limit`));
            return;
        }

        // Check file extension
        const fileExt = '.' + upload.file.name.split('.').pop()?.toLowerCase();
        if (!category.allowedFormats.includes(fileExt)) {
            reject(new Error(`Invalid file format. Allowed: ${category.allowedFormats.join(', ')}`));
            return;
        }

        // Simulate upload delay
        setTimeout(() => {
            const newDocument: Document = {
                id: `doc-${Date.now()}`,
                name: upload.file.name.replace(/\.[^/.]+$/, ""), // Remove extension
                type: upload.type,
                fileName: upload.file.name,
                fileSize: upload.file.size,
                fileType: upload.file.type,
                uploadDate: new Date().toISOString(),
                uploadedBy: 'admin@wcib.com', // In real app, get from auth context
                status: 'draft',
                ipoId: upload.ipoId,
                version: 1
            };
            
            console.log('Document uploaded:', newDocument);
            resolve(newDocument);
        }, 1500);
    });
};

// Get documents by IPO
export const getDocumentsByIPO = (ipoId: string): Document[] => {
    return mockDocuments.filter(doc => doc.ipoId === ipoId);
};

// Format file size
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};