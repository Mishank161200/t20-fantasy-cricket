import { Match } from './types';

// Helper function to determine match status based on current date
function getMatchStatus(matchDate: Date): 'completed' | 'live' | 'scheduled' {
  const now = new Date();
  const matchTime = new Date(matchDate);

  // Match is considered completed if it's more than 4 hours in the past
  const fourHoursAgo = new Date(now.getTime() - (4 * 60 * 60 * 1000));

  // Match is considered live if it started within the last 4 hours
  const matchStarted = matchTime <= now;
  const matchRecent = matchTime > fourHoursAgo;

  if (matchStarted && !matchRecent) {
    return 'completed';
  } else if (matchStarted && matchRecent) {
    return 'live';
  } else {
    return 'scheduled';
  }
}

// ICC T20 World Cup 2026 Schedule - REAL matches from CricketData.org
// These are actual matches that have been played and have real data available
// Current date: February 17, 2026
// Note: Match statuses are automatically determined based on current date
const BASE_SCHEDULE: Omit<Match, 'status'>[] = [
  // REAL MATCHES FROM ICC MEN'S T20 WORLD CUP 2026
  // All matches below have actual data available in CricketData.org

  // Match 24 - February 14, 2026
  {
    id: 'match-24',
    matchNumber: 24,
    team1: 'New Zealand',
    team2: 'South Africa',
    team1Flag: '🇳🇿',
    team2Flag: '🇿🇦',
    date: new Date('2026-02-14T13:30:00Z'),
    venue: 'Group D, ICC Men\'s T20 World Cup 2026',
  },

  // Match 25 - February 15, 2026
  {
    id: 'match-25',
    matchNumber: 25,
    team1: 'West Indies',
    team2: 'Nepal',
    team1Flag: '🇰🇳',
    team2Flag: '🇳🇵',
    date: new Date('2026-02-15T05:30:00Z'),
    venue: 'Group C, ICC Men\'s T20 World Cup 2026',
  },

  // Match 26 - February 15, 2026
  {
    id: 'match-26',
    matchNumber: 26,
    team1: 'United States',
    team2: 'Namibia',
    team1Flag: '🇺🇸',
    team2Flag: '🇳🇦',
    date: new Date('2026-02-15T09:30:00Z'),
    venue: 'Group A, ICC Men\'s T20 World Cup 2026',
  },

  // Match 27 - February 15, 2026
  {
    id: 'match-27',
    matchNumber: 27,
    team1: 'India',
    team2: 'Pakistan',
    team1Flag: '🇮🇳',
    team2Flag: '🇵🇰',
    date: new Date('2026-02-15T13:30:00Z'),
    venue: 'Group A, ICC Men\'s T20 World Cup 2026',
  },

  // Match 28 - February 16, 2026
  {
    id: 'match-28',
    matchNumber: 28,
    team1: 'Afghanistan',
    team2: 'United Arab Emirates',
    team1Flag: '🇦🇫',
    team2Flag: '🇦🇪',
    date: new Date('2026-02-16T05:30:00Z'),
    venue: 'Group D, ICC Men\'s T20 World Cup 2026',
  },

  // Match 29 - February 16, 2026
  {
    id: 'match-29',
    matchNumber: 29,
    team1: 'England',
    team2: 'Italy',
    team1Flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    team2Flag: '🇮🇹',
    date: new Date('2026-02-16T09:30:00Z'),
    venue: 'Group C, ICC Men\'s T20 World Cup 2026',
  },

  // Match 30 - February 16, 2026
  {
    id: 'match-30',
    matchNumber: 30,
    team1: 'Australia',
    team2: 'Sri Lanka',
    team1Flag: '🇦🇺',
    team2Flag: '🇱🇰',
    date: new Date('2026-02-16T13:30:00Z'),
    venue: 'Group B, ICC Men\'s T20 World Cup 2026',
  },

  // Match 31 - February 17, 2026
  {
    id: 'match-31',
    matchNumber: 31,
    team1: 'New Zealand',
    team2: 'Canada',
    team1Flag: '🇳🇿',
    team2Flag: '🇨🇦',
    date: new Date('2026-02-17T05:30:00Z'),
    venue: 'Group D, ICC Men\'s T20 World Cup 2026',
  },
];

// Export schedule with dynamically computed status
export const WORLD_CUP_SCHEDULE_WITH_STATUS = BASE_SCHEDULE.map(match => ({
  ...match,
  status: getMatchStatus(match.date)
}));

// For backwards compatibility, export as WORLD_CUP_SCHEDULE
export { WORLD_CUP_SCHEDULE_WITH_STATUS as WORLD_CUP_SCHEDULE };
