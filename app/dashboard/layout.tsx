import Link from 'next/link';
import { Home, Calendar, Trophy, Users, User } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <Trophy className="w-8 h-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-900">T20 Fantasy</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link
                href="/dashboard"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <Link
                href="/dashboard/schedule"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Calendar className="w-5 h-5" />
                <span className="hidden sm:inline">Schedule</span>
              </Link>
              <Link
                href="/dashboard/leaderboard"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Trophy className="w-5 h-5" />
                <span className="hidden sm:inline">Leaderboard</span>
              </Link>
              <Link
                href="/dashboard/team"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Users className="w-5 h-5" />
                <span className="hidden sm:inline">My Team</span>
              </Link>
              <Link
                href="/dashboard/profile"
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
