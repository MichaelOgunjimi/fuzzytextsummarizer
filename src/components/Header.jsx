import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Logo from '/lingosummer-logo.svg';
import Toggle from './utilities/Toggle.jsx';

const Header = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isToggled, setToggled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const saveSummaries = localStorage.getItem('saveSummaries') === 'true';
    const lastAsked = localStorage.getItem('lastAsked');
    const currentDate = new Date();
    const fourteenDaysAgo = new Date(
      currentDate.setDate(currentDate.getDate() - 14),
    );

    if (!lastAsked || new Date(lastAsked) <= fourteenDaysAgo) {
      localStorage.setItem('lastAsked', new Date().toISOString());
    }

    setToggled(saveSummaries);
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    if (isMenuVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuVisible]);

  const toggleState = () => {
    const newToggledState = !isToggled;
    if (newToggledState) {
      localStorage.setItem('userUid', uuidv4());
      localStorage.setItem('saveSummaries', 'true');
    } else {
      localStorage.removeItem('userUid');
      localStorage.setItem('saveSummaries', 'false');
    }
    setToggled(newToggledState);

    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event('saveSummariesChanged'));
  };

  return (
    <header className="sticky top-0 z-50 bg-surface-100 bg-opacity-95 backdrop-blur-lg">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="w-12 h-12 bg-orange-500 rounded flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
            <img
              src={Logo}
              alt="LingoSummar"
              className="w-8 h-8 object-contain brightness-0 invert opacity-95"
            />
          </div>
          <span className="text-xl font-display uppercase tracking-wide text-text-800 group-hover:text-orange-500 transition-colors duration-200 hidden sm:block">
            LingoSummar
          </span>
        </Link>

        {/* Right Side - Theme Toggle & Menu Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded bg-surface-200 hover:bg-surface-300 transition-all duration-200 group"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg className="w-5 h-5 text-orange-400 group-hover:text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-text-600 group-hover:text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuVisible(!isMenuVisible)}
            className="flex items-center gap-2 px-4 py-2 rounded bg-surface-200 hover:bg-surface-300 transition-all duration-200 group"
          >
            <span className="text-xs font-mono font-semibold text-text-700 hidden sm:block">
              // settings
            </span>
            <svg
              className={`w-5 h-5 text-text-600 group-hover:text-orange-500 transition-all duration-200 ${isMenuVisible ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isMenuVisible && (
            <div className="absolute right-0 mt-3 p-6 bg-surface-50 dark:shadow-2xl rounded w-80 animate-slideDown">
              <div className="mb-4">
                <h3 className="text-lg font-display uppercase tracking-wide text-text-800 mb-1">
                  // save_history
                </h3>
                <p className="text-sm font-mono text-text-600 mb-4">
                  Keep track of all your summaries for easy access later
                </p>
              </div>

              <div className="p-4 bg-surface-100 rounded">
                <Toggle isToggled={isToggled} toggleState={toggleState} />
              </div>

              <div className="mt-4 p-3 bg-surface-200 rounded">
                <div className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-text-600 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-xs font-mono text-text-500">
                    Your summaries are stored locally in your browser. No
                    account required!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
