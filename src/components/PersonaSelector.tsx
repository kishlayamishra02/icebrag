import React from 'react';
import { Persona } from '../types';
import { Sparkles, Heart, Flame, Zap, Skull, SmilePlus } from 'lucide-react';

interface PersonaSelectorProps {
  selectedPersona: Persona;
  onSelect: (persona: Persona) => void;
}


const personaConfig = {
  Funny: { 
    icon: <SmilePlus className="w-6 h-6" />, 
    color: '#FFE500', 
    description: 'Hilarious & silly' 
  },
  Deep: { 
    icon: <Heart className="w-6 h-6" />, 
    color: '#9333EA', 
    description: 'Meaningful & profound' 
  },
  Roast: { 
    icon: <Flame className="w-6 h-6" />, 
    color: '#FF6B35', 
    description: 'Playful callouts' 
  },
  Chaos: { 
    icon: <Zap className="w-6 h-6" />, 
    color: '#00F0FF', 
    description: 'Unpredictable madness' 
  },
  Spicy: { 
    icon: <Skull className="w-6 h-6" />, 
    color: '#FF006E', 
    description: 'Bold & daring' 
  },
  Wholesome: { 
    icon: <Sparkles className="w-6 h-6" />, 
    color: '#4ADE80', 
    description: 'Warm & positive' 
  },
    Empathetic: { 
    icon: <Heart className="w-6 h-6" />,  // You might want to choose a different icon
    color: '#3B82F6', 
    description: 'Understanding & compassionate' 
  },
  Bold: { 
    icon: <Zap className="w-6 h-6" />,  // You might want to choose a different icon
    color: '#F59E0B', 
    description: 'Confident & daring' 
  },
  Wise: { 
    icon: <Sparkles className="w-6 h-6" />,  // You might want to choose a different icon
    color: '#8B5CF6', 
    description: 'Insightful & thoughtful' 
  },
} as const satisfies Record<Persona, { icon: React.ReactNode; color: string; description: string }>;

const rotations = ['sticker-rotate-1', '', 'sticker-rotate-2', 'sticker-rotate-3', '', 'sticker-rotate-1'];

export function PersonaSelector({ selectedPersona, onSelect }: PersonaSelectorProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {(Object.keys(personaConfig) as Persona[]).map((persona, index) => {
        const config = personaConfig[persona];
        const isSelected = selectedPersona === persona;
        
        return (
          <button
            key={persona}
            onClick={() => onSelect(persona)}
            className={`brutalist-border p-4 transition-all duration-200 ${rotations[index]} ${
              isSelected 
                ? 'bg-white scale-105' 
                : 'bg-[var(--card-bg)] hover:scale-105'
            }`}
            style={isSelected ? { borderColor: config.color, backgroundColor: config.color } : {}}
          >
            <div className="flex flex-col items-center gap-2">
              <div style={{ color: isSelected ? '#000' : config.color }}>
                {config.icon}
              </div>
              <div>
                <div className="font-bold">{persona}</div>
                <div className="text-xs opacity-70">{config.description}</div>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}