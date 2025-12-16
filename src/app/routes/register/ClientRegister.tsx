// src/app/routes/register/ClientRegister.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ClientRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    accountType: 'individual', // 'individual' or 'corporate'
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Step 2: Contact Information
    address: '',
    city: '',
    subCity: '',
    woreda: '',
    houseNumber: '',
    postalCode: '',
    
    // Step 3: Investment Profile
    investmentExperience: '', // 'beginner', 'intermediate', 'advanced'
    annualIncome: '',
    sourceOfFunds: '', // 'salary', 'business', 'inheritance', 'other'
    riskTolerance: '', // 'conservative', 'moderate', 'aggressive'
    investmentObjective: '', // 'capital_growth', 'income', 'preservation'
    
    // Terms
    agreeTerms: false,
    agreeDataPolicy: false,
    agreeRiskDisclosure: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // In production: API call to register user
    console.log('Registering client:', formData);
    
    // Simulate API call
    try {
      // This would be your actual registration API call
      // const response = await api.registerClient(formData);
      
      // For now, simulate success
      alert('Registration successful! Please check your email to verify your account.');
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {['Account Type', 'Personal Info', 'Investment Profile', 'Complete'].map((label, index) => (
              <div key={label} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step > index + 1 
                    ? 'bg-green-500 text-white' 
                    : step === index + 1 
                    ? 'bg-lime-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > index + 1 ? '✓' : index + 1}
                </div>
                <span className={`text-sm ${step === index + 1 ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-lime-500 to-lime-700 transition-all duration-300"
              style={{ width: `${(step - 1) * 33.33}%` }}
            ></div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Investor Account Registration
            </h1>
            <p className="text-gray-600">
              Create your WCIB account to start investing in Ethiopian IPOs
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Account Type */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Select Account Type</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Individual Account */}
                  <div 
                    onClick={() => setFormData({...formData, accountType: 'individual'})}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.accountType === 'individual' 
                        ? 'border-lime-500 bg-lime-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.accountType === 'individual' 
                          ? 'border-lime-500 bg-lime-500' 
                          : 'border-gray-400'
                      }`}>
                        {formData.accountType === 'individual' && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold">Individual Investor</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      For personal investment accounts. Requires personal identification and tax information.
                    </p>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-center">
                        <span className="mr-2 text-green-500">✓</span>
                        Minimum investment: ETB 5,000
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-green-500">✓</span>
                        Personal tax identification required
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-green-500">✓</span>
                        Single account ownership
                      </li>
                    </ul>
                  </div>

                  {/* Corporate Account */}
                  <div 
                    onClick={() => setFormData({...formData, accountType: 'corporate'})}
                    className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.accountType === 'corporate' 
                        ? 'border-lime-500 bg-lime-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.accountType === 'corporate' 
                          ? 'border-lime-500 bg-lime-500' 
                          : 'border-gray-400'
                      }`}>
                        {formData.accountType === 'corporate' && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold">Corporate Investor</h3>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      For companies, institutions, and organizations. Requires company registration documents.
                    </p>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-center">
                        <span className="mr-2 text-green-500">✓</span>
                        Minimum investment: ETB 50,000
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-green-500">✓</span>
                        Company registration documents
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-green-500">✓</span>
                        Multiple authorized signatories
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Account Type Warning */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <span className="text-blue-500 mr-3">ℹ️</span>
                    <div>
                      <p className="text-blue-800 font-medium">Important Information</p>
                      <p className="text-blue-700 text-sm mt-1">
                        {formData.accountType === 'individual' 
                          ? 'Individual accounts require a valid Ethiopian ID or Passport. Foreign investors require additional documentation.'
                          : 'Corporate accounts require Certificate of Incorporation, Memorandum & Articles, Board Resolution, and Tax Identification Certificate.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Personal Information */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      placeholder="Enter first name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      placeholder="Enter last name"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="flex">
                      <div className="px-4 py-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-700">
                        +251
                      </div>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                        placeholder="911 23 45 67"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password *
                    </label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      placeholder="At least 8 characters"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                      placeholder="Re-enter password"
                    />
                  </div>
                </div>
                
                {/* Password Requirements */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
                  <ul className="text-sm text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-1">
                    <li className={`flex items-center ${formData.password.length >= 8 ? 'text-green-600' : ''}`}>
                      <span className="mr-2">{formData.password.length >= 8 ? '✓' : '○'}</span>
                      At least 8 characters
                    </li>
                    <li className={`flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-600' : ''}`}>
                      <span className="mr-2">{/[A-Z]/.test(formData.password) ? '✓' : '○'}</span>
                      One uppercase letter
                    </li>
                    <li className={`flex items-center ${/[0-9]/.test(formData.password) ? 'text-green-600' : ''}`}>
                      <span className="mr-2">{/[0-9]/.test(formData.password) ? '✓' : '○'}</span>
                      One number
                    </li>
                    <li className={`flex items-center ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-600' : ''}`}>
                      <span className="mr-2">{/[^A-Za-z0-9]/.test(formData.password) ? '✓' : '○'}</span>
                      One special character
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Step 3: Investment Profile */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Investment Profile</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Experience *
                    </label>
                    <select
                      required
                      value={formData.investmentExperience}
                      onChange={(e) => setFormData({...formData, investmentExperience: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    >
                      <option value="">Select experience level</option>
                      <option value="beginner">Beginner (0-2 years)</option>
                      <option value="intermediate">Intermediate (2-5 years)</option>
                      <option value="advanced">Advanced (5+ years)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Income (ETB) *
                    </label>
                    <select
                      required
                      value={formData.annualIncome}
                      onChange={(e) => setFormData({...formData, annualIncome: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    >
                      <option value="">Select income range</option>
                      <option value="0-200000">Below 200,000 ETB</option>
                      <option value="200000-500000">200,000 - 500,000 ETB</option>
                      <option value="500000-1000000">500,000 - 1,000,000 ETB</option>
                      <option value="1000000+">Above 1,000,000 ETB</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Source of Investment Funds *
                    </label>
                    <select
                      required
                      value={formData.sourceOfFunds}
                      onChange={(e) => setFormData({...formData, sourceOfFunds: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-transparent"
                    >
                      <option value="">Select primary source</option>
                      <option value="salary">Employment Salary</option>
                      <option value="business">Business Income</option>
                      <option value="savings">Personal Savings</option>
                      <option value="inheritance">Inheritance/Gift</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Risk Tolerance *
                    </label>
                    <div className="space-y-3">
                      {['conservative', 'moderate', 'aggressive'].map((level) => (
                        <label key={level} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="riskTolerance"
                            value={level}
                            checked={formData.riskTolerance === level}
                            onChange={(e) => setFormData({...formData, riskTolerance: e.target.value})}
                            className="w-5 h-5 text-lime-600 focus:ring-lime-500"
                          />
                          <span className="text-gray-700 capitalize">{level}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Objective *
                    </label>
                    <div className="space-y-3">
                      {[
                        {value: 'capital_growth', label: 'Capital Growth'},
                        {value: 'income', label: 'Regular Income'},
                        {value: 'preservation', label: 'Capital Preservation'},
                      ].map((obj) => (
                        <label key={obj.value} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name="investmentObjective"
                            value={obj.value}
                            checked={formData.investmentObjective === obj.value}
                            onChange={(e) => setFormData({...formData, investmentObjective: e.target.value})}
                            className="w-5 h-5 text-lime-600 focus:ring-lime-500"
                          />
                          <span className="text-gray-700">{obj.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Risk Disclosure */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <span className="text-amber-500 mr-3">⚠️</span>
                    <div>
                      <p className="text-amber-800 font-medium">Risk Disclosure</p>
                      <p className="text-amber-700 text-sm mt-1">
                        IPO investments carry risks including market risk, liquidity risk, and company-specific risks. 
                        Past performance is not indicative of future results. Please invest only amounts you can afford to lose.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Terms & Completion */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-lime-500 to-lime-700 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl text-white">✓</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete Registration</h2>
                  <p className="text-gray-600">
                    Review and accept the terms to create your account
                  </p>
                </div>
                
                {/* Terms & Conditions */}
                <div className="space-y-4">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                      className="w-5 h-5 mt-1 text-lime-600 rounded focus:ring-lime-500"
                    />
                    <div>
                      <span className="font-medium text-gray-800">
                        I agree to the WCIB Terms & Conditions *
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        By checking this box, I acknowledge that I have read, understood, and agree to be bound by 
                        the WeCapital Investment Bank Terms of Service, including all amendments and updates.
                      </p>
                    </div>
                  </label>
                  
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreeDataPolicy}
                      onChange={(e) => setFormData({...formData, agreeDataPolicy: e.target.checked})}
                      className="w-5 h-5 mt-1 text-lime-600 rounded focus:ring-lime-500"
                    />
                    <div>
                      <span className="font-medium text-gray-800">
                        I agree to the Data Privacy Policy *
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        I consent to the collection, processing, and storage of my personal data in accordance with 
                        WCIB's Privacy Policy and Ethiopian data protection regulations.
                      </p>
                    </div>
                  </label>
                  
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.agreeRiskDisclosure}
                      onChange={(e) => setFormData({...formData, agreeRiskDisclosure: e.target.checked})}
                      className="w-5 h-5 mt-1 text-lime-600 rounded focus:ring-lime-500"
                    />
                    <div>
                      <span className="font-medium text-gray-800">
                        I acknowledge the Risk Disclosure Statement *
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        I understand that IPO investments involve risks and that I should only invest funds 
                        that I can afford to lose. I have read and understood the Risk Disclosure Statement.
                      </p>
                    </div>
                  </label>
                </div>
                
                {/* Summary */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Registration Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Account Type:</p>
                      <p className="font-medium text-gray-800 capitalize">{formData.accountType} Investor</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Name:</p>
                      <p className="font-medium text-gray-800">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Email:</p>
                      <p className="font-medium text-gray-800">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Phone:</p>
                      <p className="font-medium text-gray-800">+251 {formData.phone}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10 pt-6 border-t border-gray-200">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
                >
                  ← Back
                </button>
              ) : (
                <div></div> // Empty div for spacing
              )}
              
              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-8 py-3 bg-gradient-to-r from-lime-500 to-lime-700 text-white font-medium rounded-lg hover:from-lime-600 hover:to-lime-800"
                >
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!formData.agreeTerms || !formData.agreeDataPolicy || !formData.agreeRiskDisclosure}
                  className={`px-8 py-3 font-medium rounded-lg ${
                    formData.agreeTerms && formData.agreeDataPolicy && formData.agreeRiskDisclosure
                      ? 'bg-gradient-to-r from-lime-500 to-lime-700 text-white hover:from-lime-600 hover:to-lime-800'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Complete Registration
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Support Info */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Need assistance? Contact our support team: support@wcib.com | +251 11 5 50 50 50</p>
          <p className="mt-1">Office Hours: Monday-Friday, 8:30 AM - 5:30 PM (Ethiopia Time)</p>
        </div>
      </div>
    </div>
  );
}