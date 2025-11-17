import React from 'react';

const Toggle = ({ isToggled, toggleState }) => {
  return (
    <div className="flex items-center justify-start gap-3">
      {/* Container for the toggle switch */}
      <div
        className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${
          isToggled ? 'bg-primary-600' : 'bg-background-400'
        } transition-colors duration-300 ease-in-out shadow-inner`}
        onClick={toggleState} // Toggle the state on click
      >
        {/* Circle inside the toggle */}
        <div
          className={`bg-background-50 w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
            isToggled ? 'translate-x-6' : 'translate-x-0'
          }`}
        ></div>
      </div>
      {/* Text indicating the toggle status */}
      <span
        className={`text-sm font-medium ${isToggled ? 'text-primary-700' : 'text-text-500'}`}
      >
        {isToggled ? 'Enabled' : 'Disabled'}
      </span>
    </div>
  );
};

export default Toggle;
