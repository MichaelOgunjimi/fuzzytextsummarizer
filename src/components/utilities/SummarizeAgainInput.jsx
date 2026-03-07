import React from 'react';

export function SummarizeAgainInput({
  percentage,
  setPercentage,
  summarizeAgain,
  isLoading,
}) {
  return (
    <div className="p-4 bg-surface-200 w-full md:w-2/3 mx-auto fixed inset-x-0 bottom-0 rounded">
      <div className="max-w-md mx-auto flex items-center gap-4">
        <input
          type="text"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
          placeholder="Enter percentage (Optional)"
          className="flex-1 rounded p-3 font-mono text-text-900 bg-surface-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        />
        <button
          onClick={summarizeAgain}
          disabled={isLoading}
          className="bg-orange-500 hover:bg-orange-600 text-black font-mono font-semibold py-3 px-6 rounded transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Summarizing...' : 'Summarize Again'}
        </button>
      </div>
    </div>
  );
}
