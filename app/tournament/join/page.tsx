'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Trophy, Users } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { getTournament } from '@/lib/firestore';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '@/lib/firebase';

function JoinTournamentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const codeParam = searchParams.get('code');
  const { user, addTournament, setCurrentTournament } = useAppStore();

  const [code, setCode] = useState(codeParam || '');
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tournament, setTournament] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      router.push(`/auth?action=join&code=${code}`);
    }
  }, [user, router, code]);

  const handleFindTournament = async () => {
    if (code.length !== 6) {
      setError('Tournament code must be 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const foundTournament = await getTournament(code.toUpperCase());

      if (!foundTournament) {
        setError('Tournament not found. Please check the code and try again.');
        setTournament(null);
      } else {
        setTournament(foundTournament);
      }
    } catch (err) {
      console.error('Error finding tournament:', err);
      setError('Failed to find tournament. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTournament = async () => {
    if (!user || !tournament || !teamName) return;

    setLoading(true);
    setError('');

    try {
      // Create owner object
      const newOwner = {
        userId: user.id,
        email: user.email,
        name: user.name,
        teamName: teamName,
        budget: tournament.budget,
        remainingBudget: tournament.budget,
        players: [],
        points: 0,
      };

      // Update tournament in Firestore
      const tournamentRef = doc(db, 'tournaments', tournament.id);
      await updateDoc(tournamentRef, {
        owners: arrayUnion(newOwner)
      });

      // Update local state
      const updatedTournament = {
        ...tournament,
        owners: [...tournament.owners, newOwner]
      };

      addTournament(updatedTournament);
      setCurrentTournament(updatedTournament);

      // Navigate to dashboard
      router.push('/dashboard');
    } catch (err) {
      console.error('Error joining tournament:', err);
      setError('Failed to join tournament. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <Trophy className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Join Tournament
          </h1>
          <p className="text-gray-600">
            Enter the tournament code to join
          </p>
        </div>

        {!tournament ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tournament Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl font-bold tracking-widest focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleFindTournament}
              disabled={code.length !== 6 || loading}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Finding Tournament...' : 'Find Tournament'}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-900 mb-3">
                {tournament.name}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-700">Budget:</span>
                  <span className="font-semibold">₹{(tournament.budget / 10000000).toFixed(1)}Cr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Current Owners:</span>
                  <span className="font-semibold">{tournament.owners?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-700">Status:</span>
                  <span className="font-semibold capitalize">{tournament.status}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Team Name
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="e.g., Thunder Strikers"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={() => setTournament(null)}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleJoinTournament}
                disabled={!teamName || loading}
                className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Joining...' : 'Join Tournament'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function JoinTournamentPage() {
  return (
    <Suspense fallback={
      <div className="max-w-2xl mx-auto py-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <JoinTournamentContent />
    </Suspense>
  );
}
