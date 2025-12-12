import React from 'react';
import { Category } from '../types';
import { Briefcase, User, Lightbulb, Shuffle } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: Category;
  onSelect: (category: Category) => void;
}

const categoryConfig: Record<Category, { icon?: React.ReactNode; label: string }> = {
  All: { label: 'All' },
  Work: { icon: <Briefcase className="w-4 h-4" />, label: 'Work' },
  Personal: { icon: <User className="w-4 h-4" />, label: 'Personal' },
  Creative: { icon: <Lightbulb className="w-4 h-4" />, label: 'Creative' },
  Random: { icon: <Shuffle className="w-4 h-4" />, label: 'Random' },
};

export function CategoryFilter({ selectedCategory, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {(Object.keys(categoryConfig) as Category[]).map((category) => {
        const config = categoryConfig[category];
        const isSelected = selectedCategory === category;
        
        return (
          <button
            key={category}
            onClick={() => onSelect(category)}
            className={`px-4 py-2 border-4 border-black transition-all duration-200 flex items-center gap-2 ${
              isSelected 
                ? 'bg-black text-white shadow-none translate-x-1 translate-y-1' 
                : 'bg-white text-black shadow-[2px_2px_0_0_#000] hover:shadow-[1px_1px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5'
            }`}
          >
            {config.icon}
            <span>{config.label}</span>
          </button>
        );
      })}
    </div>
  );
}