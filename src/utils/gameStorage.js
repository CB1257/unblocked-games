import defaultGames from '../data/games.json';

const STORAGE_KEY_CUSTOM_GAMES = 'nexus_custom_games';
const STORAGE_KEY_FAVORITES = 'nexus_favorite_ids';
const STORAGE_KEY_PLAY_COUNTS = 'nexus_play_counts';
const STORAGE_KEY_OVERRIDE_ALL = 'nexus_all_games_override';

export function getFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FAVORITES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(gameId) {
  const current = getFavorites();
  const exists = current.includes(gameId);
  const updated = exists ? current.filter((id) => id !== gameId) : [...current, gameId];
  try {
    localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(updated));
  } catch (e) {
    console.error(e);
  }
  return updated;
}

export function getPlayCounts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PLAY_COUNTS);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function incrementPlayCount(gameId) {
  const counts = getPlayCounts();
  const next = (counts[gameId] || 0) + 1;
  counts[gameId] = next;
  try {
    localStorage.setItem(STORAGE_KEY_PLAY_COUNTS, JSON.stringify(counts));
  } catch (e) {
    console.error(e);
  }
  return next;
}

export async function fetchInitialGames() {
  try {
    const savedOverride = localStorage.getItem(STORAGE_KEY_OVERRIDE_ALL);
    if (savedOverride) {
      const parsed = JSON.parse(savedOverride);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return applyLocalCounters(parsed);
      }
    }

    const res = await fetch('/games.json');
    if (res.ok) {
      const json = await res.json();
      const customGames = getCustomGames();
      const merged = [...json, ...customGames.filter((cg) => !json.some((g) => g.id === cg.id))];
      return applyLocalCounters(merged);
    }
  } catch (err) {
    console.warn('Could not fetch /games.json, using bundled data', err);
  }

  const custom = getCustomGames();
  const merged = [...defaultGames, ...custom.filter((cg) => !defaultGames.some((g) => g.id === cg.id))];
  return applyLocalCounters(merged);
}

function applyLocalCounters(games) {
  const playCounts = getPlayCounts();
  return games.map((g) => ({
    ...g,
    plays: g.plays + (playCounts[g.id] || 0),
  }));
}

export function getCustomGames() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_GAMES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCustomGame(game, allGames) {
  const customList = getCustomGames();
  const updatedCustom = [game, ...customList.filter((g) => g.id !== game.id)];
  try {
    localStorage.setItem(STORAGE_KEY_CUSTOM_GAMES, JSON.stringify(updatedCustom));
  } catch (e) {
    console.error(e);
  }
  return [game, ...allGames.filter((g) => g.id !== game.id)];
}

export function removeGame(gameId, allGames) {
  const customList = getCustomGames();
  const updatedCustom = customList.filter((g) => g.id !== gameId);
  try {
    localStorage.setItem(STORAGE_KEY_CUSTOM_GAMES, JSON.stringify(updatedCustom));
  } catch (e) {
    console.error(e);
  }

  const updatedAll = allGames.filter((g) => g.id !== gameId);
  try {
    localStorage.setItem(STORAGE_KEY_OVERRIDE_ALL, JSON.stringify(updatedAll));
  } catch (e) {
    console.error(e);
  }
  return updatedAll;
}

export function downloadGamesJson(games) {
  const cleanGames = games.map(({ id, title, category, description, iframeSrc, thumbnail, controls, tags, rating, plays, aspectRatio }) => ({
    id,
    title,
    category,
    description,
    iframeSrc,
    thumbnail,
    controls,
    tags,
    rating,
    plays,
    aspectRatio: aspectRatio || '16/9',
  }));

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cleanGames, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', 'games.json');
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function resetAllGames() {
  try {
    localStorage.removeItem(STORAGE_KEY_CUSTOM_GAMES);
    localStorage.removeItem(STORAGE_KEY_OVERRIDE_ALL);
  } catch (e) {
    console.error(e);
  }
  return defaultGames;
}
