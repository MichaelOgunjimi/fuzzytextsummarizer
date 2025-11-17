import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Sidebar({ summaries, id }) {
  const navigate = useNavigate();
  const onStartAddSummary = () => {
    navigate('/');
  };
  return (
    <aside className="fixed top-0 left-0 h-full w-1/3 bg-background-200 text-text-800 md:w-72 rounded-r-xl transition-all duration-300 ease-in-out shadow-xl border-r border-background-300">
      <div className="px-8 py-16 flex flex-col h-full">
        <div className="flex items-center justify-between">
          <h2 className="font-bold uppercase text-xl text-text-800 tracking-wide">
            Your Summaries
          </h2>
        </div>
        <button
          onClick={onStartAddSummary}
          className="mt-8 w-full bg-primary-600 hover:bg-primary-700 text-background-50 font-semibold py-3 px-4 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
        >
          + Add Summary
        </button>
        <h2 className="font-semibold text-sm text-text-600 mt-8 uppercase tracking-wider">
          Previous Summaries
        </h2>
        <ul className="overflow-auto mt-3 scrollbar">
          {summaries.map((summary) => (
            <Link to={`/summary/${summary.id}`} key={summary.id}>
              <li
                className={`py-2 px-3 my-1 rounded-lg transition-all duration-200 ${summary.id === id ? 'bg-primary-600 text-background-50 shadow-md' : 'text-text-700 hover:text-text-900 hover:bg-background-300'}`}
              >
                {summary.title.substring(0, 25) +
                  (summary.title.length > 25 ? '...' : '')}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </aside>
  );
}
