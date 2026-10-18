import React, { useState } from 'react';
import { X, Download, Upload, Copy, Check, FileCode, RefreshCcw, AlertTriangle } from 'lucide-react';
import { downloadGamesJson } from '../utils/gameStorage.js';

export const JsonManagerModal = ({
  isOpen,
  onClose,
  games,
  onImportGames,
  onResetDefaults,
}) => {
  const [copied, setCopied] = useState(false);
  const [importStatus, setImportStatus] = useState(null);

  if (!isOpen) return null;

  const jsonString = JSON.stringify(
    games.map(({ id, title, category, description, iframeSrc, thumbnail, controls, tags, rating, plays, aspectRatio }) => ({
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
    })),
    null,
    2
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleDownload = () => {
    downloadGamesJson(games);
  };

  const handleFileUpload = (e) => {
    setImportStatus(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        if (!Array.isArray(parsed)) {
          setImportStatus('Invalid format: Root must be an array of game objects.');
          return;
        }

        const validGames = parsed
          .filter((g) => g && g.title && g.iframeSrc)
          .map((g, index) => ({
            id: g.id || `imported-${Date.now()}-${index}`,
            title: g.title,
            category: g.category || 'Arcade',
            description: g.description || '',
            iframeSrc: g.iframeSrc,
            thumbnail: g.thumbnail || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
            controls: g.controls || 'Keyboard / Mouse',
            tags: Array.isArray(g.tags) ? g.tags : ['Game'],
            rating: typeof g.rating === 'number' ? g.rating : 4.8,
            plays: typeof g.plays === 'number' ? g.plays : 100,
            aspectRatio: g.aspectRatio || '16/9',
          }));

        if (validGames.length === 0) {
          setImportStatus('Error: No valid game objects with title and iframeSrc found.');
          return;
        }

        onImportGames(validGames);
        setImportStatus(`Success! Imported ${validGames.length} games from JSON.`);
      } catch (err) {
        setImportStatus(`JSON Parsing error: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-[#0e111a] rounded-2xl border border-slate-700 shadow-2xl p-6 text-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-100 flex items-center gap-2">
                games.json Storage Manager
              </h2>
              <p className="text-xs text-slate-400">
                All {games.length} games stored with iframe URLs and metadata in standard JSON
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action bar */}
        <div className="py-3 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-2">
            {/* Copy button */}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied JSON!' : 'Copy JSON'}</span>
            </button>

            {/* Download games.json */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 text-xs font-semibold transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download games.json</span>
            </button>

            {/* Upload file */}
            <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Import JSON</span>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Reset Defaults */}
          <button
            onClick={() => {
              if (confirm('Reset games library to initial defaults?')) {
                onResetDefaults();
                setImportStatus('Reset to default curated games list.');
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-red-950 text-slate-400 hover:text-red-300 border border-slate-800 hover:border-red-800 text-xs transition"
          >
            <RefreshCcw className="w-3 h-3" />
            <span>Reset Defaults</span>
          </button>
        </div>

        {importStatus && (
          <div className="my-2 p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-cyan-300 flex items-center gap-2 shrink-0">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{importStatus}</span>
          </div>
        )}

        {/* JSON Code Viewer */}
        <div className="flex-1 mt-3 overflow-hidden rounded-xl bg-[#07080d] border border-slate-800 flex flex-col">
          <div className="px-3.5 py-1.5 bg-[#0a0d14] border-b border-slate-800 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>public/games.json</span>
            <span>{games.length} objects</span>
          </div>
          <div className="flex-1 overflow-auto p-3.5">
            <pre className="font-mono text-xs text-emerald-400 whitespace-pre leading-relaxed">
              {jsonString}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Schema: id, title, category, description, iframeSrc, thumbnail, controls, tags, rating, plays</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white font-medium transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
