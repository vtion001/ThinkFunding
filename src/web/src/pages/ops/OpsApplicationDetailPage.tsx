import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const tabs = [
  'Overview',
  'Business Info',
  'Principals',
  'Financials',
  'Documents',
  'Compliance',
  'Underwriting',
  'History',
]

export default function OpsApplicationDetailPage() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('Overview')
  const [decisionNotes, setDecisionNotes] = useState('')

  const application = {
    id: id || 'APP-2026-00012',
    business: 'Apex Rest LLC',
    owner: 'Michael Chen',
    status: 'Under Review',
    amount: '$150,000',
    submitted: 'April 14, 2026',
    broker: 'Direct',
    ein: '12-3456789',
    businessType: 'LLC',
    industry: 'Restaurant',
    phone: '(555) 123-4567',
    email: 'mchen@apexrest.com',
    address: '123 Main St, Phoenix, AZ 85001',
    monthlyRevenue: '$85,000',
    avgDailyBalance: '$42,500',
    nsfCount: 0,
    ownership: '100%',
    ssnLast4: '1234',
    dob: '01/15/1985',
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link to="/ops/applications" className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-navy">{application.business}</h1>
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-info/10 text-info">
              Under Review
            </span>
          </div>
          <p className="text-gray-500 ml-8">{application.id} • Submitted {application.submitted}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Request Info
          </button>
          <button className="px-4 py-2 border border-danger text-danger rounded-lg hover:bg-danger/5 transition-colors">
            Decline
          </button>
          <button className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-dark transition-colors">
            Approve
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-teal text-teal'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-navy">Application Details</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="text-gray-500">Requested Amount</dt>
                  <dd className="font-medium text-navy">{application.amount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Use of Funds</dt>
                  <dd className="font-medium text-navy">Equipment + Working Capital</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Broker Source</dt>
                  <dd className="font-medium text-navy">{application.broker}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-500">Submitted Date</dt>
                  <dd className="font-medium text-navy">{application.submitted}</dd>
                </div>
              </dl>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-navy">Key Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Monthly Revenue</p>
                  <p className="text-xl font-bold text-navy">{application.monthlyRevenue}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Avg Daily Balance</p>
                  <p className="text-xl font-bold text-navy">{application.avgDailyBalance}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">NSF Count</p>
                  <p className="text-xl font-bold text-success">{application.nsfCount}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Ownership</p>
                  <p className="text-xl font-bold text-navy">{application.ownership}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Business Info' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <dl className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <dt className="text-gray-500">Legal Name</dt>
                  <dd className="font-medium text-navy">{application.business}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <dt className="text-gray-500">DBA</dt>
                  <dd className="font-medium text-navy">Apex Rest</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <dt className="text-gray-500">Business Type</dt>
                  <dd className="font-medium text-navy">{application.businessType}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <dt className="text-gray-500">EIN</dt>
                  <dd className="font-medium text-navy">{application.ein}</dd>
                </div>
              </dl>
              <dl className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <dt className="text-gray-500">Industry</dt>
                  <dd className="font-medium text-navy">{application.industry}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <dt className="text-gray-500">Phone</dt>
                  <dd className="font-medium text-navy">{application.phone}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <dt className="text-gray-500">Email</dt>
                  <dd className="font-medium text-navy">{application.email}</dd>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <dt className="text-gray-500">Address</dt>
                  <dd className="font-medium text-navy">{application.address}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}

        {activeTab === 'Principals' && (
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-navy">{application.owner}</p>
                  <p className="text-sm text-gray-500">Owner / Primary Principal</p>
                </div>
                <span className="px-2 py-1 text-xs bg-teal/10 text-teal rounded">100% Ownership</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">SSN (last 4)</p>
                  <p className="font-medium">***-**-{application.ssnLast4}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date of Birth</p>
                  <p className="font-medium">{application.dob}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Financials' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Monthly Revenue</p>
                <p className="text-2xl font-bold text-navy">{application.monthlyRevenue}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Avg Daily Balance</p>
                <p className="text-2xl font-bold text-navy">{application.avgDailyBalance}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">NSF Count (6 mo)</p>
                <p className="text-2xl font-bold text-success">0</p>
              </div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-navy mb-3">Bank Statements</h4>
              <p className="text-gray-500 text-sm">6 months of bank statements uploaded</p>
              <div className="mt-3 flex gap-2">
                {['Jan 2026', 'Feb 2026', 'Mar 2026', 'Apr 2026'].map((month) => (
                  <span key={month} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                    {month}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Documents' && (
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg divide-y divide-gray-200">
              {[
                { name: 'Driver License - Michael Chen', type: 'ID', status: 'Verified' },
                { name: 'Bank Statements - Last 6 Months', type: 'Financial', status: 'Verified' },
                { name: 'Articles of Organization', type: 'Legal', status: 'Verified' },
                { name: 'EIN Confirmation Letter', type: 'Tax', status: 'Verified' },
              ].map((doc) => (
                <div key={doc.name} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-navy">{doc.name}</p>
                      <p className="text-sm text-gray-500">{doc.type}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs bg-success/10 text-success rounded">{doc.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Compliance' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { check: 'PEP Screening', status: 'Clear', icon: '✓' },
                { check: 'Sanctions Check (OFAC)', status: 'Clear', icon: '✓' },
                { check: 'UCC Liens Search', status: 'Clear', icon: '✓' },
                { check: 'Bankruptcy Search', status: 'Clear', icon: '✓' },
              ].map((check) => (
                <div key={check.check} className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                  <span className="font-medium text-navy">{check.check}</span>
                  <span className="px-3 py-1 bg-success/10 text-success text-sm rounded-full flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {check.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Underwriting' && (
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-navy mb-3">Recommendation</h4>
              <p className="text-gray-600 mb-4">
                Based on the financial review, this applicant demonstrates strong cash flow 
                with consistent monthly revenue of $85,000 and average daily balances of $42,500.
                No NSF items in the past 6 months.
              </p>
              <div className="flex gap-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Recommended Factor Rate</p>
                  <p className="text-xl font-bold text-navy">1.25</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">Max Advance</p>
                  <p className="text-xl font-bold text-navy">$150,000</p>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Decision Notes</label>
              <textarea
                rows={4}
                value={decisionNotes}
                onChange={(e) => setDecisionNotes(e.target.value)}
                placeholder="Add underwriting notes..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/50"
              />
            </div>
          </div>
        )}

        {activeTab === 'History' && (
          <div className="space-y-4">
            {[
              { date: 'Apr 14, 2026 10:32 AM', action: 'Application submitted', user: 'Michael Chen' },
              { date: 'Apr 14, 2026 10:35 AM', action: 'Documents uploaded (4 files)', user: 'Michael Chen' },
              { date: 'Apr 14, 2026 11:00 AM', action: 'Auto compliance checks passed', user: 'System' },
              { date: 'Apr 14, 2026 11:05 AM', action: 'Application assigned for review', user: 'System' },
            ].map((event, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-teal rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="font-medium text-navy">{event.action}</p>
                  <p className="text-sm text-gray-500">{event.date} • {event.user}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}