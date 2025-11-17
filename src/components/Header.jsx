import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Logo from '/lingosummer-logo.svg';
import Toggle from './utilities/Toggle.jsx';

const Header = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isToggled, setToggled] = useState(false);
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
  }, []);

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
    <header className="sticky top-0 z-50 bg-background-100 bg-opacity-95 backdrop-blur-lg border-b border-background-300 shadow-sm">
      <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-md">
            <img
              src={Logo}
              alt="LingoSummar"
              className="w-8 h-8 object-contain brightness-0 invert opacity-95"
            />
          </div>
          <span className="text-xl font-bold text-text-800 group-hover:text-primary-700 transition-colors duration-200 hidden sm:block">
            LingoSummar
          </span>
        </Link>

        {/* Right Side - Menu Button */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuVisible(!isMenuVisible)}
            className="flex items-center gap-3 px-4 py-2 rounded-xl bg-background-200 hover:bg-background-300 transition-all duration-200 border border-background-300 hover:border-primary-500 group"
          >
            <span className="text-sm font-semibold text-text-700 hidden sm:block">
              Settings
            </span>
            <svg
              className={`w-5 h-5 text-text-600 group-hover:text-primary-700 transition-all duration-200 ${isMenuVisible ? 'rotate-180' : ''}`}
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
            <div className="absolute right-0 mt-3 p-6 bg-background-50 shadow-2xl rounded-2xl w-80 border border-background-300 animate-slideDown">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-text-800 mb-1">
                  Save History
                </h3>
                <p className="text-sm text-text-600 mb-4">
                  Keep track of all your summaries for easy access later
                </p>
              </div>

              <div className="p-4 bg-background-100 rounded-xl border border-background-300">
                <Toggle isToggled={isToggled} toggleState={toggleState} />
              </div>

              <div className="mt-4 p-3 bg-primary-50 rounded-xl border border-primary-200">
                <div className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-primary-700 flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-xs text-primary-800">
                    Your summaries are stored locally in your browser. No
                    account required!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
