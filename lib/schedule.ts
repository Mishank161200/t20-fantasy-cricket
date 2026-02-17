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

// ICC T20 World Cup 2026 Schedule - Official tournament schedule
// Tournament starts: February 7, 2026
// Current date: February 17, 2026
// Note: Match statuses are automatically determined based on current date
const BASE_SCHEDULE: Omit<Match, 'status'>[] = [
  // GROUP STAGE - Matches 1-30 (Feb 7-16, 2026)

  // February 7, 2026 - Match 1-3
  {
    id: 'match-1',
    matchNumber: 1,
    team1: 'Pakistan',
    team2: 'Netherlands',
    team1Flag: '🇵🇰',
    team2Flag: '🇳🇱',
    date: new Date('2026-02-07T11:00:00+05:30'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
  },
  {
    id: 'match-2',
    matchNumber: 2,
    team1: 'West Indies',
    team2: 'Bangladesh',
    team1Flag: '🇰🇳',
    team2Flag: '🇧🇩',
    date: new Date('2026-02-07T15:00:00+05:30'),
    venue: 'Eden Gardens, Kolkata',
  },
  {
    id: 'match-3',
    matchNumber: 3,
    team1: 'India',
    team2: 'USA',
    team1Flag: '🇮🇳',
    team2Flag: '🇺🇸',
    date: new Date('2026-02-07T19:00:00+05:30'),
    venue: 'Wankhede Stadium, Mumbai',
  },

  // February 8, 2026 - Match 4-6
  {
    id: 'match-4',
    matchNumber: 4,
    team1: 'New Zealand',
    team2: 'Afghanistan',
    team1Flag: '🇳🇿',
    team2Flag: '🇦🇫',
    date: new Date('2026-02-08T11:00:00+05:30'),
    venue: 'MA Chidambaram Stadium, Chennai',
  },
  {
    id: 'match-5',
    matchNumber: 5,
    team1: 'England',
    team2: 'Nepal',
    team1Flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    team2Flag: '🇳🇵',
    date: new Date('2026-02-08T15:00:00+05:30'),
    venue: 'Arun Jaitley Stadium, Delhi',
  },
  {
    id: 'match-6',
    matchNumber: 6,
    team1: 'Sri Lanka',
    team2: 'Ireland',
    team1Flag: '🇱🇰',
    team2Flag: '🇮🇪',
    date: new Date('2026-02-08T19:00:00+05:30'),
    venue: 'R.Premadasa Stadium, Colombo',
  },

  // February 9, 2026 - Match 7-9
  {
    id: 'match-7',
    matchNumber: 7,
    team1: 'Bangladesh',
    team2: 'Italy',
    team1Flag: '🇧🇩',
    team2Flag: '🇮🇹',
    date: new Date('2026-02-09T11:00:00+05:30'),
    venue: 'M. Chinnaswamy Stadium, Bangalore',
  },
  {
    id: 'match-8',
    matchNumber: 8,
    team1: 'Zimbabwe',
    team2: 'Oman',
    team1Flag: '🇿🇼',
    team2Flag: '🇴🇲',
    date: new Date('2026-02-09T15:00:00+05:30'),
    venue: 'Sinhalese Sports Club, Colombo',
  },
  {
    id: 'match-9',
    matchNumber: 9,
    team1: 'South Africa',
    team2: 'Canada',
    team1Flag: '🇿🇦',
    team2Flag: '🇨🇦',
    date: new Date('2026-02-09T19:00:00+05:30'),
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
  },

  // February 10, 2026 - Match 10-12
  {
    id: 'match-10',
    matchNumber: 10,
    team1: 'Netherlands',
    team2: 'Namibia',
    team1Flag: '🇳🇱',
    team2Flag: '🇳🇦',
    date: new Date('2026-02-10T11:00:00+05:30'),
    venue: 'Pallekele International Cricket Stadium, Kandy',
  },
  {
    id: 'match-11',
    matchNumber: 11,
    team1: 'New Zealand',
    team2: 'United Arab Emirates',
    team1Flag: '🇳🇿',
    team2Flag: '🇦🇪',
    date: new Date('2026-02-10T15:00:00+05:30'),
    venue: 'MA Chidambaram Stadium, Chennai',
  },
  {
    id: 'match-12',
    matchNumber: 12,
    team1: 'Pakistan',
    team2: 'USA',
    team1Flag: '🇵🇰',
    team2Flag: '🇺🇸',
    date: new Date('2026-02-10T19:00:00+05:30'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
  },

  // February 11, 2026 - Match 13-15
  {
    id: 'match-13',
    matchNumber: 13,
    team1: 'South Africa',
    team2: 'Afghanistan',
    team1Flag: '🇿🇦',
    team2Flag: '🇦🇫',
    date: new Date('2026-02-11T11:00:00+05:30'),
    venue: 'Arun Jaitley Stadium, Delhi',
  },
  {
    id: 'match-14',
    matchNumber: 14,
    team1: 'Australia',
    team2: 'Ireland',
    team1Flag: '🇦🇺',
    team2Flag: '🇮🇪',
    date: new Date('2026-02-11T15:00:00+05:30'),
    venue: 'R.Premadasa Stadium, Colombo',
  },
  {
    id: 'match-15',
    matchNumber: 15,
    team1: 'England',
    team2: 'West Indies',
    team1Flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    team2Flag: '🇰🇳',
    date: new Date('2026-02-11T19:00:00+05:30'),
    venue: 'Eden Gardens, Kolkata',
  },

  // February 12, 2026 - Match 16-18
  {
    id: 'match-16',
    matchNumber: 16,
    team1: 'Sri Lanka',
    team2: 'Oman',
    team1Flag: '🇱🇰',
    team2Flag: '🇴🇲',
    date: new Date('2026-02-12T11:00:00+05:30'),
    venue: 'Pallekele International Cricket Stadium, Kandy',
  },
  {
    id: 'match-17',
    matchNumber: 17,
    team1: 'Nepal',
    team2: 'Italy',
    team1Flag: '🇳🇵',
    team2Flag: '🇮🇹',
    date: new Date('2026-02-12T15:00:00+05:30'),
    venue: 'Wankhede Stadium, Mumbai',
  },
  {
    id: 'match-18',
    matchNumber: 18,
    team1: 'India',
    team2: 'Namibia',
    team1Flag: '🇮🇳',
    team2Flag: '🇳🇦',
    date: new Date('2026-02-12T19:00:00+05:30'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
  },

  // February 13, 2026 - Match 19-21
  {
    id: 'match-19',
    matchNumber: 19,
    team1: 'Australia',
    team2: 'Zimbabwe',
    team1Flag: '🇦🇺',
    team2Flag: '🇿🇼',
    date: new Date('2026-02-13T11:00:00+05:30'),
    venue: 'Sinhalese Sports Club, Colombo',
  },
  {
    id: 'match-20',
    matchNumber: 20,
    team1: 'Canada',
    team2: 'United Arab Emirates',
    team1Flag: '🇨🇦',
    team2Flag: '🇦🇪',
    date: new Date('2026-02-13T15:00:00+05:30'),
    venue: 'MA Chidambaram Stadium, Chennai',
  },
  {
    id: 'match-21',
    matchNumber: 21,
    team1: 'USA',
    team2: 'Netherlands',
    team1Flag: '🇺🇸',
    team2Flag: '🇳🇱',
    date: new Date('2026-02-13T19:00:00+05:30'),
    venue: 'Arun Jaitley Stadium, Delhi',
  },

  // February 14, 2026 - Match 22-24
  {
    id: 'match-22',
    matchNumber: 22,
    team1: 'Ireland',
    team2: 'Oman',
    team1Flag: '🇮🇪',
    team2Flag: '🇴🇲',
    date: new Date('2026-02-14T11:00:00+05:30'),
    venue: 'R.Premadasa Stadium, Colombo',
  },
  {
    id: 'match-23',
    matchNumber: 23,
    team1: 'England',
    team2: 'Bangladesh',
    team1Flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    team2Flag: '🇧🇩',
    date: new Date('2026-02-14T15:00:00+05:30'),
    venue: 'M. Chinnaswamy Stadium, Bangalore',
  },
  {
    id: 'match-24',
    matchNumber: 24,
    team1: 'New Zealand',
    team2: 'South Africa',
    team1Flag: '🇳🇿',
    team2Flag: '🇿🇦',
    date: new Date('2026-02-14T19:00:00+05:30'),
    venue: 'Eden Gardens, Kolkata',
  },

  // February 15, 2026 - Match 25-27
  {
    id: 'match-25',
    matchNumber: 25,
    team1: 'West Indies',
    team2: 'Nepal',
    team1Flag: '🇰🇳',
    team2Flag: '🇳🇵',
    date: new Date('2026-02-15T11:00:00+05:30'),
    venue: 'Wankhede Stadium, Mumbai',
  },
  {
    id: 'match-26',
    matchNumber: 26,
    team1: 'USA',
    team2: 'Namibia',
    team1Flag: '🇺🇸',
    team2Flag: '🇳🇦',
    date: new Date('2026-02-15T15:00:00+05:30'),
    venue: 'Arun Jaitley Stadium, Delhi',
  },
  {
    id: 'match-27',
    matchNumber: 27,
    team1: 'India',
    team2: 'Pakistan',
    team1Flag: '🇮🇳',
    team2Flag: '🇵🇰',
    date: new Date('2026-02-15T19:00:00+05:30'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
  },

  // GROUP STAGE - ONGOING MATCHES (Feb 16, 2026)

  // February 16, 2026 - Match 28-30
  {
    id: 'match-28',
    matchNumber: 28,
    team1: 'Afghanistan',
    team2: 'United Arab Emirates',
    team1Flag: '🇦🇫',
    team2Flag: '🇦🇪',
    date: new Date('2026-02-16T11:00:00+05:30'),
    venue: 'MA Chidambaram Stadium, Chennai',
  },
  {
    id: 'match-29',
    matchNumber: 29,
    team1: 'England',
    team2: 'Italy',
    team1Flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    team2Flag: '🇮🇹',
    date: new Date('2026-02-16T15:00:00+05:30'),
    venue: 'Wankhede Stadium, Mumbai',
  },
  {
    id: 'match-30',
    matchNumber: 30,
    team1: 'Australia',
    team2: 'Sri Lanka',
    team1Flag: '🇦🇺',
    team2Flag: '🇱🇰',
    date: new Date('2026-02-16T19:00:00+05:30'),
    venue: 'Pallekele International Cricket Stadium, Kandy',
  },

  // GROUP STAGE - UPCOMING MATCHES (Feb 17-20, 2026)

  // February 17, 2026 - Match 31-33
  {
    id: 'match-31',
    matchNumber: 31,
    team1: 'New Zealand',
    team2: 'Canada',
    team1Flag: '🇳🇿',
    team2Flag: '🇨🇦',
    date: new Date('2026-02-17T11:00:00+05:30'),
    venue: 'MA Chidambaram Stadium, Chennai',
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
  },
  {
    id: 'match-33',
    matchNumber: 33,
    team1: 'Bangladesh',
    team2: 'Nepal',
    team1Flag: '🇧🇩',
    team2Flag: '🇳🇵',
    date: new Date('2026-02-17T19:00:00+05:30'),
    venue: 'Wankhede Stadium, Mumbai',
  },

  // February 18, 2026 - Match 34-36
  {
    id: 'match-34',
    matchNumber: 34,
    team1: 'South Africa',
    team2: 'United Arab Emirates',
    team1Flag: '🇿🇦',
    team2Flag: '🇦🇪',
    date: new Date('2026-02-18T11:00:00+05:30'),
    venue: 'Arun Jaitley Stadium, Delhi',
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
  },

  // February 19, 2026 - Match 37-39
  {
    id: 'match-37',
    matchNumber: 37,
    team1: 'West Indies',
    team2: 'Italy',
    team1Flag: '🇰🇳',
    team2Flag: '🇮🇹',
    date: new Date('2026-02-19T11:00:00+05:30'),
    venue: 'Eden Gardens, Kolkata',
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
  },

  // February 20, 2026 - Match 40
  {
    id: 'match-40',
    matchNumber: 40,
    team1: 'Australia',
    team2: 'Oman',
    team1Flag: '🇦🇺',
    team2Flag: '🇴🇲',
    date: new Date('2026-02-20T19:00:00+05:30'),
    venue: 'Pallekele International Cricket Stadium, Kandy',
  },

  // SUPER 8 - Matches 41-52 (Feb 21 - Mar 1, 2026)

  // February 21, 2026 - Match 41
  {
    id: 'match-41',
    matchNumber: 41,
    team1: 'TBD (Y2)',
    team2: 'TBD (Y3)',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-02-21T19:00:00+05:30'),
    venue: 'R.Premadasa Stadium, Colombo',
  },

  // February 22, 2026 - Match 42-43
  {
    id: 'match-42',
    matchNumber: 42,
    team1: 'TBD (Y1)',
    team2: 'TBD (Y4)',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-02-22T15:00:00+05:30'),
    venue: 'Pallekele International Cricket Stadium, Kandy',
  },
  {
    id: 'match-43',
    matchNumber: 43,
    team1: 'TBD (X1)',
    team2: 'TBD (X4)',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-02-22T19:00:00+05:30'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
  },

  // February 23, 2026 - Match 44
  {
    id: 'match-44',
    matchNumber: 44,
    team1: 'TBD (X2)',
    team2: 'TBD (X3)',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-02-23T19:00:00+05:30'),
    venue: 'Wankhede Stadium, Mumbai',
  },

  // February 24, 2026 - Match 45
  {
    id: 'match-45',
    matchNumber: 45,
    team1: 'TBD (Y1)',
    team2: 'TBD (Y3)',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-02-24T19:00:00+05:30'),
    venue: 'Pallekele International Cricket Stadium, Kandy',
  },

  // February 25, 2026 - Match 46
  {
    id: 'match-46',
    matchNumber: 46,
    team1: 'TBD (Y2)',
    team2: 'TBD (Y4)',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-02-25T19:00:00+05:30'),
    venue: 'R.Premadasa Stadium, Colombo',
  },

  // February 26, 2026 - Match 47-48
  {
    id: 'match-47',
    matchNumber: 47,
    team1: 'TBD (X3)',
    team2: 'TBD (X4)',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-02-26T15:00:00+05:30'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
  },
  {
    id: 'match-48',
    matchNumber: 48,
    team1: 'TBD (X1)',
    team2: 'TBD (X2)',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-02-26T19:00:00+05:30'),
    venue: 'MA Chidambaram Stadium, Chennai',
  },

  // February 27, 2026 - Match 49
  {
    id: 'match-49',
    matchNumber: 49,
    team1: 'TBD (Y1)',
    team2: 'TBD (Y2)',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-02-27T19:00:00+05:30'),
    venue: 'R.Premadasa Stadium, Colombo',
  },

  // February 28, 2026 - Match 50
  {
    id: 'match-50',
    matchNumber: 50,
    team1: 'TBD (Y3)',
    team2: 'TBD (Y4)',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-02-28T19:00:00+05:30'),
    venue: 'Pallekele International Cricket Stadium, Kandy',
  },

  // March 1, 2026 - Match 51-52
  {
    id: 'match-51',
    matchNumber: 51,
    team1: 'TBD (X2)',
    team2: 'TBD (X4)',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-03-01T15:00:00+05:30'),
    venue: 'Arun Jaitley Stadium, Delhi',
  },
  {
    id: 'match-52',
    matchNumber: 52,
    team1: 'TBD (X1)',
    team2: 'TBD (X3)',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-03-01T19:00:00+05:30'),
    venue: 'Eden Gardens, Kolkata',
  },

  // SEMI-FINALS - Matches 53-54 (Mar 4-5, 2026)

  // March 4, 2026 - Match 53
  {
    id: 'match-53',
    matchNumber: 53,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-03-04T19:00:00+05:30'),
    venue: 'Eden Gardens, Kolkata',
  },

  // March 5, 2026 - Match 54
  {
    id: 'match-54',
    matchNumber: 54,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-03-05T19:00:00+05:30'),
    venue: 'Wankhede Stadium, Mumbai',
  },

  // FINAL - Match 55 (Mar 8, 2026)

  // March 8, 2026 - Match 55
  {
    id: 'match-55',
    matchNumber: 55,
    team1: 'TBD',
    team2: 'TBD',
    team1Flag: '🏳️',
    team2Flag: '🏳️',
    date: new Date('2026-03-08T19:00:00+05:30'),
    venue: 'Narendra Modi Stadium, Ahmedabad',
  },
];

// Export schedule with dynamically computed status
export const WORLD_CUP_SCHEDULE_WITH_STATUS = BASE_SCHEDULE.map(match => ({
  ...match,
  status: getMatchStatus(match.date)
}));

// For backwards compatibility, export as WORLD_CUP_SCHEDULE
export { WORLD_CUP_SCHEDULE_WITH_STATUS as WORLD_CUP_SCHEDULE };
