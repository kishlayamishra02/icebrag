import React from 'react';
import { X } from 'lucide-react';
import { Persona, Category } from '../types';
import { PersonaSelector } from './PersonaSelector';
import { CategoryFilter } from './CategoryFilter';
import { Button } from './Button';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPersona: Persona;
  selectedCategory: Category;
  onPersonaChange: (persona: Persona) => void;
  onCategoryChange: (category: Category) => void;
  onGenerateNew: () => void;
}

export function SettingsPanel({
  isOpen,
  onClose,
  selectedPersona,
  selectedCategory,
  onPersonaChange,
  onCategoryChange,
  onGenerateNew,
}: SettingsPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="brutalist-border bg-[var(--cream-bg)] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 sticker-rotate-1">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-black hover:text-white transition-colors border-4 border-black shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Persona Selection */}
        <div className="mb-8">
          <h3 className="text-xl mb-4 uppercase tracking-wider">AI Persona</h3>
          <PersonaSelector selectedPersona={selectedPersona} onSelect={onPersonaChange} />
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="text-xl mb-4 uppercase tracking-wider">Category</h3>
          <CategoryFilter selectedCategory={selectedCategory} onSelect={onCategoryChange} />
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Button onClick={onGenerateNew} variant="neon-cyan" className="w-full">
            Generate New Questions
          </Button>
          <Button onClick={onClose} variant="secondary" className="w-full">
            Close Settings
          </Button>
        </div>
      </div>
    </div>
  );
}