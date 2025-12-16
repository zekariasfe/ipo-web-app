
export interface Document {
    id: string;
    name: string;
    type: 'prospectus' | 'financial_statement' | 'legal_document' | 'announcement' | 'other';
    fileName: string;
    fileSize: number; // in bytes
    fileType: string; // MIME type
    uploadDate: string;
    uploadedBy: string;
    status: 'draft' | 'published' | 'archived';
    ipoId?: string; // If document is linked to an IPO
    downloadUrl?: string;
    version: number;
}

export interface DocumentUpload {
    file: File;
    type: Document['type'];
    ipoId?: string;
    description?: string;
}

export interface DocumentCategory {
    type: Document['type'];
    label: string;
    icon: string;
    description: string;
    allowedFormats: string[];
    maxSize: number; // in MB
}