import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface RoomCodeDisplayProps {
  roomCode: string;
}

export function RoomCodeDisplay({ roomCode }: RoomCodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="brutalist-border bg-white p-6 flex items-center justify-between sticker-rotate-2">
      <div>
        <div className="text-sm opacity-70 uppercase tracking-wider mb-1">Room Code</div>
        <div className="text-3xl tracking-widest">{roomCode}</div>
      </div>
      <button
        onClick={handleCopy}
        className="p-3 border-4 border-black bg-[var(--neon-yellow)] hover:bg-opacity-90 transition-colors shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
      >
        {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
      </button>
    </div>
  );
}