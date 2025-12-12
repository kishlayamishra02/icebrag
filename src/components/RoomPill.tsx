import React from 'react';

interface RoomPillProps {
  roomCode: string;
}

export function RoomPill({ roomCode }: RoomPillProps) {
  return (
    <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full border-2 border-black">
      <span>ROOM: {roomCode}</span>
      <span>👥</span>
    </div>
  );
}
