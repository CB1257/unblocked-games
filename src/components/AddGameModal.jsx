import React, { useState } from 'react';
import { X, PlusCircle, Link, Image, Gamepad2 } from 'lucide-react';

const PRESET_THUMBNAILS = [
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
];

export const AddGameModal = ({
  isOpen,
  onClose,
  onAddGame,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Arcade');
  const [rawInput, setRawInput] = useState('');
  const [thumbnail, setThumbnail] = useState(PRESET_THUMBNAILS[0]);
  const [controls, setControls] = useState('Arrow keys or WASD');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('Custom, Web');
  const [aspectRatio, setAspectRatio] = useState('16/9');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const extractIframeSrc = (input) => {
    const trimmed = input.trim();
    if (trimmed.startsWith('<iframe')) {
      const match = trimmed.match(/src=["']([^"']+)["']/i);
      if (match && match[1]) {
        return match[1];
      }
    }
    return trimmed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Please provide a game title.');
      return;
    }

    const cleanSrc = extractIframeSrc(rawInput);
    if (!cleanSrc || !cleanSrc.startsWith('http')) {
      setError('Please provide a valid URL starting with http:// or https:// (or paste an <iframe> tag).');
      return;
    }

    const newGame = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      category,
      iframeSrc: cleanSrc,
      thumbnail: thumbnail.trim() || PRESET_THUMBNAILS[0],
      controls: controls.trim(),
      description: description.trim() || `Play ${title.trim()} unblocked right in your browser.`,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      rating: 5.0,
      plays: 1,
      isCustom: true,
      aspectRatio,
      dateAdded: new Date().toISOString(),
    };

    onAddGame(newGame);
    onClose();

    setTitle('');
    setRawInput('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-[#0e111a] rounded-2xl border border-slate-700/80 shadow-2xl p-6 text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-100">Add Iframe Game</h2>
              <p className="text-xs text-slate-400">Add any playable web game via iframe URL</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 rounded-xl bg-red-950/60 border border-red-800 text-xs text-red-300">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Game Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Run 3, Retro Bowl, 1v1.LOL"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm focus:outline-none focus:border-cyan-500 text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm focus:outline-none focus:border-cyan-500 text-slate-100"
              >
                <option value="Arcade">Arcade</option>
                <option value="Action">Action</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Retro">Retro</option>
                <option value="Casual">Casual</option>
                <option value="Sports">Sports</option>
                <option value="Strategy">Strategy</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Aspect Ratio
              </label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm focus:outline-none focus:border-cyan-500 text-slate-100"
              >
                <option value="16/9">16:9 (Standard Widescreen)</option>
                <option value="4/3">4:3 (Classic Retro)</option>
                <option value="1/1">1:1 (Square - 2048/Hextris)</option>
                <option value="full">Full Height (80vh)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Iframe Source URL or &lt;iframe&gt; code *
            </label>
            <div className="relative">
              <Link className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <textarea
                rows={2}
                required
                placeholder="https://... or <iframe src='https://...'></iframe>"
                value={rawInput}
                onChange={(e) => setRawInput(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono focus:outline-none focus:border-cyan-500 text-slate-100 resize-none"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Accepts both clean URLs or full iframe HTML embed snippets.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Thumbnail Image URL
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Image className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={thumbnail}
                  onChange={(e) => setThumbnail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  const random = PRESET_THUMBNAILS[Math.floor(Math.random() * PRESET_THUMBNAILS.length)];
                  setThumbnail(random);
                }}
                className="px-3 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium hover:bg-slate-700 transition"
              >
                Random
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Controls Instructions
            </label>
            <div className="relative">
              <Gamepad2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="e.g. Arrow keys to steer, Space to jump"
                value={controls}
                onChange={(e) => setControls(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Description (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Short description of the gameplay and objectives..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition"
            >
              Add to Library
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
