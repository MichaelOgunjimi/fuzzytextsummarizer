import React from 'react';

export function SummarizeAgainInput({
  percentage,
  setPercentage,
  summarizeAgain,
  isLoading,
}) {
  return (
    <div className="p-4 bg-background-200 w-2/3 mx-auto fixed inset-x-0 bottom-0 rounded-xl shadow-2xl border-t border-background-300">
      <div className="max-w-md mx-auto flex items-center gap-4">
        <input
          type="text"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
          placeholder="Enter percentage (Optional)"
          className="flex-1 border border-background-300 rounded-lg p-3 text-text-800 bg-background-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        <button
          onClick={summarizeAgain}
          disabled={isLoading}
          className="bg-primary-600 hover:bg-primary-700 text-background-50 font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Summarizing...' : 'Summarize Again'}
        </button>
      </div>
    </div>
  );
}
