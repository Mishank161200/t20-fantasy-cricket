export function generateTournamentCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export function getPlayerRoleColor(role: string): string {
  switch (role) {
    case 'Batsman':
      return 'text-blue-600 bg-blue-50';
    case 'Bowler':
      return 'text-green-600 bg-green-50';
    case 'All-Rounder':
      return 'text-purple-600 bg-purple-50';
    case 'Wicket-Keeper':
      return 'text-orange-600 bg-orange-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

export function validateTeamSelection(playerIds: string[]): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (playerIds.length !== 12) {
    errors.push('Team must have exactly 12 players');
  }

  // Check for duplicates
  const uniqueIds = new Set(playerIds);
  if (uniqueIds.size !== playerIds.length) {
    errors.push('Duplicate players found in selection');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function downloadJSON(data: any, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
