'use client';

import { Trophy, TrendingUp, Star, Users } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  // Mock data - will be replaced with real data from Firebase
  const userStats = {
    totalPoints: 450,
    rank: 3,
    teamName: 'Champions XI',
    nextMatch: 'India vs Pakistan - Today, 7:30 PM IST',
  };

  const topPlayers = [
    { name: 'Virat Kohli', points: 85, match: 'IND vs PAK' },
    { name: 'Jasprit Bumrah', points: 72, match: 'IND vs AUS' },
    { name: 'Jos Buttler', points: 68, match: 'ENG vs SA' },
  ];

  const recentMatches = [
    { id: 1, team1: 'India', team2: 'Pakistan', status: 'completed', yourPoints: 120 },
    { id: 2, team1: 'Australia', team2: 'England', status: 'completed', yourPoints: 95 },
    { id: 3, team1: 'South Africa', team2: 'West Indies', status: 'live', yourPoints: 45 },
  ];

  return (
    <div>
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
          <div className="text-3xl font-bold text-gray-900">#{userStats.rank}</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Team Name</span>
            <Users className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-xl font-bold text-gray-900">{userStats.teamName}</div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-sm p-6 text-white">
          <div className="text-sm font-medium mb-2">Next Match</div>
          <div className="text-sm font-semibold">{userStats.nextMatch}</div>
          <Link
            href="/dashboard/team"
            className="mt-3 inline-block bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors"
          >
            Select Team
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Performing Players */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Top Players</h2>
            <Star className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="space-y-4">
            {topPlayers.map((player, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-semibold text-gray-900">{player.name}</div>
                  <div className="text-sm text-gray-600">{player.match}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{player.points}</div>
                  <div className="text-xs text-gray-600">points</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Matches */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Matches</h2>
            <Link
              href="/dashboard/schedule"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentMatches.map((match) => (
              <div
                key={match.id}
                className="p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold text-gray-900">
                    {match.team1} vs {match.team2}
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${match.status === 'live'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-green-100 text-green-700'
                      }`}
                  >
                    {match.status === 'live' ? 'LIVE' : 'Completed'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">Your Points</div>
                  <div className="text-lg font-bold text-blue-600">{match.yourPoints}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/dashboard/team"
          className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl text-white text-center hover:opacity-90 transition-opacity"
        >
          <Users className="w-8 h-8 mx-auto mb-2" />
          <div className="font-semibold">Manage Team</div>
          <div className="text-sm opacity-90">Select your playing 12</div>
        </Link>
        <Link
          href="/dashboard/schedule"
          className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl text-white text-center hover:opacity-90 transition-opacity"
        >
          <Trophy className="w-8 h-8 mx-auto mb-2" />
          <div className="font-semibold">View Schedule</div>
          <div className="text-sm opacity-90">Upcoming matches</div>
        </Link>
        <Link
          href="/dashboard/leaderboard"
          className="p-6 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl text-white text-center hover:opacity-90 transition-opacity"
        >
          <TrendingUp className="w-8 h-8 mx-auto mb-2" />
          <div className="font-semibold">Leaderboard</div>
          <div className="text-sm opacity-90">Check rankings</div>
        </Link>
      </div>
    </div>
  );
}
