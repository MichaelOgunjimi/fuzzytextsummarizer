import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import InputComponent from './utilities/InputComponent.jsx';
import Spinner from './utilities/Spinner.jsx';

const groupSummariesByDate = (summaries) => {
  const today = new Date();
  const sevenDaysAgo = new Date().setDate(today.getDate() - 7);

  return summaries.reduce(
    (groups, summary) => {
      const createdAt = new Date(summary.created_at);
      if (createdAt.toDateString() === today.toDateString()) {
        groups.today.push(summary);
      } else if (createdAt.getTime() > sevenDaysAgo) {
        groups.lastSevenDays.push(summary);
      } else {
        groups.older.push(summary);
      }
      return groups;
    },
    { today: [], lastSevenDays: [], older: [] },
  );
};

const SummaryForm = ({ summaries, isSavingEnabled, isLoading }) => {
  const [file, setFile] = useState(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => setFile(acceptedFiles[0]),
    noClick: true,
    noKeyboard: true,
  });

  const groupedSummaries = groupSummariesByDate(summaries);

  return (
    <div
      {...getRootProps()}
      className="relative flex flex-col min-h-screen bg-gradient-to-br from-background-100 via-background-50 to-background-100 overflow-hidden"
    >
      <input {...getInputProps()} />

      {/* Drag and Drop Overlay */}
      {isDragActive && (
        <div className="fixed inset-0 bg-primary-900 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50 border-8 border-dashed border-primary-600 m-4 rounded-3xl animate-pulse">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary-600 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-background-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <p className="text-3xl text-text-800 font-bold mb-2">
              Drop your file here
            </p>
            <p className="text-lg text-text-600">We'll handle the rest</p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-5xl w-full">
          {/* Main Heading */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-6xl md:text-7xl font-black text-text-900 mb-4 tracking-tight leading-tight">
              Summarize Anything
              <span className="block text-5xl md:text-6xl mt-2 bg-gradient-to-r from-primary-700 via-primary-600 to-primary-500 bg-clip-text text-transparent">
                In Seconds
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-text-600 max-w-2xl mx-auto font-light">
              Transform lengthy documents and text into concise, meaningful
              summaries with AI-powered precision
            </p>

            {/* Fuzzy Logic Badge */}
            <div className="flex items-center justify-center gap-2 pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-background-100 rounded-full border border-background-300 shadow-sm">
                <svg
                  className="w-4 h-4 text-primary-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm font-semibold text-text-700">
                  Powered by Fuzzy Logic
                </span>
              </div>
            </div>
          </div>

          {/* Input Component - Now the star of the show */}
          <div className="mb-12">
            <InputComponent file={file} />
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-background-50 border border-background-300 hover:border-primary-500 transition-all duration-300 hover:shadow-lg group">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-background-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text-800 mb-2">
                Lightning Fast
              </h3>
              <p className="text-sm text-text-600">
                Get summaries in seconds, not minutes
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-background-50 border border-background-300 hover:border-primary-500 transition-all duration-300 hover:shadow-lg group">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-background-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text-800 mb-2">Accurate</h3>
              <p className="text-sm text-text-600">
                AI-powered for precise results
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-background-50 border border-background-300 hover:border-primary-500 transition-all duration-300 hover:shadow-lg group">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-7 h-7 text-background-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-text-800 mb-2">
                Multiple Formats
              </h3>
              <p className="text-sm text-text-600">
                TXT, PDF, DOC, DOCX supported
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Previous Summaries Section */}
      {isSavingEnabled && (
        <div className="bg-background-50 border-t border-background-300 py-12 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl text-text-800 font-bold mb-2">
                  Your Summaries
                </h2>
                <p className="text-text-600">
                  Quick access to your recent work
                </p>
              </div>
              <svg
                className="w-8 h-8 text-primary-600"
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

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Spinner size={3} />
              </div>
            ) : summaries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(groupedSummaries).map(
                  ([key, group]) =>
                    group.length > 0 && (
                      <div key={key} className="space-y-3">
                        <h3 className="text-xs text-text-500 font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                          <span className="w-8 h-0.5 bg-primary-600"></span>
                          {key === 'today'
                            ? 'Today'
                            : key === 'lastSevenDays'
                              ? 'Last 7 Days'
                              : 'Older'}
                        </h3>
                        <div className="space-y-2">
                          {group.slice(0, 5).map((summary) => (
                            <Link
                              key={summary.id}
                              to={`/summary/${summary.id}`}
                              className="block p-4 bg-background-100 hover:bg-background-200 rounded-xl transition-all duration-200 border border-background-300 hover:border-primary-500 hover:shadow-md group"
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform">
                                  <svg
                                    className="w-5 h-5 text-background-50"
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
                                  <p className="font-semibold text-text-800 truncate group-hover:text-primary-700 transition-colors">
                                    {summary.title}
                                  </p>
                                  <p className="text-xs text-text-500 mt-1">
                                    {new Date(
                                      summary.created_at,
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ),
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-background-200 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-text-400"
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
                <p className="text-text-500 text-lg">No summaries yet</p>
                <p className="text-text-400 text-sm mt-2">
                  Create your first summary above
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {!isSavingEnabled && (
        <div className="bg-background-50 border-t border-background-300 py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-background-200 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-text-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-text-800 mb-2">
              History Disabled
            </h3>
            <p className="text-text-600">
              Enable saving in the menu to access your previous summaries
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SummaryForm;
