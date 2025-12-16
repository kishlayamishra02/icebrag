export type Screen = 'lobby' | 'swipe' | 'results';
export type GameMode = 'solo' | 'party';
export type Persona = 'Funny' | 'Deep' | 'Chaos' | 'Empathetic' | 'Bold' | 'Wise' | 'Roast' | 'Spicy' | 'Wholesome';
export type Category = 'All' | 'Work' | 'Personal' | 'Creative' | 'Random';

export interface Question {
  id: string;
  text: string;
  category: Category;
  persona?: Persona;
  votes?: 'yes' | 'no' | null;
}

export interface SessionStats {
  totalQuestions: number;
  yesVotes: number;
  noVotes: number;
  topQuestion: Question | null;
  categories: Record<Category, number>;
}

export interface Player {
  id: string;
  name: string;
  isHost: boolean;
}
