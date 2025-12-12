import React from 'react';

interface TagChipProps {
  label: string;
  variant?: 'category' | 'ai';
}

export function TagChip({ label, variant = 'category' }: TagChipProps) {
  const variants = {
    category: 'bg-[#00F0FF] text-black border-black',
    ai: 'bg-[#FF006E] text-white border-[#FF006E]',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full border-2 ${variants[variant]}`}>
      {label}
    </span>
  );
}
