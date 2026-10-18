import React from 'react';
import { Play, Star, Flame, ExternalLink, Sparkles } from 'lucide-react';
import { openAboutBlankGame } from '../utils/cloak.js';

export const FeaturedHero = ({ game, onPlay }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-r from-cyan-950/40 via-indigo-950/30 to-purple-950/40 p-6 sm:p-10 mb-8 shadow-2xl">
      {/* Background image with blur and dark gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover object-center opacity-25 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#090a0f] via-[#090a0f]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Featured Spotlight
          </span>
          <span className="text-xs text-slate-400 font-semibold">
            {game.category}
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
          {game.title}
        </h2>

        <p className="mt-3 text-sm text-slate-300 leading-relaxed line-clamp-3">
          {game.description}
        </p>

        {/* Stats */}
        <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-slate-300">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Star className="w-4 h-4 fill-amber-400" />
            <span>{Number(game.rating).toFixed(1)} Rating</span>
          </div>
          <div className="flex items-center gap-1.5 text-cyan-400">
            <Flame className="w-4 h-4" />
            <span>{Number(game.plays).toLocaleString()} Plays</span>
          </div>
          <div className="hidden sm:block text-slate-400 font-normal">
            Controls: <span className="font-mono text-slate-300">{game.controls}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => onPlay(game)}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-cyan-500/30 transform hover:-translate-y-0.5 transition-all"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>PLAY NOW</span>
          </button>

          <button
            onClick={() => openAboutBlankGame(game.iframeSrc, game.title)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-semibold backdrop-blur-md transition"
            title="Launch in about:blank discreet window"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Discreet Window</span>
          </button>
        </div>
      </div>
    </div>
  );
};
