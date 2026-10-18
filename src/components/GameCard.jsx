import React from 'react';
import { Play, Star, Heart, ExternalLink, Flame, Trash2 } from 'lucide-react';
import { openAboutBlankGame } from '../utils/cloak.js';

export const GameCard = ({
  game,
  isFavorite,
  onPlay,
  onToggleFavorite,
  onDeleteCustomGame,
}) => {
  const formatPlays = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const handleAboutBlank = (e) => {
    e.stopPropagation();
    openAboutBlankGame(game.iframeSrc, game.title);
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    onToggleFavorite(game.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm(`Remove "${game.title}" from your library?`)) {
      onDeleteCustomGame?.(game.id);
    }
  };

  return (
    <div
      onClick={() => onPlay(game)}
      className="group relative bg-[#0e111a] rounded-2xl border border-slate-800/90 overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        <img
          src={game.thumbnail}
          alt={game.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e111a] via-[#0e111a]/20 to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
            {game.category}
          </span>

          <div className="flex items-center gap-1.5 pointer-events-auto">
            {/* About:Blank stealth button */}
            <button
              onClick={handleAboutBlank}
              title="Open stealthily in about:blank tab"
              className="p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-slate-300 hover:text-white hover:bg-black/80 transition border border-white/10"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            {/* Favorite button */}
            <button
              onClick={handleFavorite}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              className={`p-1.5 rounded-lg backdrop-blur-md transition border ${
                isFavorite
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                  : 'bg-black/60 text-slate-300 hover:text-rose-400 hover:bg-black/80 border-white/10'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-400' : ''}`} />
            </button>

            {/* Delete button if custom */}
            {game.isCustom && onDeleteCustomGame && (
              <button
                onClick={handleDelete}
                title="Delete custom game"
                className="p-1.5 rounded-lg bg-red-900/60 backdrop-blur-md text-red-300 hover:text-white hover:bg-red-800 transition border border-red-500/40"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Center Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/40 transform group-hover:scale-110 transition-transform">
            <Play className="w-6 h-6 text-white fill-white ml-0.5" />
          </div>
        </div>

        {/* Custom Flag */}
        {game.isCustom && (
          <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
            User Added
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors line-clamp-1">
            {game.title}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Footer info: Rating and Plays */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1 text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{Number(game.rating).toFixed(1)}</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <Flame className="w-3.5 h-3.5 text-cyan-400" />
            <span>{formatPlays(game.plays)} plays</span>
          </div>
        </div>
      </div>
    </div>
  );
};
