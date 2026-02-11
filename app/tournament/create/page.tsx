'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trophy, Users, DollarSign, Copy, Check } from 'lucide-react';
import { generateTournamentCode, formatCurrency } from '@/lib/utils';
import { useAppStore } from '@/lib/store';
import { saveTournament, addTournamentToUser } from '@/lib/firestore';

export default function CreateTournamentPage() {
  const router = useRouter();
  const { user, addTournament } = useAppStore();
  const [tournamentName, setTournamentName] = useState('');
  const [budget, setBudget] = useState(10000000);
  const [numOwners, setNumOwners] = useState(5);
  const [tournamentCode] = useState(generateTournamentCode());
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(tournamentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCreateTournament = async (status: 'auction' | 'active') => {
    if (!user) {
      router.push('/auth?action=create');
      return;
    }

    try {
      // Create tournament data with empty owners array - they will join via code
      const tournamentData = {
        id: tournamentCode,
        code: tournamentCode,
        hostId: user.id,
        name: tournamentName,
        budget: budget,
        maxOwners: numOwners,
        status: status,
        owners: [],
        createdAt: new Date(),
      };

      // Save to Firebase
      await saveTournament(tournamentData);
      await addTournamentToUser(user.id, tournamentCode);

      // Update local state
      addTournament(tournamentData);

      // Navigate based on status
      if (status === 'auction') {
        router.push('/dashboard/auction');
      } else {
        router.push(`/tournament/setup/${tournamentCode}`);
      }
    } catch (error) {
      console.error('Error creating tournament:', error);
      alert('Failed to create tournament. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <div className="text-center mb-8">
          <Trophy className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Tournament
          </h1>
          <p className="text-gray-600">
            Set up your fantasy tournament and invite friends to join
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tournament Name
            </label>
            <input
              type="text"
              value={tournamentName}
              onChange={(e) => setTournamentName(e.target.value)}
              placeholder="e.g., Friends T20 League"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Budget per Team
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={5000000}
                max={50000000}
                step={100000}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Current: {formatCurrency(budget)}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Number of Owners
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                value={numOwners}
                onChange={(e) => setNumOwners(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={2}
                max={20}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Players can join using the tournament code
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              Tournament Code
            </h3>
            <div className="flex items-center space-x-3">
              <code className="flex-1 bg-white px-4 py-2 rounded font-mono text-2xl font-bold tracking-widest text-center">
                {tournamentCode}
              </code>
              <button
                onClick={handleCopyCode}
                className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <p className="mt-2 text-sm text-blue-800">
              Share this code with friends to join your tournament
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4">
            <button
              onClick={() => handleCreateTournament('active')}
              disabled={!tournamentName}
              className="bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Manual Setup
            </button>
            <button
              onClick={() => handleCreateTournament('auction')}
              disabled={!tournamentName}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Auction
            </button>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Choose "Manual Setup" to assign players yourself, or "Start Auction" for live bidding
          </p>
        </div>
      </div>
    </div>
  );
}
