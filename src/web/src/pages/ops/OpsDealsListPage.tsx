import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function OpsDealsListPage() {
  const [statusFilter, setStatusFilter] = useState('all')

  const deals = [
    { id: 'DEAL-2026-00008', business: 'Coastal Catering Co', principal: 'David Martinez', amount: '$200,000', factorRate: '1.25', dailyPayment: '$1,200', startDate: 'Apr 12, 2026', status: 'Active', paymentsMade: 3, paymentsRemaining: 57 },
    { id: 'DEAL-2026-00007', business: 'Summit Staffing', principal: 'Emily Brown', amount: '$100,000', factorRate: '1.30', dailyPayment: '$540', startDate: 'Apr 8, 2026', status: 'Active', paymentsMade: 7, paymentsRemaining: 53 },
    { id: 'DEAL-2026-00006', business: 'Metro Delivery', principal: 'Lisa Garcia', amount: '$175,000', factorRate: '1.28', dailyPayment: '$933', startDate: 'Apr 5, 2026', status: 'Active', paymentsMade: 10, paymentsRemaining: 50 },
    { id: 'DEAL-2026-00005', business: 'Riverside Dry Cleaners', principal: 'James Wilson', amount: '$50,000', factorRate: '1.35', dailyPayment: '$312', startDate: 'Mar 28, 2026', status: 'Completed', paymentsMade: 60, paymentsRemaining: 0 },
    { id: 'DEAL-2026-00004', business: 'Sunset Bakery', principal: 'Anna Lopez', amount: '$80,000', factorRate: '1.25', dailyPayment: '$400', startDate: 'Mar 15, 2026', status: 'Active', paymentsMade: 31, paymentsRemaining: 29 },
    { id: 'DEAL-2026-00003', business: 'Valley Logistics', principal: 'Tom Anderson', amount: '$250,000', factorRate: '1.22', dailyPayment: '$1,250', startDate: 'Feb 1, 2026', status: 'Default', paymentsMade: 45, paymentsRemaining: 15 },
  ]

  const statusOptions = ['all', 'Active', 'Completed', 'Default', 'Pending']

  const filteredDeals = statusFilter === 'all' 
    ? deals 
    : deals.filter(d => d.status === statusFilter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Deals</h1>
          <p className="text-gray-500">Manage active and historical deals</p>
        </div>
        <Link
          to="/ops/deals/new"
          className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-dark transition-colors"
        >
          + Create Deal
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Deals', value: '12', subtext: '$2.4M total' },
          { label: 'Total Received', value: '$1.8M', subtext: 'This month' },
          { label: 'Expected Today', value: '$12,450', subtext: '23 payments' },
          { label: 'Default Rate', value: '2.1%', subtext: '3 deals' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm p-4">
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold text-navy">{stat.value}</p>
            <p className="text-xs text-gray-400">{stat.subtext}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex gap-4">
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

      {/* Deals Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Deal</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Business</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Principal</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Factor Rate</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Daily Payment</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDeals.map((deal) => (
                <tr key={deal.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link to={`/ops/deals/${deal.id}`} className="text-teal hover:text-teal-dark font-medium">
                      {deal.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-medium text-navy">{deal.business}</td>
                  <td className="px-6 py-4 text-gray-600">{deal.principal}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{deal.amount}</td>
                  <td className="px-6 py-4 text-gray-600">{deal.factorRate}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{deal.dailyPayment}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${deal.status === 'Default' ? 'bg-danger' : deal.status === 'Completed' ? 'bg-success' : 'bg-teal'}`}
                          style={{ width: `${(deal.paymentsMade / (deal.paymentsMade + deal.paymentsRemaining)) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{deal.paymentsMade}/{deal.paymentsMade + deal.paymentsRemaining}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      deal.status === 'Active' ? 'bg-teal/10 text-teal' :
                      deal.status === 'Completed' ? 'bg-success/10 text-success' :
                      deal.status === 'Default' ? 'bg-danger/10 text-danger' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {deal.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}