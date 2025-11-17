import React, { useState } from 'react';
import { CopyIcon, InfoIcon, SpeakerIcon } from './utilities/Svgs.jsx';
import PickedFile from './utilities/PickedFile.jsx';

export default function Summary({ summary, isOriginal }) {
  const [showDetails, setShowDetails] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary.text);
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
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={`p-6 rounded-xl mb-4 relative flex flex-col gap-4 border transition-all duration-200 ${isOriginal ? 'bg-background-200 border-background-400' : 'bg-background-100 border-background-300'}`}
    >
      <div className="flex items-center gap-2 justify-end">
        <div className="flex gap-3">
          <button
            onClick={copyToClipboard}
            className="text-text-600 hover:text-primary-700 transition-colors p-2 hover:bg-background-200 rounded-lg"
            title="Copy to clipboard"
          >
            <CopyIcon />
          </button>
          <button
            onClick={toggleSpeak}
            className="text-text-600 hover:text-primary-700 transition-colors p-2 hover:bg-background-200 rounded-lg"
            title="Read aloud"
          >
            <SpeakerIcon />
          </button>
        </div>
        {!isOriginal ? (
          <button
            onMouseEnter={() => setShowDetails(true)}
            onMouseLeave={() => setShowDetails(false)}
            className="text-text-600 hover:text-primary-700 transition-colors p-2 hover:bg-background-200 rounded-lg"
            title="View details"
          >
            <InfoIcon />
          </button>
        ) : null}
      </div>

      {isOriginal ? (
        <h3 className="text-xl font-bold text-text-800">Original Text</h3>
      ) : (
        <h3 className="text-xl font-bold text-text-800">Summarized Text</h3>
      )}

      {isOriginal && summary.uploaded_filename ? (
        <PickedFile fileName={summary.uploaded_filename} />
      ) : (
        <p
          className={`text-text-700 mb-2 leading-relaxed ${isOriginal ? 'font-medium' : ''}`}
        >
          {summary.text}
        </p>
      )}

      {showDetails && (
        <div className="absolute top-16 right-5 p-3 bg-background-800 text-background-50 rounded-lg shadow-xl border border-background-700">
          <p className="text-sm">Words: {summary.words}</p>
          <p className="text-sm">Percentage: {summary.percentage}%</p>
        </div>
      )}
      <div className="text-text-500 text-sm">
        <p>{formatDate(summary.created_at)}</p>
      </div>
    </div>
  );
}
