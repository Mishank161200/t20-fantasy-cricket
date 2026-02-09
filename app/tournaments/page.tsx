'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { getUserTournaments } from '@/lib/firestore';
import { Trophy, Plus, Users, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function TournamentsPage() {
  const router = useRouter();
  const { user, userTournaments, setUserTournaments, setCurrentTournament } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/auth');
      return;
    }

    loadTournaments();
  }, [user]);

  const loadTournaments = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const tournaments = await getUserTournaments(user.id);
      setUserTournaments(tournaments);
    } catch (error) {
      console.error('Error loading tournaments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTournament = (tournament: any) => {
    setCurrentTournament(tournament);
    router.push('/dashboard');
  };

  const handleCreateNew = () => {
    router.push('/tournament/create');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tournaments</h1>
        <p className="text-gray-600">Select a tournament to view or create a new one</p>
      </div>

      {/* Create New Tournament Button */}
      <button
        onClick={handleCreateNew}
        className="w-full mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-3"
      >
        <Plus className="w-6 h-6" />
        <span className="text-lg font-semibold">Create New Tournament</span>
      </button>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading tournaments...</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && userTournaments.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Tournaments Yet</h3>
          <p className="text-gray-600 mb-6">Create your first tournament to get started!</p>
        </div>
      )}

      {/* Tournaments List */}
      {!loading && userTournaments.length > 0 && (
        <div className="grid gap-4">
          {userTournaments.map((tournament) => (
            <button
              key={tournament.id}
              onClick={() => handleSelectTournament(tournament)}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-600 hover:shadow-lg transition-all text-left group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 mb-1">
                    {tournament.name}
                  </h3>
                  <p className="text-sm text-gray-600">Code: {tournament.code}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${tournament.status === 'auction' ? 'bg-orange-100 text-orange-700' :
                    tournament.status === 'active' ? 'bg-green-100 text-green-700' :
                      tournament.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                        'bg-blue-100 text-blue-700'
                  }`}>
                  {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{tournament.owners.length} owners</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Trophy className="w-4 h-4" />
                  <span>₹{(tournament.budget / 10000000).toFixed(1)}Cr</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(tournament.createdAt)}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
