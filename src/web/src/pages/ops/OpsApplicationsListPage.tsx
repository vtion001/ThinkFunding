import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function OpsApplicationsListPage() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const applications = [
    { id: 'APP-2026-00012', business: 'Apex Rest LLC', owner: 'Michael Chen', status: 'Under Review', amount: '$150,000', submitted: 'Apr 14, 2026', broker: 'Direct' },
    { id: 'APP-2026-00011', business: 'Blue Sky Transport', owner: 'Sarah Johnson', status: 'Pending Documents', amount: '$75,000', submitted: 'Apr 13, 2026', broker: 'ISO Partner' },
    { id: 'APP-2026-00010', business: 'Coastal Catering Co', owner: 'David Martinez', status: 'Approved', amount: '$200,000', submitted: 'Apr 12, 2026', broker: 'Direct' },
    { id: 'APP-2026-00009', business: 'Summit Staffing', owner: 'Emily Brown', status: 'Declined', amount: '$100,000', submitted: 'Apr 11, 2026', broker: 'None' },
    { id: 'APP-2026-00008', business: 'Riverside Dry Cleaners', owner: 'James Wilson', status: 'Draft', amount: '$50,000', submitted: 'Apr 10, 2026', broker: 'Direct' },
    { id: 'APP-2026-00007', business: 'Metro Delivery Services', owner: 'Lisa Garcia', status: 'Submitted', amount: '$175,000', submitted: 'Apr 9, 2026', broker: 'ISO Partner' },
  ]

  const statusOptions = ['all', 'Draft', 'Submitted', 'Under Review', 'Pending Documents', 'Approved', 'Declined']

  const filteredApplications = applications.filter(app => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter
    const matchesSearch = searchQuery === '' || 
      app.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Applications</h1>
          <p className="text-gray-500">Manage and review merchant applications</p>
        </div>
        <Link
          to="/ops/applications/new"
          className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-dark transition-colors"
        >
          + New Application
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search by business name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/50"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/50"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Statuses' : status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Application</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Business</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Owner</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Broker</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link to={`/ops/applications/${app.id}`} className="text-teal hover:text-teal-dark font-medium">
                      {app.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-navy">{app.business}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{app.owner}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{app.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      app.status === 'Approved' ? 'bg-success/10 text-success' :
                      app.status === 'Declined' ? 'bg-danger/10 text-danger' :
                      app.status === 'Under Review' ? 'bg-info/10 text-info' :
                      app.status === 'Pending Documents' ? 'bg-warning/10 text-warning' :
                      app.status === 'Submitted' ? 'bg-teal/10 text-teal' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{app.broker}</td>
                  <td className="px-6 py-4 text-gray-500">{app.submitted}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredApplications.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500">No applications found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}