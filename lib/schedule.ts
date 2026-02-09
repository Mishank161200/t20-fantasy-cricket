import { Match } from './types';

// ICC T20 World Cup 2026 Schedule (Sample matches - adjust dates as needed)
export const WORLD_CUP_SCHEDULE: Match[] = [
  // Group Stage - Group A
  {
    id: 'match-1',
    matchNumber: 1,
    team1: 'India',
    team2: 'Pakistan',
    team1Flag: '🇮🇳',
    team2Flag: '🇵🇰',
    date: new Date('2026-06-01T19:30:00+05:30'),
    venue: 'Nassau County International Cricket Stadium, New York',
    status: 'scheduled',
  },
  {
    id: 'match-2',
    matchNumber: 2,
    team1: 'Australia',
    team2: 'England',
    team1Flag: '🇦🇺',
    team2Flag: '🏴󐁧󐁢󐁥󐁮󐁧󐁿',
    date: new Date('2026-06-02T10:30:00+05:30'),
    venue: 'Kensington Oval, Bridgetown',
    status: 'scheduled',
  },
  {
    id: 'match-3',
    matchNumber: 3,
    team1: 'South Africa',
    team2: 'West Indies',
    team1Flag: '🇿🇦',
    team2Flag: '🏴',
    date: new Date('2026-06-02T19:30:00+05:30'),
    venue: 'Sir Vivian Richards Stadium, Antigua',
    status: 'scheduled',
  },
  {
    id: 'match-4',
    matchNumber: 4,
    team1: 'New Zealand',
    team2: 'Afghanistan',
    team1Flag: '🇳🇿',
    team2Flag: '🇦🇫',
    date: new Date('2026-06-03T10:30:00+05:30'),
    venue: 'Providence Stadium, Guyana',
    status: 'scheduled',
  },
  {
    id: 'match-5',
    matchNumber: 5,
    team1: 'Sri Lanka',
    team2: 'Bangladesh',
    team1Flag: '🇱🇰',
    team2Flag: '🇧🇩',
    date: new Date('2026-06-03T19:30:00+05:30'),
    venue: 'Grand Prairie Stadium, Dallas',
    status: 'scheduled',
  },
  {
    id: 'match-6',
    matchNumber: 6,
    team1: 'India',
    team2: 'Australia',
    team1Flag: '🇮🇳',
    team2Flag: '🇦🇺',
    date: new Date('2026-06-04T19:30:00+05:30'),
    venue: 'Nassau County International Cricket Stadium, New York',
    status: 'scheduled',
  },
  {
    id: 'match-7',
    matchNumber: 7,
    team1: 'England',
    team2: 'South Africa',
    team1Flag: '🏴󐁧󐁢󐁥󐁮󐁧󐁿',
    team2Flag: '🇿🇦',
    date: new Date('2026-06-05T10:30:00+05:30'),
    venue: 'Kensington Oval, Bridgetown',
    status: 'scheduled',
  },
  {
    id: 'match-8',
    matchNumber: 8,
    team1: 'Pakistan',
    team2: 'New Zealand',
    team1Flag: '🇵🇰',
    team2Flag: '🇳🇿',
    date: new Date('2026-06-05T19:30:00+05:30'),
    venue: 'Grand Prairie Stadium, Dallas',
    status: 'scheduled',
  },
  {
    id: 'match-9',
    matchNumber: 9,
    team1: 'West Indies',
    team2: 'Afghanistan',
    team1Flag: '🏴',
    team2Flag: '🇦🇫',
    date: new Date('2026-06-06T10:30:00+05:30'),
    venue: 'Sir Vivian Richards Stadium, Antigua',
    status: 'scheduled',
  },
  {
    id: 'match-10',
    matchNumber: 10,
    team1: 'Bangladesh',
    team2: 'Sri Lanka',
    team1Flag: '🇧🇩',
    team2Flag: '🇱🇰',
    date: new Date('2026-06-06T19:30:00+05:30'),
    venue: 'Providence Stadium, Guyana',
    status: 'scheduled',
  },
  // Super 8s
  {
    id: 'match-11',
    matchNumber: 11,
    team1: 'India',
    team2: 'England',
    team1Flag: '🇮🇳',
    team2Flag: '🏴󐁧󐁢󐁥󐁮󐁧󐁿',
    date: new Date('2026-06-09T19:30:00+05:30'),
    venue: 'Kensington Oval, Bridgetown',
    status: 'scheduled',
  },
  {
    id: 'match-12',
    matchNumber: 12,
    team1: 'Australia',
    team2: 'South Africa',
    team1Flag: '🇦🇺',
    team2Flag: '🇿🇦',
    date: new Date('2026-06-10T10:30:00+05:30'),
    venue: 'Sir Vivian Richards Stadium, Antigua',
    status: 'scheduled',
  },
  {
    id: 'match-13',
    matchNumber: 13,
    team1: 'Pakistan',
    team2: 'West Indies',
    team1Flag: '🇵🇰',
    team2Flag: '🏴',
    date: new Date('2026-06-10T19:30:00+05:30'),
    venue: 'Providence Stadium, Guyana',
    status: 'scheduled',
  },
  {
    id: 'match-14',
    matchNumber: 14,
    team1: 'New Zealand',
    team2: 'Sri Lanka',
    team1Flag: '🇳🇿',
    team2Flag: '🇱🇰',
    date: new Date('2026-06-11T10:30:00+05:30'),
    venue: 'Arnos Vale Stadium, St. Vincent',
    status: 'scheduled',
  },
  // Semi-Finals
  {
    id: 'match-15',
    matchNumber: 15,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '🏏',
    team2Flag: '🏏',
    date: new Date('2026-06-14T19:30:00+05:30'),
    venue: 'Providence Stadium, Guyana',
    status: 'scheduled',
  },
  {
    id: 'match-16',
    matchNumber: 16,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '🏏',
    team2Flag: '🏏',
    date: new Date('2026-06-15T19:30:00+05:30'),
    venue: 'Brian Lara Stadium, Trinidad',
    status: 'scheduled',
  },
  // Final
  {
    id: 'match-17',
    matchNumber: 17,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '🏏',
    team2Flag: '🏏',
    date: new Date('2026-06-18T19:30:00+05:30'),
    venue: 'Kensington Oval, Bridgetown',
    status: 'scheduled',
  },
];

export function getMatchById(matchId: string): Match | undefined {
  return WORLD_CUP_SCHEDULE.find(m => m.id === matchId);
}

export function getUpcomingMatches(): Match[] {
  const now = new Date();
  return WORLD_CUP_SCHEDULE.filter(m => m.date > now && m.status === 'scheduled')
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function getLiveMatches(): Match[] {
  return WORLD_CUP_SCHEDULE.filter(m => m.status === 'live');
}

export function getCompletedMatches(): Match[] {
  return WORLD_CUP_SCHEDULE.filter(m => m.status === 'completed')
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}
