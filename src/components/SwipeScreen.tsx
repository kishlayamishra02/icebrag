import React, { useState, useRef } from 'react';
import { Question } from '../types';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface SwipeCardProps {
  question: Question;
  onSwipe: (direction: 'left' | 'right') => void;
  isTop: boolean;
}

export function SwipeCard({ question, onSwipe, isTop }: SwipeCardProps) {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  const handleDragStart = (clientX: number, clientY: number) => {
    if (!isTop) return;
    setIsDragging(true);
    startPosRef.current = { x: clientX, y: clientY };
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!isDragging || !isTop) return;
    
    const deltaX = clientX - startPosRef.current.x;
    const deltaY = clientY - startPosRef.current.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleDragEnd = () => {
    if (!isDragging || !isTop) return;
    setIsDragging(false);

    const threshold = 100;
    if (Math.abs(dragOffset.x) > threshold) {
      onSwipe(dragOffset.x > 0 ? 'right' : 'left');
    }
    
    setDragOffset({ x: 0, y: 0 });
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleDragStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleDragMove(touch.clientX, touch.clientY);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  const rotation = dragOffset.x * 0.1;
  const opacity = isTop ? 1 : 0.5;
  const scale = isTop ? 1 : 0.95;

  const showNopeIndicator = dragOffset.x < -50;
  const showYesIndicator = dragOffset.x > 50;

  return (
    <div
      ref={cardRef}
      className="absolute inset-0 select-none"
      style={{
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg) scale(${scale})`,
        opacity,
        transition: isDragging ? 'none' : 'transform 0.3s ease, opacity 0.3s ease',
        cursor: isTop ? 'grab' : 'default',
        zIndex: isTop ? 10 : 1,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="brutalist-border bg-white w-full h-full p-8 flex flex-col justify-between sticker-rotate-1">
        {/* Swipe indicators */}
        {showNopeIndicator && (
          <div className="absolute top-8 right-8 text-6xl rotate-12 opacity-90">
            <div className="brutalist-border bg-red-500 p-4">
              <ThumbsDown className="w-16 h-16 text-white" strokeWidth={3} />
            </div>
          </div>
        )}
        {showYesIndicator && (
          <div className="absolute top-8 left-8 text-6xl -rotate-12 opacity-90">
            <div className="brutalist-border bg-green-500 p-4">
              <ThumbsUp className="w-16 h-16 text-white" strokeWidth={3} />
            </div>
          </div>
        )}

        {/* Question content */}
        <div className="flex-1 flex items-center justify-center">
          <p className="text-2xl md:text-3xl text-center leading-relaxed">
            {question.text}
          </p>
        </div>

        {/* Category badge */}
        <div className="flex justify-between items-center gap-2">
          <span className="px-4 py-2 bg-black text-white text-sm uppercase tracking-wider border-4 border-black">
            {question.category}
          </span>
          <span className="px-4 py-2 bg-[var(--neon-cyan)] text-black text-sm uppercase tracking-wider border-4 border-black">
            {question.persona}
          </span>
        </div>
      </div>
    </div>
  );
}