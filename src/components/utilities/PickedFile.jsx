import React from 'react';
import fileTextIcon from '/file-text.svg';

export default function PickedFile({ fileName, onRemove }) {
  return (
    <div className="bg-gradient-to-br from-background-100 to-background-200 rounded-2xl p-6 relative border-2 border-background-300 hover:border-primary-500 transition-all duration-300 group shadow-lg">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-md">
          <svg
            className="w-8 h-8 text-background-50"
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
          <p className="text-base font-bold text-text-800 truncate mb-1">
            {fileName}
          </p>
          <p className="text-sm text-text-600">Ready to summarize</p>
        </div>
      </div>
      {onRemove && (
        <button
          type="button"
          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary-600 hover:bg-primary-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center group/btn"
          onClick={onRemove}
        >
          <svg
            className="w-4 h-4 text-background-50 group-hover/btn:scale-110 transition-transform"
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
