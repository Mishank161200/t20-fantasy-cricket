'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { User, Mail, Trophy, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, userTournaments, setUser, setUserTournaments, setCurrentTournament } = useAppStore();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUserTournaments([]);
      setCurrentTournament(null);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push('/auth');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-white/90">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="p-8 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-700">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-medium">{user.email}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Name</div>
                  <div className="font-medium">{user.name}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Trophy className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">Tournaments</div>
                  <div className="font-medium">{userTournaments?.length || 0} tournaments</div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
