import React from 'react';
import { RefreshCw, ArrowRight } from 'lucide-react';

export const PanicOverlay = ({
  isOpen,
  onExitPanic,
  panicUrl,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white text-slate-800 flex flex-col font-sans select-none">
      {/* Top Google Classroom bar simulation */}
      <header className="h-16 border-b border-gray-200 px-6 flex items-center justify-between bg-white shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm">
            C
          </div>
          <span className="text-lg font-medium text-gray-700 tracking-tight">
            Google Classroom
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              window.open(panicUrl, '_blank');
            }}
            className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium"
          >
            <span>Open Real Classroom</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onExitPanic}
            title="Safe to return"
            className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Return to Arcade</span>
          </button>
        </div>
      </header>

      {/* Classroom Feed mock */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-6 sm:p-8 space-y-6 overflow-y-auto">
        {/* Banner */}
        <div className="h-44 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-800 p-6 flex flex-col justify-end text-white shadow-sm">
          <h1 className="text-2xl font-bold">AP Computer Science & Web Engineering</h1>
          <p className="text-sm text-emerald-100 opacity-90 mt-1">Section 4 - Period 2</p>
        </div>

        {/* Content columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-white">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Upcoming
              </h3>
              <p className="text-xs text-gray-700">Due tomorrow: Chapter 4 Problem Set</p>
              <a href="#" className="block text-xs text-blue-600 font-medium mt-3 hover:underline">
                View all
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs">
                  DR
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Dr. Reynolds posted a new assignment</h4>
                  <p className="text-xs text-gray-500">Oct 17 (Edited 3:45 PM)</p>
                </div>
              </div>
              <p className="text-xs text-gray-700 mt-3 leading-relaxed">
                Please complete the unit review worksheets on sorting algorithms and prepare your questions for the upcoming class lab session.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                  DR
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Announcement: Study session</h4>
                  <p className="text-xs text-gray-500">Yesterday</p>
                </div>
              </div>
              <p className="text-xs text-gray-700 mt-3 leading-relaxed">
                The library study room 204 will be open during free period for group work and peer review.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
