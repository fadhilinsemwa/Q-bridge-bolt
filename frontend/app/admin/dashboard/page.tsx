'use client';

import { useAuth } from '@/lib/auth-context';
import { ProtectedRoute } from '@/components/auth/protected-route';

/**
 * System Admin Dashboard
 * User management, system configuration, and operations
 * 
 * Key Features (from @docs Section 3.7):
 * - Manage user accounts, permissions, role assignments
 * - Integrate with other platforms (Moodle LMS, SIS)
 * - Backup data securely and ensure uptime
 * - Configure notifications and workflows
 * - System monitoring and audit logs
 */

function AdminDashboardContent() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Q-Bridge</h1>
              <p className="text-sm text-gray-600">System Administrator Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-gray-600">{user?.role}</p>
              </div>
              <button onClick={logout} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg shadow-lg p-6 text-white mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome, {user?.firstName}! ⚙️</h2>
          <p className="text-teal-100">Manage users, configure system, and ensure platform reliability.</p>
        </div>

        {/* System Health Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Total Users</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">247</p>
            <p className="text-xs text-green-600 mt-1">↑ 12 this month</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">System Uptime</p>
            <p className="text-3xl font-bold text-green-600 mt-2">99.8%</p>
            <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Active Sessions</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">42</p>
            <p className="text-xs text-gray-500 mt-1">Currently online</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Last Backup</p>
            <p className="text-3xl font-bold text-teal-600 mt-2">2h</p>
            <p className="text-xs text-gray-500 mt-1">Ago • Successful</p>
          </div>
        </div>

        {/* User Management */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm font-medium">
                + Add New User
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4 flex gap-4">
              <input
                type="text"
                placeholder="Search users..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option>All Roles</option>
                <option>STUDENT</option>
                <option>ACADEMIC_STAFF</option>
                <option>HOD</option>
                <option>QAC_MEMBER</option>
                <option>REGISTRAR</option>
                <option>DIRECTOR</option>
                <option>SYSTEM_ADMIN</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">Dr. John Mwakasege</td>
                    <td className="px-4 py-3 text-sm text-gray-600">j.mwakasege@tpi.ac.tz</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">ACADEMIC_STAFF</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Active</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">2 hours ago</td>
                    <td className="px-4 py-3">
                      <button className="text-teal-600 hover:text-teal-700 text-sm font-medium mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">Disable</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">Sarah Ndege</td>
                    <td className="px-4 py-3 text-sm text-gray-600">s.ndege@tpi.ac.tz</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">HOD</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Active</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">1 day ago</td>
                    <td className="px-4 py-3">
                      <button className="text-teal-600 hover:text-teal-700 text-sm font-medium mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">Disable</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-yellow-50">
                    <td className="px-4 py-3 text-sm text-gray-900">Michael Kimaro</td>
                    <td className="px-4 py-3 text-sm text-gray-600">m.kimaro@tpi.ac.tz</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded">QAC_MEMBER</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Pending Verification</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">Never</td>
                    <td className="px-4 py-3">
                      <button className="text-teal-600 hover:text-teal-700 text-sm font-medium mr-3">Verify</button>
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* System Configuration & Integrations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">System Configuration</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-teal-500 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-teal-100 rounded-full p-2">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Notification Settings</p>
                    <p className="text-xs text-gray-600">Email, SMS, Push notifications</p>
                  </div>
                </div>
                <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">Configure →</button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-teal-500 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Security Settings</p>
                    <p className="text-xs text-gray-600">MFA, password policy, session timeout</p>
                  </div>
                </div>
                <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">Configure →</button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-teal-500 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 rounded-full p-2">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">System Preferences</p>
                    <p className="text-xs text-gray-600">Timezone, language, date format</p>
                  </div>
                </div>
                <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">Configure →</button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">System Integrations</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 border-2 border-green-200 rounded-lg bg-green-50">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Moodle LMS</p>
                    <p className="text-xs text-green-700">Connected • Syncing courses</p>
                  </div>
                </div>
                <button className="text-green-600 hover:text-green-700 font-medium text-sm">Manage →</button>
              </div>

              <div className="flex items-center justify-between p-4 border-2 border-green-200 rounded-lg bg-green-50">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Student Information System</p>
                    <p className="text-xs text-green-700">Connected • Real-time sync</p>
                  </div>
                </div>
                <button className="text-green-600 hover:text-green-700 font-medium text-sm">Manage →</button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-teal-500 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 rounded-full p-2">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email Service (SMTP)</p>
                    <p className="text-xs text-gray-600">Not configured</p>
                  </div>
                </div>
                <button className="text-teal-600 hover:text-teal-700 font-medium text-sm">Setup →</button>
              </div>
            </div>
          </div>
        </div>

        {/* Backup & Audit Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Backup Management</h3>
            </div>
            <div className="p-6">
              <div className="mb-4 p-4 bg-teal-50 border border-teal-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900">Automatic Backups</p>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Enabled</span>
                </div>
                <p className="text-sm text-gray-600">Daily at 2:00 AM • Retention: 30 days</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">backup_2025-11-08_02-00.sql</p>
                    <p className="text-xs text-gray-600">2 hours ago • 245 MB</p>
                  </div>
                  <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">Download</button>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">backup_2025-11-07_02-00.sql</p>
                    <p className="text-xs text-gray-600">1 day ago • 243 MB</p>
                  </div>
                  <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">Download</button>
                </div>

                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">backup_2025-11-06_02-00.sql</p>
                    <p className="text-xs text-gray-600">2 days ago • 241 MB</p>
                  </div>
                  <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">Download</button>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium">
                Create Manual Backup Now
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Audit Logs</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border-l-4 border-teal-500 bg-gray-50 rounded">
                  <div className="bg-teal-100 rounded-full p-1">
                    <svg className="w-4 h-4 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">User Created</p>
                    <p className="text-xs text-gray-600">Michael Kimaro (QAC_MEMBER) created by admin@tpi.ac.tz</p>
                    <p className="text-xs text-gray-500 mt-1">10 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-gray-50 rounded">
                  <div className="bg-blue-100 rounded-full p-1">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">System Configuration Changed</p>
                    <p className="text-xs text-gray-600">Notification settings updated</p>
                    <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border-l-4 border-green-500 bg-gray-50 rounded">
                  <div className="bg-green-100 rounded-full p-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Backup Completed</p>
                    <p className="text-xs text-gray-600">Automatic daily backup successful (245 MB)</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 border-l-4 border-purple-500 bg-gray-50 rounded">
                  <div className="bg-purple-100 rounded-full p-1">
                    <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Integration Sync</p>
                    <p className="text-xs text-gray-600">Moodle LMS synced 45 courses</p>
                    <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                  </div>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
                View All Logs
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <ProtectedRoute allowedRoles={['SYSTEM_ADMIN']}>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
