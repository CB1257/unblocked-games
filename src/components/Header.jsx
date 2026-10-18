import React from 'react';
import { Gamepad2, Search, ShieldAlert, EyeOff, PlusCircle, FileCode, Shuffle, X } from 'lucide-react';

export const Header = ({
  searchQuery,
  onSearchChange,
  onOpenCloakModal,
  onOpenAddGameModal,
  onOpenJsonModal,
  onPanic,
  onRandomGame,
  gameCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0c0e17]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#090a0f] rounded-[10px] flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
                NEXUS
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                UNBLOCKED
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              {gameCount} iframe games indexed
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-2">
          <div className="relative group">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-focus-within:text-cyan-400 transition-colors" />
            <input
              type="text"
              placeholder="Search games, tags, categories... (press /)"
              id="game-search-input"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-slate-900/90 border border-slate-700/60 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/40 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Random Game */}
          <button
            onClick={onRandomGame}
            title="Play a random game"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
          >
            <Shuffle className="w-3.5 h-3.5 text-purple-400" />
            <span>Random</span>
          </button>

          {/* Add Game */}
          <button
            onClick={onOpenAddGameModal}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition"
            title="Add a custom game via iframe or URL"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Add Game</span>
          </button>

          {/* JSON Manager */}
          <button
            onClick={onOpenJsonModal}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition"
            title="View, export, or import games.json"
          >
            <FileCode className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden lg:inline">games.json</span>
          </button>

          {/* Tab Cloak */}
          <button
            onClick={onOpenCloakModal}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition"
            title="Disguise tab as Google Classroom, Docs, Drive..."
          >
            <EyeOff className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Cloak</span>
          </button>

          {/* Emergency Panic Button */}
          <button
            onClick={onPanic}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 text-xs font-bold transition shadow-sm hover:shadow-red-500/20"
            title="Panic key: instantly escape to Google Classroom (Press Esc)"
          >
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>Panic</span>
            <kbd className="hidden md:inline-block px-1 py-0.2 text-[10px] font-mono bg-red-950 text-red-300 rounded border border-red-800/60">
              Esc
            </kbd>
          </button>
        </div>
      </div>
    </header>
  );
};
