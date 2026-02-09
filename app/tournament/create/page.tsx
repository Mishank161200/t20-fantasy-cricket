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
  const [step, setStep] = useState(1);
  const [tournamentName, setTournamentName] = useState('');
  const [budget, setBudget] = useState(10000000);
  const [tournamentCode] = useState(generateTournamentCode());
  const [copied, setCopied] = useState(false);
  const [owners, setOwners] = useState<Array<{ email: string; name: string; teamName: string }>>([]);
  const [newOwner, setNewOwner] = useState({ email: '', name: '', teamName: '' });

  const handleCopyCode = () => {
    navigator.clipboard.writeText(tournamentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddOwner = () => {
    if (newOwner.email && newOwner.name && newOwner.teamName) {
      setOwners([...owners, newOwner]);
      setNewOwner({ email: '', name: '', teamName: '' });
    }
  };

  const handleStartAuction = async () => {
    if (!user) {
      router.push('/auth?action=create');
      return;
    }

    try {
      // Create tournament data
      const tournamentData = {
        id: tournamentCode,
        code: tournamentCode,
        hostId: user.id,
        name: tournamentName,
        budget: budget,
        status: 'auction' as const,
        owners: owners.map((owner, idx) => ({
          userId: `user-${idx}`,
          email: owner.email,
          name: owner.name,
          teamName: owner.teamName,
          budget: budget,
          remainingBudget: budget,
          players: [],
          points: 0,
        })),
        createdAt: new Date(),
      };

      // Save to Firebase
      await saveTournament(tournamentData);
      await addTournamentToUser(user.id, tournamentCode);

      // Update local state
      addTournament(tournamentData);

      // Navigate to auction
      router.push('/dashboard/auction');
    } catch (error) {
      console.error('Error creating tournament:', error);
      alert('Failed to create tournament. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${s <= step
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
                  }`}
              >
                {s}
              </div>
              {s < 3 && (
                <div
                  className={`w-24 h-1 mx-2 ${s < step ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className={step === 1 ? 'text-blue-600 font-medium' : 'text-gray-600'}>
            Setup
          </span>
          <span className={step === 2 ? 'text-blue-600 font-medium' : 'text-gray-600'}>
            Add Owners
          </span>
          <span className={step === 3 ? 'text-blue-600 font-medium' : 'text-gray-600'}>
            Ready
          </span>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Tournament Setup
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tournament Name
                </label>
                <input
                  type="text"
                  value={tournamentName}
                  onChange={(e) => setTournamentName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Friends World Cup League"
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
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!tournamentName}
              className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Add Team Owners
            </h2>

            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <input
                  type="email"
                  value={newOwner.email}
                  onChange={(e) => setNewOwner({ ...newOwner, email: e.target.value })}
                  placeholder="Email"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  value={newOwner.name}
                  onChange={(e) => setNewOwner({ ...newOwner, name: e.target.value })}
                  placeholder="Owner Name"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="text"
                  value={newOwner.teamName}
                  onChange={(e) => setNewOwner({ ...newOwner, teamName: e.target.value })}
                  placeholder="Team Name"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleAddOwner}
                className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Owner
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {owners.map((owner, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-semibold text-gray-900">{owner.name}</div>
                    <div className="text-sm text-gray-600">{owner.email}</div>
                    <div className="text-sm font-medium text-blue-600">{owner.teamName}</div>
                  </div>
                </div>
              ))}
            </div>

            {owners.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>No owners added yet</p>
              </div>
            )}

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={owners.length < 2}
                className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="text-center mb-6">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Ready to Start!
              </h2>
              <p className="text-gray-600">
                Your tournament is set up. Start the auction when all owners are ready.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tournament:</span>
                  <span className="font-semibold">{tournamentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Budget:</span>
                  <span className="font-semibold">{formatCurrency(budget)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Owners:</span>
                  <span className="font-semibold">{owners.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Code:</span>
                  <span className="font-mono font-bold">{tournamentCode}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleStartAuction}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Start Auction
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
