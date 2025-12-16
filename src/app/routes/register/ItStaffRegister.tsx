// src/app/routes/register/ItStaffRegister.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ItStaffRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Basic Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    employeeId: '',
    department: '', // 'infrastructure', 'development', 'security', 'support'
    
    // Technical Information
    technicalRole: '', // 'sysadmin', 'developer', 'dba', 'security'
    expertise: [] as string[],
    yearsExperience: '',
    
    // Access Requirements
    requireServerAccess: false,
    requireDatabaseAccess: false,
    requireApiAccess: false,
    requireAdminPanelAccess: false,
    
    // Security
    password: '',
    confirmPassword: '',
    
    // Approval
    supervisorName: '',
    supervisorEmail: '',
    justification: '',
    
    // Terms
    agreeSecurityPolicy: false,
    agreeAuditCompliance: false,
  });

  const technicalExpertiseOptions = [
    'React/TypeScript', 'Node.js', 'Python', 'Java', 'PostgreSQL', 'MongoDB',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'Security', 'Networking'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    if (!formData.justification) {
      alert('Please provide justification for system access');
      return;
    }
    
    console.log('Registering IT staff:', formData);
    
    try {
      alert('IT staff registration submitted for security review!');
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl mb-4">
              <span className="text-2xl text-white">⚙️</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              IT Staff Registration
            </h1>
            <p className="text-gray-600">
              Register for technical system access (Requires Security Approval)
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
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
                  Employee ID *
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department *
                </label>
                <select
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                >
                  <option value="">Select department</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="development">Development</option>
                  <option value="security">Security</option>
                  <option value="support">Support</option>
                </select>
              </div>
            </div>

            {/* Technical Expertise */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technical Expertise *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {technicalExpertiseOptions.map((skill) => (
                  <label key={skill} className="flex items-center space-x-2 p-2 border rounded-lg hover:bg-gray-50">
                    <input
                      type="checkbox"
                      value={skill}
                      checked={formData.expertise.includes(skill)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({...formData, expertise: [...formData.expertise, skill]});
                        } else {
                          setFormData({...formData, expertise: formData.expertise.filter(s => s !== skill)});
                        }
                      }}
                      className="w-4 h-4 text-purple-600 rounded"
                    />
                    <span className="text-sm text-gray-700">{skill}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Access Requirements */}
            <div className="border border-gray-300 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-4">System Access Requirements</h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-800">Server Access</p>
                    <p className="text-sm text-gray-600">Access to production servers</p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-6 h-6 text-purple-600 rounded"
                    checked={formData.requireServerAccess}
                    onChange={(e) => setFormData({...formData, requireServerAccess: e.target.checked})}
                  />
                </label>
                
                <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-800">Database Access</p>
                    <p className="text-sm text-gray-600">Direct database access</p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-6 h-6 text-purple-600 rounded"
                    checked={formData.requireDatabaseAccess}
                    onChange={(e) => setFormData({...formData, requireDatabaseAccess: e.target.checked})}
                  />
                </label>
                
                <label className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-800">API Access</p>
                    <p className="text-sm text-gray-600">API keys and endpoints</p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-6 h-6 text-purple-600 rounded"
                    checked={formData.requireApiAccess}
                    onChange={(e) => setFormData({...formData, requireApiAccess: e.target.checked})}
                  />
                </label>
              </div>
            </div>

            {/* Justification */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Justification for Access *
              </label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                value={formData.justification}
                onChange={(e) => setFormData({...formData, justification: e.target.value})}
                placeholder="Explain why you need system access and what tasks you'll perform..."
              />
            </div>

            {/* Security Terms */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="font-semibold text-red-800 mb-4">⚠️ Security Acknowledgement</h3>
              <div className="space-y-4">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    required
                    className="w-5 h-5 mt-1 text-red-600 rounded"
                    checked={formData.agreeSecurityPolicy}
                    onChange={(e) => setFormData({...formData, agreeSecurityPolicy: e.target.checked})}
                  />
                  <span className="text-red-700">
                    I acknowledge that I have read and will comply with the WCIB Security Policy. 
                    Unauthorized access or misuse will result in immediate termination and legal action.
                  </span>
                </label>
                
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    required
                    className="w-5 h-5 mt-1 text-red-600 rounded"
                    checked={formData.agreeAuditCompliance}
                    onChange={(e) => setFormData({...formData, agreeAuditCompliance: e.target.checked})}
                  />
                  <span className="text-red-700">
                    I understand that all my actions will be logged and audited. 
                    I will not share credentials or attempt to bypass security controls.
                  </span>
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold rounded-lg hover:from-purple-600 hover:to-purple-800"
            >
              Submit for Security Approval
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}