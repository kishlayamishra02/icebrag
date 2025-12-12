import React, { useState } from 'react';
import { GameMode, Persona, Category } from '../types';
import { Logo } from './Logo';
import { Button } from './Button';
import { PersonaSelector } from './PersonaSelector';
import { CategoryFilter } from './CategoryFilter';
import { Users, User } from 'lucide-react';

interface LobbyScreenProps {
  onStartGame: (mode: GameMode, persona: Persona, category: Category, playerName?: string) => void;
}

export function LobbyScreen({ onStartGame }: LobbyScreenProps) {
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<Persona>('Funny');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [playerName, setPlayerName] = useState('');
  const [showJoinRoom, setShowJoinRoom] = useState(false);
  const [roomCode, setRoomCode] = useState('');

  const handleStart = () => {
    if (selectedMode && playerName.trim()) {
      onStartGame(selectedMode, selectedPersona, selectedCategory, playerName);
    }
  };

  const handleJoinRoom = () => {
    if (roomCode.trim() && playerName.trim()) {
      // In a real app, this would join an existing room
      onStartGame('party', selectedPersona, selectedCategory, playerName);
    }
  };

  if (!selectedMode) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full space-y-12">
          {/* Logo */}
          <div className="text-center">
            <Logo size="lg" />
            <p className="mt-4 text-xl opacity-80">
              Swipe-based icebreaker questions with AI personas
            </p>
          </div>

          {/* Mode Selection */}
          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => setSelectedMode('solo')}
              className="brutalist-border bg-white p-12 hover:scale-105 transition-all sticker-rotate-1"
            >
              <User className="w-16 h-16 mx-auto mb-4 text-[var(--neon-yellow)]" />
              <h2 className="text-3xl mb-2">Solo Mode</h2>
              <p className="opacity-70">Browse and vote on questions by yourself</p>
            </button>

            <button
              onClick={() => setSelectedMode('party')}
              className="brutalist-border bg-white p-12 hover:scale-105 transition-all sticker-rotate-2"
            >
              <Users className="w-16 h-16 mx-auto mb-4 text-[var(--neon-cyan)]" />
              <h2 className="text-3xl mb-2">Party Mode</h2>
              <p className="opacity-70">Create a room and play with friends</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Logo size="md" />
          <h2 className="text-2xl mt-4 uppercase tracking-wider">
            {selectedMode === 'solo' ? 'Solo Mode' : 'Party Mode'}
          </h2>
        </div>

        {/* Player Name */}
        <div className="brutalist-border bg-white p-6 sticker-rotate-1">
          <label className="block text-sm uppercase tracking-wider mb-2">Your Name</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Enter your name..."
            className="w-full p-4 bg-[var(--cream-bg)] border-4 border-black text-black outline-none focus:bg-white"
            maxLength={20}
          />
        </div>

        {/* Join Room (Party Mode Only) */}
        {selectedMode === 'party' && (
          <div className="space-y-4">
            <Button
              onClick={() => setShowJoinRoom(!showJoinRoom)}
              variant="secondary"
              className="w-full"
            >
              {showJoinRoom ? 'Create New Room' : 'Join Existing Room'}
            </Button>

            {showJoinRoom && (
              <div className="brutalist-border bg-white p-6">
                <label className="block text-sm uppercase tracking-wider mb-2">Room Code</label>
                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  placeholder="Enter 6-digit code..."
                  className="w-full p-4 bg-[var(--cream-bg)] border-4 border-black text-black outline-none focus:bg-white tracking-widest text-center"
                  maxLength={6}
                />
                <Button
                  onClick={handleJoinRoom}
                  variant="neon-cyan"
                  className="w-full mt-4"
                  disabled={!roomCode.trim() || !playerName.trim()}
                >
                  Join Room
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Persona Selection */}
        {!showJoinRoom && (
          <>
            <div>
              <h3 className="text-xl mb-4 uppercase tracking-wider text-center">
                Choose AI Persona
              </h3>
              <PersonaSelector selectedPersona={selectedPersona} onSelect={setSelectedPersona} />
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-xl mb-4 uppercase tracking-wider text-center">
                Choose Category
              </h3>
              <CategoryFilter selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
            </div>

            {/* Start Button */}
            <div className="space-y-4">
              <Button
                onClick={handleStart}
                variant="neon-yellow"
                size="lg"
                className="w-full"
                disabled={!playerName.trim()}
              >
                {selectedMode === 'solo' ? 'Start Solo Session' : 'Create Party Room'}
              </Button>

              <Button
                onClick={() => setSelectedMode(null)}
                variant="secondary"
                className="w-full"
              >
                Back to Mode Selection
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}