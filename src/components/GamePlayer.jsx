import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Maximize2,
  Minimize2,
  RotateCw,
  ExternalLink,
  Heart,
  Star,
  Gamepad2,
  ShieldAlert,
  Info,
  Tv,
  AlertCircle
} from 'lucide-react';
import { openAboutBlankGame } from '../utils/cloak.js';

export const GamePlayer = ({
  game,
  isFavorite,
  onBack,
  onToggleFavorite,
  onSelectGame,
  allGames,
  onPanic,
}) => {
  const [iframeKey, setIframeKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isTheater, setIsTheater] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [aspectRatio, setAspectRatio] = useState('16/9');
  const containerRef = useRef(null);

  useEffect(() => {
    if (game.aspectRatio) {
      setAspectRatio(game.aspectRatio);
    } else {
      setAspectRatio('16/9');
    }
    setIsLoading(true);
  }, [game]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleToggleFullscreen = async () => {
    if (!containerRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Fullscreen request error:', err);
    }
  };

  const handleReload = () => {
    setIsLoading(true);
    setIframeKey((prev) => prev + 1);
  };

  const handleAboutBlank = () => {
    openAboutBlankGame(game.iframeSrc, game.title);
  };

  const relatedGames = allGames
    .filter((g) => g.id !== game.id && (g.category === game.category || g.tags?.some((t) => game.tags?.includes(t))))
    .slice(0, 4);

  const getAspectClass = () => {
    if (isFullscreen) return 'h-screen w-screen';
    if (isTheater) return 'h-[80vh] w-full';
    switch (aspectRatio) {
      case '1/1':
        return 'aspect-square max-w-3xl mx-auto w-full';
      case '4/3':
        return 'aspect-[4/3] max-w-4xl mx-auto w-full';
      case 'full':
        return 'h-[75vh] w-full';
      case '16/9':
      default:
        return 'aspect-video w-full';
    }
  };

  return (
    <div className="min-h-screen bg-[#08090e] pb-16">
      {/* Top sticky action bar */}
      <div className="sticky top-16 z-30 bg-[#0d101a]/95 backdrop-blur-md border-b border-slate-800 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Back & Game Info */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <div>
              <h1 className="font-extrabold text-sm sm:text-base text-slate-100 flex items-center gap-2">
                {game.title}
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  {game.category}
                </span>
              </h1>
            </div>
          </div>

          {/* Right: Controls HUD */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Aspect Ratio picker */}
            <div className="hidden md:flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-[11px]">
              {['16/9', '4/3', '1/1', 'full'].map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`px-2 py-1 rounded font-medium transition ${
                    aspectRatio === ratio
                      ? 'bg-cyan-500 text-black font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>

            {/* Theater Mode */}
            <button
              onClick={() => setIsTheater(!isTheater)}
              title={isTheater ? 'Exit theater mode' : 'Theater mode'}
              className={`p-2 rounded-lg text-xs font-semibold border transition ${
                isTheater
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Tv className="w-4 h-4" />
            </button>

            {/* Reload Iframe */}
            <button
              onClick={handleReload}
              title="Reload game iframe"
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
            >
              <RotateCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>

            {/* Fullscreen */}
            <button
              onClick={handleToggleFullscreen}
              title="Fullscreen (F)"
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* About:Blank stealth button */}
            <button
              onClick={handleAboutBlank}
              title="Open in about:blank disguise"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>About:Blank</span>
            </button>

            {/* Favorite */}
            <button
              onClick={() => onToggleFavorite(game.id)}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              className={`p-2 rounded-lg border transition ${
                isFavorite
                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-rose-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-400' : ''}`} />
            </button>

            {/* Panic */}
            <button
              onClick={onPanic}
              title="Emergency panic"
              className="p-2 rounded-lg bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 transition"
            >
              <ShieldAlert className="w-4 h-4 text-red-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Game Container */}
      <div className={`${isTheater ? 'w-full px-2' : 'max-w-6xl mx-auto px-4'} pt-4 transition-all duration-300`}>
        <div
          ref={containerRef}
          className={`relative bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl ${
            isFullscreen ? 'rounded-none border-none' : ''
          }`}
        >
          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#090a10] z-10 text-center p-6">
              <div className="w-12 h-12 rounded-full border-3 border-cyan-500/20 border-t-cyan-400 animate-spin mb-4" />
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm tracking-wide">
                <Gamepad2 className="w-4 h-4 animate-bounce" />
                <span>INITIALIZING GAME IFRAME...</span>
              </div>
              <p className="text-xs text-slate-500 mt-2 max-w-sm">
                Fetching frame from JSON storage: <span className="font-mono text-[11px] text-slate-400">{game.iframeSrc}</span>
              </p>
            </div>
          )}

          {/* Game Iframe */}
          <div className={getAspectClass()}>
            <iframe
              key={iframeKey}
              src={game.iframeSrc}
              title={game.title}
              onLoad={() => setIsLoading(false)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen; gamepad; microphone"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock"
              className="w-full h-full border-0 block bg-black"
            />
          </div>
        </div>

        {/* Fallback help bar */}
        <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 rounded-xl px-4 py-2 border border-slate-800/60">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Black screen or blocked connection?</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleAboutBlank}
              className="text-cyan-400 hover:underline font-medium"
            >
              Launch in About:Blank
            </button>
            <span className="text-slate-600">|</span>
            <a
              href={game.iframeSrc}
              target="_blank"
              rel="noreferrer"
              className="text-cyan-400 hover:underline font-medium inline-flex items-center gap-1"
            >
              Open Direct Window <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Game Info & Controls Guide */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Details & How to Play */}
          <div className="lg:col-span-2 space-y-5">
            {/* Description Card */}
            <div className="bg-[#0e111a] rounded-2xl p-5 border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-slate-100 text-base flex items-center gap-2">
                  <Info className="w-4 h-4 text-cyan-400" />
                  About {game.title}
                </h2>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{Number(game.rating).toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {Number(game.plays).toLocaleString()} plays
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {game.description}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {game.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/60"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Controls Card */}
            <div className="bg-[#0e111a] rounded-2xl p-5 border border-slate-800">
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2 mb-3">
                <Gamepad2 className="w-4 h-4 text-purple-400" />
                Controls & Instructions
              </h3>
              <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 flex items-center gap-3">
                <div className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 font-mono text-xs font-semibold border border-cyan-800/60">
                  INPUT
                </div>
                <p className="text-xs text-slate-200 font-medium">
                  {game.controls || 'Use mouse click or standard arrow / WASD keyboard keys.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Col: More Games in Category */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-200 tracking-wide uppercase text-[11px] text-slate-400">
              More {game.category} Games
            </h3>

            <div className="space-y-2.5">
              {relatedGames.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectGame(rel)}
                  className="group flex items-center gap-3 p-2.5 rounded-xl bg-[#0e111a] border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-850 cursor-pointer transition"
                >
                  <img
                    src={rel.thumbnail}
                    alt={rel.title}
                    className="w-14 h-12 rounded-lg object-cover bg-slate-900 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-slate-200 group-hover:text-cyan-300 truncate transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {rel.category} • ⭐ {rel.rating}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
