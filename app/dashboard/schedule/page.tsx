'use client';

import { useState } from 'react';
import { WORLD_CUP_SCHEDULE } from '@/lib/schedule';
import { formatDate } from '@/lib/utils';
import { Calendar, MapPin, Clock, Upload, X } from 'lucide-react';
import { format } from 'date-fns';
import { useAppStore } from '@/lib/store';
import { calculatePlayerPoints } from '@/lib/scoring';
import { updateTournament, getTournament } from '@/lib/firestore';
import { MatchPerformance } from '@/lib/types';

export default function SchedulePage() {
  const { currentTournament, user, setCurrentTournament } = useAppStore();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [scorecardData, setScorecardData] = useState('');
  const [uploading, setUploading] = useState(false);

  const upcomingMatches = WORLD_CUP_SCHEDULE.filter(m => m.status === 'scheduled');
  const liveMatches = WORLD_CUP_SCHEDULE.filter(m => m.status === 'live');
  const completedMatches = WORLD_CUP_SCHEDULE.filter(m => m.status === 'completed');

  const isHost = currentTournament?.hostId === user?.id;

  const handleUploadScorecard = async () => {
    if (!currentTournament || !selectedMatch) return;

    try {
      setUploading(true);

      // Parse the scorecard JSON
      const performances: MatchPerformance[] = JSON.parse(scorecardData);

      // Calculate points for each performance
      performances.forEach(perf => {
        perf.points = calculatePlayerPoints(perf);
      });

      // Update owner points based on performances
      const updatedOwners = currentTournament.owners.map(owner => {
        let additionalPoints = 0;

        // Calculate points from this match for this owner
        owner.players.forEach(playerPurchase => {
          const performance = performances.find(p => p.playerId === playerPurchase.playerId);
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
      matchPerformances[selectedMatch.id] = performances;

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

      alert('Scorecard uploaded and points calculated successfully!');
      setUploadModalOpen(false);
      setScorecardData('');
      setSelectedMatch(null);
    } catch (error) {
      console.error('Error uploading scorecard:', error);
      alert('Failed to upload scorecard. Please check the JSON format and try again.');
    } finally {
      setUploading(false);
    }
  };

  const openUploadModal = (match: any) => {
    setSelectedMatch(match);
    setUploadModalOpen(true);
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
          onClick={() => openUploadModal(match)}
          className="mt-4 w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Scorecard</span>
        </button>
      )}
    </div>
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Match Schedule</h1>
        <p className="text-gray-600">ICC T20 World Cup 2026 - All times in IST</p>
      </div>

      {/* Live Matches */}
      {liveMatches.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="w-3 h-3 bg-red-600 rounded-full mr-3 animate-pulse"></span>
            Live Matches
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Matches */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Matches</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingMatches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>

      {/* Completed Matches */}
      {completedMatches.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Completed Matches</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      )}

      {/* Upload Scorecard Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Upload Scorecard</h2>
                  {selectedMatch && (
                    <p className="text-sm text-gray-600 mt-1">
                      Match {selectedMatch.matchNumber}: {selectedMatch.team1} vs {selectedMatch.team2}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => {
                    setUploadModalOpen(false);
                    setSelectedMatch(null);
                    setScorecardData('');
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scorecard Data (JSON Format)
                </label>
                <textarea
                  value={scorecardData}
                  onChange={(e) => setScorecardData(e.target.value)}
                  placeholder={`Paste scorecard JSON here. Format:
[
  {
    "playerId": "ind-1",
    "matchId": "match-1",
    "inStartingLineup": true,
    "runs": 45,
    "balls": 30,
    "fours": 4,
    "sixes": 2,
    "isDismissedForDuck": false,
    "wickets": 0,
    "dotBalls": 0,
    "bowledOrLbwWickets": 0,
    "oversBowled": 0,
    "catches": 1,
    "directRunOuts": 0,
    "indirectRunOuts": 0,
    "stumpings": 0,
    "maidens": 0,
    "economyRate": 0,
    "points": 0
  }
]`}
                  className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 font-mono text-sm text-gray-900"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Paste the match performance data in JSON format. The points will be calculated automatically.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">Required Fields:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• playerId, matchId, inStartingLineup (true/false)</li>
                  <li>• Batting: runs, balls, fours, sixes, isDismissedForDuck</li>
                  <li>• Bowling: wickets, dotBalls, bowledOrLbwWickets, oversBowled, maidens, economyRate</li>
                  <li>• Fielding: catches, directRunOuts, indirectRunOuts, stumpings</li>
                  <li>• points field can be 0 (will be auto-calculated)</li>
                </ul>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setUploadModalOpen(false);
                    setSelectedMatch(null);
                    setScorecardData('');
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadScorecard}
                  disabled={uploading || !scorecardData.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>{uploading ? 'Uploading...' : 'Upload & Calculate Points'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
