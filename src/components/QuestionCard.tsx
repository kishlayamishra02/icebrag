import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { TagChip } from './TagChip';

interface QuestionCardProps {
  question: string;
  category: string;
  isAI?: boolean;
  onSwipe: (direction: 'left' | 'right') => void;
  index: number;
}

export function QuestionCard({ question, category, isAI = false, onSwipe, index }: QuestionCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-15, 0, 15]);
  const opacity = useTransform(x, [-300, -150, 0, 150, 300], [0, 1, 1, 1, 0]);

  const nopeOpacity = useTransform(x, [-150, -50, 0], [1, 0.5, 0]);
  const yesOpacity = useTransform(x, [0, 50, 150], [0, 0.5, 1]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const threshold = 150;
    
    if (Math.abs(info.offset.x) > threshold) {
      const direction = info.offset.x > 0 ? 'right' : 'left';
      onSwipe(direction);
    } else {
      x.set(0);
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDragEnd}
      style={{ x, rotate, opacity }}
      className="w-full h-full cursor-grab active:cursor-grabbing"
    >
      <div className="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        {/* YES/NO overlays */}
        <motion.div
          style={{ opacity: yesOpacity }}
          className="absolute top-8 right-8 text-6xl rotate-12 pointer-events-none select-none"
        >
          <span className="text-[#00F0FF] drop-shadow-[0_0_10px_rgba(0,240,255,0.5)]">YES</span>
        </motion.div>
        
        <motion.div
          style={{ opacity: nopeOpacity }}
          className="absolute top-8 left-8 text-6xl -rotate-12 pointer-events-none select-none"
        >
          <span className="text-[#FF006E] drop-shadow-[0_0_10px_rgba(255,0,110,0.5)]">NOPE</span>
        </motion.div>

        {/* Card content */}
        <div className="flex flex-col gap-6 relative z-10">
          <div className="flex flex-wrap gap-2">
            <TagChip label={category} variant="category" />
            {isAI && <TagChip label="✨ AI" variant="ai" />}
          </div>

          <div className="min-h-[200px] flex items-center justify-center">
            <h2 className="text-center">{question}</h2>
          </div>

          <p className="text-center text-gray-500 select-none">
            {isDragging ? '← NOPE or YES →' : 'Drag to Vote'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
