'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, Users, Calendar, Award, LogIn } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [action, setAction] = useState<'create' | 'join' | null>(null);
  const [tournamentCode, setTournamentCode] = useState('');

  const handleCreateTournament = () => {
    router.push('/auth?action=create');
  };

  const handleJoinTournament = () => {
    if (tournamentCode.length === 6) {
      router.push(`/auth?action=join&code=${tournamentCode}`);
    }
  };

  const handleSignIn = () => {
    router.push('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-16 h-16 text-yellow-300" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            T20 World Cup Fantasy
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Create your dream team, compete with friends, and experience the thrill of ICC T20 World Cup 2026
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <Users className="w-10 h-10 text-yellow-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Play with Friends
            </h3>
            <p className="text-white/80 text-sm">
              Create private tournaments with up to 20 team owners
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <Calendar className="w-10 h-10 text-yellow-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Live Scoring
            </h3>
            <p className="text-white/80 text-sm">
              Real-time points based on actual match performances
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <Award className="w-10 h-10 text-yellow-300 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Compete & Win
            </h3>
            <p className="text-white/80 text-sm">
              Track your progress on the leaderboard throughout the tournament
            </p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="max-w-md mx-auto">
          {!action ? (
            <div className="space-y-4">
              <button
                onClick={handleSignIn}
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <LogIn className="w-6 h-6" />
                <span className="text-xl">Sign In</span>
              </button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/30"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white/80">
                    or
                  </span>
                </div>
              </div>
              <button
                onClick={() => setAction('create')}
                className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg"
              >
                <span className="text-xl">Create New Tournament</span>
              </button>
              <button
                onClick={() => setAction('join')}
                className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-lg text-white font-semibold py-4 px-6 rounded-xl transition-all transform hover:scale-105 border-2 border-white/30"
              >
                <span className="text-xl">Join Tournament</span>
              </button>
            </div>
          ) : action === 'create' ? (
            <div className="bg-white rounded-xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Create Tournament
              </h2>
              <p className="text-gray-600 mb-6">
                You'll be able to set the budget, invite friends, and host the auction.
              </p>
              <button
                onClick={handleCreateTournament}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
              >
                Continue to Sign In
              </button>
              <button
                onClick={() => setAction(null)}
                className="w-full mt-3 text-gray-600 hover:text-gray-900 font-medium"
              >
                Back
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Join Tournament
              </h2>
              <p className="text-gray-600 mb-6">
                Enter the 6-digit code shared by your tournament host.
              </p>
              <input
                type="text"
                value={tournamentCode}
                onChange={(e) => setTournamentCode(e.target.value.toUpperCase())}
                placeholder="Enter code (e.g., ABC123)"
                maxLength={6}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg mb-4 text-center text-2xl font-bold tracking-widest focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={handleJoinTournament}
                disabled={tournamentCode.length !== 6}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Sign In
              </button>
              <button
                onClick={() => setAction(null)}
                className="w-full mt-3 text-gray-600 hover:text-gray-900 font-medium"
              >
                Back
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-white/70">
          <p className="text-sm">
            ICC T20 World Cup 2026 Fantasy League
          </p>
        </div>
      </div>
    </div>
  );
}
