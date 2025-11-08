export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">
          Q-Bridge
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Quality Assurance Management System
        </p>
        <p className="text-gray-500">
          Tandabui Polytechnic Institute
        </p>
        <div className="mt-8 p-4 bg-primary/10 rounded-lg">
          <p className="text-sm text-gray-700">
            🚀 Docker development environment is running!
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Frontend: http://localhost:3100
          </p>
          <p className="text-xs text-gray-500">
            Backend: http://localhost:4100
          </p>
        </div>
      </div>
    </main>
  );
}
