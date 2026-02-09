'use client';

import { WORLD_CUP_SCHEDULE } from '@/lib/schedule';
import { formatDate } from '@/lib/utils';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { format } from 'date-fns';

export default function SchedulePage() {
  const upcomingMatches = WORLD_CUP_SCHEDULE.filter(m => m.status === 'scheduled');
  const liveMatches = WORLD_CUP_SCHEDULE.filter(m => m.status === 'live');
  const completedMatches = WORLD_CUP_SCHEDULE.filter(m => m.status === 'completed');

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
    </div>
  );
}
