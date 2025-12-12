import React from 'react';
import { Player } from '../types';
import { Crown, User } from 'lucide-react';

interface PlayersListProps {
  players: Player[];
}

export function PlayersList({ players }: PlayersListProps) {
  return (
    <div className="brutalist-border bg-white p-6">
      <h3 className="text-xl mb-4 uppercase tracking-wider">Players ({players.length})</h3>
      <div className="space-y-2">
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center gap-3 p-3 bg-[var(--cream-bg)] border-4 border-black"
          >
            {player.isHost ? (
              <Crown className="w-5 h-5 text-[var(--neon-yellow)]" />
            ) : (
              <User className="w-5 h-5" />
            )}
            <span>{player.name}</span>
            {player.isHost && (
              <span className="ml-auto text-xs px-2 py-1 bg-[var(--neon-yellow)] text-black uppercase tracking-wider border-2 border-black">
                Host
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}