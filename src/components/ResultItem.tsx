import React from 'react';

interface ResultItemProps {
  rank: number;
  question: string;
  votes: number;
}

export function ResultItem({ rank, question, votes }: ResultItemProps) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'bg-[#FFE500]';
    if (rank === 2) return 'bg-[#00F0FF]';
    if (rank === 3) return 'bg-[#FF006E] text-white';
    return 'bg-white';
  };

  return (
    <div className="flex items-center gap-4 bg-white border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className={`flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl border-2 border-black ${getRankColor(rank)}`}>
        <span className="font-black">#{rank}</span>
      </div>
      
      <div className="flex-1 min-w-0">
        <p className="truncate">{question}</p>
      </div>
      
      <div className="flex-shrink-0 px-3 py-1 bg-black text-white rounded-full border-2 border-black">
        <span>{votes} 👍</span>
      </div>
    </div>
  );
}
