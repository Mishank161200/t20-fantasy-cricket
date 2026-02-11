export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Tournament {
  id: string;
  code: string;
  hostId: string;
  name: string;
  budget: number;
  maxOwners: number;
  status: 'setup' | 'auction' | 'active' | 'completed';
  owners: TournamentOwner[];
  createdAt: Date;
  auctionOrder?: string[]; // Player IDs in auction order
}

export interface TournamentOwner {
  userId: string;
  email: string;
  name: string;
  teamName: string;
  budget: number;
  remainingBudget: number;
  players: PlayerPurchase[];
  points: number;
}

export interface PlayerPurchase {
  playerId: string;
  purchasePrice: number;
  purchasedAt: Date;
}

export interface Player {
  id: string;
  name: string;
  country: string;
  role: 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';
  imageUrl?: string;
  basePrice: number;
}

export interface Match {
  id: string;
  matchNumber: number;
  team1: string;
  team2: string;
  team1Flag: string;
  team2Flag: string;
  date: Date;
  venue: string;
  status: 'scheduled' | 'live' | 'completed';
  result?: string;
}

export interface MatchPerformance {
  playerId: string;
  matchId: string;
  inStartingLineup: boolean;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  isDismissedForDuck: boolean;
  wickets: number;
  dotBalls: number;
  bowledOrLbwWickets: number;
  oversBowled: number;
  catches: number;
  directRunOuts: number;
  indirectRunOuts: number;
  stumpings: number;
  maidens: number;
  economyRate: number;
  points: number;
}

export interface TeamSelection {
  tournamentId: string;
  ownerId: string;
  matchId: string;
  playerIds: string[]; // 12 players
}

export interface ScoringRule {
  category: string;
  points: number;
  description: string;
}
