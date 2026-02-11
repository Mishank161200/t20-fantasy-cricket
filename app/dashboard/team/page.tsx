'use client';

import { useState } from 'react';
import { WORLD_CUP_PLAYERS } from '@/lib/players';
import { getPlayerRoleColor } from '@/lib/utils';
import { Users, Search } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function TeamPage() {
  const router = useRouter();
  const { currentTournament, user } = useAppStore();
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('All');

  if (!currentTournament) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Users className="w-16 h-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No Tournament Selected</h2>
        <p className="text-gray-600 mb-6">Select a tournament to manage your team</p>
        <button
          onClick={() => router.push('/tournaments')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          View Tournaments
        </button>
      </div>
    );
  }

  // Get owned players from current tournament
  const userOwner = currentTournament.owners?.find(o => o.userId === user?.id);
  const ownedPlayerIds = userOwner?.players?.map(p => p.playerId) || [];
  const ownedPlayers = WORLD_CUP_PLAYERS.filter(player => ownedPlayerIds.includes(player.id));

  const filteredPlayers = ownedPlayers.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      player.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'All' || player.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const togglePlayerSelection = (playerId: string) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(selectedPlayers.filter(id => id !== playerId));
    } else if (selectedPlayers.length < 12) {
      setSelectedPlayers([...selectedPlayers, playerId]);
    }
  };

  const canSaveTeam = selectedPlayers.length === 12;
  const totalSquadSize = ownedPlayers.length;
  const isValidSquad = totalSquadSize >= 15 && totalSquadSize <= 20;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Team</h1>
        <p className="text-gray-600">Select your playing 12 for the next match</p>
        {!isValidSquad && (
          <div className="mt-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-800 text-sm font-medium">
              ⚠️ Your squad must have between 15-20 players total (currently: {totalSquadSize})
            </p>
          </div>
        )}
      </div>

      {/* Team Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm font-medium">Selected</span>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900">
            {selectedPlayers.length}/12
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-sm p-6 text-white">
          <div className="text-sm font-medium mb-2">Team Status</div>
          <div className="text-lg font-bold">
            {canSaveTeam ? 'Ready ✓' : 'Incomplete'}
          </div>
          <button
            disabled={!canSaveTeam}
            className="mt-2 w-full bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Team
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search players..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>
          <div className="flex space-x-2">
            {['All', 'Batsman', 'Bowler', 'All-Rounder', 'Wicket-Keeper'].map((role) => (
              <button
                key={role}
                onClick={() => setFilterRole(role)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${filterRole === role
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Player List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Player</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Role</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Country</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map((player) => {
                const isSelected = selectedPlayers.includes(player.id);

                return (
                  <tr
                    key={player.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${isSelected ? 'bg-blue-50' : ''
                      }`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => togglePlayerSelection(player.id)}
                          className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">{player.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPlayerRoleColor(player.role)}`}>
                        {player.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{player.country}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Selection Rules</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Your squad must have 15-20 players total</li>
          <li>• Select exactly 12 players for your playing team</li>
          <li>• You can change your team before each match</li>
          <li>• Make sure to save your team before the match starts</li>
          <li>• Points will be calculated automatically based on the scoring system</li>
        </ul>
      </div>
    </div>
  );
}
