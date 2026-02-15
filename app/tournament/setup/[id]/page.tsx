'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Users, Plus, Trash2, Save, Gavel } from 'lucide-react';
import { getTournament, updateTournament } from '@/lib/firestore';
import { useAppStore } from '@/lib/store';
import { Tournament, TournamentOwner } from '@/lib/types';
import { WORLD_CUP_PLAYERS } from '@/lib/players';

export default function ManualSetupPage() {
  const router = useRouter();
  const params = useParams();
  const tournamentId = params.id as string;
  const { setCurrentTournament } = useAppStore();

  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [owners, setOwners] = useState<TournamentOwner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<{ ownerIndex: number; playerId: string; playerName: string } | null>(null);
  const [customPrice, setCustomPrice] = useState('');

  useEffect(() => {
    loadTournament();
  }, [tournamentId]);

  const loadTournament = async () => {
    try {
      const tournamentData = await getTournament(tournamentId);
      if (tournamentData) {
        setTournament(tournamentData);
        setOwners(tournamentData.owners || []);
      }
    } catch (error) {
      console.error('Error loading tournament:', error);
      alert('Failed to load tournament');
    } finally {
      setLoading(false);
    }
  };

  const addOwner = () => {
    const newOwner: TournamentOwner = {
      userId: `manual_${Date.now()}`,
      email: '',
      name: '',
      teamName: '',
      budget: tournament?.budget || 10000000,
      remainingBudget: tournament?.budget || 10000000,
      players: [],
      points: 0,
    };
    setOwners([...owners, newOwner]);
  };

  const updateOwner = (index: number, field: keyof TournamentOwner, value: any) => {
    const updated = [...owners];
    updated[index] = { ...updated[index], [field]: value };
    setOwners(updated);
  };

  const removeOwner = (index: number) => {
    // Get all players that have been assigned to any owner
    const getAssignedPlayerIds = () => {
      const assignedIds = new Set<string>();
      owners.forEach(owner => {
        owner.players.forEach(p => assignedIds.add(p.playerId));
      });
      return assignedIds;
    };

    const openPriceModal = (ownerIndex: number, playerId: string) => {
      const player = WORLD_CUP_PLAYERS.find(p => p.id === playerId);
      if (player) {
        setSelectedPlayer({ ownerIndex, playerId, playerName: player.name });
        setCustomPrice(player.basePrice.toString());
        setShowPriceModal(true);
      }
    };

    const confirmAddPlayer = () => {
      if (!selectedPlayer) return;

      const price = parseInt(customPrice);
      if (isNaN(price) || price <= 0) {
        alert('Please enter a valid price');
        return;
      }

      const updated = [...owners];
      const owner = updated[selectedPlayer.ownerIndex];

      // Check if already owns player
      if (owner.players.some(p => p.playerId === selectedPlayer.playerId)) {
        alert('Owner already has this player!');
        return;
      }

      // Check budget
      if (owner.remainingBudget < price) {
        alert('Not enough budget!');
        return;
      }

      // Check squad size (15-20 players)
      if (owner.players.length >= 20) {
        alert('Maximum 20 players allowed per squad!');
        return;
      }

      owner.players.push({
        playerId: selectedPlayer.playerId,
        price,
        purchasedAt: new Date(),
      });
      owner.remainingBudget -= price;

      setOwners(updated);
      setShowPriceModal(false);
      setSelectedPlayer(null);
      setCustomPrice('');
    };

    const removePlayerFromOwner = (ownerIndex: number, playerIndex: number) => {
      const updated = [...owners];
      const owner = updated[ownerIndex];
      const player = owner.players[playerIndex];

      owner.remainingBudget += player.price;
      owner.players.splice(playerIndex, 1);

      setOwners(updated);
    };

    const handleSave = async () => {
      // Validate
      for (const owner of owners) {
        if (!owner.name || !owner.teamName) {
          alert('All owners must have a name and team name');
          return;
        }
        if (owner.players.length < 15) {
          alert(`${owner.name} must have at least 15 players (currently has ${owner.players.length})`);
          return;
        }
        if (owner.players.length > 20) {
          alert(`${owner.name} cannot have more than 20 players (currently has ${owner.players.length})`);
          return;


          const handleStartAuction = async () => {
            // Validate owners exist
            if (owners.length === 0) {
              alert('Please add at least one owner before starting auction');
              return;
            }

            for (const owner of owners) {
              if (!owner.name || !owner.teamName) {
                alert('All owners must have a name and team name');
                return;
              }
            }

            if (!confirm('Are you sure you want to start the auction? Owners can join and bid on players in real-time.')) {
              return;
            }

            // Collect invited emails
            const invitedEmails = owners
              .map(owner => owner.email.toLowerCase().trim())
              .filter(email => email.length > 0);

            setSaving(true);
            try {
              await updateTournament(tournamentId, {
                owners,
                const assignedPlayerIds = getAssignedPlayerIds();

                return(
    <div className = "max-w-7xl mx-auto py-8 px-4" >
                    {/* Price Modal */ }
      { showPriceModal && selectedPlayer && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Set Purchase Price</h3>
                      <p className="text-gray-600 mb-4">
                        Player: <span className="font-semibold">{selectedPlayer.playerName}</span>
                      </p>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Purchase Price (₹)
                        </label>
                        <input
                          type="number"
                          value={customPrice}
                          onChange={(e) => setCustomPrice(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                          placeholder="Enter price"
                          autoFocus
                          onKeyPress={(e) => e.key === 'Enter' && confirmAddPlayer()}
                        />
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => {
                            setShowPriceModal(false);
                            setSelectedPlayer(null);
                            setCustomPrice('');
                          }}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={confirmAddPlayer}
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                        >
                          Add Player
                        </button>
                      </div>
                    </div>
                  </div>
                )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manual Tournament Setup</h1>
        <p className="text-gray-600">Set up owners and assign players to their squads</p>
        <p className="text-sm text-gray-500 mt-2">Tournament: {tournament.name} | owner.remainingBudget.toLocaleString()}</span>
              </div>
              <select
                onChange={(e) => {
                  const playerId = e.target.value;
                  if (playerId) {
                    openPriceModal(ownerIndex, playerId);
                    e.target.value = '';
                  }
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
              >
                <option value="">Add Player...</option>
                {WORLD_CUP_PLAYERS.filter(player => !assignedPlayerIds.has(player.id)).map((player) => (
                  <option key={player.id} value={player.id}>
                    {player.name} - {player.role} - Base: ₹{player.basePrice.toLocaleString()}
      .map(owner => owner.email.toLowerCase().trim())
      .filter(email => email.length > 0);

    setSaving(true);
    try {
      await updateTournament(tournamentId, {
        owners,
        status: 'active',
        invitedEmails,
      });

      const updatedTournament = await getTournament(tournamentId);
      if (updatedTournament) {
        setCurrentTournament(updatedTournament);
      }playerPurchase.price.toLocaleString()}

      alert('Tournament setup complete! Invited users can now login and will automatically join.');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error saving tournament:', error);
      alert('Failed to save tournament setup');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tournament...</p>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return (between items-center pt-6">
          <button
            onClick={() => router.push('/tournaments')}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <div className="flex space-x-4">
            <button
              onClick={handleStartAuction}
              disabled={saving || owners.length === 0}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Gavel className="w-5 h-5" />
              <span>{saving ? 'Starting...' : 'Start Auction Instead'}</span>
            </button>
            <button
              onClick={handleSave}
              disabled={saving || owners.length === 0}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>{saving ? 'Saving...' : 'Save & Complete Setup'}</span>
            </button>
          </div
  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Manual Tournament Setup</h1>
        <p className="text-gray-600">Set up owners and assign players to their squads</p>
        <p className="text-sm text-gray-500 mt-2">Tournament: {tournament.name} | Budget: ₹{(tournament.budget / 10000000).toFixed(1)}Cr per team</p>
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>💡 Tip:</strong> Enter email addresses for owners, and they'll automatically join the tournament when they log in or sign up!
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {owners.map((owner, ownerIndex) => (
          <div key={ownerIndex} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 grid grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Owner Name"
                  value={owner.name}
                  onChange={(e) => updateOwner(ownerIndex, 'name', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
                <input
                  type="text"
                  placeholder="Team Name"
                  value={owner.teamName}
                  onChange={(e) => updateOwner(ownerIndex, 'teamName', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
                <input
                  type="email"
                  placeholder="Email (for auto-join)"
                  value={owner.email}
                  onChange={(e) => updateOwner(ownerIndex, 'email', e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
              <button
                onClick={() => removeOwner(ownerIndex)}
                className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Players: {owner.players.length}/20 (min 15) |
                Remaining Budget: <span className="font-semibold text-blue-600">₹{(owner.remainingBudget / 10000000).toFixed(2)}Cr</span>
              </div>
              <select
                onChange={(e) => {
                  const [playerId, price] = e.target.value.split('|');
                  if (playerId && price) {
                    addPlayerToOwner(ownerIndex, playerId, parseInt(price));
                    e.target.value = '';
                  }
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm text-gray-900"
              >
                <option value="">Add Player...</option>
                {WORLD_CUP_PLAYERS.map((player) => (
                  <option key={player.id} value={`${player.id}|${player.basePrice}`}>
                    {player.name} - {player.role} - ₹{(player.basePrice / 10000000).toFixed(2)}Cr
                  </option>
                ))}
              </select>
            </div>

            {owner.players.length > 0 && (
              <div className="space-y-2">
                {owner.players.map((playerPurchase, playerIndex) => {
                  const player = WORLD_CUP_PLAYERS.find(p => p.id === playerPurchase.playerId);
                  return (
                    <div key={playerIndex} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-900">{player?.name || 'Unknown'}</span>
                        <span className="text-sm text-gray-500">{player?.role}</span>
                        <span className="text-sm font-semibold text-blue-600">₹{(playerPurchase.price / 10000000).toFixed(2)}Cr</span>
                      </div>
                      <button
                        onClick={() => removePlayerFromOwner(ownerIndex, playerIndex)}
                        className="text-red-600 hover:bg-red-50 p-1 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addOwner}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Add Owner</span>
        </button>

        <div className="flex justify-end space-x-4 pt-6">
          <button
            onClick={() => router.push('/tournaments')}
            className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || owners.length === 0}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Saving...' : 'Save & Complete Setup'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
