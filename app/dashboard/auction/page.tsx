'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getRandomizedPlayers } from '@/lib/players';
import { formatCurrency, getPlayerRoleColor, downloadJSON } from '@/lib/utils';
import { Gavel, Download, Users, DollarSign, CheckCircle } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function AuctionPage() {
  const router = useRouter();
  const { currentTournament } = useAppStore();

  const [players] = useState(getRandomizedPlayers());
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentBid, setCurrentBid] = useState(0);
  const [currentBidder, setCurrentBidder] = useState('');
  const [soldPlayers, setSoldPlayers] = useState<any[]>([]);
  const [auctionStatus, setAuctionStatus] = useState<'active' | 'paused' | 'ended'>('active');

  // Redirect if no tournament data
  useEffect(() => {
    if (!currentTournament) {
      router.push('/');
    }
  }, [currentTournament, router]);

  const currentPlayer = players[currentPlayerIndex];
  const remainingPlayers = players.length - currentPlayerIndex - soldPlayers.length;

  // Use actual tournament owners
  const owners = currentTournament?.owners || [];

  const handleBid = (ownerId: string, amount: number) => {
    setCurrentBid(amount);
    setCurrentBidder(ownerId);
  };

  const handleSold = () => {
    if (currentBidder && currentBid > 0) {
      setSoldPlayers([
        ...soldPlayers,
        {
          player: currentPlayer,
          buyer: currentBidder,
          price: currentBid,
        },
      ]);
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setCurrentBid(0);
      setCurrentBidder('');
    }
  };

  const handleUnsold = () => {
    setCurrentPlayerIndex(currentPlayerIndex + 1);
    setCurrentBid(0);
    setCurrentBidder('');
  };

  const handleDownloadAuctionOrder = () => {
    downloadJSON(
      players.map((p, idx) => ({ order: idx + 1, ...p })),
      'auction-order.json'
    );
  };

  if (!currentPlayer) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Auction Complete!</h1>
        <p className="text-gray-600 mb-8">All players have been auctioned.</p>
        <button
          onClick={() => downloadJSON(soldPlayers, 'auction-results.json')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Download Results
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Player Auction</h1>
          <p className="text-gray-600">
            Player {currentPlayerIndex + 1} of {players.length} • {remainingPlayers} remaining
          </p>
        </div>
        <button
          onClick={handleDownloadAuctionOrder}
          className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700"
        >
          <Download className="w-5 h-5" />
          <span>Download Order</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Current Player */}
        <div className="lg:col-span-2">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white mb-6">
            <div className="flex items-center justify-between mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold bg-white/20 backdrop-blur`}>
                {currentPlayer.role}
              </span>
              <Gavel className="w-8 h-8" />
            </div>

            <h2 className="text-4xl font-bold mb-2">{currentPlayer.name}</h2>
            <p className="text-xl text-white/90 mb-6">{currentPlayer.country}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-white/70 text-sm mb-1">Base Price</div>
                <div className="text-2xl font-bold">{formatCurrency(currentPlayer.basePrice)}</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-4">
                <div className="text-white/70 text-sm mb-1">Current Bid</div>
                <div className="text-2xl font-bold">
                  {currentBid > 0 ? formatCurrency(currentBid) : 'No bids'}
                </div>
              </div>
            </div>

            {currentBidder && (
              <div className="bg-white/10 backdrop-blur rounded-lg p-4 mb-6">
                <div className="text-white/70 text-sm mb-1">Leading Bidder</div>
                <div className="text-xl font-bold">
                  {owners.find(o => o.userId === currentBidder)?.name} ({owners.find(o => o.userId === currentBidder)?.teamName})
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={handleSold}
                disabled={!currentBidder || currentBid === 0}
                className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                SOLD!
              </button>
              <button
                onClick={handleUnsold}
                className="flex-1 bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors"
              >
                UNSOLD
              </button>
            </div>
          </div>

          {/* Quick Bid Buttons */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Bid Amounts</h3>
            <div className="grid grid-cols-4 gap-3">
              {[50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setCurrentBid(currentBid + amount)}
                  className="bg-blue-100 text-blue-700 font-semibold py-2 px-4 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                >
                  +{formatCurrency(amount).replace('₹', '₹')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Team Owners Panel */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Team Owners</h3>
          {owners.map((owner) => (
            <div
              key={owner.userId}
              className={`bg-white rounded-xl shadow-sm p-6 border-2 transition-all ${currentBidder === owner.userId
                ? 'border-blue-600 ring-2 ring-blue-600 ring-opacity-50'
                : 'border-gray-100'
                }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-bold text-gray-900">{owner.name}</div>
                  <div className="text-sm text-gray-600">{owner.teamName}</div>
                </div>
                {currentBidder === owner.userId && (
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    Leading
                  </div>
                )}
              </div>
              <div className="mb-4">
                <div className="text-xs text-gray-600 mb-1">Remaining Budget</div>
                <div className="text-lg font-bold text-gray-900">
                  {formatCurrency(owner.remainingBudget)}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(owner.remainingBudget / owner.budget) * 100}%` }}
                  />
                </div>
              </div>
              <button
                onClick={() => handleBid(owner.userId, currentPlayer.basePrice + 50000)}
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Place Bid
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Sales */}
      {soldPlayers.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Sales</h3>
          <div className="space-y-2">
            {soldPlayers.slice(-5).reverse().map((sale, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-semibold text-gray-900">{sale.player.name}</div>
                  <div className="text-sm text-gray-600">
                    {sale.player.country} • {sale.player.role}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    {owners.find(o => o.userId === sale.buyer)?.name}
                  </div>
                  <div className="font-bold text-blue-600">{formatCurrency(sale.price)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
