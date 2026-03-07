import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar({ summaries, id, onClose }) {
  const navigate = useNavigate();

  const onStartAddSummary = () => {
    navigate('/');
    onClose?.();
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - d) / 86400000);
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={onClose} />

      <aside className="fixed top-0 left-0 h-screen w-[280px] md:w-72 bg-surface-100 border-r border-surface-300 flex flex-col z-30 transition-all duration-300 ease-in-out">

        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span className="font-mono text-xs text-text-500 tracking-widest uppercase">summaries.log</span>
          </div>
          <button
            onClick={onClose}
            className="md:hidden w-7 h-7 flex items-center justify-center rounded bg-surface-200 hover:bg-surface-300 text-text-500 transition-colors"
            aria-label="Close sidebar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-px bg-surface-300 border-b border-surface-300">
          <div className="bg-surface-100 px-4 py-3">
            <p className="font-mono text-xs text-text-400 mb-0.5">// total</p>
            <p className="font-display text-2xl font-bold text-text-950">{summaries.length}</p>
          </div>
          <div className="bg-surface-100 px-4 py-3">
            <p className="font-mono text-xs text-teal-500 mb-0.5">// status</p>
            <p className="font-mono text-sm font-semibold text-teal-500">
              {summaries.length > 0 ? 'ACTIVE' : 'EMPTY'}
            </p>
          </div>
        </div>

        {/* New Summary CTA */}
        <div className="px-4 py-4 border-b border-surface-300">
          <button
            onClick={onStartAddSummary}
            className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-black font-mono font-bold text-sm py-2.5 px-4 rounded flex items-center justify-center gap-2 transition-all duration-150 group"
          >
            <svg
              className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            new_summary()
          </button>
        </div>

        {/* Section label */}
        <div className="px-4 pt-4 pb-2 flex items-center gap-2">
          <span className="font-mono text-[10px] text-text-400 tracking-widest uppercase">// recent_entries</span>
          <div className="flex-1 h-px bg-surface-300"></div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto scrollbar px-3 pb-4 space-y-1">
          {summaries.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 gap-3 text-center">
              <div className="w-12 h-12 rounded bg-surface-200 flex items-center justify-center">
                <svg className="w-6 h-6 text-text-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-mono text-xs text-text-400">// no_entries_found</p>
                <p className="text-xs text-text-500 mt-1">Start a new summary above</p>
              </div>
            </div>
          ) : (
            summaries.map((summary) => {
              const isActive = summary.id === id;
              return (
                <Link to={`/summary/${summary.id}`} key={summary.id} onClick={() => onClose?.()}>
                  <div
                    className={`group relative rounded px-3 py-3 transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-surface-200 border-l-2 border-orange-500'
                        : 'hover:bg-surface-200 border-l-2 border-transparent'
                    }`}
                  >
                    {/* Index number */}
                    <div className="flex items-start gap-3">
                      <span className={`font-mono text-[10px] mt-0.5 flex-shrink-0 ${isActive ? 'text-orange-500' : 'text-text-400'}`}>
                        {String(summaries.indexOf(summary) + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold truncate leading-tight ${isActive ? 'text-text-950' : 'text-text-700 group-hover:text-text-900'}`}>
                          {summary.title.length > 32
                            ? summary.title.substring(0, 32) + '…'
                            : summary.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                            isActive ? 'bg-orange-500/20 text-orange-500' : 'bg-surface-300 text-text-400'
                          }`}>
                            {formatDate(summary.created_at)}
                          </span>
                          {isActive && (
                            <span className="font-mono text-[10px] text-teal-500">● viewing</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-surface-300 px-4 py-3">
          <p className="font-mono text-[10px] text-text-400 text-center tracking-widest">
            LINGOSUMMAR // v1.0
          </p>
        </div>
      </aside>
    </>
  );
}
