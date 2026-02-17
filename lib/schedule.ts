import { Match } from './types';

// ICC T20 World Cup 2026 Schedule - Official tournament schedule from ICC website
// Tournament starts: February 16, 2026
// Current date: February 17, 2026
// Source: https://www.icc-cricket.com/tournaments/mens-t20-world-cup-2026/matches
export const WORLD_CUP_SCHEDULE: Match[] = [
  // GROUP STAGE - Matches 30-40

  // February 16, 2026
  {
    id: 'match-30',
    matchNumber: 30,
    team1: 'Sri Lanka',
    team2: 'Australia',
    team1Flag: '🇱🇰',
    team2Flag: '🇦🇺',
    date: new Date('2026-02-16T15:00:00+05:30'),
    venue: 'Pallekele International Cricket Stadium, Kandy',
    status: 'completed',
    result: 'Australia won by 6 wickets',
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
    team1Flag: '🇰🇳',
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

  // SUPER 8 - Matches 41-52

  // February 21, 2026
  {
    id: 'match-41',
    matchNumber: 41,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-02-21T19:00:00+05:30'),
    venue: 'R.Premadasa Stadium, Colombo',
    status: 'scheduled',
  },

  // February 22, 2026
  {
    id: 'match-42',
    matchNumber: 42,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-02-22T15:00:00+05:30'),
    venue: 'Pallekele International Cricket Stadium, Kandy',
    status: 'scheduled',
  },
  {
    id: 'match-43',
    matchNumber: 43,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-02-22T19:00:00+05:30'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
    status: 'scheduled',
  },

  // February 23, 2026
  {
    id: 'match-44',
    matchNumber: 44,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-02-23T19:00:00+05:30'),
    venue: 'Wankhede Stadium, Mumbai',
    status: 'scheduled',
  },

  // February 24, 2026
  {
    id: 'match-45',
    matchNumber: 45,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-02-24T19:00:00+05:30'),
    venue: 'Pallekele International Cricket Stadium, Kandy',
    status: 'scheduled',
  },

  // February 25, 2026
  {
    id: 'match-46',
    matchNumber: 46,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-02-25T19:00:00+05:30'),
    venue: 'R.Premadasa Stadium, Colombo',
    status: 'scheduled',
  },

  // February 26, 2026
  {
    id: 'match-47',
    matchNumber: 47,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-02-26T15:00:00+05:30'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
    status: 'scheduled',
  },
  {
    id: 'match-48',
    matchNumber: 48,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-02-26T19:00:00+05:30'),
    venue: 'MA Chidambaram Stadium, Chennai',
    status: 'scheduled',
  },

  // February 27, 2026
  {
    id: 'match-49',
    matchNumber: 49,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-02-27T19:00:00+05:30'),
    venue: 'R.Premadasa Stadium, Colombo',
    status: 'scheduled',
  },

  // February 28, 2026
  {
    id: 'match-50',
    matchNumber: 50,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-02-28T19:00:00+05:30'),
    venue: 'Pallekele International Cricket Stadium, Kandy',
    status: 'scheduled',
  },

  // March 1, 2026
  {
    id: 'match-51',
    matchNumber: 51,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-03-01T15:00:00+05:30'),
    venue: 'Arun Jaitley Stadium, Delhi',
    status: 'scheduled',
  },
  {
    id: 'match-52',
    matchNumber: 52,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-03-01T19:00:00+05:30'),
    venue: 'Eden Gardens, Kolkata',
    status: 'scheduled',
  },

  // SEMI-FINALS - Matches 53-54

  // March 4, 2026
  {
    id: 'match-53',
    matchNumber: 53,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-03-04T19:00:00+05:30'),
    venue: 'Kolkata/Colombo (To Be Confirmed)',
    status: 'scheduled',
  },

  // March 5, 2026
  {
    id: 'match-54',
    matchNumber: 54,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-03-05T19:00:00+05:30'),
    venue: 'Wankhede Stadium, Mumbai',
    status: 'scheduled',
  },

  // FINAL - Match 55

  // March 8, 2026
  {
    id: 'match-55',
    matchNumber: 55,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-03-08T19:00:00+05:30'),
    venue: 'Ahmedabad/Colombo (To Be Confirmed)',
    status: 'scheduled',
  },
];
