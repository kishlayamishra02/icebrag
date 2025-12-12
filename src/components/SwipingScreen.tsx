import React, { useState } from 'react';
import { QuestionCard } from './QuestionCard';
import { RoomPill } from './RoomPill';
import { PersonaDropdown, Persona } from './PersonaDropdown';
import { Button } from './Button';
import { AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  category: string;
  isAI?: boolean;
}

interface SwipingScreenProps {
  mode: 'solo' | 'party';
  roomCode?: string;
  onComplete: (selectedQuestions: Question[]) => void;
}

const initialQuestions: Question[] = [
  { id: '1', question: "What's your most unpopular opinion about pizza toppings?", category: 'Funny' },
  { id: '2', question: "If you could have dinner with any historical figure, who would it be and why?", category: 'Deep' },
  { id: '3', question: "What's a skill you've always wanted to learn but haven't yet?", category: 'Casual' },
  { id: '4', question: "What's your biggest professional achievement this year?", category: 'Professional' },
  { id: '5', question: "If you were a vegetable, which one would you be?", category: 'Funny' },
];

export function SwipingScreen({ mode, roomCode, onComplete }: SwipingScreenProps) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [persona, setPersona] = useState<Persona>('funny');

  const handleSwipe = (direction: 'left' | 'right') => {
    const currentQuestion = questions[questions.length - 1];
    
    if (direction === 'right') {
      setSelectedQuestions([...selectedQuestions, currentQuestion]);
    }
    
    setQuestions(questions.slice(0, -1));
    
    if (questions.length <= 1) {
      setTimeout(() => {
        onComplete(selectedQuestions);
      }, 300);
    }
  };

  const generateAIQuestion = () => {
    const aiQuestions = {
      funny: "Why do they call it 'rush hour' when nothing moves?",
      deep: "What legacy do you want to leave behind?",
      roast: "What's the worst fashion choice you've ever made?",
      chaos: "If animals could talk, which species would be the rudest?",
    };

    const newQuestion: Question = {
      id: Date.now().toString(),
      question: aiQuestions[persona],
      category: persona.charAt(0).toUpperCase() + persona.slice(1),
      isAI: true,
    };

    setQuestions([...questions, newQuestion]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-6 border-b-4 border-black bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <h3 className="tracking-tight">ICEBRAG</h3>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            {mode === 'party' && roomCode && <RoomPill roomCode={roomCode} />}
            
            <div className="flex items-center gap-2">
              <PersonaDropdown value={persona} onChange={setPersona} />
              <Button variant="secondary" onClick={generateAIQuestion}>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  <span>Generate</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Card Stack */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl relative h-[500px]">
          <AnimatePresence>
            {questions.map((q, index) => (
              <QuestionCard
                key={q.id}
                question={q.question}
                category={q.category}
                isAI={q.isAI}
                onSwipe={handleSwipe}
                index={index}
              />
            ))}
          </AnimatePresence>
          
          {questions.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-2xl text-gray-400">No more questions!</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-6 text-center text-gray-500">
        <p>{questions.length} questions remaining</p>
      </div>
    </div>
  );
}
