import { Link } from 'react-router-dom'

export default function OpsDashboardPage() {
  const stats = [
    { label: 'Active Applications', value: '12', change: '+3 this week', color: 'text-teal' },
    { label: 'Deals in Progress', value: '8', change: '+2 this week', color: 'text-teal' },
    { label: 'Total Funded', value: '$2.4M', change: '+12%', color: 'text-success' },
    { label: 'Collections Rate', value: '94.2%', change: '+2.1%', color: 'text-success' },
  ]

  const recentApplications = [
    { id: 'APP-2026-00012', business: 'Apex Rest LLC', status: 'Under Review', amount: '$150,000', submitted: 'Apr 14, 2026' },
    { id: 'APP-2026-00011', business: 'Blue Sky Transport', status: 'Pending Documents', amount: '$75,000', submitted: 'Apr 13, 2026' },
    { id: 'APP-2026-00010', business: 'Coastal Catering Co', status: 'Approved', amount: '$200,000', submitted: 'Apr 12, 2026' },
    { id: 'APP-2026-00009', business: 'Summit Staffing', status: 'Declined', amount: '$100,000', submitted: 'Apr 11, 2026' },
  ]

  const pendingTasks = [
    { type: 'Review', item: 'APP-2026-00012 requires underwriting review', priority: 'high' },
    { type: 'Document', item: 'Blue Sky Transport - bank statements missing', priority: 'medium' },
    { type: 'Approval', item: 'Coastal Catering Co - awaiting final approval', priority: 'medium' },
    { type: 'NSF', item: '2 payments returned - requires follow-up', priority: 'high' },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-navy">Recent Applications</h2>
            <Link to="/ops/applications" className="text-sm text-teal hover:text-teal-dark">
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {recentApplications.map((app) => (
              <Link
                key={app.id}
                to={`/ops/applications/${app.id}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div>
                  <p className="font-medium text-navy">{app.business}</p>
                  <p className="text-xs text-gray-500">{app.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{app.amount}</p>
                  <span className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                    app.status === 'Approved' ? 'bg-success/10 text-success' :
                    app.status === 'Declined' ? 'bg-danger/10 text-danger' :
                    app.status === 'Under Review' ? 'bg-info/10 text-info' :
                    'bg-warning/10 text-warning'
                  }`}>
                    {app.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-navy">Pending Tasks</h2>
            <span className="text-xs text-gray-500">{pendingTasks.length} items</span>
          </div>
          <div className="space-y-3">
            {pendingTasks.map((task, index) => (
              <div
                key={index}
                className={`flex items-start p-3 rounded-lg ${
                  task.priority === 'high' ? 'bg-danger/5 border-l-4 border-danger' : 'bg-gray-50'
                }`}
              >
                <span className={`inline-block px-2 py-0.5 text-xs rounded mr-3 ${
                  task.type === 'Review' ? 'bg-info/10 text-info' :
                  task.type === 'Document' ? 'bg-warning/10 text-warning' :
                  task.type === 'Approval' ? 'bg-success/10 text-success' :
                  'bg-danger/10 text-danger'
                }`}>
                  {task.type}
                </span>
                <p className="text-sm text-gray-700 flex-1">{task.item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-navy mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/ops/applications"
            className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-teal-light rounded-lg flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-navy">Applications</span>
          </Link>

          <Link
            to="/ops/deals"
            className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-teal-light rounded-lg flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-navy">Deals</span>
          </Link>

          <Link
            to="/ops/collections"
            className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-teal-light rounded-lg flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-navy">Collections</span>
          </Link>

          <Link
            to="/ops/merchants"
            className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-12 h-12 bg-teal-light rounded-lg flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-sm font-medium text-navy">Merchants</span>
          </Link>
        </div>
      </div>
    </div>
  )
}