import React, { useState } from 'react';
import { X, EyeOff, Shield, Check, AlertOctagon } from 'lucide-react';
import { CLOAK_PRESETS, applyCloak } from '../utils/cloak.js';

export const CloakModal = ({
  isOpen,
  onClose,
  onPanic,
}) => {
  const [currentId, setCurrentId] = useState(() => {
    try {
      return localStorage.getItem('nexus_cloak_id') || 'default';
    } catch {
      return 'default';
    }
  });

  const [panicUrl, setPanicUrl] = useState(() => {
    try {
      return localStorage.getItem('nexus_panic_url') || 'https://classroom.google.com';
    } catch {
      return 'https://classroom.google.com';
    }
  });

  if (!isOpen) return null;

  const handleSelectCloak = (preset) => {
    applyCloak(preset);
    setCurrentId(preset.id);
  };

  const handleSavePanicUrl = (url) => {
    setPanicUrl(url);
    try {
      localStorage.setItem('nexus_panic_url', url);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#0e111a] rounded-2xl border border-slate-700 shadow-2xl p-6 text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <EyeOff className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-100">Tab Cloaker & Stealth</h2>
              <p className="text-xs text-slate-400">Disguise browser tab title & favicon</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Presets List */}
        <div className="mt-4 space-y-2">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            Choose Tab Disguise
          </label>
          <div className="space-y-1.5">
            {CLOAK_PRESETS.map((preset) => {
              const isSelected = currentId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectCloak(preset)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition text-left ${
                    isSelected
                      ? 'bg-indigo-950/60 border-indigo-500/60 text-indigo-200'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={preset.favicon}
                      alt={preset.name}
                      className="w-4 h-4 object-contain rounded-xs"
                      onError={(e) => {
                        e.target.style.opacity = '0.5';
                      }}
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-200">{preset.name}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[220px]">
                        "{preset.title}"
                      </div>
                    </div>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panic Button Settings */}
        <div className="mt-5 pt-4 border-t border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-red-400" />
            <label className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Emergency Panic Key & URL
            </label>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Pressing <kbd className="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-[10px]">Esc</kbd> or clicking the red <strong className="text-red-400">Panic</strong> button will instantly replace the page with this target URL:
          </p>
          <input
            type="url"
            value={panicUrl}
            onChange={(e) => handleSavePanicUrl(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-red-500"
            placeholder="https://classroom.google.com"
          />

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={onPanic}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-600/20 hover:bg-red-600/30 text-red-300 border border-red-500/40 text-xs font-bold transition"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Test Panic Escape</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
