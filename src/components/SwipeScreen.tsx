import React, { useState } from 'react';
import { Question, GameMode, Persona, Category } from '../types';
import { SwipeCard } from './SwipeCard';
import { Button } from './Button';
import { Logo } from './Logo';
import { RoomCodeDisplay } from './RoomCodeDisplay';
import { PlayersList } from './PlayersList';
import { SettingsPanel } from './SettingsPanel';
import { ThumbsUp, ThumbsDown, Settings, BarChart3 } from 'lucide-react';

interface SwipeScreenProps {
  questions: Question[];
  currentIndex: number;
  mode: GameMode;
  roomCode?: string;
  players?: Array<{ id: string; name: string; isHost: boolean }>;
  selectedPersona: Persona;
  selectedCategory: Category;
  onSwipe: (direction: 'left' | 'right') => void;
  onViewResults: () => void;
  onPersonaChange: (persona: Persona) => void;
  onCategoryChange: (category: Category) => void;
  onGenerateNew: () => void;
}

export function SwipeScreen({
  questions,
  currentIndex,
  mode,
  roomCode,
  players = [],
  selectedPersona,
  selectedCategory,
  onSwipe,
  onViewResults,
  onPersonaChange,
  onCategoryChange,
  onGenerateNew,
}: SwipeScreenProps) {
  const [showSettings, setShowSettings] = useState(false);

  const progress =
    questions.length > 0
      ? Math.min((currentIndex / questions.length) * 100, 100).toFixed(0)
      : '0';

  const remainingCards = Math.max(questions.length - currentIndex, 0);


  const handleButtonSwipe = (direction: 'left' | 'right') => {
    onSwipe(direction);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Logo size="sm" />
          <div className="flex gap-4">
            <Button onClick={() => setShowSettings(true)} variant="secondary" size="sm">
              <Settings className="w-5 h-5" />
            </Button>
            <Button onClick={onViewResults} variant="neon-cyan" size="sm">
              <BarChart3 className="w-5 h-5 mr-2" />
              Results
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Left Sidebar - Party Info */}
          {mode === 'party' && roomCode && (
            <div className="md:col-span-3 space-y-4">
              <RoomCodeDisplay roomCode={roomCode} />
              <PlayersList players={players} />
            </div>
          )}

          {/* Main Card Area */}
          <div className={mode === 'party' ? 'md:col-span-9' : 'md:col-span-12'}>
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm uppercase tracking-wider">Progress</span>
                <span className="text-sm">{remainingCards} cards remaining</span>
              </div>
              <div className="h-4 brutalist-border bg-white overflow-hidden">
                <div
                  className="h-full bg-[var(--neon-cyan)] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Card Stack */}
            <div className="relative aspect-[3/4] max-w-2xl mx-auto">
              {currentIndex >= questions.length ? (
                <div className="brutalist-border bg-white w-full h-full flex items-center justify-center p-8">
                  <div className="text-center">
                    <h2 className="text-4xl mb-4">All Done! 🎉</h2>
                    <p className="text-xl opacity-70 mb-8">
                      You've gone through all the questions
                    </p>
                    <Button onClick={onViewResults} variant="neon-yellow" size="lg">
                      View Results
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Show next 2 cards for depth */}
                  {questions.slice(currentIndex, currentIndex + 2).map((question, index) => (
                    <SwipeCard
                      key={question.id}
                      question={question}
                      onSwipe={index === 0 ? onSwipe : () => { }}
                      isTop={index === 0}
                    />
                  ))}
                </>
              )}
            </div>

            {/* Swipe Buttons */}
            {currentIndex < questions.length && (
              <div className="flex justify-center gap-8 mt-8">
                <button
                  onClick={() => handleButtonSwipe('left')}
                  className="brutalist-border bg-red-500 hover:bg-red-600 p-6 transition-all hover:scale-110 active:shadow-none active:translate-x-1 active:translate-y-1"
                >
                  <ThumbsDown className="w-12 h-12 text-white" />
                </button>
                <button
                  onClick={() => handleButtonSwipe('right')}
                  className="brutalist-border bg-green-500 hover:bg-green-600 p-6 transition-all hover:scale-110 active:shadow-none active:translate-x-1 active:translate-y-1"
                >
                  <ThumbsUp className="w-12 h-12 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      <SettingsPanel
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        selectedPersona={selectedPersona}
        selectedCategory={selectedCategory}
        onPersonaChange={onPersonaChange}
        onCategoryChange={onCategoryChange}
        onGenerateNew={onGenerateNew}
      />
    </div>
  );
}