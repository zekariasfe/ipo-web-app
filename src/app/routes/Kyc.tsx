// src/app/routes/Kyc.tsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Kyc() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [kycData, setKycData] = useState({
        fullName: '',
        idNumber: '',
        idType: 'national_id' as 'national_id' | 'passport' | 'driving_license',
        dateOfBirth: '',
    });
    const { user, updateKycStatus, completeKycVerification, isKycVerified } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    
    // Get message from URL query params
    const queryParams = new URLSearchParams(location.search);
    const message = queryParams.get('message');

    // Handle form input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setKycData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            // 1. Update status to pending (simulating API call)
            updateKycStatus('pending');
            
            // 2. Simulate KYC verification process
            await completeKycVerification();
            
            // 3. Show success and redirect
            alert('✅ KYC verification successful! You can now access IPOs.');
            navigate('/ipos');
        } catch (error) {
            alert('KYC verification failed. Please try again.');
            updateKycStatus('rejected');
        } finally {
            setIsSubmitting(false);
        }
    };

    // If already verified, show success message
    if (isKycVerified) {
        return (
            <div className="max-w-2xl mx-auto">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-3xl">✅</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">KYC Verified</h2>
                    <p className="text-gray-600 mb-6">
                        Your identity verification is complete and approved.
                    </p>
                    <div className="space-y-4">
                        <button
                            onClick={() => navigate('/ipos')}
                            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                        >
                            Browse Available IPOs
                        </button>
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-lg">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">KYC Verification</h2>
                    <p className="text-gray-600 mt-2">
                        Complete your identity verification to participate in IPO subscriptions.
                    </p>
                    
                    {message && (
                        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                            <p className="text-amber-800">{message}</p>
                        </div>
                    )}
                </div>

                {/* KYC Status Indicator */}
                {user?.kycStatus && user.kycStatus !== 'not_started' && (
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Verification Status</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                user.kycStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                user.kycStatus === 'verified' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                                {user.kycStatus.toUpperCase()}
                            </span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full ${
                                user.kycStatus === 'verified' ? 'w-full bg-green-500' :
                                user.kycStatus === 'pending' ? 'w-2/3 bg-yellow-500' :
                                'w-1/3 bg-red-500'
                            }`}></div>
                        </div>
                    </div>
                )}

                {/* KYC Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={kycData.fullName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="As per official document"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ID Type
                            </label>
                            <select
                                name="idType"
                                value={kycData.idType}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="national_id">National ID</option>
                                <option value="passport">Passport</option>
                                <option value="driving_license">Driving License</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                ID Number
                            </label>
                            <input
                                type="text"
                                name="idNumber"
                                value={kycData.idNumber}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your ID number"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={kycData.dateOfBirth}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-medium text-blue-800 mb-2">📋 Verification Requirements</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                            <li>• Name must match your Telebirr registered account</li>
                            <li>• ID must be valid and not expired</li>
                            <li>• Verification usually takes 24-48 hours</li>
                            <li>• You'll be notified once verification is complete</li>
                        </ul>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                Processing Verification...
                            </>
                        ) : (
                            'Submit KYC Verification'
                        )}
                    </button>

                    {/* Note */}
                    <p className="text-sm text-gray-500 text-center">
                        By submitting, you agree to WCIB's terms and conditions. 
                        Your data is securely processed and encrypted.
                    </p>
                </form>
            </div>
        </div>
    );
}