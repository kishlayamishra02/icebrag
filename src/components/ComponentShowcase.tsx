import React, { useState } from 'react';
import { Button } from './Button';
import { TagChip } from './TagChip';
import { RoomPill } from './RoomPill';
import { ResultItem } from './ResultItem';
import { Toast } from './Toast';
import { PersonaDropdown, Persona } from './PersonaDropdown';

export function ComponentShowcase() {
  const [toastVisible, setToastVisible] = useState(false);
  const [persona, setPersona] = useState<Persona>('funny');

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="mb-12">Component Showcase</h1>

        {/* Buttons */}
        <section className="mb-12">
          <h2 className="mb-6">Buttons</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
          </div>
          <div className="flex flex-wrap gap-4 mb-4">
            <Button variant="primary" disabled>Disabled Primary</Button>
            <Button variant="secondary" disabled>Disabled Secondary</Button>
          </div>
          <div className="max-w-md">
            <Button variant="primary" fullWidth>Full Width Button</Button>
          </div>
        </section>

        {/* Tag Chips */}
        <section className="mb-12">
          <h2 className="mb-6">Tag Chips</h2>
          <div className="flex flex-wrap gap-3">
            <TagChip label="Funny" variant="category" />
            <TagChip label="Deep" variant="category" />
            <TagChip label="Casual" variant="category" />
            <TagChip label="Professional" variant="category" />
            <TagChip label="✨ AI" variant="ai" />
          </div>
        </section>

        {/* Room Pill */}
        <section className="mb-12">
          <h2 className="mb-6">Room Code Pill</h2>
          <RoomPill roomCode="ICE-123" />
        </section>

        {/* Persona Dropdown */}
        <section className="mb-12">
          <h2 className="mb-6">AI Persona Dropdown</h2>
          <PersonaDropdown value={persona} onChange={setPersona} />
        </section>

        {/* Result Items */}
        <section className="mb-12">
          <h2 className="mb-6">Result List Items</h2>
          <div className="flex flex-col gap-4 max-w-2xl">
            <ResultItem rank={1} question="What's your most unpopular opinion about pizza toppings?" votes={12} />
            <ResultItem rank={2} question="If you could have dinner with any historical figure, who would it be?" votes={8} />
            <ResultItem rank={3} question="What's a skill you've always wanted to learn?" votes={5} />
            <ResultItem rank={4} question="What's your biggest professional achievement this year?" votes={3} />
          </div>
        </section>

        {/* Toast */}
        <section className="mb-12">
          <h2 className="mb-6">Toast Notification</h2>
          <Button variant="primary" onClick={() => setToastVisible(true)}>
            Show Toast
          </Button>
          <Toast
            message="Alex joined the room! 🎉"
            isVisible={toastVisible}
            onClose={() => setToastVisible(false)}
          />
        </section>

        {/* Color Palette */}
        <section className="mb-12">
          <h2 className="mb-6">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <div className="w-full h-24 bg-[#FDFBF7] border-4 border-black rounded-xl mb-2"></div>
              <p>Cream BG</p>
              <p className="text-sm text-gray-500">#FDFBF7</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#0A0A0A] border-4 border-black rounded-xl mb-2"></div>
              <p>Black</p>
              <p className="text-sm text-gray-500">#0A0A0A</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#FFE500] border-4 border-black rounded-xl mb-2"></div>
              <p>Yellow</p>
              <p className="text-sm text-gray-500">#FFE500</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#00F0FF] border-4 border-black rounded-xl mb-2"></div>
              <p>Cyan</p>
              <p className="text-sm text-gray-500">#00F0FF</p>
            </div>
            <div>
              <div className="w-full h-24 bg-[#FF006E] border-4 border-black rounded-xl mb-2"></div>
              <p>Hot Pink</p>
              <p className="text-sm text-gray-500">#FF006E</p>
            </div>
          </div>
        </section>

        {/* Card Example */}
        <section className="mb-12">
          <h2 className="mb-6">Question Card (Static)</h2>
          <div className="max-w-2xl">
            <div className="bg-white border-4 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-2">
                  <TagChip label="Funny" variant="category" />
                  <TagChip label="✨ AI" variant="ai" />
                </div>
                <div className="min-h-[200px] flex items-center justify-center">
                  <h2 className="text-center">What's your most unpopular opinion about pizza toppings?</h2>
                </div>
                <p className="text-center text-gray-500">Drag to Vote</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
