'use client';

import { useState } from 'react';
import { WORLD_CUP_SCHEDULE } from '@/lib/schedule';
import { WORLD_CUP_PLAYERS } from '@/lib/players';
import { formatDate } from '@/lib/utils';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useAppStore } from '@/lib/store';
import { calculatePlayerPoints } from '@/lib/scoring';
import { updateTournament, getTournament } from '@/lib/firestore';
import { MatchPerformance } from '@/lib/types';

export default function SchedulePage() {
  const { currentTournament, user, setCurrentTournament } = useAppStore();
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [scoring, setScoring] = useState(false);
  const [scoringMatchId, setScoringMatchId] = useState<string | null>(null);



  const upcomingMatches = WORLD_CUP_SCHEDULE.filter(m => m.status === 'scheduled');
  const liveMatches = WORLD_CUP_SCHEDULE.filter(m => m.status === 'live');
  const completedMatches = WORLD_CUP_SCHEDULE.filter(m => m.status === 'completed');

  // Filter matches based on active tab
  const getDisplayMatches = () => {
    if (activeTab === 'upcoming') {
      return [...liveMatches, ...upcomingMatches];
    } else if (activeTab === 'completed') {
      return completedMatches;
    }
    return WORLD_CUP_SCHEDULE; // all
  };

  const displayMatches = getDisplayMatches();

  const isHost = currentTournament?.hostId === user?.id;

  const handleAutoScore = async (match: any) => {
    if (!currentTournament) {
      alert('No tournament selected');
      return;
    }

    // Check if match has already been scored
    if (currentTournament.matchPerformances && currentTournament.matchPerformances[match.id]) {
      const confirm = window.confirm(
        `This match has already been scored.\n\nDo you want to re-score it? This will replace the existing scores.`
      );
      if (!confirm) return;
    }

    try {
      setScoring(true);
      setScoringMatchId(match.id);
      console.log('Auto-scoring match:', match.id);

      // Call auto-score API
      const response = await fetch('/api/cricket/auto-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          matchId: match.id
        })
      });

      console.log('API Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || errorData.details || 'Failed to fetch match statistics');
      }

      const responseData = await response.json();
      console.log('API Response data:', responseData);

      const { performances } = responseData;

      if (!performances || performances.length === 0) {
        throw new Error('No player statistics found for this match. The match data may not be available yet.');
      }

      console.log('Extracted performances:', performances.length, 'players');

      // Update owner points based on performances
      const updatedOwners = currentTournament.owners.map(owner => {
        let additionalPoints = 0;

        // Calculate points from this match for this owner
        owner.players.forEach(playerPurchase => {
          const performance = performances.find((p: MatchPerformance) => p.playerId === playerPurchase.playerId);
          if (performance) {
            additionalPoints += performance.points;
          }
        });

        return {
          ...owner,
          points: owner.points + additionalPoints
        };
      });

      // Store match performances in tournament data
      const matchPerformances = currentTournament.matchPerformances || {};
      matchPerformances[match.id] = performances;

      // Update tournament in Firestore
      await updateTournament(currentTournament.id, {
        owners: updatedOwners,
        matchPerformances
      });

      // Refresh tournament data
      const updated = await getTournament(currentTournament.id);
      if (updated) {
        setCurrentTournament(updated);
      }

      alert(`✅ Match scored successfully!\n\nPlayers found: ${performances.length}\nPoints calculated and leaderboard updated.`);
    } catch (error) {
      console.error('Error auto-scoring match:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`❌ Failed to auto-score match:\n\n${errorMessage}\n\nPlease try again or check if match data is available.`);
    } finally {
      setScoring(false);
      setScoringMatchId(null);
    }
  };


  const MatchCard = ({ match }: { match: any }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-gray-600">Match {match.matchNumber}</span>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${match.status === 'live'
            ? 'bg-red-100 text-red-700'
            : match.status === 'completed'
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-100 text-blue-700'
            }`}
        >
          {match.status === 'live' ? 'LIVE' : match.status === 'completed' ? 'Completed' : 'Upcoming'}
        </span>
      </div>

      <div className="flex items-center justify-center space-x-6 mb-6">
        <div className="text-center flex-1">
          <div className="text-4xl mb-2">{match.team1Flag}</div>
          <div className="font-bold text-gray-900">{match.team1}</div>
        </div>
        <div className="text-2xl font-bold text-gray-400">VS</div>
        <div className="text-center flex-1">
          <div className="text-4xl mb-2">{match.team2Flag}</div>
          <div className="font-bold text-gray-900">{match.team2}</div>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2" />
          {format(match.date, 'EEEE, MMMM d, yyyy')}
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          {format(match.date, 'h:mm a')} IST
        </div>
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2" />
          {match.venue}
        </div>
      </div>

      {match.status === 'scheduled' && (
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Select Team for This Match
        </button>
      )}

      {match.status === 'completed' && match.result && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg">
          <div className="text-sm font-medium text-green-800">{match.result}</div>
        </div>
      )}

      {isHost && match.status === 'completed' && (
        <button
          onClick={() => handleAutoScore(match)}
          disabled={scoring && scoringMatchId === match.id}
          className="mt-4 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {scoring && scoringMatchId === match.id ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Fetching Stats...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Auto-Score Match</span>
            </>
          )}
        </button>
      )}
    </div>
  );

  return (
    <div>
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Match Schedule</h1>
          <p className="text-gray-600">ICC T20 World Cup 2026 - All times in IST</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8 border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('all')}
            className={`pb-4 px-2 font-semibold transition-colors relative ${activeTab === 'all'
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            All Matches
            {activeTab === 'all' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`pb-4 px-2 font-semibold transition-colors relative ${activeTab === 'upcoming'
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            Upcoming ({upcomingMatches.length + liveMatches.length})
            {activeTab === 'upcoming' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-4 px-2 font-semibold transition-colors relative ${activeTab === 'completed'
              ? 'text-blue-600'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            Completed ({completedMatches.length})
            {activeTab === 'completed' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
            )}
          </button>
        </div>
      </div>

      {/* Live Matches Banner (always show if there are live matches) */}
      {liveMatches.length > 0 && activeTab !== 'completed' && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-3 h-3 bg-red-600 rounded-full mr-3 animate-pulse"></span>
            Live Now
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      )}

      {/* Matches Grid */}
      <div className="mb-12">
        {activeTab === 'all' && <h2 className="text-2xl font-bold text-gray-900 mb-6">All Matches</h2>}
        {activeTab === 'upcoming' && <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Matches</h2>}
        {activeTab === 'completed' && <h2 className="text-2xl font-bold text-gray-900 mb-6">Completed Matches</h2>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayMatches
            .filter(m => activeTab === 'upcoming' ? m.status !== 'live' : true) // Exclude live from upcoming section since we show them separately
            .map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
        </div>

        {displayMatches.filter(m => activeTab === 'upcoming' ? m.status !== 'live' : true).length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No matches found
          </div>
        )}
      </div>
    </div>
  );
}
