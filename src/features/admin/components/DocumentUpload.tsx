
import { useState, useRef } from 'react';
import { type DocumentUpload, type DocumentCategory } from '../../../types/documents';
import { uploadDocument, documentCategories, formatFileSize } from '../../../services/documentService';

interface DocumentUploadProps {
    ipoId?: string;
    onUploadSuccess?: (document: any) => void;
    onUploadError?: (error: string) => void;
}

export default function DocumentUpload({ ipoId, onUploadSuccess, onUploadError }: DocumentUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [selectedType, setSelectedType] = useState<DocumentCategory['type']>('prospectus');
    const [description, setDescription] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            // Auto-set name from filename
            if (!description) {
                setDescription(file.name.replace(/\.[^/.]+$/, "").replace(/_/g, ' '));
            }
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file first');
            return;
        }

        setUploading(true);
        setUploadProgress(0);

        // Simulate progress
        const progressInterval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 90) {
                    clearInterval(progressInterval);
                    return 90;
                }
                return prev + 10;
            });
        }, 200);

        try {
            const upload: DocumentUpload = {
                file: selectedFile,
                type: selectedType,
                ipoId,
                description: description || undefined
            };

            const document = await uploadDocument(upload);
            
            clearInterval(progressInterval);
            setUploadProgress(100);
            
            setTimeout(() => {
                setUploading(false);
                setSelectedFile(null);
                setDescription('');
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
                
                if (onUploadSuccess) {
                    onUploadSuccess(document);
                }
                
                alert('✅ Document uploaded successfully!');
            }, 500);

        } catch (error) {
            clearInterval(progressInterval);
            setUploading(false);
            
            const errorMessage = error instanceof Error ? error.message : 'Upload failed';
            alert(`❌ ${errorMessage}`);
            
            if (onUploadError) {
                onUploadError(errorMessage);
            }
        }
    };

    const selectedCategory = documentCategories.find(cat => cat.type === selectedType);

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Document</h3>
            
            {/* Document Type Selection */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Type
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {documentCategories.map((category) => (
                        <button
                            key={category.type}
                            type="button"
                            onClick={() => setSelectedType(category.type)}
                            className={`p-4 rounded-lg border-2 transition-all ${
                                selectedType === category.type
                                    ? 'border-lime-500 bg-lime-50'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <div className="text-2xl mb-2">{category.icon}</div>
                            <div className="text-sm font-medium text-gray-800">{category.label}</div>
                            <div className="text-xs text-gray-500 mt-1">{category.description}</div>
                        </button>
                    ))}
                </div>
            </div>

            {/* File Upload Area */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select File
                </label>
                
                {selectedCategory && (
                    <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <span className="font-medium">Allowed formats:</span> {selectedCategory.allowedFormats.join(', ')}
                            <br/>
                            <span className="font-medium">Max size:</span> {selectedCategory.maxSize}MB
                        </p>
                    </div>
                )}

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-lime-400 transition-colors">
                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileSelect}
                        className="hidden"
                        accept={selectedCategory?.allowedFormats.join(',')}
                        disabled={uploading}
                    />
                    
                    {selectedFile ? (
                        <div className="space-y-3">
                            <div className="text-green-600 text-3xl">📄</div>
                            <div>
                                <p className="font-medium text-gray-900">{selectedFile.name}</p>
                                <p className="text-sm text-gray-500">
                                    {formatFileSize(selectedFile.size)} • {selectedFile.type}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="text-sm text-lime-600 hover:text-lime-700"
                                disabled={uploading}
                            >
                                Choose different file
                            </button>
                        </div>
                    ) : (
                        <div 
                            className="cursor-pointer"
                            onClick={() => !uploading && fileInputRef.current?.click()}
                        >
                            <div className="text-gray-400 text-4xl mb-3">📎</div>
                            <p className="text-gray-600">
                                <span className="text-lime-600 font-medium">Click to browse</span> or drag and drop
                            </p>
                            <p className="text-sm text-gray-500 mt-2">
                                {selectedCategory?.allowedFormats.join(', ')} up to {selectedCategory?.maxSize}MB
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Description */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Description
                </label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter a descriptive name for this document"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500"
                    disabled={uploading}
                />
            </div>

            {/* Upload Progress */}
            {uploading && (
                <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                            className="bg-lime-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                </div>
            )}

            {/* Upload Button */}
            <button
                onClick={handleUpload}
                disabled={!selectedFile || uploading}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    selectedFile && !uploading
                        ? 'bg-lime-600 text-white hover:bg-lime-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
            >
                {uploading ? (
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Uploading...
                    </div>
                ) : (
                    'Upload Document'
                )}
            </button>
        </div>
    );
}