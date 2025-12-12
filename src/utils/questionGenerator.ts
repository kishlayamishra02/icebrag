import { Question, Persona, Category } from '../types';

const questionBank: Record<Persona, Record<Category, string[]>> = {
  Funny: {
    All: [],
    Work: [
      "If our office had a mascot, what chaotic animal would best represent our energy?",
      "What's your most embarrassing autocorrect fail in a work email?",
      "If you could replace one meeting with a game show, which one and what show?",
      "What's the weirdest thing you've seen on a Zoom call?",
    ],
    Personal: [
      "What's the most ridiculous thing you believed as a child?",
      "If you were a kitchen appliance, which one would you be and why?",
      "What's your go-to karaoke song that you absolutely butcher?",
      "What's the strangest compliment you've ever received?",
    ],
    Creative: [
      "If you could invent a new holiday, what would we celebrate?",
      "What's the most useless superpower you'd actually want?",
      "Design your dream treehouse - what weird features does it have?",
      "If animals could talk, which species would be the rudest?",
    ],
    Random: [
      "What's your most controversial food opinion?",
      "If you could only eat foods of one color for a year, which color?",
      "What's the weirdest smell that you actually like?",
      "Would you rather fight one horse-sized duck or 100 duck-sized horses?",
    ],
  },
  Deep: {
    All: [],
    Work: [
      "What's one professional risk you're glad you took?",
      "How has your definition of success changed over the years?",
      "What's the most important lesson a mentor taught you?",
      "If you could give your younger professional self one piece of advice, what would it be?",
    ],
    Personal: [
      "What's a belief you held strongly that completely changed?",
      "When did you feel most alive in the past year?",
      "What's something you're still learning to forgive yourself for?",
      "Who in your life knows you better than anyone else, and why?",
    ],
    Creative: [
      "If you could leave one message for future generations, what would it say?",
      "What piece of art, music, or writing changed your perspective on life?",
      "What story from your life do you think deserves to be told?",
      "If you could master any creative skill instantly, what would you create first?",
    ],
    Random: [
      "What's a question you wish people would ask you more often?",
      "If you could have dinner with anyone, living or dead, who and why?",
      "What do you hope people remember about you?",
      "What's something beautiful you noticed today?",
    ],
  },
  Roast: {
    All: [],
    Work: [
      "What's your most annoying work habit that you refuse to change?",
      "How many browser tabs do you have open right now? (Be honest)",
      "What's the longest you've gone without checking Slack/email?",
      "What's your worst 'reply all' moment?",
    ],
    Personal: [
      "How many times do you hit snooze in the morning?",
      "What's the longest you've worn the same sweatpants?",
      "Be honest: when was the last time you actually flossed?",
      "How many unread emails are in your personal inbox right now?",
    ],
    Creative: [
      "What's a creative project you started and abandoned? (We know there's at least one)",
      "Show us your phone's photo gallery - how many blurry screenshots?",
      "What's your most pretentious creative opinion?",
      "What hobby did you pick up during quarantine and immediately quit?",
    ],
    Random: [
      "What's your most irrational fear that you won't admit in public?",
      "How long could you survive without your phone? (Be realistic)",
      "What's something you pretend to understand but totally don't?",
      "What's your toxic trait?",
    ],
  },
  Chaos: {
    All: [],
    Work: [
      "If you had to delete one app from everyone's work computer, which one causes maximum chaos?",
      "You can send one cryptic message to the entire company - what is it?",
      "Which coworker would survive longest in a zombie apocalypse?",
      "If the office became a battle royale, what's your strategy?",
    ],
    Personal: [
      "You can swap lives with someone for 24 hours - who experiences the most chaos?",
      "What's the most chaotic thing you could do with $1000 and one hour?",
      "If you could make one species of animal the size of an elephant, which creates the most mayhem?",
      "You get one consequence-free purge day - what chaotic (legal) thing do you do?",
    ],
    Creative: [
      "Design a new sport that would be banned within a week",
      "You can add one rule to any game that ruins it - what's the rule?",
      "Create a new genre of music by mashing up two opposite genres",
      "What would you add to normal tap water to create maximum confusion?",
    ],
    Random: [
      "If you could rearrange all the furniture in someone's house while they sleep, whose house?",
      "You can make one food item sentient - which causes the most chaos?",
      "What's the most chaotic but legal thing you could do at an airport?",
      "If gravity reversed for 10 seconds worldwide, where do you want to be?",
    ],
  },
  Spicy: {
    All: [],
    Work: [
      "What's the office gossip you're dying to know the truth about?",
      "Which workplace rule would you eliminate if you were in charge?",
      "What's your most controversial opinion about remote work?",
      "Be honest: who's the most overrated person in your industry?",
    ],
    Personal: [
      "What's a secret you've kept from your best friend?",
      "What's the pettiest reason you've stopped talking to someone?",
      "What's something about yourself you only reveal after a few drinks?",
      "What's your most unpopular opinion that would start an argument?",
    ],
    Creative: [
      "Which beloved movie/show is actually terrible?",
      "What's an art form that you think is complete nonsense?",
      "Hot take: which classic book is overrated and boring?",
      "What's a popular song that you think is genuinely bad?",
    ],
    Random: [
      "What's the most expensive thing you've stolen? (even if it was an accident)",
      "What lie have you told that spiraled out of control?",
      "What's something illegal you've done and never got caught?",
      "What's the worst thing you did to get revenge on someone?",
    ],
  },
  Wholesome: {
    All: [],
    Work: [
      "Who at work made your day better recently, and how?",
      "What's a small success you had this week worth celebrating?",
      "What work accomplishment are you most proud of?",
      "Which coworker deserves more recognition, and for what?",
    ],
    Personal: [
      "What's something kind someone did for you that you still remember?",
      "Who's someone you're grateful for but haven't told recently?",
      "What's your favorite way to show love to the people you care about?",
      "What's a happy memory from this year that makes you smile?",
    ],
    Creative: [
      "What's something beautiful you created that you're proud of?",
      "What creative work by someone else recently inspired you?",
      "If you could give everyone a gift, what would it be?",
      "What's your favorite way to make someone's day brighter?",
    ],
    Random: [
      "What's the best compliment you've ever received?",
      "What simple pleasure makes your day infinitely better?",
      "What's something about the world that gives you hope?",
      "What made you laugh the hardest recently?",
    ],
  },
};

// Fill 'All' category with mixed questions from other categories
Object.keys(questionBank).forEach((persona) => {
  const p = persona as Persona;
  const allQuestions: string[] = [];
  (['Work', 'Personal', 'Creative', 'Random'] as Category[]).forEach((cat) => {
    allQuestions.push(...questionBank[p][cat].slice(0, 2));
  });
  questionBank[p].All = allQuestions;
});

export function generateQuestions(
  persona: Persona,
  category: Category,
  count: number = 20
): Question[] {
  const questions = questionBank[persona][category] || questionBank[persona].All;
  const generated: Question[] = [];

  // If we need more questions than available, cycle through them
  for (let i = 0; i < count; i++) {
    const questionText = questions[i % questions.length];
    generated.push({
      id: `${persona}-${category}-${i}-${Date.now()}`,
      text: questionText,
      category: category === 'All' ? (['Work', 'Personal', 'Creative', 'Random'][i % 4] as Category) : category,
      persona,
      votes: null,
    });
  }

  return generated;
}

export function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}