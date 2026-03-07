import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar({ summaries, id, onClose }) {
  const navigate = useNavigate();
  const onStartAddSummary = () => {
    navigate('/');
  };
  return (
    <>
      {/* Mobile backdrop overlay */}
      <div className="fixed inset-0 bg-black/40 z-20 md:hidden" onClick={onClose} />

      <aside className="fixed top-20 left-0 h-[calc(100vh-5rem)] w-full md:w-72 bg-surface-100 text-text-800 transition-all duration-300 ease-in-out z-30">
        <div className="p-6 flex flex-col h-full">
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 p-2 rounded bg-surface-200 hover:bg-surface-300 text-text-600"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded bg-orange-500 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-black"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h2 className="font-display text-2xl text-text-950">Summaries</h2>
            </div>
            <p className="text-xs text-text-500 font-mono">
              // {summaries.length} saved
            </p>
          </div>

          {/* New Summary Button */}
          <button
            onClick={onStartAddSummary}
            className="w-full bg-orange-500 hover:bg-orange-600 text-black font-bold py-3 px-4 rounded transition-colors duration-200 flex items-center justify-center gap-2 group"
          >
            <svg
              className="w-5 h-5 group-hover:rotate-90 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>New Summary</span>
          </button>

          {/* Divider */}
          <div className="my-6 border-t border-surface-300"></div>

          {/* Summaries List */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <h3 className="text-xs text-text-400 uppercase tracking-wider mb-3 font-mono">
              // recent
            </h3>
            {summaries.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center p-4">
                  <svg
                    className="w-12 h-12 text-text-300 mx-auto mb-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-sm text-text-400 font-medium">
                    No summaries yet
                  </p>
                  <p className="text-xs text-text-400 mt-1">
                    Create your first one!
                  </p>
                </div>
              </div>
            ) : (
              <ul className="flex-1 overflow-auto scrollbar space-y-2">
                {summaries.map((summary) => (
                  <Link to={`/summary/${summary.id}`} key={summary.id}>
                    <li
                      className={`group p-3 rounded transition-colors duration-200 cursor-pointer ${
                        summary.id === id
                          ? 'bg-orange-500 text-black'
                          : 'bg-surface-200 hover:bg-surface-300 text-text-700'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <svg
                          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                            summary.id === id
                              ? 'text-black'
                              : 'text-text-400 group-hover:text-orange-500'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">
                            {summary.title.length > 30
                              ? summary.title.substring(0, 30) + '...'
                              : summary.title}
                          </p>
                          <p
                            className={`text-xs mt-1 ${
                              summary.id === id
                                ? 'text-surface-300'
                                : 'text-text-400'
                            }`}
                          >
                            {new Date(summary.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
