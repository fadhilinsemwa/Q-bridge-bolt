'use client';

import { useAuth } from '@/lib/auth-context';
import { ProtectedRoute } from '@/components/auth/protected-route';

/**
 * Student Dashboard
 * 
 * Key Features (from @docs):
 * - Submit evaluations (Teaching & Learning, Student Experience, Online Learning)
 * - View submission history
 * - Receive feedback summaries
 * - Access course-level analytics
 * - Mobile-responsive interface
 */

function StudentDashboardContent() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Q-Bridge</h1>
              <p className="text-sm text-gray-600">Student Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="text-xs text-gray-600">{user?.role}</p>
              </div>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg shadow-lg p-6 text-white mb-8">
          <h2 className="text-2xl font-bold mb-2">
            Welcome back, {user?.firstName}! 👋
          </h2>
          <p className="text-teal-100">
            Help improve TPI by sharing your feedback on courses and services.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Evaluations</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">3</p>
              </div>
              <div className="bg-yellow-100 rounded-full p-3">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Feedback Received</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">5</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Available Evaluations */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Available Evaluations</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {/* Tool 2: Teaching & Learning Evaluation */}
              <div className="border border-gray-200 rounded-lg p-4 hover:border-teal-500 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Teaching & Learning Evaluation</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Evaluate your courses, lecturers, and learning environment
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                        3 Pending
                      </span>
                      <span className="text-xs text-gray-500">Due: Dec 15, 2025</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                    Start
                  </button>
                </div>
              </div>

              {/* Tool 4: Student Experience & Support */}
              <div className="border border-gray-200 rounded-lg p-4 hover:border-teal-500 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Student Experience & Support</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Rate institutional services, facilities, and support
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                        Completed
                      </span>
                      <span className="text-xs text-gray-500">Submitted: Nov 1, 2025</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                    View
                  </button>
                </div>
              </div>

              {/* Tool 12A: Online Learning Experience */}
              <div className="border border-gray-200 rounded-lg p-4 hover:border-teal-500 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Online Learning Experience</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Evaluate online courses, materials, and platform
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Available
                      </span>
                      <span className="text-xs text-gray-500">Optional</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                    Start
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Feedback */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Feedback & Actions</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <div className="bg-blue-100 rounded-full p-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Course Materials Updated</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Based on your feedback, Dr. Mwakasege has updated the course materials for Database Systems.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">2 days ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                <div className="bg-green-100 rounded-full p-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Feedback Acknowledged</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Your suggestions for improving lab equipment have been forwarded to the HOD.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function StudentDashboard() {
  return (
    <ProtectedRoute allowedRoles={['STUDENT']}>
      <StudentDashboardContent />
    </ProtectedRoute>
  );
}
