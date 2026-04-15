import { Link } from 'react-router-dom'
import { useAuthStore } from '@/context/auth.store'

export default function DashboardPage() {
  const { user } = useAuthStore()

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-navy to-navy-light text-white rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.businessName || 'Merchant'}!
        </h1>
        <p className="text-gray-200">
          Here's an overview of your application and account status.
        </p>
      </div>

      {/* Application Status */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-navy mb-4">Application Status</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Current Status</p>
            <p className="text-xl font-semibold text-teal">In Progress</p>
          </div>
          <Link
            to="/merchant/application/step/1"
            className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-dark transition-colors"
          >
            Continue Application
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/merchant/application/step/1"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="w-12 h-12 bg-teal-light rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-semibold text-navy mb-1">Continue Application</h3>
          <p className="text-sm text-gray-500">Complete your application</p>
        </Link>

        <Link
          to="/merchant/documents"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="w-12 h-12 bg-teal-light rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <h3 className="font-semibold text-navy mb-1">Upload Documents</h3>
          <p className="text-sm text-gray-500">Submit required documents</p>
        </Link>

        <Link
          to="/merchant/profile"
          className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
        >
          <div className="w-12 h-12 bg-teal-light rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="font-semibold text-navy mb-1">View Profile</h3>
          <p className="text-sm text-gray-500">Manage your account</p>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-navy mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { date: 'April 15, 2026', action: 'Account created' },
            { date: 'April 15, 2026', action: 'Application started' },
          ].map((item, index) => (
            <div key={index} className="flex items-center text-sm">
              <div className="w-2 h-2 bg-teal rounded-full mr-3"></div>
              <span className="text-gray-500 mr-2">{item.date}</span>
              <span className="text-gray-700">{item.action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
