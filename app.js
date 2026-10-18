/**
 * Nexus Unblocked - Pure Web Arcade Application
 * Works statically on GitHub Pages and locally via Vite.
 */

// Initial default games in case fetch fails
const DEFAULT_GAMES = [
  {
    id: "game-2048",
    title: "2048 Classic",
    category: "Puzzle",
    description: "Join the numbers and get to the 2048 tile! Slide tiles across the 4x4 grid and merge matching powers of two.",
    iframeSrc: "https://play2048.co/",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    controls: "Arrow keys or Swipe to slide tiles",
    tags: ["Numbers", "Brain", "Addictive", "Popular"],
    rating: 4.9,
    plays: 14200,
    aspectRatio: "1/1"
  },
  {
    id: "game-hextris",
    title: "Hextris",
    category: "Arcade",
    description: "Fast-paced hexagonal puzzle game inspired by Tetris. Rotate the hexagon to catch incoming colored blocks and match 3 or more.",
    iframeSrc: "https://hextris.io/",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
    controls: "Left / Right arrow keys or A / D to rotate hexagon",
    tags: ["Fast", "Hexagon", "Reflex", "Score Attack"],
    rating: 4.8,
    plays: 9850,
    aspectRatio: "1/1"
  },
  {
    id: "game-chrome-dino",
    title: "Dino T-Rex Runner",
    category: "Retro",
    description: "The legendary offline Chrome dinosaur endless runner. Leap over cacti and dodge pterodactyls in a retro pixel desert.",
    iframeSrc: "https://chromedino.com/",
    thumbnail: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80",
    controls: "Spacebar or Up Arrow to jump, Down Arrow to duck",
    tags: ["Pixel", "Endless", "Classic", "Offline Legend"],
    rating: 4.7,
    plays: 23400,
    aspectRatio: "16/9"
  },
  {
    id: "game-snake",
    title: "Classic Snake",
    category: "Retro",
    description: "Relive the nostalgic arcade snake game. Eat food, grow longer, and avoid running into your own tail or boundary walls.",
    iframeSrc: "https://playsnake.org/",
    thumbnail: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    controls: "Arrow keys to change direction",
    tags: ["Nostalgia", "Retro", "Simple", "High Score"],
    rating: 4.6,
    plays: 11800,
    aspectRatio: "4/3"
  },
  {
    id: "game-cookie-clicker",
    title: "Cookie Clicker",
    category: "Casual",
    description: "Bake billions of cookies! Click the giant cookie to earn cookies, then hire grandmas, build factories, and unlock cosmic upgrades.",
    iframeSrc: "https://orteil.dashnet.org/cookieclicker/",
    thumbnail: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&auto=format&fit=crop&q=80",
    controls: "Mouse click on the cookie and upgrade menu",
    tags: ["Idle", "Clicker", "Upgrades", "Addictive"],
    rating: 4.9,
    plays: 31200,
    aspectRatio: "16/9"
  },
  {
    id: "game-flappy-bird",
    title: "Flappy Bird Web",
    category: "Action",
    description: "Tap your wings and flap between narrow green pipe obstacles without crashing. Test your patience and precise timing.",
    iframeSrc: "https://flappybird.io/",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    controls: "Spacebar or Left Click to flap",
    tags: ["Skill", "Precision", "Viral", "Challenging"],
    rating: 4.5,
    plays: 18900,
    aspectRatio: "4/3"
  },
  {
    id: "game-tetris",
    title: "Block Tetris",
    category: "Puzzle",
    description: "The quintessential falling-blocks puzzle game. Rotate tetrominoes, complete horizontal lines, and clear the board.",
    iframeSrc: "https://chvin.github.io/react-tetris/",
    thumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80",
    controls: "Arrow keys to move/rotate, Space to hard drop",
    tags: ["Arcade", "Puzzle", "Classic", "Tetris"],
    rating: 4.8,
    plays: 16400,
    aspectRatio: "4/3"
  },
  {
    id: "game-slope",
    title: "Slope Ball 3D",
    category: "Action",
    description: "High-octane neon 3D speed runner. Steer a rolling ball down steep slopes, dodge red obstacles, and stay on the course.",
    iframeSrc: "https://slopegame.online/",
    thumbnail: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80",
    controls: "A/D or Left/Right Arrow keys to steer",
    tags: ["3D", "Speed", "Reflex", "Slope"],
    rating: 4.9,
    plays: 28700,
    aspectRatio: "16/9"
  },
  {
    id: "game-pacman",
    title: "Pac-Man Arcade",
    category: "Retro",
    description: "Guide Pac-Man through the neon maze, chomp pellets, avoid Blinky, Pinky, Inky, and Clyde, and grab power pellets to turn the tables.",
    iframeSrc: "https://freepacman.org/",
    thumbnail: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop&q=80",
    controls: "Arrow keys to navigate maze",
    tags: ["Retro", "Arcade", "80s", "Classic"],
    rating: 4.8,
    plays: 21300,
    aspectRatio: "4/3"
  },
  {
    id: "game-asteroids",
    title: "Asteroids Vector",
    category: "Arcade",
    description: "Pilot your spaceship in deep space, blast floating space boulders into smaller fragments, and eliminate enemy flying saucers.",
    iframeSrc: "https://freeasteroids.org/",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    controls: "Left/Right to rotate, Up to thrust, Space to shoot",
    tags: ["Space", "Shooter", "Vector", "Arcade"],
    rating: 4.7,
    plays: 9400,
    aspectRatio: "4/3"
  },
  {
    id: "game-wordle",
    title: "Wordle Unlimited",
    category: "Puzzle",
    description: "Guess the secret 5-letter word in six attempts. Colored tiles show when letters are in the right spot or in the word.",
    iframeSrc: "https://wordleunlimited.org/",
    thumbnail: "https://images.unsplash.com/photo-1632516643720-e7f5d7d6ecc9?w=600&auto=format&fit=crop&q=80",
    controls: "Keyboard to type letters, Enter to submit",
    tags: ["Word", "Brain", "Daily", "Vocabulary"],
    rating: 4.8,
    plays: 17800,
    aspectRatio: "16/9"
  },
  {
    id: "game-doodle-jump",
    title: "Doodle Jump Web",
    category: "Casual",
    description: "Bounce the Doodler continuously up platforms, spring on trampolines, grab jetpacks, and blast weird monsters.",
    iframeSrc: "https://doodlejump.io/",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80",
    controls: "Left / Right arrows to steer, Up to shoot",
    tags: ["Platformer", "Bounce", "Vertical", "Casual"],
    rating: 4.7,
    plays: 13900,
    aspectRatio: "4/3"
  }
];

const CLOAK_PRESETS = [
  {
    id: 'default',
    name: 'Nexus Arcade (Default)',
    title: 'Nexus Unblocked - Web Arcade',
    favicon: './favicon.ico'
  },
  {
    id: 'classroom',
    name: 'Google Classroom',
    title: 'Home - Classroom',
    favicon: 'https://ssl.gstatic.com/classroom/favicon.png'
  },
  {
    id: 'drive',
    name: 'Google Drive',
    title: 'My Drive - Google Drive',
    favicon: 'https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png'
  },
  {
    id: 'docs',
    name: 'Google Docs',
    title: 'Untitled document - Google Docs',
    favicon: 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico'
  },
  {
    id: 'canvas',
    name: 'Canvas LMS',
    title: 'Dashboard - Canvas',
    favicon: 'https://du11hjcvx0uqb.cloudfront.net/dist/images/favicon-e10d657a73.ico'
  },
  {
    id: 'desmos',
    name: 'Desmos Graphing Calculator',
    title: 'Desmos | Graphing Calculator',
    favicon: 'https://www.desmos.com/favicon.ico'
  },
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    title: 'Wikipedia, the free encyclopedia',
    favicon: 'https://en.wikipedia.org/static/favicon/wikipedia.ico'
  }
];

class NexusApp {
  constructor() {
    this.games = [];
    this.favorites = this.getFavorites();
    this.activeCategory = 'All';
    this.searchQuery = '';
    this.activeGame = null;
    this.currentAspect = '16-9';
    this.isTheater = false;

    this.init();
  }

  async init() {
    this.bindGlobalKeys();
    this.restoreCloak();
    await this.loadGames();
    this.render();
  }

  async loadGames() {
    try {
      const savedOverride = localStorage.getItem('nexus_all_games_override');
      if (savedOverride) {
        const parsed = JSON.parse(savedOverride);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.games = parsed;
          return;
        }
      }

      // Fetch relative games.json (works on GitHub Pages and local)
      const res = await fetch('./games.json');
      if (res.ok) {
        const data = await res.json();
        const custom = this.getCustomGames();
        this.games = [...data, ...custom.filter(c => !data.some(d => d.id === c.id))];
        return;
      }
    } catch (e) {
      console.warn('Could not fetch games.json, falling back to bundled data', e);
    }

    const custom = this.getCustomGames();
    this.games = [...DEFAULT_GAMES, ...custom.filter(c => !DEFAULT_GAMES.some(d => d.id === c.id))];
  }

  getFavorites() {
    try {
      const raw = localStorage.getItem('nexus_favorite_ids');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  toggleFavorite(id) {
    if (this.favorites.includes(id)) {
      this.favorites = this.favorites.filter(x => x !== id);
    } else {
      this.favorites.push(id);
    }
    localStorage.setItem('nexus_favorite_ids', JSON.stringify(this.favorites));
    this.render();
  }

  getCustomGames() {
    try {
      const raw = localStorage.getItem('nexus_custom_games');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  saveCustomGame(game) {
    const custom = this.getCustomGames();
    const updated = [game, ...custom.filter(g => g.id !== game.id)];
    localStorage.setItem('nexus_custom_games', JSON.stringify(updated));
    this.games = [game, ...this.games.filter(g => g.id !== game.id)];
    this.playGame(game);
  }

  playGame(game) {
    this.activeGame = game;
    game.plays = (game.plays || 0) + 1;
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  exitPlayer() {
    this.activeGame = null;
    this.render();
  }

  openAboutBlank(iframeSrc, title) {
    try {
      const win = window.open('about:blank', '_blank');
      if (!win) {
        alert('Pop-up was blocked. Please allow popups for this site.');
        return;
      }
      const doc = win.document;
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
        <head><title>${title}</title><style>* { margin:0; padding:0; } html,body{width:100%;height:100%;overflow:hidden;background:#000;} iframe{width:100%;height:100%;border:none;}</style></head>
        <body><iframe src="${iframeSrc}" allowfullscreen allow="autoplay; fullscreen; gamepad; clipboard-write; microphone"></iframe></body>
        </html>
      `);
      doc.close();
    } catch (e) {
      window.open(iframeSrc, '_blank');
    }
  }

  bindGlobalKeys() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.triggerPanic();
      }
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        document.getElementById('search-input')?.focus();
      }
    });
  }

  triggerPanic() {
    const overlay = document.getElementById('panic-overlay');
    if (overlay) overlay.style.display = 'flex';
  }

  closePanic() {
    const overlay = document.getElementById('panic-overlay');
    if (overlay) overlay.style.display = 'none';
  }

  applyCloak(preset) {
    document.title = preset.title;
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = preset.favicon;
    localStorage.setItem('nexus_cloak_id', preset.id);
  }

  restoreCloak() {
    const id = localStorage.getItem('nexus_cloak_id');
    if (id) {
      const found = CLOAK_PRESETS.find(p => p.id === id);
      if (found) this.applyCloak(found);
    }
  }

  getFilteredGames() {
    return this.games.filter(g => {
      const matchesSearch = !this.searchQuery.trim() ||
        g.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        g.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        g.tags?.some(t => t.toLowerCase().includes(this.searchQuery.toLowerCase()));

      if (!matchesSearch) return false;
      if (this.activeCategory === 'All') return true;
      if (this.activeCategory === 'Favorites') return this.favorites.includes(g.id);
      return g.category === this.activeCategory;
    });
  }

  render() {
    const appEl = document.getElementById('app');
    if (!appEl) return;

    if (this.activeGame) {
      appEl.innerHTML = this.renderPlayerView();
    } else {
      appEl.innerHTML = this.renderHubView();
    }

    this.attachEvents();
  }

  renderHubView() {
    const filtered = this.getFilteredGames();
    const categories = ['All', 'Favorites', 'Arcade', 'Puzzle', 'Action', 'Retro', 'Casual', 'Strategy'];
    const featured = this.games.find(g => g.id === 'game-2048') || this.games[0];

    const categoryHtml = categories.map(cat => {
      const count = cat === 'All' ? this.games.length :
                    cat === 'Favorites' ? this.favorites.length :
                    this.games.filter(g => g.category === cat).length;
      const isActive = this.activeCategory === cat;
      return `
        <button class="pill ${isActive ? 'active' : ''}" data-cat="${cat}">
          <span>${cat}</span>
          <span class="pill-count">${count}</span>
        </button>
      `;
    }).join('');

    const cardsHtml = filtered.length > 0 ? filtered.map(game => {
      const isFav = this.favorites.includes(game.id);
      return `
        <div class="game-card" data-game-id="${game.id}">
          <div class="card-thumb-wrap">
            <img class="card-thumb" src="${game.thumbnail}" alt="${game.title}" loading="lazy" />
            <div class="card-gradient"></div>
            <div class="card-top-bar">
              <span class="badge-cat">${game.category}</span>
              <div class="card-actions-top">
                <button class="btn-icon-sm btn-stealth" data-stealth-id="${game.id}" title="Discreet about:blank tab">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </button>
                <button class="btn-icon-sm btn-fav ${isFav ? 'favorite-active' : ''}" data-fav-id="${game.id}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
              </div>
            </div>
            <div class="card-play-hover">
              <div class="play-circle">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div>
              <h3 class="card-title">${game.title}</h3>
              <p class="card-desc">${game.description}</p>
            </div>
            <div class="card-footer">
              <span class="stat-rating">⭐ ${Number(game.rating).toFixed(1)}</span>
              <span class="stat-plays">🔥 ${(game.plays || 0).toLocaleString()} plays</span>
            </div>
          </div>
        </div>
      `;
    }).join('') : `
      <div class="empty-box" style="grid-column: 1 / -1;">
        <div style="font-size: 2.5rem;">🔍</div>
        <h3 class="empty-title">No games found</h3>
        <p class="empty-desc">Try clearing your search or add a new custom game</p>
        <button class="btn-nav btn-cyan" id="btn-clear-search">Reset Filters</button>
      </div>
    `;

    const heroHtml = (this.activeCategory === 'All' && !this.searchQuery && featured) ? `
      <div class="hero-spotlight">
        <img class="hero-bg-img" src="${featured.thumbnail}" alt="${featured.title}">
        <div class="hero-vignette"></div>
        <div class="hero-content">
          <div class="hero-pill">✨ Featured Spotlight • ${featured.category}</div>
          <h1 class="hero-title">${featured.title}</h1>
          <p class="hero-desc">${featured.description}</p>
          <div class="hero-stats">
            <span style="color:#fbbf24;">⭐ ${Number(featured.rating).toFixed(1)} Rating</span>
            <span style="color:#22d3ee;">🔥 ${(featured.plays || 0).toLocaleString()} Plays</span>
            <span>⌨️ ${featured.controls}</span>
          </div>
          <div class="hero-actions">
            <button class="btn-play-hero" id="btn-play-hero">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              <span>PLAY NOW</span>
            </button>
            <button class="btn-nav" id="btn-hero-stealth">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              <span>Discreet Window</span>
            </button>
          </div>
        </div>
      </div>
    ` : '';

    return `
      ${heroHtml}
      <div class="filter-bar">
        <div class="category-pills">
          ${categoryHtml}
        </div>
        <div class="count-indicator">
          <span class="pulse-dot"></span>
          <span>${filtered.length} games available</span>
        </div>
      </div>
      <div class="games-grid">
        ${cardsHtml}
      </div>
    `;
  }

  renderPlayerView() {
    const game = this.activeGame;
    const isFav = this.favorites.includes(game.id);
    const related = this.games.filter(g => g.id !== game.id && g.category === game.category).slice(0, 4);

    return `
      <div class="player-page">
        <div class="player-toolbar">
          <div class="toolbar-inner">
            <div class="player-left">
              <button class="btn-back" id="btn-player-back">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                <span>Back</span>
              </button>
              <div class="player-title">
                <span>${game.title}</span>
                <span class="badge-cat">${game.category}</span>
              </div>
            </div>
            <div class="player-controls">
              <div class="ratio-selector">
                <button class="ratio-btn ${this.currentAspect === '16-9' ? 'active' : ''}" data-ratio="16-9">16:9</button>
                <button class="ratio-btn ${this.currentAspect === '4-3' ? 'active' : ''}" data-ratio="4-3">4:3</button>
                <button class="ratio-btn ${this.currentAspect === '1-1' ? 'active' : ''}" data-ratio="1-1">1:1</button>
                <button class="ratio-btn ${this.currentAspect === 'full' ? 'active' : ''}" data-ratio="full">Full</button>
              </div>
              <button class="btn-nav" id="btn-player-reload" title="Reload Game">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
              </button>
              <button class="btn-nav" id="btn-player-fullscreen" title="Fullscreen">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
              </button>
              <button class="btn-nav" id="btn-player-stealth" title="Open in About:Blank">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                <span>About:Blank</span>
              </button>
              <button class="btn-nav ${isFav ? 'favorite-active' : ''}" id="btn-player-fav" title="Favorite">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              </button>
              <button class="btn-nav btn-panic" id="btn-player-panic">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                <span>Panic</span>
              </button>
            </div>
          </div>
        </div>

        <div class="game-viewport-wrap aspect-${this.currentAspect}" id="game-container">
          <iframe 
            id="game-frame"
            class="game-iframe" 
            src="${game.iframeSrc}"
            allow="autoplay; fullscreen; gamepad; clipboard-write; microphone"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-pointer-lock">
          </iframe>
        </div>

        <div style="margin-top: 0.5rem; display: flex; justify-content: space-between; font-size: 0.75rem; color: #94a3b8; padding: 0.5rem 1rem; background: #0e111a; border-radius: 10px; border: 1px solid #1e293b;">
          <span>Having trouble loading in frame?</span>
          <div>
            <a href="${game.iframeSrc}" target="_blank" rel="noreferrer" style="margin-right: 1rem;">Direct Window ↗</a>
            <a href="#" id="link-trouble-blank">Discreet Tab ↗</a>
          </div>
        </div>

        <div class="player-info-grid">
          <div>
            <div class="info-box">
              <h2 class="info-title">About ${game.title}</h2>
              <p style="font-size: 0.85rem; line-height: 1.6; color: #cbd5e1;">${game.description}</p>
              <div style="margin-top: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                ${(game.tags || []).map(t => `<span class="pill">#${t}</span>`).join('')}
              </div>
            </div>

            <div class="info-box">
              <h3 class="info-title">🎮 Controls & Instructions</h3>
              <div class="controls-pill">
                <span class="kbd-badge" style="background:#0284c7; color:#fff;">KEYS</span>
                <span>${game.controls || 'Keyboard arrow keys or mouse click.'}</span>
              </div>
            </div>
          </div>

          <div>
            <div class="info-box">
              <h3 class="info-title">More ${game.category} Games</h3>
              <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                ${related.map(r => `
                  <div class="related-item" data-play-related="${r.id}" style="display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem; border-radius: 8px; background: #090a0f; border: 1px solid #1e293b; cursor: pointer;">
                    <img src="${r.thumbnail}" alt="${r.title}" style="width: 48px; height: 36px; object-fit: cover; border-radius: 6px;">
                    <div>
                      <div style="font-size: 0.8rem; font-weight: 700; color: #f8fafc;">${r.title}</div>
                      <div style="font-size: 0.7rem; color: #94a3b8;">⭐ ${r.rating}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachEvents() {
    // Category pills
    document.querySelectorAll('.pill[data-cat]').forEach(el => {
      el.addEventListener('click', () => {
        this.activeCategory = el.dataset.cat;
        this.render();
      });
    });

    // Game card click
    document.querySelectorAll('.game-card[data-game-id]').forEach(el => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('.btn-stealth') || e.target.closest('.btn-fav')) return;
        const g = this.games.find(x => x.id === el.dataset.gameId);
        if (g) this.playGame(g);
      });
    });

    // Favorite toggle
    document.querySelectorAll('.btn-fav[data-fav-id]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleFavorite(el.dataset.favId);
      });
    });

    // Stealth button on card
    document.querySelectorAll('.btn-stealth[data-stealth-id]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        const g = this.games.find(x => x.id === el.dataset.stealthId);
        if (g) this.openAboutBlank(g.iframeSrc, g.title);
      });
    });

    // Hero buttons
    const btnPlayHero = document.getElementById('btn-play-hero');
    if (btnPlayHero) {
      btnPlayHero.addEventListener('click', () => {
        const feat = this.games.find(g => g.id === 'game-2048') || this.games[0];
        if (feat) this.playGame(feat);
      });
    }

    const btnHeroStealth = document.getElementById('btn-hero-stealth');
    if (btnHeroStealth) {
      btnHeroStealth.addEventListener('click', () => {
        const feat = this.games.find(g => g.id === 'game-2048') || this.games[0];
        if (feat) this.openAboutBlank(feat.iframeSrc, feat.title);
      });
    }

    // Reset filters
    const btnClearSearch = document.getElementById('btn-clear-search');
    if (btnClearSearch) {
      btnClearSearch.addEventListener('click', () => {
        this.searchQuery = '';
        this.activeCategory = 'All';
        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.value = '';
        this.render();
      });
    }

    // Player events
    const btnBack = document.getElementById('btn-player-back');
    if (btnBack) btnBack.addEventListener('click', () => this.exitPlayer());

    const btnReload = document.getElementById('btn-player-reload');
    if (btnReload) {
      btnReload.addEventListener('click', () => {
        const iframe = document.getElementById('game-frame');
        if (iframe && this.activeGame) iframe.src = this.activeGame.iframeSrc;
      });
    }

    const btnFs = document.getElementById('btn-player-fullscreen');
    if (btnFs) {
      btnFs.addEventListener('click', () => {
        const cont = document.getElementById('game-container');
        if (!document.fullscreenElement) {
          cont.requestFullscreen().catch(err => console.error(err));
        } else {
          document.exitFullscreen();
        }
      });
    }

    const btnPlayerStealth = document.getElementById('btn-player-stealth');
    if (btnPlayerStealth && this.activeGame) {
      btnPlayerStealth.addEventListener('click', () => {
        this.openAboutBlank(this.activeGame.iframeSrc, this.activeGame.title);
      });
    }

    const linkTrouble = document.getElementById('link-trouble-blank');
    if (linkTrouble && this.activeGame) {
      linkTrouble.addEventListener('click', (e) => {
        e.preventDefault();
        this.openAboutBlank(this.activeGame.iframeSrc, this.activeGame.title);
      });
    }

    const btnPlayerFav = document.getElementById('btn-player-fav');
    if (btnPlayerFav && this.activeGame) {
      btnPlayerFav.addEventListener('click', () => {
        this.toggleFavorite(this.activeGame.id);
      });
    }

    const btnPlayerPanic = document.getElementById('btn-player-panic');
    if (btnPlayerPanic) {
      btnPlayerPanic.addEventListener('click', () => this.triggerPanic());
    }

    document.querySelectorAll('.ratio-btn[data-ratio]').forEach(btn => {
      btn.addEventListener('click', () => {
        this.currentAspect = btn.dataset.ratio;
        const cont = document.getElementById('game-container');
        if (cont) {
          cont.className = `game-viewport-wrap aspect-${this.currentAspect}`;
        }
        document.querySelectorAll('.ratio-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    document.querySelectorAll('.related-item[data-play-related]').forEach(item => {
      item.addEventListener('click', () => {
        const g = this.games.find(x => x.id === item.dataset.playRelated);
        if (g) this.playGame(g);
      });
    });
  }
}

// Global App instance
let appInstance;

document.addEventListener('DOMContentLoaded', () => {
  appInstance = new NexusApp();

  // Search input binding
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      appInstance.searchQuery = e.target.value;
      appInstance.render();
    });
  }

  // Header buttons
  document.getElementById('btn-panic')?.addEventListener('click', () => {
    appInstance.triggerPanic();
  });

  document.getElementById('btn-close-panic')?.addEventListener('click', () => {
    appInstance.closePanic();
  });

  document.getElementById('btn-random')?.addEventListener('click', () => {
    if (appInstance.games.length > 0) {
      const rnd = appInstance.games[Math.floor(Math.random() * appInstance.games.length)];
      appInstance.playGame(rnd);
    }
  });

  // Modals
  const addModal = document.getElementById('modal-add-game');
  document.getElementById('btn-open-add')?.addEventListener('click', () => {
    addModal.style.display = 'flex';
  });
  document.getElementById('btn-close-add')?.addEventListener('click', () => {
    addModal.style.display = 'none';
  });

  const jsonModal = document.getElementById('modal-json');
  document.getElementById('btn-open-json')?.addEventListener('click', () => {
    const codeEl = document.getElementById('json-code');
    if (codeEl) {
      codeEl.textContent = JSON.stringify(appInstance.games, null, 2);
    }
    jsonModal.style.display = 'flex';
  });
  document.getElementById('btn-close-json')?.addEventListener('click', () => {
    jsonModal.style.display = 'none';
  });

  const cloakModal = document.getElementById('modal-cloak');
  document.getElementById('btn-open-cloak')?.addEventListener('click', () => {
    renderCloakList();
    cloakModal.style.display = 'flex';
  });
  document.getElementById('btn-close-cloak')?.addEventListener('click', () => {
    cloakModal.style.display = 'none';
  });

  // Add Game Form
  document.getElementById('form-add-game')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('add-title').value.trim();
    const category = document.getElementById('add-category').value;
    let url = document.getElementById('add-url').value.trim();
    const thumb = document.getElementById('add-thumb').value.trim() || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80';
    const controls = document.getElementById('add-controls').value.trim() || 'Keyboard / Mouse';
    const desc = document.getElementById('add-desc').value.trim() || `Play ${title} unblocked in browser.`;

    // Extract src if raw iframe pasted
    if (url.startsWith('<iframe')) {
      const match = url.match(/src=["']([^"']+)["']/i);
      if (match && match[1]) url = match[1];
    }

    if (!url.startsWith('http')) {
      alert('Please enter a valid URL starting with http:// or https://');
      return;
    }

    const newGame = {
      id: `custom-${Date.now()}`,
      title,
      category,
      iframeSrc: url,
      thumbnail: thumb,
      controls,
      description: desc,
      tags: ['Custom', 'Web'],
      rating: 5.0,
      plays: 1,
      aspectRatio: '16/9'
    };

    appInstance.saveCustomGame(newGame);
    addModal.style.display = 'none';
    e.target.reset();
  });

  // Download JSON
  document.getElementById('btn-download-json')?.addEventListener('click', () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(appInstance.games, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', 'games.json');
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
  });

  // Copy JSON
  document.getElementById('btn-copy-json')?.addEventListener('click', () => {
    navigator.clipboard.writeText(JSON.stringify(appInstance.games, null, 2)).then(() => {
      const btn = document.getElementById('btn-copy-json');
      const orig = btn.textContent;
      btn.textContent = '✓ Copied!';
      setTimeout(() => btn.textContent = orig, 2000);
    });
  });

  // Import JSON
  document.getElementById('file-import-json')?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (Array.isArray(parsed) && parsed.length > 0) {
          appInstance.games = parsed;
          localStorage.setItem('nexus_all_games_override', JSON.stringify(parsed));
          appInstance.render();
          document.getElementById('json-code').textContent = JSON.stringify(parsed, null, 2);
          alert(`Imported ${parsed.length} games successfully!`);
        } else {
          alert('Invalid JSON: Must be an array of game objects.');
        }
      } catch (err) {
        alert('JSON Parse Error: ' + err.message);
      }
    };
    reader.readAsText(file);
  });

  // Reset defaults
  document.getElementById('btn-reset-json')?.addEventListener('click', () => {
    if (confirm('Reset games to default catalog?')) {
      localStorage.removeItem('nexus_custom_games');
      localStorage.removeItem('nexus_all_games_override');
      appInstance.games = [...DEFAULT_GAMES];
      appInstance.render();
      document.getElementById('json-code').textContent = JSON.stringify(DEFAULT_GAMES, null, 2);
    }
  });

  function renderCloakList() {
    const list = document.getElementById('cloak-list');
    if (!list) return;
    const currentId = localStorage.getItem('nexus_cloak_id') || 'default';
    list.innerHTML = CLOAK_PRESETS.map(p => `
      <div class="cloak-item ${currentId === p.id ? 'selected' : ''}" data-cloak-id="${p.id}">
        <div style="display:flex; align-items:center; gap: 0.6rem;">
          <img src="${p.favicon}" style="width:16px;height:16px;object-fit:contain;">
          <div>
            <div style="font-size:0.8rem; font-weight:700; color:#fff;">${p.name}</div>
            <div style="font-size:0.65rem; color:#94a3b8;">${p.title}</div>
          </div>
        </div>
        ${currentId === p.id ? '<span style="color:#22d3ee;">✓ Active</span>' : ''}
      </div>
    `).join('');

    list.querySelectorAll('.cloak-item[data-cloak-id]').forEach(item => {
      item.addEventListener('click', () => {
        const found = CLOAK_PRESETS.find(x => x.id === item.dataset.cloakId);
        if (found) {
          appInstance.applyCloak(found);
          renderCloakList();
        }
      });
    });
  }

  // Brand click returns home
  document.getElementById('brand-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    appInstance.exitPlayer();
  });
});
