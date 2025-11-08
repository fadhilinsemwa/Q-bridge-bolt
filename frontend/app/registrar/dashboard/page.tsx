'use client';

import { useAuth } from '@/lib/auth-context';
import { ProtectedRoute } from '@/components/auth/protected-route';

function RegistrarDashboardContent() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Q-Bridge</h1>
              <p className="text-sm text-gray-600">Registrar Dashboard - Academic Office</p>
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
          <h2 className="text-2xl font-bold mb-2">Welcome, {user?.firstName}! 📋</h2>
          <p className="text-teal-100">Manage academic operations and ensure accreditation readiness.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Total Programmes</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">18</p>
            <p className="text-xs text-gray-500 mt-1">Across 8 departments</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Student Enrollment</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">2,847</p>
            <p className="text-xs text-green-600 mt-1">↑ 8% from last year</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Completion Rate</p>
            <p className="text-3xl font-bold text-green-600 mt-2">87%</p>
            <p className="text-xs text-gray-500 mt-1">Above target (85%)</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Accreditation Status</p>
            <p className="text-3xl font-bold text-teal-600 mt-2">16/18</p>
            <p className="text-xs text-gray-500 mt-1">Programmes accredited</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Programme Reports</h3>
          </div>
          <div className="p-6 space-y-3">
            <button className="w-full flex items-center justify-between p-4 border-2 border-teal-200 rounded-lg hover:bg-teal-50">
              <span className="font-medium text-gray-900">Annual Quality Report 2024-2025</span>
              <span className="text-teal-600">Download →</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 border-2 border-teal-200 rounded-lg hover:bg-teal-50">
              <span className="font-medium text-gray-900">Student Progression Report</span>
              <span className="text-teal-600">Download →</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 border-2 border-teal-200 rounded-lg hover:bg-teal-50">
              <span className="font-medium text-gray-900">NACTVET Compliance Report</span>
              <span className="text-teal-600">Download →</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function RegistrarDashboard() {
  return (
    <ProtectedRoute allowedRoles={['REGISTRAR']}>
      <RegistrarDashboardContent />
    </ProtectedRoute>
  );
}
