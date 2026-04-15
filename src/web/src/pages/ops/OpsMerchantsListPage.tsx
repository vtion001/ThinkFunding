import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function OpsMerchantsListPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const merchants = [
    { id: 'TF-2026-00015', business: 'Coastal Catering Co', contact: 'David Martinez', email: 'david@coastalcatering.com', phone: '(555) 987-6543', activeDeals: 1, totalFunded: '$200,000', status: 'Active' },
    { id: 'TF-2026-00014', business: 'Summit Staffing', contact: 'Emily Brown', email: 'emily@summitstaffing.com', phone: '(555) 876-5432', activeDeals: 1, totalFunded: '$100,000', status: 'Active' },
    { id: 'TF-2026-00013', business: 'Metro Delivery Services', contact: 'Lisa Garcia', email: 'lisa@metrodelivery.com', phone: '(555) 765-4321', activeDeals: 1, totalFunded: '$175,000', status: 'Active' },
    { id: 'TF-2026-00012', business: 'Riverside Dry Cleaners', contact: 'James Wilson', email: 'james@riversidedc.com', phone: '(555) 654-3210', activeDeals: 0, totalFunded: '$50,000', status: 'Completed' },
    { id: 'TF-2026-00011', business: 'Sunset Bakery', contact: 'Anna Lopez', email: 'anna@sunsetbakery.com', phone: '(555) 543-2109', activeDeals: 1, totalFunded: '$80,000', status: 'Active' },
    { id: 'TF-2026-00010', business: 'Valley Logistics', contact: 'Tom Anderson', email: 'tom@valleylogistics.com', phone: '(555) 432-1098', activeDeals: 1, totalFunded: '$250,000', status: 'Default' },
    { id: 'TF-2026-00009', business: 'Apex Rest LLC', contact: 'Michael Chen', email: 'mchen@apexrest.com', phone: '(555) 321-0987', activeDeals: 0, totalFunded: '$0', status: 'Pending' },
    { id: 'TF-2026-00008', business: 'Blue Sky Transport', contact: 'Sarah Johnson', email: 'sarah@blueskytransport.com', phone: '(555) 210-9876', activeDeals: 0, totalFunded: '$0', status: 'In Review' },
  ]

  const statusOptions = ['all', 'Active', 'Completed', 'Default', 'Pending', 'In Review']

  const filteredMerchants = merchants.filter(merchant => {
    const matchesStatus = statusFilter === 'all' || merchant.status === statusFilter
    const matchesSearch = searchQuery === '' || 
      merchant.business.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      merchant.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy">Merchants</h1>
          <p className="text-gray-500">View and manage all merchant accounts</p>
        </div>
        <Link
          to="/ops/merchants/new"
          className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-dark transition-colors"
        >
          + Add Merchant
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Merchants', value: '47', subtext: '$4.2M funded' },
          { label: 'Active', value: '32', subtext: 'With open deals' },
          { label: 'Completed', value: '12', subtext: 'Paid in full' },
          { label: 'Default', value: '3', subtext: '1.8% rate' },
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
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search by business, contact, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal/50"
            />
          </div>
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

      {/* Merchants Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Merchant ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Business</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Active Deals</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Total Funded</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMerchants.map((merchant) => (
                <tr key={merchant.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <Link to={`/ops/merchants/${merchant.id}`} className="text-teal hover:text-teal-dark font-medium">
                      {merchant.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-medium text-navy">{merchant.business}</td>
                  <td className="px-6 py-4">
                    <p className="text-gray-900">{merchant.contact}</p>
                    <p className="text-xs text-gray-500">{merchant.email}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{merchant.phone}</td>
                  <td className="px-6 py-4 text-center font-medium text-navy">{merchant.activeDeals}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{merchant.totalFunded}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      merchant.status === 'Active' ? 'bg-teal/10 text-teal' :
                      merchant.status === 'Completed' ? 'bg-success/10 text-success' :
                      merchant.status === 'Default' ? 'bg-danger/10 text-danger' :
                      merchant.status === 'Pending' ? 'bg-gray-100 text-gray-600' :
                      'bg-warning/10 text-warning'
                    }`}>
                      {merchant.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredMerchants.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-gray-500">No merchants found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}