import React, { useState, useEffect, useMemo } from 'react';
import {
  fetchInitialGames,
  getFavorites,
  toggleFavorite,
  incrementPlayCount,
  saveCustomGame,
  removeGame,
  resetAllGames,
} from './utils/gameStorage.js';
import { CLOAK_PRESETS, applyCloak } from './utils/cloak.js';
import { Header } from './components/Header.jsx';
import { CategoryFilter } from './components/CategoryFilter.jsx';
import { GameCard } from './components/GameCard.jsx';
import { GamePlayer } from './components/GamePlayer.jsx';
import { FeaturedHero } from './components/FeaturedHero.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';
import { JsonManagerModal } from './components/JsonManagerModal.jsx';
import { CloakModal } from './components/CloakModal.jsx';
import { PanicOverlay } from './components/PanicOverlay.jsx';
import { Gamepad2, SearchX } from 'lucide-react';

export default function App() {
  const [games, setGames] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeGame, setActiveGame] = useState(null);
  const [currentCategory, setCurrentCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isCloakOpen, setIsCloakOpen] = useState(false);
  const [isAddGameOpen, setIsAddGameOpen] = useState(false);
  const [isJsonOpen, setIsJsonOpen] = useState(false);
  const [isPanicActive, setIsPanicActive] = useState(false);

  // Panic target URL
  const [panicUrl, setPanicUrl] = useState(() => {
    try {
      return localStorage.getItem('nexus_panic_url') || 'https://classroom.google.com';
    } catch {
      return 'https://classroom.google.com';
    }
  });

  // Load initial games and favorites
  useEffect(() => {
    async function init() {
      const initial = await fetchInitialGames();
      setGames(initial);
      setFavorites(getFavorites());

      // Restore cloak if saved
      try {
        const savedCloakId = localStorage.getItem('nexus_cloak_id');
        if (savedCloakId) {
          const match = CLOAK_PRESETS.find((c) => c.id === savedCloakId);
          if (match) applyCloak(match);
        }
      } catch (e) {
        // ignore
      }
    }
    init();
  }, []);

  // Keyboard shortcut listener for Esc (Panic) and / (Search)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsPanicActive(true);
      }
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.getElementById('game-search-input');
        searchInput?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter games based on search & category
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch =
        !searchQuery.trim() ||
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;
      if (currentCategory === 'All') return true;
      if (currentCategory === 'Favorites') return favorites.includes(game.id);
      return game.category === currentCategory;
    });
  }, [games, searchQuery, currentCategory, favorites]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = {};
    for (const g of games) {
      counts[g.category] = (counts[g.category] || 0) + 1;
    }
    return counts;
  }, [games]);

  // Select spotlight game
  const featuredGame = useMemo(() => {
    return games.find((g) => g.id === 'game-2048') || games[0];
  }, [games]);

  // Handlers
  const handlePlayGame = (game) => {
    incrementPlayCount(game.id);
    setActiveGame(game);
    setGames((prev) =>
      prev.map((g) => (g.id === game.id ? { ...g, plays: g.plays + 1 } : g))
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleFavorite = (gameId) => {
    const updated = toggleFavorite(gameId);
    setFavorites(updated);
  };

  const handleAddGame = (newGame) => {
    const updated = saveCustomGame(newGame, games);
    setGames(updated);
    setActiveGame(newGame);
  };

  const handleDeleteCustomGame = (gameId) => {
    const updated = removeGame(gameId, games);
    setGames(updated);
    if (activeGame?.id === gameId) {
      setActiveGame(null);
    }
  };

  const handleImportGames = (imported) => {
    setGames(imported);
    try {
      localStorage.setItem('nexus_all_games_override', JSON.stringify(imported));
    } catch (e) {
      console.error(e);
    }
  };

  const handleResetDefaults = () => {
    const defaults = resetAllGames();
    setGames(defaults);
    if (activeGame && !defaults.some((g) => g.id === activeGame.id)) {
      setActiveGame(null);
    }
  };

  const handleRandomGame = () => {
    if (games.length === 0) return;
    const random = games[Math.floor(Math.random() * games.length)];
    handlePlayGame(random);
  };

  const handleTriggerPanic = () => {
    setIsPanicActive(true);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Top Global Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCloakModal={() => setIsCloakOpen(true)}
        onOpenAddGameModal={() => setIsAddGameOpen(true)}
        onOpenJsonModal={() => setIsJsonOpen(true)}
        onPanic={handleTriggerPanic}
        onRandomGame={handleRandomGame}
        gameCount={games.length}
      />

      {/* Main Body: Either Game Player or Hub Grid */}
      {activeGame ? (
        <GamePlayer
          game={activeGame}
          isFavorite={favorites.includes(activeGame.id)}
          onBack={() => setActiveGame(null)}
          onToggleFavorite={handleToggleFavorite}
          onSelectGame={handlePlayGame}
          allGames={games}
          onPanic={handleTriggerPanic}
        />
      ) : (
        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
          {/* Spotlight Hero Banner (only on 'All' category when not actively searching) */}
          {currentCategory === 'All' && !searchQuery.trim() && featuredGame && (
            <FeaturedHero game={featuredGame} onPlay={handlePlayGame} />
          )}

          {/* Category Bar */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CategoryFilter
              currentCategory={currentCategory}
              onSelectCategory={setCurrentCategory}
              categoryCounts={categoryCounts}
              favoriteCount={favorites.length}
            />

            {/* Quick Sort/Status */}
            <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Showing {filteredGames.length} games</span>
            </div>
          </div>

          {/* Games Grid */}
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  isFavorite={favorites.includes(game.id)}
                  onPlay={handlePlayGame}
                  onToggleFavorite={handleToggleFavorite}
                  onDeleteCustomGame={handleDeleteCustomGame}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-4 bg-[#0d101a] rounded-3xl border border-slate-800">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <SearchX className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-200">No games matched your filter</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto mt-2">
                Try searching for a different keyword or add a new iframe game to your library!
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentCategory('All');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition"
                >
                  Clear Filters
                </button>
                <button
                  onClick={() => setIsAddGameOpen(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-xs font-bold text-white shadow-md shadow-cyan-500/20 transition"
                >
                  Add Custom Game
                </button>
              </div>
            </div>
          )}
        </main>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-[#07080e] py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-300">Nexus Unblocked</span>
            <span>—</span>
            <span>All games loaded dynamically from JSON via iframe</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsJsonOpen(true)}
              className="hover:text-cyan-400 transition"
            >
              Export JSON
            </button>
            <span>•</span>
            <button
              onClick={() => setIsCloakOpen(true)}
              className="hover:text-cyan-400 transition"
            >
              Stealth Settings
            </button>
            <span>•</span>
            <button
              onClick={() => setIsAddGameOpen(true)}
              className="hover:text-cyan-400 transition"
            >
              Add Game
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <AddGameModal
        isOpen={isAddGameOpen}
        onClose={() => setIsAddGameOpen(false)}
        onAddGame={handleAddGame}
      />

      <JsonManagerModal
        isOpen={isJsonOpen}
        onClose={() => setIsJsonOpen(false)}
        games={games}
        onImportGames={handleImportGames}
        onResetDefaults={handleResetDefaults}
      />

      <CloakModal
        isOpen={isCloakOpen}
        onClose={() => setIsCloakOpen(false)}
        onPanic={handleTriggerPanic}
      />

      {/* Emergency Panic Screen */}
      <PanicOverlay
        isOpen={isPanicActive}
        onExitPanic={() => setIsPanicActive(false)}
        panicUrl={panicUrl}
      />
    </div>
  );
}
