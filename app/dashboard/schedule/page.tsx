'use client';

import { useState } from 'react';
import { WORLD_CUP_SCHEDULE } from '@/lib/schedule';
import { WORLD_CUP_PLAYERS } from '@/lib/players';
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
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'upcoming' | 'completed'>('all');



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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(files);

    // Convert images to base64 for preview and API
    const promises = files.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then(base64Images => {
      setUploadedImages(base64Images);
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUploadScorecard = async () => {
    if (!currentTournament || !selectedMatch || uploadedImages.length === 0) {
      alert('Please select images to upload');
      return;
    }

    try {
      setUploading(true);
      console.log('Uploading scorecard for match:', selectedMatch.id);
      console.log('Number of images:', uploadedImages.length);

      // Send images to AI analysis endpoint
      const response = await fetch('/api/cricket/analyze-scorecard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          images: uploadedImages,
          matchId: selectedMatch.id
        })
      });

      console.log('API Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || errorData.details || 'Failed to analyze scorecard images');
      }

      const responseData = await response.json();
      console.log('API Response data:', responseData);

      const { performances } = responseData;

      if (!performances || performances.length === 0) {
        throw new Error('No player data extracted from images. Please ensure the screenshots clearly show player statistics.');
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

      alert(`✅ Scorecard analyzed successfully!\n\nPlayers found: ${performances.length}\nPoints calculated and leaderboard updated.`);
      setUploadModalOpen(false);
      setUploadedImages([]);
      setImageFiles([]);
      setSelectedMatch(null);
    } catch (error) {
      console.error('Error uploading scorecard:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`❌ Failed to analyze scorecard:\n\n${errorMessage}\n\nPlease ensure:\n- Images are clear and readable\n- Screenshots show player statistics\n- OpenAI API key is configured`);
    } finally {
      setUploading(false);
    }
  };

  const openUploadModal = (match: any) => {
    setSelectedMatch(match);
    setUploadedImages([]);
    setImageFiles([]);
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
                    setUploadedImages([]);
                    setImageFiles([]);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Scorecard Screenshots
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="scorecard-upload"
                  />
                  <label
                    htmlFor="scorecard-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="w-12 h-12 text-gray-400 mb-3" />
                    <span className="text-sm font-medium text-gray-700 mb-1">
                      Click to upload screenshots
                    </span>
                    <span className="text-xs text-gray-500">
                      PNG, JPG up to 10MB each (multiple files supported)
                    </span>
                  </label>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {uploadedImages.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                          Image {index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">How to Upload:</h3>
                <ul className="text-sm text-blue-800 space-y-2">
                  <li>• Go to the match page on ICC website (www.icc-cricket.com)</li>
                  <li>• Take screenshots of the scoreboard sections:</li>
                  <li className="ml-4">→ <strong>Innings 1:</strong> Batting, Bowling, Fall of Wickets</li>
                  <li className="ml-4">→ <strong>Innings 2:</strong> Batting, Bowling, Fall of Wickets</li>
                  <li>• Upload all screenshots (up to 6 images total)</li>
                  <li>• AI will automatically extract player stats and calculate points</li>
                  <li>• Make sure screenshots are clear and readable</li>
                </ul>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setUploadModalOpen(false);
                    setSelectedMatch(null);
                    setUploadedImages([]);
                    setImageFiles([]);
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadScorecard}
                  disabled={uploading || uploadedImages.length === 0}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <Upload className="w-5 h-5" />
                  <span>{uploading ? 'Analyzing Images...' : `Analyze ${uploadedImages.length} Screenshot${uploadedImages.length !== 1 ? 's' : ''}`}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
