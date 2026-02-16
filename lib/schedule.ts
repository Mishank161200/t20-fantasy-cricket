import { Match } from './types';

// ICC T20 World Cup 2026 Schedule - Updated from https://www.icc-cricket.com/tournaments/mens-t20-world-cup-2026/matches
// Current date: February 16, 2026
export const WORLD_CUP_SCHEDULE: Match[] = [
  // Match 30 - February 16, 2026 (LIVE)
  {
    id: 'match-30',
    matchNumber: 30,
    team1: 'Sri Lanka',
    team2: 'Australia',
    team1Flag: '🇱🇰',
    team2Flag: '🇦🇺',
    date: new Date('2026-02-16T15:00:00+05:30'),
    venue: 'Pallekele International Cricket Stadium, Kandy',
    status: 'live',
  },

  // February 17, 2026
  {
    id: 'match-31',
    matchNumber: 31,
    team1: 'New Zealand',
    team2: 'Canada',
    team1Flag: '🇳🇿',
    team2Flag: '🇨🇦',
    date: new Date('2026-02-17T11:00:00+05:30'),
    venue: 'MA Chidambaram Stadium, Chennai',
    status: 'scheduled',
  },
  {
    id: 'match-32',
    matchNumber: 32,
    team1: 'Ireland',
    team2: 'Zimbabwe',
    team1Flag: '🇮🇪',
    team2Flag: '🇿🇼',
    date: new Date('2026-02-17T15:00:00+05:30'),
    venue: 'Pallekele International Cricket Stadium, Kandy',
    status: 'scheduled',
  },
  {
    id: 'match-33',
    matchNumber: 33,
    team1: 'Scotland',
    team2: 'Nepal',
    team1Flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    team2Flag: '🇳🇵',
    date: new Date('2026-02-17T19:00:00+05:30'),
    venue: 'Wankhede Stadium, Mumbai',
    status: 'scheduled',
  },

  // February 18, 2026
  {
    id: 'match-34',
    matchNumber: 34,
    team1: 'South Africa',
    team2: 'United Arab Emirates',
    team1Flag: '🇿🇦',
    team2Flag: '🇦🇪',
    date: new Date('2026-02-18T11:00:00+05:30'),
    venue: 'Arun Jaitley Stadium, Delhi',
    status: 'scheduled',
  },
  {
    id: 'match-35',
    matchNumber: 35,
    team1: 'Pakistan',
    team2: 'Namibia',
    team1Flag: '🇵🇰',
    team2Flag: '🇳🇦',
    date: new Date('2026-02-18T15:00:00+05:30'),
    venue: 'Sinhalese Sports Club, Colombo',
    status: 'scheduled',
  },
  {
    id: 'match-36',
    matchNumber: 36,
    team1: 'India',
    team2: 'Netherlands',
    team1Flag: '🇮🇳',
    team2Flag: '🇳🇱',
    date: new Date('2026-02-18T19:00:00+05:30'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
    status: 'scheduled',
  },

  // February 19, 2026
  {
    id: 'match-37',
    matchNumber: 37,
    team1: 'West Indies',
    team2: 'Italy',
    team1Flag: '🇧🇧',
    team2Flag: '🇮🇹',
    date: new Date('2026-02-19T11:00:00+05:30'),
    venue: 'Eden Gardens, Kolkata',
    status: 'scheduled',
  },
  {
    id: 'match-38',
    matchNumber: 38,
    team1: 'Sri Lanka',
    team2: 'Zimbabwe',
    team1Flag: '🇱🇰',
    team2Flag: '🇿🇼',
    date: new Date('2026-02-19T15:00:00+05:30'),
    venue: 'R.Premadasa Stadium, Colombo',
    status: 'scheduled',
  },
  {
    id: 'match-39',
    matchNumber: 39,
    team1: 'Afghanistan',
    team2: 'Canada',
    team1Flag: '🇦🇫',
    team2Flag: '🇨🇦',
    date: new Date('2026-02-19T19:00:00+05:30'),
    venue: 'MA Chidambaram Stadium, Chennai',
    status: 'scheduled',
  },

  // February 20, 2026
  {
    id: 'match-40',
    matchNumber: 40,
    team1: 'Australia',
    team2: 'Oman',
    team1Flag: '🇦🇺',
    team2Flag: '🇴🇲',
    date: new Date('2026-02-20T19:00:00+05:30'),
    venue: 'Pallekele International Cricket Stadium, Kandy',
    status: 'scheduled',
  },

  // SUPER 8 STAGE
  // February 21, 2026
  {
    id: 'super8-match-1',
    matchNumber: 41,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '⚪',
    team2Flag: '⚪',
    date: new Date('2026-02-21T19:00:00+05:30'),
    venue: 'R.Premadasa Stadium, Colombo',
    status: 'scheduled',
  },

  // February 22, 2026
  {
    id: 'super8-match-2',
    matchNumber: 42,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '⚪',
    team2Flag: '⚪',
    date: new Date('2026-02-22T15:00:00+05:30'),
    venue: 'Pallekele International Cricket Stadium, Kandy',
    status: 'scheduled',
  },
  {
    id: 'super8-match-3',
    matchNumber: 43,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '⚪',
    team2Flag: '⚪',
    date: new Date('2026-02-22T19:00:00+05:30'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
    status: 'scheduled',
  },

  // February 23, 2026
  {
    id: 'super8-match-4',
    matchNumber: 44,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '⚪',
    team2Flag: '⚪',
    date: new Date('2026-02-23T19:00:00+05:30'),
    venue: 'Wankhede Stadium, Mumbai',
    status: 'scheduled',
  },

  // February 24, 2026
  {
    id: 'super8-match-5',
    matchNumber: 45,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '⚪',
    team2Flag: '⚪',
    date: new Date('2026-02-24T19:00:00+05:30'),
    venue: 'Pallekele International Cricket Stadium, Kandy',
    status: 'scheduled',
  },

  // February 25, 2026
  {
    id: 'super8-match-6',
    matchNumber: 46,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '⚪',
    team2Flag: '⚪',
    date: new Date('2026-02-25T19:00:00+05:30'),
    venue: 'R.Premadasa Stadium, Colombo',
    status: 'scheduled',
  },

  // February 26, 2026
  {
    id: 'super8-match-7',
    matchNumber: 47,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '⚪',
    team2Flag: '⚪',
    date: new Date('2026-02-26T15:00:00+05:30'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
    status: 'scheduled',
  },
  {
    id: 'super8-match-8',
    matchNumber: 48,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '⚪',
    team2Flag: '⚪',
    date: new Date('2026-02-26T19:00:00+05:30'),
    venue: 'MA Chidambaram Stadium, Chennai',
    status: 'scheduled',
  },

  // February 27, 2026
  {
    id: 'super8-match-9',
    matchNumber: 49,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '⚪',
    team2Flag: '⚪',
    date: new Date('2026-02-27T19:00:00+05:30'),
    venue: 'R.Premadasa Stadium, Colombo',
    status: 'scheduled',
  },

  // February 28, 2026
  {
    id: 'super8-match-10',
    matchNumber: 50,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '⚪',
    team2Flag: '⚪',
    date: new Date('2026-02-28T19:00:00+05:30'),
    venue: 'Pallekele International Cricket Stadium, Kandy',
    status: 'scheduled',
  },

  // March 1, 2026
  {
    id: 'super8-match-11',
    matchNumber: 51,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '⚪',
    team2Flag: '⚪',
    date: new Date('2026-03-01T15:00:00+05:30'),
    venue: 'Arun Jaitley Stadium, Delhi',
    status: 'scheduled',
  },
  {
    id: 'super8-match-12',
    matchNumber: 52,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '⚪',
    team2Flag: '⚪',
    date: new Date('2026-03-01T19:00:00+05:30'),
    venue: 'Eden Gardens, Kolkata',
    status: 'scheduled',
  },

  // SEMI-FINALS
  // March 4, 2026
  {
    id: 'semi-final-1',
    matchNumber: 53,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '⚪',
    team2Flag: '⚪',
    date: new Date('2026-03-04T19:00:00+05:30'),
    venue: 'Kolkata/Colombo (To Be Confirmed)',
    status: 'scheduled',
  },

  // March 5, 2026
  {
    id: 'semi-final-2',
    matchNumber: 54,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '⚪',
    team2Flag: '⚪',
    date: new Date('2026-03-05T19:00:00+05:30'),
    venue: 'Wankhede Stadium, Mumbai',
    status: 'scheduled',
  },

  // FINAL
  // March 8, 2026
  {
    id: 'final',
    matchNumber: 55,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '⚪',
    team2Flag: '⚪',
    date: new Date('2026-03-08T19:00:00+05:30'),
    venue: 'Ahmedabad/Colombo (To be Confirmed)',
    status: 'scheduled',
  },
];
