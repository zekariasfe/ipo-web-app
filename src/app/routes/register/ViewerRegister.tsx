// src/app/routes/register/ViewerRegister.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ViewerRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Basic Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '', // 'compliance', 'audit', 'regulator', 'management'
    
    // Organization Details
    organizationType: '', // 'internal', 'external'
    organizationName: '',
    position: '',
    
    // Access Requirements
    viewReports: true,
    viewAuditLogs: false,
    viewClientData: false,
    viewTransactionData: false,
    
    // Purpose
    purpose: '',
    duration: '', // 'temporary', 'permanent'
    endDate: '',
    
    // Security
    password: '',
    confirmPassword: '',
    
    // Approval
    approverName: '',
    approverEmail: '',
    
    // Terms
    agreeConfidentiality: false,
    agreeReadOnly: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (!formData.purpose) {
      alert('Please specify the purpose of access');
      return;
    }
    
    console.log('Registering view-only user:', formData);
    
    try {
      alert('View-only access request submitted for approval!');
      navigate('/login');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-500 to-gray-700 rounded-2xl mb-4">
              <span className="text-2xl text-white">👁️</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              View-Only Access Registration
            </h1>
            <p className="text-gray-600">
              Request read-only access for compliance, audit, or monitoring purposes
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal & Organization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Type *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  value={formData.organizationType}
                  onChange={(e) => setFormData({...formData, organizationType: e.target.value})}
                >
                  <option value="">Select type</option>
                  <option value="internal">WCIB Internal</option>
                  <option value="external">External Organization</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Organization Name *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  value={formData.organizationName}
                  onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                />
              </div>
            </div>

            {/* Access Scope */}
            <div className="border border-gray-300 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Requested Access Scope</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-800">View Reports</p>
                    <p className="text-sm text-gray-600">System and financial reports</p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-6 h-6 text-gray-600 rounded"
                    checked={formData.viewReports}
                    onChange={(e) => setFormData({...formData, viewReports: e.target.checked})}
                  />
                </label>
                
                <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-800">View Audit Logs</p>
                    <p className="text-sm text-gray-600">System activity and user logs</p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-6 h-6 text-gray-600 rounded"
                    checked={formData.viewAuditLogs}
                    onChange={(e) => setFormData({...formData, viewAuditLogs: e.target.checked})}
                  />
                </label>
                
                <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-800">View Client Data</p>
                    <p className="text-sm text-gray-600">Client profiles and KYC information</p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-6 h-6 text-gray-600 rounded"
                    checked={formData.viewClientData}
                    onChange={(e) => setFormData({...formData, viewClientData: e.target.checked})}
                  />
                </label>
              </div>
            </div>

            {/* Purpose & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Purpose *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  value={formData.purpose}
                  onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                >
                  <option value="">Select purpose</option>
                  <option value="compliance">Compliance Review</option>
                  <option value="audit">Internal Audit</option>
                  <option value="regulatory">Regulatory Inspection</option>
                  <option value="monitoring">System Monitoring</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Duration *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                >
                  <option value="">Select duration</option>
                  <option value="temporary">Temporary (Specify end date)</option>
                  <option value="permanent">Permanent</option>
                </select>
              </div>
              
              {formData.duration === 'temporary' && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Access End Date *
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              )}
            </div>

            {/* Confidentiality Agreement */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-blue-800 mb-4">📋 Confidentiality Agreement</h3>
              <div className="space-y-4">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    required
                    className="w-5 h-5 mt-1 text-blue-600 rounded"
                    checked={formData.agreeConfidentiality}
                    onChange={(e) => setFormData({...formData, agreeConfidentiality: e.target.checked})}
                  />
                  <span className="text-blue-700">
                    I agree to maintain strict confidentiality of all information accessed through 
                    this view-only account. I will not copy, distribute, or disclose any information 
                    to unauthorized parties.
                  </span>
                </label>
                
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    required
                    className="w-5 h-5 mt-1 text-blue-600 rounded"
                    checked={formData.agreeReadOnly}
                    onChange={(e) => setFormData({...formData, agreeReadOnly: e.target.checked})}
                  />
                  <span className="text-blue-700">
                    I understand that this is a read-only account. I will not attempt to modify, 
                    delete, or alter any data in the system. All actions are logged and monitored.
                  </span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-bold rounded-lg hover:from-gray-700 hover:to-gray-900"
            >
              Request View-Only Access
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}