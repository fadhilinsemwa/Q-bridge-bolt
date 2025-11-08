'use client';

import { useAuth } from '@/lib/auth-context';
import { ProtectedRoute } from '@/components/auth/protected-route';

/**
 * HOD Dashboard - Critical for Q-Bridge workflow
 * Auto-flagging (≤3), AI recommendations, action assignment
 */

function HODDashboardContent() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Q-Bridge</h1>
              <p className="text-sm text-gray-600">Head of Department Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-gray-600">{user?.role} - CS Dept.</p>
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
          <h2 className="text-2xl font-bold mb-2">Welcome, {user?.firstName}! 👔</h2>
          <p className="text-teal-100">Monitor departmental quality and ensure NACTVET compliance.</p>
        </div>

        {/* Critical Alert */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <h3 className="text-sm font-medium text-red-800">3 Critical Issues Require Immediate Attention</h3>
          <p className="text-sm text-red-700 mt-1">Criteria scored ≤3. Review and assign corrective actions.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Total Staff</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Flagged Criteria</p>
            <p className="text-3xl font-bold text-red-600 mt-2">3</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Dept. Avg Rating</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">4.2</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Pending Actions</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">5</p>
          </div>
        </div>

        {/* Auto-Flagged Criteria */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200 bg-red-50">
            <h3 className="text-lg font-semibold text-red-900">🚨 Auto-Flagged Criteria (Score ≤3)</h3>
            <p className="text-sm text-red-700 mt-1">Critical issues requiring immediate intervention</p>
          </div>
          <div className="p-6 space-y-4">
            {/* Flagged Item 1 */}
            <div className="border-2 border-red-300 rounded-lg p-4 bg-red-50">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded">SCORE: 2.8</span>
                <h4 className="font-semibold text-gray-900">Feedback Turnaround Time</h4>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Course:</strong> Data Structures • <strong>Lecturer:</strong> Dr. Moshi
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                <p className="text-sm font-medium text-blue-900">AI Recommendation:</p>
                <ul className="text-sm text-blue-800 mt-1 space-y-1">
                  <li>• Implement weekly grading schedule</li>
                  <li>• Use standardized rubrics</li>
                  <li>• Set up automated reminders</li>
                </ul>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm font-medium">
                  Assign to Dr. Moshi
                </button>
                <span className="text-sm text-gray-600">Due: Dec 15, 2025</span>
              </div>
            </div>

            {/* Flagged Item 2 */}
            <div className="border-2 border-red-300 rounded-lg p-4 bg-red-50">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded">SCORE: 2.5</span>
                <h4 className="font-semibold text-gray-900">Laboratory Equipment</h4>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Area:</strong> Computer Lab 2 • Only 15/30 computers functional
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                <p className="text-sm font-medium text-blue-900">AI Recommendation:</p>
                <ul className="text-sm text-blue-800 mt-1 space-y-1">
                  <li>• Immediate repair of 10 computers</li>
                  <li>• Submit budget request for new equipment</li>
                  <li>• Establish maintenance schedule</li>
                </ul>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm font-medium">
                  Assign to ICT Team
                </button>
                <span className="text-sm text-red-600 font-medium">URGENT</span>
              </div>
            </div>

            {/* Flagged Item 3 */}
            <div className="border-2 border-red-300 rounded-lg p-4 bg-red-50">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded">SCORE: 3.0</span>
                <h4 className="font-semibold text-gray-900">Course Material Relevance</h4>
              </div>
              <p className="text-sm text-gray-700 mb-3">
                <strong>Course:</strong> Web Development • <strong>Lecturer:</strong> Ms. Ndege
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                <p className="text-sm font-medium text-blue-900">AI Recommendation:</p>
                <ul className="text-sm text-blue-800 mt-1 space-y-1">
                  <li>• Update curriculum with modern frameworks</li>
                  <li>• Attend professional development workshop</li>
                  <li>• Review materials by Jan 2026</li>
                </ul>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-sm font-medium">
                  Assign to Ms. Ndege
                </button>
                <span className="text-sm text-gray-600">Due: Jan 15, 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Performance & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Staff Performance</h3>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Dr. Mwakasege</p>
                  <p className="text-sm text-gray-600">Database Systems</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">4.7</p>
                  <p className="text-xs text-gray-500">Excellent</p>
                </div>
              </div>
              <div className="flex justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <p className="font-medium text-gray-900">Dr. Moshi</p>
                  <p className="text-sm text-gray-600">Data Structures</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-red-600">2.8</p>
                  <p className="text-xs text-red-600 font-medium">Needs Attention</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Actions</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 rounded-full p-2">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Lab Equipment Repaired</p>
                  <p className="text-xs text-gray-500">Completed: Nov 5, 2025</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-red-100 rounded-full p-2">
                  <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Overdue: Grading Schedule</p>
                  <p className="text-xs text-red-600 font-medium">Overdue by 3 days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function HODDashboard() {
  return (
    <ProtectedRoute allowedRoles={['HOD']}>
      <HODDashboardContent />
    </ProtectedRoute>
  );
}
