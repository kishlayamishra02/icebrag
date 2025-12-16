import React, { useState, useEffect } from 'react';
import { Screen, GameMode, Persona, Category, Question, SessionStats, Player } from './types';
import { generateQuestions, generateRoomCode } from './utils/questionGenerator';
import { LobbyScreen } from './components/LobbyScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { SwipeScreen } from './components/SwipeScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('lobby');
  const [gameMode, setGameMode] = useState<GameMode>('solo');
  const [selectedPersona, setSelectedPersona] = useState<Persona>('Funny');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [roomCode, setRoomCode] = useState<string>('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerName, setPlayerName] = useState('');

  const startGame = (mode: GameMode, persona: Persona, category: Category, name?: string) => {
    setGameMode(mode);
    setSelectedPersona(persona);
    setSelectedCategory(category);
    setPlayerName(name || 'Player');
    
    // Generate initial questions
    const newQuestions = generateQuestions(persona, category, 20);
    setQuestions(newQuestions);
    setCurrentIndex(0);

    // Setup party mode if needed
    if (mode === 'party') {
      const newRoomCode = generateRoomCode();
      setRoomCode(newRoomCode);
      setPlayers([
        {
          id: '1',
          name: name || 'Player',
          isHost: true,
        },
      ]);
    }

    setCurrentScreen('swipe');
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentIndex >= questions.length) return;

    // Update vote on current question
    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex].votes = direction === 'right' ? 'yes' : 'no';
    setQuestions(updatedQuestions);

    // Move to next card
    setCurrentIndex(currentIndex + 1);
  };

  const calculateStats = (): SessionStats => {
    const votedQuestions = questions.filter((q) => q.votes !== null);
    const yesVotes = questions.filter((q) => q.votes === 'yes').length;
    const noVotes = questions.filter((q) => q.votes === 'no').length;

    // Find top question (first yes vote for now)
    const topQuestion = questions.find((q) => q.votes === 'yes') || null;

    // Category breakdown
    const categories: Record<Category, number> = {
      All: 0,
      Work: 0,
      Personal: 0,
      Creative: 0,
      Random: 0,
    };

    votedQuestions.forEach((q) => {
      if (q.category in categories) {
        categories[q.category]++;
      }
    });

    return {
      totalQuestions: votedQuestions.length,
      yesVotes,
      noVotes,
      topQuestion,
      categories,
    };
  };

  const handleViewResults = () => {
    setCurrentScreen('results');
  };

  const handleRestart = () => {
    const newQuestions = generateQuestions(selectedPersona, selectedCategory, 20);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setCurrentScreen('swipe');
  };

  const handleBackToLobby = () => {
    setCurrentScreen('lobby');
    setQuestions([]);
    setCurrentIndex(0);
    setRoomCode('');
    setPlayers([]);
  };

  const handlePersonaChange = (persona: Persona) => {
    setSelectedPersona(persona);
  };

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleGenerateNew = () => {
    const newQuestions = generateQuestions(selectedPersona, selectedCategory, 20);
    setQuestions(newQuestions);
    setCurrentIndex(0);
  };

  return (
    <div className="min-h-screen bg-[var(--cream-bg)] text-black">
      {currentScreen === 'lobby' && (
        <LobbyScreen onStartGame={startGame} />
      )}

      {currentScreen === 'swipe' && (
        <SwipeScreen
          questions={questions}
          currentIndex={currentIndex}
          mode={gameMode}
          roomCode={gameMode === 'party' ? roomCode : undefined}
          players={gameMode === 'party' ? players : undefined}
          selectedPersona={selectedPersona}
          selectedCategory={selectedCategory}
          onSwipe={handleSwipe}
          onViewResults={handleViewResults}
          onPersonaChange={handlePersonaChange}
          onCategoryChange={handleCategoryChange}
          onGenerateNew={handleGenerateNew}
        />
      )}

      {currentScreen === 'results' && (
        <ResultsScreen
          questions={questions}
          stats={calculateStats()}
          mode={gameMode}
          onRestart={handleRestart}
          onBackToLobby={handleBackToLobby}
        />
      )}
    </div>
  );
}