import React from 'react';
import { Flame, Star, Sparkles, Gamepad, Compass, Trophy, Zap, Layers } from 'lucide-react';

const CATEGORY_ICONS = {
  All: <Compass className="w-3.5 h-3.5" />,
  Favorites: <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />,
  Arcade: <Gamepad className="w-3.5 h-3.5" />,
  Puzzle: <Layers className="w-3.5 h-3.5" />,
  Action: <Zap className="w-3.5 h-3.5" />,
  Retro: <Flame className="w-3.5 h-3.5" />,
  Casual: <Sparkles className="w-3.5 h-3.5" />,
  Sports: <Trophy className="w-3.5 h-3.5" />,
  Strategy: <Compass className="w-3.5 h-3.5" />,
};

const CATEGORIES = [
  'All',
  'Favorites',
  'Arcade',
  'Puzzle',
  'Action',
  'Retro',
  'Casual',
  'Strategy',
];

export const CategoryFilter = ({
  currentCategory,
  onSelectCategory,
  categoryCounts,
  favoriteCount,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
      {CATEGORIES.map((cat) => {
        const isActive = currentCategory === cat;
        const count = cat === 'All' 
          ? Object.values(categoryCounts).reduce((a, b) => a + b, 0)
          : cat === 'Favorites'
          ? favoriteCount
          : categoryCounts[cat] || 0;

        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border ${
              isActive
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white border-transparent shadow-md shadow-cyan-500/25 scale-102'
                : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white hover:bg-slate-850'
            }`}
          >
            {CATEGORY_ICONS[cat]}
            <span>{cat}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
