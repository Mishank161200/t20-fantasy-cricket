'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, Calendar, Trophy, Users, User, ChevronDown, Plus } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useState } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { currentTournament, userTournaments, setCurrentTournament } = useAppStore();
  const [showTournamentDropdown, setShowTournamentDropdown] = useState(false);

  const handleTournamentSwitch = (tournament: any) => {
    setCurrentTournament(tournament);
    setShowTournamentDropdown(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <Trophy className="w-8 h-8 text-blue-600" />
                <span className="font-bold text-xl text-gray-900">T20 Fantasy</span>
              </Link>

              {/* Tournament Switcher */}
              {currentTournament && (
                <div className="relative ml-4">
                  <button
                    onClick={() => setShowTournamentDropdown(!showTournamentDropdown)}
                    className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {currentTournament.name}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </button>

                  {showTournamentDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-2">
                        <button
                          onClick={() => {
                            setShowTournamentDropdown(false);
                            router.push('/tournament/create');
                          }}
                          className="w-full flex items-center space-x-2 px-4 py-2 text-left hover:bg-blue-50 rounded-lg text-blue-600 font-medium"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Create New Tournament</span>
                        </button>
                        <div className="border-t my-2"></div>
                        {userTournaments.map((tournament) => (
                          <button
                            key={tournament.id}
                            onClick={() => handleTournamentSwitch(tournament)}
                            className={`w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 ${currentTournament.id === tournament.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                              }`}
                          >
                            <div className="font-medium">{tournament.name}</div>
                            <div className="text-xs text-gray-500">{tournament.code}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

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
