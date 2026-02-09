'use client';

import { Trophy, Medal, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function LeaderboardPage() {
  // Mock data - will be replaced with real data from Firebase
  const leaderboard = [
    { rank: 1, name: 'John Doe', teamName: 'Thunder Strikers', points: 520, change: 0, trend: 'up' },
    { rank: 2, name: 'Jane Smith', teamName: 'Royal Challengers', points: 485, change: 1, trend: 'up' },
    { rank: 3, name: 'You', teamName: 'Champions XI', points: 450, change: -1, trend: 'down' },
    { rank: 4, name: 'Mike Johnson', teamName: 'Super Kings', points: 430, change: 2, trend: 'up' },
    { rank: 5, name: 'Sarah Williams', teamName: 'Knight Riders', points: 410, change: 0, trend: 'same' },
    { rank: 6, name: 'David Brown', teamName: 'Mumbai Indians', points: 395, change: -2, trend: 'down' },
    { rank: 7, name: 'Emma Davis', teamName: 'Delhi Capitals', points: 380, change: 1, trend: 'up' },
    { rank: 8, name: 'Chris Wilson', teamName: 'Punjab Kings', points: 365, change: -1, trend: 'down' },
  ];

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-600" />;
    return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
        <p className="text-gray-600">See how you stack up against other team owners</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
        {/* 2nd Place */}
        <div className="text-center pt-12">
          <div className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl p-6 shadow-lg">
            <Medal className="w-12 h-12 text-white mx-auto mb-3" />
            <div className="text-white font-bold text-lg mb-1">{leaderboard[1].name}</div>
            <div className="text-white/90 text-sm mb-2">{leaderboard[1].teamName}</div>
            <div className="text-3xl font-bold text-white">{leaderboard[1].points}</div>
            <div className="text-white/80 text-xs">points</div>
          </div>
        </div>

        {/* 1st Place */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl p-6 shadow-xl">
            <Trophy className="w-16 h-16 text-white mx-auto mb-3" />
            <div className="text-white font-bold text-xl mb-1">{leaderboard[0].name}</div>
            <div className="text-white/90 text-sm mb-2">{leaderboard[0].teamName}</div>
            <div className="text-4xl font-bold text-white">{leaderboard[0].points}</div>
            <div className="text-white/80 text-sm">points</div>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="text-center pt-16">
          <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl p-6 shadow-lg">
            <Medal className="w-10 h-10 text-white mx-auto mb-3" />
            <div className="text-white font-bold text-lg mb-1">{leaderboard[2].name}</div>
            <div className="text-white/90 text-sm mb-2">{leaderboard[2].teamName}</div>
            <div className="text-3xl font-bold text-white">{leaderboard[2].points}</div>
            <div className="text-white/80 text-xs">points</div>
          </div>
        </div>
      </div>

      {/* Full Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Rank</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Owner</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Team Name</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-900">Points</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-900">Trend</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry) => (
                <tr
                  key={entry.rank}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${entry.name === 'You' ? 'bg-blue-50' : ''
                    }`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      {getRankIcon(entry.rank)}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-semibold text-gray-900">
                      {entry.name}
                      {entry.name === 'You' && (
                        <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded">
                          YOU
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{entry.teamName}</td>
                  <td className="py-4 px-6 text-right">
                    <span className="text-xl font-bold text-blue-600">{entry.points}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center space-x-1">
                      {getTrendIcon(entry.trend)}
                      {entry.change !== 0 && (
                        <span className={`text-sm font-medium ${entry.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                          {Math.abs(entry.change)}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm text-gray-600 mb-1">Your Best Rank</div>
          <div className="text-3xl font-bold text-gray-900">#2</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm text-gray-600 mb-1">Total Participants</div>
          <div className="text-3xl font-bold text-gray-900">{leaderboard.length}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-sm text-gray-600 mb-1">Points Behind Leader</div>
          <div className="text-3xl font-bold text-gray-900">
            {leaderboard[0].points - 450}
          </div>
        </div>
      </div>
    </div>
  );
}
