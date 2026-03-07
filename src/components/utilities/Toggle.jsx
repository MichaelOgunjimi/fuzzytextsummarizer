import React from 'react';

const Toggle = ({ isToggled, toggleState }) => {
  return (
    <div className="flex items-center justify-start gap-3">
      {/* Container for the toggle switch */}
      <div
        className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${
          isToggled ? 'bg-teal-500' : 'bg-surface-400'
        } transition-colors duration-300 ease-in-out`}
        onClick={toggleState} // Toggle the state on click
      >
        {/* Circle inside the toggle */}
        <div
          className={`bg-white dark:bg-surface-900 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
            isToggled ? 'translate-x-6' : 'translate-x-0'
          }`}
        ></div>
      </div>
      {/* Text indicating the toggle status */}
      <span
        className={`text-sm font-mono font-medium ${isToggled ? 'text-teal-500' : 'text-text-500'}`}
      >
        {isToggled ? '[ENABLED]' : '[DISABLED]'}
      </span>
    </div>
  );
};

export default Toggle;
