import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function OpsDealDetailPage() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('Overview')

  const deal = {
    id: id || 'DEAL-2026-00008',
    business: 'Coastal Catering Co',
    principal: 'David Martinez',
    email: 'david@coastalcatering.com',
    phone: '(555) 987-6543',
    amount: '$200,000',
    factorRate: '1.25',
    purchasePrice: '$250,000',
    dailyPayment: '$1,200',
    startDate: 'April 12, 2026',
    expectedEndDate: 'June 11, 2026',
    totalPayments: 60,
    paymentsMade: 3,
    paymentsRemaining: 57,
    status: 'Active',
    achLast4: '4521',
    bankName: 'Chase Bank',
    applicationId: 'APP-2026-00010',
  }

  const recentPayments = [
    { date: 'Apr 15, 2026', amount: '$1,200', status: 'Received', type: 'Daily' },
    { date: 'Apr 14, 2026', amount: '$1,200', status: 'Received', type: 'Daily' },
    { date: 'Apr 13, 2026', amount: '$1,200', status: 'Received', type: 'Daily' },
    { date: 'Apr 12, 2026', amount: '$1,200', status: 'Received', type: 'Daily' },
  ]

  const tabs = ['Overview', 'Payment History', 'Documents', 'Communications', 'Audit Log']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link to="/ops/deals" className="text-gray-400 hover:text-gray-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-2xl font-bold text-navy">{deal.business}</h1>
            <span className="px-3 py-1 text-sm font-medium rounded-full bg-teal/10 text-teal">
              Active
            </span>
          </div>
          <p className="text-gray-500 ml-8">{deal.id} • {deal.principal}</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Send Statement
          </button>
          <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Modify Terms
          </button>
          <button className="px-4 py-2 bg-danger text-white rounded-lg hover:bg-danger/90 transition-colors">
            Close Deal
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

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'Overview' && (
            <>
              {/* Progress Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-navy mb-4">Payment Progress</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">
                    {deal.paymentsMade} of {deal.totalPayments} payments made
                  </span>
                  <span className="text-sm font-medium text-teal">
                    {Math.round((deal.paymentsMade / deal.totalPayments) * 100)}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-4">
                  <div 
                    className="h-full bg-teal"
                    style={{ width: `${(deal.paymentsMade / deal.totalPayments) * 100}%` }}
                  />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-lg font-bold text-navy">{deal.purchasePrice}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Amount Received</p>
                    <p className="text-lg font-bold text-success">$3,600</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Remaining Balance</p>
                    <p className="text-lg font-bold text-navy">$246,400</p>
                  </div>
                </div>
              </div>

              {/* Recent Payments */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-navy mb-4">Recent Payments</h3>
                <div className="space-y-3">
                  {recentPayments.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-navy">{payment.amount}</p>
                          <p className="text-xs text-gray-500">{payment.date} • {payment.type}</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 text-xs bg-success/10 text-success rounded">{payment.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'Payment History' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-navy mb-4">Full Payment History</h3>
              <p className="text-gray-500 text-sm">Payment history would be displayed here with filtering and export options.</p>
            </div>
          )}

          {activeTab === 'Documents' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-navy mb-4">Deal Documents</h3>
              <div className="space-y-3">
                {[
                  { name: 'MCA Agreement - Signed', type: 'Contract' },
                  { name: 'ACH Authorization', type: 'Banking' },
                  { name: 'Application - Coastal Catering', type: 'Application' },
                  { name: 'Bank Statements (6 months)', type: 'Financial' },
                ].map((doc) => (
                  <div key={doc.name} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="font-medium text-navy">{doc.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{doc.type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'Communications' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-navy mb-4">Communication History</h3>
              <p className="text-gray-500 text-sm">Email and notification history would be displayed here.</p>
            </div>
          )}

          {activeTab === 'Audit Log' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-semibold text-navy mb-4">Audit Log</h3>
              <div className="space-y-3">
                {[
                  { date: 'Apr 12, 2026', action: 'Deal funded and activated', user: 'System' },
                  { date: 'Apr 12, 2026', action: 'ACH mandate created', user: 'System' },
                  { date: 'Apr 12, 2026', action: 'Deal approved', user: 'Underwriter' },
                ].map((log, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-teal rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-navy">{log.action}</p>
                      <p className="text-xs text-gray-500">{log.date} • {log.user}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Deal Details */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-navy mb-4">Deal Details</h3>
            <dl className="space-y-3">
              {[
                { label: 'Advance Amount', value: deal.amount },
                { label: 'Factor Rate', value: deal.factorRate },
                { label: 'Purchase Price', value: deal.purchasePrice },
                { label: 'Daily Payment', value: deal.dailyPayment },
                { label: 'Start Date', value: deal.startDate },
                { label: 'Expected End', value: deal.expectedEndDate },
                { label: 'Application', value: deal.applicationId },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                  <dt className="text-gray-500">{item.label}</dt>
                  <dd className="font-medium text-navy">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Principal Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-navy mb-4">Principal Contact</h3>
            <div className="space-y-3">
              <p className="font-medium text-navy">{deal.principal}</p>
              <p className="text-gray-600 text-sm">{deal.email}</p>
              <p className="text-gray-600 text-sm">{deal.phone}</p>
            </div>
          </div>

          {/* Banking Info */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-navy mb-4">Banking (ACH)</h3>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Bank</p>
              <p className="font-medium text-navy">{deal.bankName}</p>
              <p className="text-sm text-gray-500">Account (last 4)</p>
              <p className="font-medium text-navy">****{deal.achLast4}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}