'use client';

import { useAuth } from '@/lib/auth-context';
import { ProtectedRoute } from '@/components/auth/protected-route';

/**
 * QAC Member Dashboard (QA Officer)
 * Institution-wide oversight and compliance monitoring
 * 
 * Key Features (from @docs Section 3.3):
 * - Full visibility into all QA tools and departments
 * - Activate and share tools to user groups
 * - Track completion status across departments
 * - View summaries, flagged criteria, recommendations
 * - Approve departmental reports
 * - Generate NACTVET compliance reports (single click)
 * - Follow up on corrective actions
 */

function QACDashboardContent() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Q-Bridge</h1>
              <p className="text-sm text-gray-600">Quality Assurance Officer Dashboard</p>
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
          <h2 className="text-2xl font-bold mb-2">Welcome, {user?.firstName}! 📊</h2>
          <p className="text-teal-100">Oversee institutional quality and ensure NACTVET compliance.</p>
        </div>

        {/* Institutional Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Active Tools</p>
            <p className="text-3xl font-bold text-teal-600 mt-2">13</p>
            <p className="text-xs text-gray-500 mt-1">All QA tools</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Departments</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">8</p>
            <p className="text-xs text-gray-500 mt-1">Monitored units</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Compliance Index</p>
            <p className="text-3xl font-bold text-green-600 mt-2">87%</p>
            <p className="text-xs text-gray-500 mt-1">NACTVET standards</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Pending Actions</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">24</p>
            <p className="text-xs text-gray-500 mt-1">Across all depts</p>
          </div>
        </div>

        {/* Tool Activation & Management */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">QA Tool Management</h3>
              <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm font-medium">
                + Activate New Tool
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border-2 border-teal-200 rounded-lg p-4 bg-teal-50">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">Tool 2: Teaching & Learning</h4>
                    <p className="text-sm text-gray-600">End-of-semester evaluation</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Completion: <strong>78%</strong> (6/8 depts)</span>
                  <button className="text-teal-600 hover:text-teal-700 font-medium">View →</button>
                </div>
              </div>

              <div className="border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">Tool 3: Staff Performance</h4>
                    <p className="text-sm text-gray-600">Annual self-assessment</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded">PENDING</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Completion: <strong>45%</strong> (3/8 depts)</span>
                  <button className="text-teal-600 hover:text-teal-700 font-medium">View →</button>
                </div>
              </div>

              <div className="border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">Tool 6: Infrastructure Audit</h4>
                    <p className="text-sm text-gray-600">Semi-annual assessment</p>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold rounded">INACTIVE</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Next: Jan 2026</span>
                  <button className="text-teal-600 hover:text-teal-700 font-medium">Activate →</button>
                </div>
              </div>

              <div className="border-2 border-red-200 rounded-lg p-4 bg-red-50">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">Tool 11: Risk Assessment</h4>
                    <p className="text-sm text-gray-600">Annual risk evaluation</p>
                  </div>
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded">OVERDUE</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-red-600 font-medium">Due: Nov 1, 2025</span>
                  <button className="text-red-600 hover:text-red-700 font-medium">Urgent →</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Flagged Criteria */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200 bg-red-50">
            <h3 className="text-lg font-semibold text-red-900">🚨 Institution-Wide Flagged Criteria (≤3)</h3>
            <p className="text-sm text-red-700 mt-1">Critical issues across all departments</p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">2.8</span>
                      <h4 className="font-semibold text-gray-900">Feedback Turnaround Time</h4>
                      <span className="text-xs text-gray-600">Computer Science Dept</span>
                    </div>
                    <p className="text-sm text-gray-700">3 staff members flagged • Requires HOD intervention</p>
                  </div>
                  <button className="px-3 py-1 bg-teal-600 text-white rounded text-sm hover:bg-teal-700">
                    Review
                  </button>
                </div>
              </div>

              <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">2.5</span>
                      <h4 className="font-semibold text-gray-900">Laboratory Equipment</h4>
                      <span className="text-xs text-gray-600">Engineering Dept</span>
                    </div>
                    <p className="text-sm text-gray-700">Infrastructure audit • Budget request needed</p>
                  </div>
                  <button className="px-3 py-1 bg-teal-600 text-white rounded text-sm hover:bg-teal-700">
                    Review
                  </button>
                </div>
              </div>

              <div className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-2 py-1 bg-yellow-600 text-white text-xs font-bold rounded">3.0</span>
                      <h4 className="font-semibold text-gray-900">Course Material Relevance</h4>
                      <span className="text-xs text-gray-600">Multiple Departments</span>
                    </div>
                    <p className="text-sm text-gray-700">5 courses flagged • Curriculum review recommended</p>
                  </div>
                  <button className="px-3 py-1 bg-teal-600 text-white rounded text-sm hover:bg-teal-700">
                    Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Department Completion Status & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Department Completion Status</h3>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Computer Science</p>
                  <p className="text-xs text-gray-600">8/10 tools completed</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">80%</p>
                  <p className="text-xs text-gray-500">On track</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Engineering</p>
                  <p className="text-xs text-gray-600">5/10 tools completed</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-yellow-600">50%</p>
                  <p className="text-xs text-gray-500">Needs follow-up</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <p className="font-medium text-gray-900">Business Studies</p>
                  <p className="text-xs text-gray-600">3/10 tools completed</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-red-600">30%</p>
                  <p className="text-xs text-red-600 font-medium">Critical</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
            </div>
            <div className="p-6 space-y-3">
              <button className="w-full flex items-center gap-3 p-4 border-2 border-teal-200 rounded-lg hover:bg-teal-50 transition-colors">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="text-left flex-1">
                  <p className="font-medium text-gray-900">Generate NACTVET Report</p>
                  <p className="text-xs text-gray-600">Single-click compliance export</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-4 border-2 border-teal-200 rounded-lg hover:bg-teal-50 transition-colors">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <div className="text-left flex-1">
                  <p className="font-medium text-gray-900">Send Reminder Notifications</p>
                  <p className="text-xs text-gray-600">Email/SMS to pending departments</p>
                </div>
              </button>

              <button className="w-full flex items-center gap-3 p-4 border-2 border-teal-200 rounded-lg hover:bg-teal-50 transition-colors">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <div className="text-left flex-1">
                  <p className="font-medium text-gray-900">View Analytics Dashboard</p>
                  <p className="text-xs text-gray-600">Trends and insights</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Follow-up Tracker */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Follow-up Tracker</h3>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Issue</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned To</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Computer Science</td>
                    <td className="px-4 py-3 text-sm text-gray-900">Feedback turnaround</td>
                    <td className="px-4 py-3 text-sm text-gray-900">Dr. Moshi</td>
                    <td className="px-4 py-3 text-sm text-gray-900">Dec 15, 2025</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">In Progress</span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">Review</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Engineering</td>
                    <td className="px-4 py-3 text-sm text-gray-900">Lab equipment repair</td>
                    <td className="px-4 py-3 text-sm text-gray-900">ICT Team</td>
                    <td className="px-4 py-3 text-sm text-gray-900">Nov 30, 2025</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Completed</span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">Close</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Business Studies</td>
                    <td className="px-4 py-3 text-sm text-gray-900">Curriculum update</td>
                    <td className="px-4 py-3 text-sm text-gray-900">HOD Business</td>
                    <td className="px-4 py-3 text-sm text-red-600 font-medium">Nov 5, 2025</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Overdue</span>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-red-600 hover:text-red-700 text-sm font-medium">Escalate</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function QACDashboard() {
  return (
    <ProtectedRoute allowedRoles={['QAC_MEMBER']}>
      <QACDashboardContent />
    </ProtectedRoute>
  );
}
