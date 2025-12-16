// src/app/routes/register/BrokerageRegister.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BrokerageRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Basic Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Brokerage Information
    brokerageName: '',
    brokerageLicense: '',
    position: '', // 'advisor', 'manager', 'compliance', 'operations'
    employeeId: '',
    
    // Contact Information
    officeAddress: '',
    officePhone: '',
    supervisorName: '',
    supervisorEmail: '',
    
    // Permissions
    canManageClients: true,
    canPlaceOrders: true,
    canViewReports: true,
    canApproveKyc: false,
    
    // Terms
    agreeTerms: false,
    agreeConfidentiality: false,
    agreeCompliance: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // API call would go here
    console.log('Registering brokerage staff:', formData);
    
    try {
      alert('Brokerage registration submitted for approval!');
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-2xl mb-4">
              <span className="text-2xl text-white">💼</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Brokerage Staff Registration
            </h1>
            <p className="text-gray-600">
              Register as authorized brokerage personnel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
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
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Brokerage Information */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Brokerage Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brokerage Firm Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    value={formData.brokerageName}
                    onChange={(e) => setFormData({...formData, brokerageName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brokerage License Number *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    value={formData.brokerageLicense}
                    onChange={(e) => setFormData({...formData, brokerageLicense: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Position *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    value={formData.position}
                    onChange={(e) => setFormData({...formData, position: e.target.value})}
                  >
                    <option value="">Select position</option>
                    <option value="advisor">Investment Advisor</option>
                    <option value="manager">Branch Manager</option>
                    <option value="compliance">Compliance Officer</option>
                    <option value="operations">Operations Staff</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Access Permissions</h2>
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.canManageClients}
                    onChange={(e) => setFormData({...formData, canManageClients: e.target.checked})}
                    className="w-5 h-5 text-green-600 rounded"
                  />
                  <span className="text-gray-700">Manage Client Accounts</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.canPlaceOrders}
                    onChange={(e) => setFormData({...formData, canPlaceOrders: e.target.checked})}
                    className="w-5 h-5 text-green-600 rounded"
                  />
                  <span className="text-gray-700">Place Orders for Clients</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.canViewReports}
                    onChange={(e) => setFormData({...formData, canViewReports: e.target.checked})}
                    className="w-5 h-5 text-green-600 rounded"
                  />
                  <span className="text-gray-700">View Client Reports</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={formData.canApproveKyc}
                    onChange={(e) => setFormData({...formData, canApproveKyc: e.target.checked})}
                    className="w-5 h-5 text-green-600 rounded"
                  />
                  <span className="text-gray-700">Approve KYC Applications (Manager Only)</span>
                </label>
              </div>
            </div>

            {/* Password */}
            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Security</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Terms */}
            <div className="space-y-4">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  required
                  className="w-5 h-5 mt-1 text-green-600 rounded"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                />
                <span className="text-gray-700">
                  I agree to the Terms of Service and acknowledge that I am an authorized representative of {formData.brokerageName || 'my brokerage firm'} *
                </span>
              </label>
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  required
                  className="w-5 h-5 mt-1 text-green-600 rounded"
                  checked={formData.agreeConfidentiality}
                  onChange={(e) => setFormData({...formData, agreeConfidentiality: e.target.checked})}
                />
                <span className="text-gray-700">
                  I agree to maintain client confidentiality as per Ethiopian financial regulations *
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold rounded-lg hover:from-green-600 hover:to-green-800"
            >
              Register Brokerage Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}