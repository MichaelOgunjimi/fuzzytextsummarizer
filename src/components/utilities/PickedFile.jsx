import React from 'react';
import fileTextIcon from '/file-text.svg';

export default function PickedFile({ fileName, onRemove }) {
  return (
    <div className="bg-surface-200 rounded p-4 md:p-6 relative transition-all duration-300 group w-full">
      <div className="flex items-center gap-3 md:gap-4">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded bg-orange-500 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
          <svg
            className="w-6 h-6 md:w-8 md:h-8 text-black"
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
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm md:text-base font-mono font-bold text-text-900 truncate mb-1">
            {fileName}
          </p>
          <p className="text-sm font-mono text-text-500">// ready_to_summarize</p>
        </div>
      </div>
      {onRemove && (
        <button
          type="button"
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 transition-all duration-200 flex items-center justify-center group/btn"
          onClick={onRemove}
        >
          <svg
            className="w-4 h-4 text-black group-hover/btn:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
