import React, { useState } from 'react';
import { Question, SessionStats, GameMode } from '../types';
import { Button } from './Button';
import { Logo } from './Logo';
import { ThumbsUp, ThumbsDown, Share2, Download, RotateCcw, Trophy, TrendingUp } from 'lucide-react';

interface ResultsScreenProps {
  questions: Question[];
  stats: SessionStats;
  mode: GameMode;
  onRestart: () => void;
  onBackToLobby: () => void;
}

export function ResultsScreen({ questions, stats, mode, onRestart, onBackToLobby }: ResultsScreenProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);

  const yesQuestions = questions.filter((q) => q.votes === 'yes');
  const noQuestions = questions.filter((q) => q.votes === 'no');

  const handleShare = () => {
    const text = `I just played ICEBRAG! 🎮\n\nVoted YES on ${stats.yesVotes} questions\nVoted NO on ${stats.noVotes} questions\n\nTop question: "${stats.topQuestion?.text || 'None yet'}"\n\nTry it yourself!`;
    
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Results copied to clipboard!');
    }
    setShowShareMenu(false);
  };

  const handleExport = () => {
    const data = {
      stats,
      yesQuestions: yesQuestions.map((q) => q.text),
      noQuestions: noQuestions.map((q) => q.text),
      mode,
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `icebrag-session-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setShowShareMenu(false);
  };

  const yesPercentage = stats.totalQuestions > 0 
    ? ((stats.yesVotes / stats.totalQuestions) * 100).toFixed(0) 
    : 0;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <Logo size="md" />
          <h2 className="text-3xl mt-4 uppercase tracking-wider">Session Results</h2>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="brutalist-border bg-white p-8 text-center sticker-rotate-1">
            <div className="text-5xl mb-2">{stats.totalQuestions}</div>
            <div className="text-sm uppercase tracking-wider opacity-70">Total Questions</div>
          </div>

          <div className="brutalist-border bg-green-100 p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ThumbsUp className="w-8 h-8 text-green-700" />
              <div className="text-5xl text-green-700">{stats.yesVotes}</div>
            </div>
            <div className="text-sm uppercase tracking-wider opacity-70">Yes Votes</div>
            <div className="text-2xl mt-2 text-green-700">{yesPercentage}%</div>
          </div>

          <div className="brutalist-border bg-red-100 p-8 text-center sticker-rotate-3">
            <div className="flex items-center justify-center gap-2 mb-2">
              <ThumbsDown className="w-8 h-8 text-red-700" />
              <div className="text-5xl text-red-700">{stats.noVotes}</div>
            </div>
            <div className="text-sm uppercase tracking-wider opacity-70">No Votes</div>
            <div className="text-2xl mt-2 text-red-700">{100 - Number(yesPercentage)}%</div>
          </div>
        </div>

        {/* Top Question */}
        {stats.topQuestion && (
          <div className="brutalist-border bg-gradient-to-br from-[var(--neon-yellow)] to-[var(--neon-cyan)] p-1 sticker-rotate-2">
            <div className="bg-white p-8">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-8 h-8 text-[var(--neon-yellow)]" />
                <h3 className="text-2xl uppercase tracking-wider">Top Question</h3>
              </div>
              <p className="text-xl mb-4">{stats.topQuestion.text}</p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-black text-white text-sm uppercase tracking-wider border-2 border-black">
                  {stats.topQuestion.category}
                </span>
                <span className="px-3 py-1 bg-[var(--neon-cyan)] text-black text-sm uppercase tracking-wider border-2 border-black">
                  {stats.topQuestion.persona}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Category Breakdown */}
        <div className="brutalist-border bg-white p-8">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6" />
            <h3 className="text-xl uppercase tracking-wider">Category Breakdown</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(stats.categories)
              .filter(([cat]) => cat !== 'All')
              .map(([category, count]) => (
                <div key={category} className="text-center p-4 bg-[var(--cream-bg)] border-4 border-black">
                  <div className="text-3xl mb-1">{count}</div>
                  <div className="text-sm uppercase tracking-wider opacity-70">{category}</div>
                </div>
              ))}
          </div>
        </div>

        {/* Questions Lists */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Yes Questions */}
          <div className="brutalist-border bg-white p-6">
            <h3 className="text-xl uppercase tracking-wider mb-4 flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-green-600" />
              Yes Questions ({yesQuestions.length})
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {yesQuestions.length === 0 ? (
                <p className="text-center opacity-50 py-8">No questions voted yes yet</p>
              ) : (
                yesQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="p-4 bg-[var(--cream-bg)] border-l-4 border-green-600"
                  >
                    <p className="mb-2">{q.text}</p>
                    <div className="flex gap-2">
                      <span className="text-xs px-2 py-1 bg-black text-white uppercase tracking-wider">
                        {q.category}
                      </span>
                      <span className="text-xs px-2 py-1 bg-[var(--neon-cyan)] text-black uppercase tracking-wider border-2 border-black">
                        {q.persona}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* No Questions */}
          <div className="brutalist-border bg-white p-6">
            <h3 className="text-xl uppercase tracking-wider mb-4 flex items-center gap-2">
              <ThumbsDown className="w-5 h-5 text-red-600" />
              No Questions ({noQuestions.length})
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {noQuestions.length === 0 ? (
                <p className="text-center opacity-50 py-8">No questions voted no yet</p>
              ) : (
                noQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="p-4 bg-[var(--cream-bg)] border-l-4 border-red-600"
                  >
                    <p className="mb-2">{q.text}</p>
                    <div className="flex gap-2">
                      <span className="text-xs px-2 py-1 bg-black text-white uppercase tracking-wider">
                        {q.category}
                      </span>
                      <span className="text-xs px-2 py-1 bg-[var(--neon-cyan)] text-black uppercase tracking-wider border-2 border-black">
                        {q.persona}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Button onClick={handleShare} variant="neon-cyan" size="lg" className="w-full">
            <Share2 className="w-5 h-5 mr-2" />
            Share Results
          </Button>
          <Button onClick={handleExport} variant="neon-pink" size="lg" className="w-full">
            <Download className="w-5 h-5 mr-2" />
            Export Data
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Button onClick={onRestart} variant="neon-yellow" size="lg" className="w-full">
            <RotateCcw className="w-5 h-5 mr-2" />
            New Session
          </Button>
          <Button onClick={onBackToLobby} variant="secondary" size="lg" className="w-full">
            Back to Lobby
          </Button>
        </div>
      </div>
    </div>
  );
}