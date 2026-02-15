'use client';

import { Trophy, TrendingUp, Star, Users, Gavel, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const { currentTournament, user } = useAppStore();

  // Get user's data from current tournament
  const userOwner = currentTournament?.owners?.find(o => o.userId === user?.id);
  const userStats = {
    totalPoints: userOwner?.points || 0,
    rank: (currentTournament?.owners ? currentTournament.owners.sort((a, b) => b.points - a.points).findIndex(o => o.userId === user?.id) + 1 : 0) || 0,
    teamName: userOwner?.teamName || 'My Team',
    totalPlayers: userOwner?.players?.length || 0,
  };

  if (!currentTournament) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Trophy className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Tournament Selected</h2>
        <p className="text-gray-600 mb-6">Create or join a tournament to get started</p>
        <div className="flex space-x-4">
          <button
            onClick={() => router.push('/tournament/create')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Create Tournament
          </button>
          <button
            onClick={() => router.push('/tournament/join')}
            className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Join Tournament
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Auction Alert Banner */}
      {currentTournament.status === 'auction' && (
        <div className="mb-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl shadow-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-full">
              <Gavel className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1">Auction in Progress!</h3>
              <p className="text-white/90 text-sm">The player auction is currently underway. Join now to bid on your favorite players!</p>
            </div>
            <button
              onClick={() => router.push('/dashboard/auction')}
              className="bg-white text-orange-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center space-x-2 whitespace-nowrap"
            >
              <Gavel className="w-5 h-5" />
              <span>Go to Auction</span>
            </button>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your tournament overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Total Points</span>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{userStats.totalPoints}</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Your Rank</span>
            <Trophy className="w-5 h-5 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900">#{userStats.rank || '-'}</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Team Name</span>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-xl font-bold text-gray-900">{userStats.teamName}</div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-sm p-6 text-white">
          <div className="text-sm font-medium mb-2">Your Squad</div>
          <div className="text-3xl font-bold mb-2">{userStats.totalPlayers}</div>
          <div className="text-xs text-white/80">players owned</div>
          <Link
            href="/dashboard/team"
            className="mt-3 inline-block bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors"
          >
            Manage Team
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tournament Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Tournament Details</h2>
            <Trophy className="w-6 h-6 text-blue-600" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Tournament Name</span>
              <span className="font-semibold text-gray-900">{currentTournament.name}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Budget</span>
              <span className="font-semibold text-gray-900">₹{currentTournament.budget.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Total Owners</span>
              <span className="font-semibold text-gray-900">{currentTournament.owners?.length || 0}/{currentTournament.maxOwners}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Status</span>
              <span className="font-semibold text-blue-600 capitalize">{currentTournament.status}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            <Star className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="space-y-3">
            {currentTournament.status === 'auction' && (
              <Link
                href="/dashboard/auction"
                className="block w-full p-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:opacity-90 transition-opacity text-center font-semibold flex items-center justify-center space-x-2"
              >
                <Gavel className="w-5 h-5" />
                <span>Join Auction</span>
              </Link>
            )}
            <Link
              href="/dashboard/team"
              className="block w-full p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity text-center font-semibold"
            >
              Manage Your Team
            </Link>
            <Link
              href="/dashboard/schedule"
              className="block w-full p-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:opacity-90 transition-opacity text-center font-semibold"
            >
              View Match Schedule
            </Link>
            <Link
              href="/dashboard/leaderboard"
              className="block w-full p-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:opacity-90 transition-opacity text-center font-semibold"
            >
              Check Leaderboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
