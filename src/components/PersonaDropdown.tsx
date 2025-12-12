import React from 'react';

export type Persona = 'funny' | 'deep' | 'roast' | 'chaos';

interface PersonaDropdownProps {
  value: Persona;
  onChange: (persona: Persona) => void;
}

const personas = [
  { value: 'funny' as Persona, label: '😂 Funny', emoji: '😂' },
  { value: 'deep' as Persona, label: '🤔 Deep', emoji: '🤔' },
  { value: 'roast' as Persona, label: '🔥 Roast', emoji: '🔥' },
  { value: 'chaos' as Persona, label: '🎲 Chaos', emoji: '🎲' },
];

export function PersonaDropdown({ value, onChange }: PersonaDropdownProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as Persona)}
      className="px-4 py-2 rounded-xl border-4 border-black bg-white cursor-pointer hover:bg-gray-50 transition-colors"
    >
      {personas.map((persona) => (
        <option key={persona.value} value={persona.value}>
          {persona.label}
        </option>
      ))}
    </select>
  );
}
