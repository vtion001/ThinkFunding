import { useState } from 'react'

export default function OpsSettingsPage() {
  const [activeSection, setActiveSection] = useState('general')

  const sections = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'team', label: 'Team & Roles', icon: '👥' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'integrations', label: 'Integrations', icon: '🔗' },
    { id: 'workflows', label: 'n8n Workflows', icon: '⚡' },
    { id: 'security', label: 'Security', icon: '🔒' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy">Settings</h1>
        <p className="text-gray-500">Manage application settings and configuration</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <nav className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-teal/10 text-teal font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span>{section.icon}</span>
                <span>{section.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
          {activeSection === 'general' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-navy mb-4">General Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-navy">Company Name</p>
                      <p className="text-sm text-gray-500">Think Funding LLC</p>
                    </div>
                    <button className="text-teal hover:text-teal-dark text-sm">Edit</button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-navy">Business Address</p>
                      <p className="text-sm text-gray-500">123 Business Ave, Phoenix, AZ 85001</p>
                    </div>
                    <button className="text-teal hover:text-teal-dark text-sm">Edit</button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-navy">Default Factor Rate</p>
                      <p className="text-sm text-gray-500">1.25 - 1.35 range</p>
                    </div>
                    <button className="text-teal hover:text-teal-dark text-sm">Edit</button>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-navy">Maximum Advance Amount</p>
                      <p className="text-sm text-gray-500">$500,000</p>
                    </div>
                    <button className="text-teal hover:text-teal-dark text-sm">Edit</button>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-navy mb-3">Payment Terms</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Default Daily Payment Grace Period</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
                      <option>1 day</option>
                      <option selected>2 days</option>
                      <option>3 days</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">NSF Fee</label>
                    <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
                      <option selected>$25</option>
                      <option>$35</option>
                      <option>$50</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'team' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-navy">Team Members</h2>
                <button className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal-dark transition-colors">
                  + Invite Member
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Admin User', email: 'admin@thinkfunding.com', role: 'Admin' },
                  { name: 'John Underwriter', email: 'john@thinkfunding.com', role: 'Underwriter' },
                  { name: 'Jane Viewer', email: 'jane@thinkfunding.com', role: 'Viewer' },
                ].map((member) => (
                  <div key={member.email} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-500 font-medium">{member.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-navy">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">{member.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-navy">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { label: 'New Application Submitted', description: 'Receive alerts for new applications', enabled: true },
                  { label: 'Application Status Changes', description: 'Notify when application status changes', enabled: true },
                  { label: 'Daily Collections Summary', description: 'Morning summary of expected collections', enabled: true },
                  { label: 'NSF/Return Alerts', description: 'Immediate notification for failed payments', enabled: true },
                  { label: 'Weekly Performance Report', description: 'Send weekly metrics report', enabled: false },
                ].map((notification) => (
                  <div key={notification.label} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-navy">{notification.label}</p>
                      <p className="text-sm text-gray-500">{notification.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={notification.enabled} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'integrations' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-navy">Integrations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Microsoft Entra ID', description: 'Employee authentication', connected: true },
                  { name: 'Azure Blob Storage', description: 'Document storage', connected: true },
                  { name: 'Stripe', description: 'ACH payments', connected: true },
                  { name: 'Microsoft Teams', description: 'Notifications', connected: true },
                  { name: 'Power Automate', description: 'Email notifications', connected: false },
                  { name: 'QuickBooks', description: 'Accounting sync', connected: false },
                ].map((integration) => (
                  <div key={integration.name} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-navy">{integration.name}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        integration.connected ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {integration.connected ? 'Connected' : 'Not Connected'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{integration.description}</p>
                    <button className={`mt-3 text-sm ${integration.connected ? 'text-danger' : 'text-teal'}`}>
                      {integration.connected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'workflows' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-navy">n8n Workflow Status</h2>
              <div className="space-y-4">
                {[
                  { name: 'New Application Submission', status: 'Active', lastRun: '2 min ago' },
                  { name: 'Document Uploaded', status: 'Active', lastRun: '15 min ago' },
                  { name: 'Application Status Change', status: 'Active', lastRun: '1 hour ago' },
                  { name: 'Missing Document Alert', status: 'Active', lastRun: '3 hours ago' },
                  { name: 'Daily Underwriting Reminder', status: 'Scheduled', lastRun: 'Yesterday' },
                ].map((workflow) => (
                  <div key={workflow.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-navy">{workflow.name}</p>
                      <p className="text-sm text-gray-500">Last run: {workflow.lastRun}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      workflow.status === 'Active' ? 'bg-success/10 text-success' :
                      workflow.status === 'Scheduled' ? 'bg-info/10 text-info' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {workflow.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-navy">Security Settings</h2>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-navy">Two-Factor Authentication</p>
                    <span className="px-2 py-1 text-xs bg-success/10 text-success rounded-full">Enabled</span>
                  </div>
                  <p className="text-sm text-gray-500">Required for all team members</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-navy">Session Timeout</p>
                  </div>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
                    <option>15 minutes</option>
                    <option selected>30 minutes</option>
                    <option>1 hour</option>
                  </select>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-navy">Password Policy</p>
                    <button className="text-teal hover:text-teal-dark text-sm">Edit</button>
                  </div>
                  <p className="text-sm text-gray-500">Minimum 12 characters, requires numbers and symbols</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}