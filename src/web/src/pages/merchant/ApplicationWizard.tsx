import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const steps = [
  { number: 1, title: 'Business', description: 'Business Information' },
  { number: 2, title: 'Owners', description: 'Owner Information' },
  { number: 3, title: 'Financial', description: 'Financial Information' },
  { number: 4, title: 'Review', description: 'Review & Submit' },
]

export default function ApplicationWizard() {
  const { step } = useParams()
  const navigate = useNavigate()
  const currentStep = parseInt(step || '1')

  const [formData, setFormData] = useState({
    // Step 1: Business
    legalName: '',
    dbaName: '',
    businessType: '',
    yearsInBusiness: '',
    industry: '',
    ein: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    website: '',
    // Step 2: Owners
    owners: [{ firstName: '', lastName: '', email: '', phone: '', ssnLast4: '', ownership: '' }],
    // Step 3: Financial
    monthlyRevenue: '',
    averageDailyBalance: '',
    bankName: '',
    accountLast4: '',
    routingNumber: '',
    requestedAmount: '',
    useOfFunds: '',
  })

  const handleNext = () => {
    if (currentStep < 4) {
      navigate(`/merchant/application/step/${currentStep + 1}`)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      navigate(`/merchant/application/step/${currentStep - 1}`)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-navy">Business Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Legal Business Name *</label>
                <input
                  type="text"
                  required
                  value={formData.legalName}
                  onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">DBA Name</label>
                <input
                  type="text"
                  value={formData.dbaName}
                  onChange={(e) => setFormData({ ...formData, dbaName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Type *</label>
                <select
                  required
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal"
                >
                  <option value="">Select...</option>
                  <option value="LLC">LLC</option>
                  <option value="Corporation">Corporation</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Sole Proprietorship">Sole Proprietorship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Years in Business *</label>
                <select
                  required
                  value={formData.yearsInBusiness}
                  onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal"
                >
                  <option value="">Select...</option>
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                  <option value="4">4 years</option>
                  <option value="5">5 years</option>
                  <option value="6+">6+ years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
                <select
                  required
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal"
                >
                  <option value="">Select...</option>
                  <option value="Retail">Retail</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Service">Service</option>
                  <option value="Medical">Medical</option>
                  <option value="Auto">Auto Repair</option>
                  <option value="Professional">Professional Services</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">EIN *</label>
                <input
                  type="text"
                  required
                  value={formData.ein}
                  onChange={(e) => setFormData({ ...formData, ein: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal"
                  placeholder="XX-XXXXXXX"
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-navy">Owner Information</h2>
            <p className="text-sm text-gray-600">Add all owners with 25% or greater ownership.</p>
            {formData.owners.map((owner, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      required
                      value={owner.firstName}
                      onChange={(e) => {
                        const newOwners = [...formData.owners]
                        newOwners[index].firstName = e.target.value
                        setFormData({ ...formData, owners: newOwners })
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={owner.lastName}
                      onChange={(e) => {
                        const newOwners = [...formData.owners]
                        newOwners[index].lastName = e.target.value
                        setFormData({ ...formData, owners: newOwners })
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={owner.email}
                      onChange={(e) => {
                        const newOwners = [...formData.owners]
                        newOwners[index].email = e.target.value
                        setFormData({ ...formData, owners: newOwners })
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={owner.phone}
                      onChange={(e) => {
                        const newOwners = [...formData.owners]
                        newOwners[index].phone = e.target.value
                        setFormData({ ...formData, owners: newOwners })
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SSN (Last 4) *</label>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      value={owner.ssnLast4}
                      onChange={(e) => {
                        const newOwners = [...formData.owners]
                        newOwners[index].ssnLast4 = e.target.value
                        setFormData({ ...formData, owners: newOwners })
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ownership % *</label>
                    <input
                      type="number"
                      required
                      value={owner.ownership}
                      onChange={(e) => {
                        const newOwners = [...formData.owners]
                        newOwners[index].ownership = e.target.value
                        setFormData({ ...formData, owners: newOwners })
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setFormData({ ...formData, owners: [...formData.owners, { firstName: '', lastName: '', email: '', phone: '', ssnLast4: '', ownership: '' }] })}
              className="text-teal font-medium"
            >
              + Add Another Owner
            </button>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-navy">Financial Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Average Monthly Revenue *</label>
                <input
                  type="number"
                  required
                  value={formData.monthlyRevenue}
                  onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal"
                  placeholder="$"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Average Daily Balance *</label>
                <input
                  type="number"
                  required
                  value={formData.averageDailyBalance}
                  onChange={(e) => setFormData({ ...formData, averageDailyBalance: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal"
                  placeholder="$"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name *</label>
                <input
                  type="text"
                  required
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Number (Last 4) *</label>
                <input
                  type="text"
                  required
                  maxLength={4}
                  value={formData.accountLast4}
                  onChange={(e) => setFormData({ ...formData, accountLast4: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Routing Number *</label>
                <input
                  type="text"
                  required
                  value={formData.routingNumber}
                  onChange={(e) => setFormData({ ...formData, routingNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Requested Amount *</label>
                <input
                  type="number"
                  required
                  value={formData.requestedAmount}
                  onChange={(e) => setFormData({ ...formData, requestedAmount: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal"
                  placeholder="$"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Use of Funds</label>
              <textarea
                rows={3}
                value={formData.useOfFunds}
                onChange={(e) => setFormData({ ...formData, useOfFunds: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal"
                placeholder="Describe how you plan to use the funding..."
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-navy">Review & Submit</h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div>
                <h3 className="font-medium text-navy mb-2">Business Information</h3>
                <p className="text-sm text-gray-600">Legal Name: {formData.legalName}</p>
                <p className="text-sm text-gray-600">DBA: {formData.dbaName || 'N/A'}</p>
                <p className="text-sm text-gray-600">Type: {formData.businessType}</p>
                <p className="text-sm text-gray-600">Years: {formData.yearsInBusiness}</p>
                <p className="text-sm text-gray-600">Industry: {formData.industry}</p>
              </div>
              <div>
                <h3 className="font-medium text-navy mb-2">Financial Information</h3>
                <p className="text-sm text-gray-600">Monthly Revenue: ${formData.monthlyRevenue}</p>
                <p className="text-sm text-gray-600">Requested Amount: ${formData.requestedAmount}</p>
              </div>
            </div>
            <div className="bg-teal-light p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                By submitting, you authorize Think Funding to verify the information provided
                and acknowledge receipt of disclosures.
              </p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        {steps.map((s, index) => (
          <div key={s.number} className="flex items-center">
            <div
              className={`flex flex-col items-center ${
                s.number <= currentStep ? 'text-teal' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  s.number < currentStep
                    ? 'bg-teal text-white'
                    : s.number === currentStep
                    ? 'bg-navy text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {s.number < currentStep ? '✓' : s.number}
              </div>
              <span className="text-xs mt-1">{s.title}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-1 mx-2 ${
                  s.number < currentStep ? 'bg-teal' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        {renderStep()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2 bg-teal text-white rounded-lg hover:bg-teal-dark"
        >
          {currentStep === 4 ? 'Submit Application' : 'Save & Continue'}
        </button>
      </div>
    </div>
  )
}
