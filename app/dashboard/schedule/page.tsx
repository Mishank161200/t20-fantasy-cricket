'use client';

import { useState, useEffect } from 'react';
import { WORLD_CUP_SCHEDULE } from '@/lib/schedule';
import { WORLD_CUP_PLAYERS } from '@/lib/players';
import { formatDate } from '@/lib/utils';
import { Calendar, MapPin, Clock, Upload, X, RefreshCw } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [liveScores, setLiveScores] = useState<any[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch live scores
  const fetchLiveScores = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch('/api/cricket/live');
      if (response.ok) {
        const data = await response.json();
        setLiveScores(data.matches || []);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (error) {
      console.error('Error fetching live scores:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Auto-refresh every 30 seconds if there are live matches
  useEffect(() => {
    const hasLiveMatches = WORLD_CUP_SCHEDULE.some(m => m.status === 'live');

    if (hasLiveMatches) {
      fetchLiveScores(); // Initial fetch

      const interval = setInterval(() => {
        fetchLiveScores();
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }
  }, []);

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

  const handleUploadScorecard = async () => {
    if (!currentTournament || !selectedMatch) return;

    try {
      setUploading(true);

      // Try parsing as tab-separated or comma-separated data first
      const lines = scorecardData.trim().split('\n');
      let performances: MatchPerformance[] = [];

      // Check if it's tabular data (CSV/TSV format)
      if (lines.length > 0 && !scorecardData.trim().startsWith('[')) {
        // Parse tabular data
        performances = parseTabularScorecard(lines, selectedMatch.id);
      } else {
        // Parse JSON format (backwards compatibility)
        performances = JSON.parse(scorecardData);
      }

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
      alert('Failed to upload scorecard. Please check the format and try again.');
    } finally {
      setUploading(false);
    }
  };

  // Parse tabular scorecard data (CSV/TSV from ICC website)
  const parseTabularScorecard = (lines: string[], matchId: string): MatchPerformance[] => {
    const performances: MatchPerformance[] = [];

    // Skip header row, process data rows
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Split by tab or comma
      const parts = line.includes('\t') ? line.split('\t') : line.split(',');

      if (parts.length < 3) continue; // Need at least player name and some stats

      const playerName = parts[0].trim();

      // Find player ID by name (case-insensitive matching)
      const playerInDb = WORLD_CUP_PLAYERS.find(
        p => p.name.toLowerCase() === playerName.toLowerCase()
      );

      if (!playerInDb) {
        console.warn(`Player not found: ${playerName}`);
        continue;
      }

      // Parse stats (flexible format)
      const runs = parseInt(parts[1]) || 0;
      const balls = parseInt(parts[2]) || 0;
      const fours = parseInt(parts[3]) || 0;
      const sixes = parseInt(parts[4]) || 0;
      const wickets = parseInt(parts[5]) || 0;
      const economyRate = parseFloat(parts[6]) || 0;
      const catches = parseInt(parts[7]) || 0;
      const runOuts = parseInt(parts[8]) || 0;
      const stumpings = parseInt(parts[9]) || 0;

      performances.push({
        playerId: playerInDb.id,
        matchId,
        inStartingLineup: true, // Assume all listed players are in lineup
        runs,
        balls,
        fours,
        sixes,
        isDismissedForDuck: runs === 0 && balls > 0,
        wickets,
        dotBalls: 0, // Not typically in simple scorecards
        bowledOrLbwWickets: 0, // Not typically in simple scorecards
        oversBowled: economyRate > 0 ? 4 : 0, // Estimate
        catches,
        directRunOuts: runOuts,
        indirectRunOuts: 0,
        stumpings,
        maidens: 0,
        economyRate,
        points: 0, // Will be calculated
      });
    }

    return performances;
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
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Match Schedule</h1>
          <p className="text-gray-600">ICC T20 World Cup 2026 - All times in IST</p>
          {lastUpdated && (
            <p className="text-xs text-gray-500 mt-1">
              Last updated: {lastUpdated}
            </p>
          )}
        </div>
        {liveMatches.length > 0 && (
          <button
            onClick={fetchLiveScores}
            disabled={isRefreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh Scores</span>
          </button>
        )}
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
                  Scorecard Data (Copy from ICC Website)
                </label>
                <textarea
                  value={scorecardData}
                  onChange={(e) => setScorecardData(e.target.value)}
                  placeholder={`Copy and paste scorecard data from ICC website. Format (tab or comma separated):

Player Name	Runs	Balls	4s	6s	Wickets	Economy	Catches	RunOuts	Stumpings
Virat Kohli	89	47	11	2	0	0	1	0	0
Jasprit Bumrah	0	0	0	0	3	6.5	0	0	0
Hardik Pandya	32	18	4	1	2	8.2	1	0	0

You can copy directly from match scorecards on the ICC website.`}
                  className="w-full h-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 font-mono text-sm text-gray-900"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Copy the scorecard table from the ICC website and paste directly here. Points will be calculated automatically.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">How to Upload:</h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• <strong>Easy Way:</strong> Copy scorecard table from ICC website (www.icc-cricket.com) and paste here</li>
                  <li>• <strong>Format:</strong> Player Name, Runs, Balls, 4s, 6s, Wickets, Economy, Catches, RunOuts, Stumpings</li>
                  <li>• Use either tabs or commas to separate values</li>
                  <li>• First line can be headers (will be skipped)</li>
                  <li>• Player names must match exactly (e.g., "Virat Kohli", "Jasprit Bumrah")</li>
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
