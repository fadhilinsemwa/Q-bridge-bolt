'use client';

import { useAuth } from '@/lib/auth-context';
import { ProtectedRoute } from '@/components/auth/protected-route';

function DirectorDashboardContent() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Q-Bridge</h1>
              <p className="text-sm text-gray-600">Director Dashboard - Executive Overview</p>
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
          <p className="text-teal-100">Executive overview of institutional quality and performance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Overall QA Score</p>
            <p className="text-3xl font-bold text-green-600 mt-2">4.3</p>
            <p className="text-xs text-gray-500 mt-1">Institution-wide</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">NACTVET Compliance</p>
            <p className="text-3xl font-bold text-teal-600 mt-2">89%</p>
            <p className="text-xs text-green-600 mt-1">↑ 5% from last year</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Student Satisfaction</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">86%</p>
            <p className="text-xs text-gray-500 mt-1">Above target (80%)</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Critical Issues</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">3</p>
            <p className="text-xs text-gray-500 mt-1">Require attention</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Executive Summary</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
              <p className="font-medium text-gray-900">Institutional Performance: Excellent</p>
              <p className="text-sm text-gray-700 mt-1">16/18 programmes accredited • 87% completion rate • 99.8% system uptime</p>
            </div>
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <p className="font-medium text-gray-900">Areas Requiring Attention</p>
              <p className="text-sm text-gray-700 mt-1">3 critical issues flagged • 2 programmes pending accreditation renewal</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Strategic Reports</h3>
          </div>
          <div className="p-6 space-y-3">
            <button className="w-full flex items-center justify-between p-4 border-2 border-teal-200 rounded-lg hover:bg-teal-50">
              <span className="font-medium text-gray-900">Board Meeting Report Q4 2025</span>
              <span className="text-teal-600">Download →</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 border-2 border-teal-200 rounded-lg hover:bg-teal-50">
              <span className="font-medium text-gray-900">Institutional KPI Dashboard</span>
              <span className="text-teal-600">View →</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 border-2 border-teal-200 rounded-lg hover:bg-teal-50">
              <span className="font-medium text-gray-900">NACTVET Compliance Summary</span>
              <span className="text-teal-600">Download →</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DirectorDashboard() {
  return (
    <ProtectedRoute allowedRoles={['DIRECTOR']}>
      <DirectorDashboardContent />
    </ProtectedRoute>
  );
}
