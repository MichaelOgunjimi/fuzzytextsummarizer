import React, { useState } from 'react';
import { CopyIcon, InfoIcon, SpeakerIcon } from './utilities/Svgs.jsx';
import PickedFile from './utilities/PickedFile.jsx';

export default function Summary({ summary, isOriginal }) {
  const [showDetails, setShowDetails] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary.text ?? summary.content);
  };

  const toggleSpeak = () => {
    if ('speechSynthesis' in window) {
      if (!isSpeaking) {
      const utterance = new SpeechSynthesisUtterance(summary.text ?? summary.content);
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
    if (!dateString) return '';
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
      className={`p-4 md:p-6 rounded mb-4 relative flex flex-col gap-3 md:gap-4 ${isOriginal ? 'bg-surface-200' : 'bg-surface-100'}`}
    >
      <div className="flex items-center gap-2 justify-end flex-wrap">
        <div className="flex gap-2 md:gap-3">
          <button
            onClick={copyToClipboard}
            className="text-text-400 hover:text-orange-500 transition-colors p-2 hover:bg-surface-300 rounded"
            title="Copy to clipboard"
          >
            <CopyIcon />
          </button>
          <button
            onClick={toggleSpeak}
            className="text-text-400 hover:text-orange-500 transition-colors p-2 hover:bg-surface-300 rounded"
            title="Read aloud"
          >
            <SpeakerIcon />
          </button>
        </div>
        {!isOriginal ? (
          <button
            onMouseEnter={() => setShowDetails(true)}
            onMouseLeave={() => setShowDetails(false)}
            className="text-text-400 hover:text-orange-500 transition-colors p-2 hover:bg-surface-300 rounded"
            title="View details"
          >
            <InfoIcon />
          </button>
        ) : null}
      </div>

      {isOriginal ? (
        <h3 className="font-display text-lg text-text-900">// original_text</h3>
      ) : (
        <h3 className="font-display text-lg text-text-900">// summarized_text</h3>
      )}

      {isOriginal && summary.uploaded_filename ? (
        <PickedFile fileName={summary.uploaded_filename} />
      ) : (
        <p
          className={`text-text-700 mb-2 leading-relaxed ${isOriginal ? 'font-medium' : ''}`}
        >
          {summary.text ?? summary.content}
        </p>
      )}

      {showDetails && (
        <div className="absolute top-16 right-5 p-3 bg-surface-900 text-surface-50 rounded shadow-xl">
          <p className="text-sm">Words: {summary.words}</p>
          <p className="text-sm">Percentage: {summary.percentage}%</p>
        </div>
      )}
      <div className="text-text-400 text-sm">
        <p>{formatDate(summary.created_at)}</p>
      </div>
    </div>
  );
}
