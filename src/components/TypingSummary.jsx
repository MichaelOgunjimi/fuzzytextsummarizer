import React, { useEffect, useState } from 'react';
import { CopyIcon, InfoIcon, SpeakerIcon } from './utilities/Svgs.jsx';

const TypingSummary = ({ summary, onTypingComplete }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const typingSpeed = 10; // Typing speed in milliseconds

  // Function to copy text to the clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary.text);
    alert('Text copied to clipboard!');
  };

  const toggleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (!isSpeaking) {
        const utterance = new SpeechSynthesisUtterance(summary.text);
        utterance.voice = speechSynthesis
          .getVoices()
          .find((voice) => voice.lang === 'en-US'); // Optionally set the voice
        utterance.onend = () => setIsSpeaking(false); // Update state when speaking ends
        utterance.onerror = () => setIsSpeaking(false); // Update state on error
        speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      } else {
        speechSynthesis.cancel(); // Stop speaking
        setIsSpeaking(false);
      }
    } else {
      alert('Sorry, your browser does not support text-to-speech!');
    }
  };

  // Function to format the date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // UseEffect to handle the typing effect
  useEffect(() => {
    let timeoutId;
    if (summary.text && displayedText.length < summary.text.length) {
      timeoutId = setTimeout(() => {
        setDisplayedText(summary.text.substr(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (displayedText.length === summary.text.length) {
      if (onTypingComplete) {
        onTypingComplete();
      }
    }
    return () => clearTimeout(timeoutId);
  }, [summary.text, displayedText, onTypingComplete]);

  return (
    <div className="p-4 md:p-6 bg-surface-100 rounded mb-4 relative flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h3 className="font-display text-lg text-text-900">// summarized_text</h3>
        <div className="flex gap-2 md:gap-3">
          <button
            onClick={copyToClipboard}
            className="text-text-400 hover:text-orange-500 transition-colors p-2 hover:bg-surface-300 rounded"
            title="Copy to clipboard"
          >
            <CopyIcon />
          </button>
          <button
            className="text-text-400 hover:text-orange-500 transition-colors p-2 hover:bg-surface-300 rounded"
            onClick={toggleSpeak}
            title="Read aloud"
          >
            <SpeakerIcon />
          </button>
          <button
            onMouseEnter={() => setShowDetails(true)}
            onMouseLeave={() => setShowDetails(false)}
            className="text-text-400 hover:text-orange-500 transition-colors p-2 hover:bg-surface-300 rounded"
            title="View details"
          >
            <InfoIcon />
          </button>
        </div>
      </div>
      <p className="text-text-700 mb-2 leading-relaxed">{displayedText}</p>
      {showDetails && (
        <div className="absolute top-16 right-5 p-3 bg-surface-900 text-surface-50 rounded shadow-xl">
          <p className="text-sm">Words: {summary.words}</p>
          <p className="text-sm">Percentage: {summary.percentage}%</p>
        </div>
      )}
      <div className="text-text-400 text-sm mt-2">
        <p>Created on: {formatDate(summary.created_at)}</p>
      </div>
    </div>
  );
};

export default TypingSummary;
