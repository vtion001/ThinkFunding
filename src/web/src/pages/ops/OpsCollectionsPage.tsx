import { Link } from 'react-router-dom'

export default function OpsCollectionsPage() {
  const todayCollections = [
    { dealId: 'DEAL-2026-00008', business: 'Coastal Catering Co', amount: '$1,200', status: 'Received', time: '9:15 AM' },
    { dealId: 'DEAL-2026-00007', business: 'Summit Staffing', amount: '$540', status: 'Received', time: '9:32 AM' },
    { dealId: 'DEAL-2026-00006', business: 'Metro Delivery', amount: '$933', status: 'Received', time: '10:05 AM' },
    { dealId: 'DEAL-2026-00004', business: 'Sunset Bakery', amount: '$400', status: 'Pending', time: 'Due EOD' },
    { dealId: 'DEAL-2026-00009', business: 'Valley Logistics', amount: '$1,250', status: 'Failed', time: 'NSF' },
  ]

  const returnItems = [
    { dealId: 'DEAL-2026-00003', business: 'Valley Logistics', amount: '$1,250', reason: 'NSF', returnedDate: 'Apr 15, 2026', phone: '(555) 111-2222' },
    { dealId: 'DEAL-2026-00011', business: 'Pacific Foods', amount: '$750', reason: 'Account Closed', returnedDate: 'Apr 14, 2026', phone: '(555) 333-4444' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy">Collections</h1>
        <p className="text-gray-500">Monitor daily collections and manage payment issues</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Expected Today', value: '$12,450', subtext: '23 payments', color: 'text-navy' },
          { label: 'Received', value: '$9,800', subtext: '18 payments', color: 'text-success' },
          { label: 'Pending', value: '$2,650', subtext: '5 payments', color: 'text-warning' },
          { label: 'Returns (NSF)', value: '$1,250', subtext: '1 item', color: 'text-danger' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-400">{stat.subtext}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Collections */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-navy">Today's Collections</h2>
            <span className="text-xs text-gray-500">April 15, 2026</span>
          </div>
          <div className="space-y-3">
            {todayCollections.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    item.status === 'Received' ? 'bg-success/10' :
                    item.status === 'Pending' ? 'bg-warning/10' :
                    'bg-danger/10'
                  }`}>
                    {item.status === 'Received' ? (
                      <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : item.status === 'Pending' ? (
                      <svg className="w-4 h-4 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-navy">{item.business}</p>
                    <p className="text-xs text-gray-500">{item.dealId}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{item.amount}</p>
                  <p className="text-xs text-gray-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Return Items */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-navy">Return Items (NSF)</h2>
            <Link to="/ops/collections/returns" className="text-sm text-teal hover:text-teal-dark">
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {returnItems.map((item, index) => (
              <div key={index} className="p-4 border border-danger/20 bg-danger/5 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-navy">{item.business}</p>
                    <p className="text-sm text-gray-500">{item.dealId}</p>
                  </div>
                  <span className="px-2 py-1 text-xs bg-danger/10 text-danger rounded">
                    {item.reason}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Amount</p>
                    <p className="font-medium text-danger">{item.amount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Returned</p>
                    <p className="font-medium text-navy">{item.returnedDate}</p>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded hover:bg-gray-50">
                    Call
                  </button>
                  <button className="flex-1 px-3 py-2 bg-teal text-white text-sm rounded hover:bg-teal-dark">
                    Send Alert
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collections Performance */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-navy mb-4">30-Day Collections Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { week: 'Week 1', rate: '96.2%', amount: '$78,450', color: 'text-success' },
            { week: 'Week 2', rate: '94.8%', amount: '$76,200', color: 'text-success' },
            { week: 'Week 3', rate: '91.5%', amount: '$73,800', color: 'text-warning' },
            { week: 'Week 4', rate: '94.2%', amount: '$75,100', color: 'text-success' },
          ].map((week) => (
            <div key={week.week} className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-gray-500 mb-1">{week.week}</p>
              <p className={`text-2xl font-bold ${week.color}`}>{week.rate}</p>
              <p className="text-sm text-gray-600">{week.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}