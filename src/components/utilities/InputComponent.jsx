import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import PickedFile from './PickedFile';
import uploadIcon from '/upload.svg';
import Spinner from './Spinner.jsx';
import { API_ENDPOINTS } from '../../config/api.js';

const InputComponent = ({ file }) => {
  const [internalFile, setInternalFile] = useState(null);
  const [text, setText] = useState('');
  const [percentage, setPercentage] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      setInternalFile(file);
      setText(''); // Clear text since a file is present
    }
  }, [file]);

  const handleFileChange = (e) => {
    setInternalFile(e.target.files[0]);
    setText('');
    setMessage('');
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    setInternalFile(null);
    setMessage('');
    
    // Auto-scroll textarea to bottom as user types
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  };

  const handlePercentageChange = (e) => {
    setPercentage(e.target.value);
  };

  const clearFile = () => {
    setInternalFile(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const uploadFileAndSummarize = async () => {
    const headers = { 'X-User-UID': localStorage.getItem('userUid') };
    const formData = new FormData();
    formData.append('file', internalFile);
    formData.append('percentage', Number(percentage));

    console.log('📤 Uploading file to:', API_ENDPOINTS.UPLOAD);
    setIsLoading(true);
    setMessage('Uploading...');
    try {
      const response = await axios.post(API_ENDPOINTS.UPLOAD, formData, {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' },
      });
      console.log('✅ Upload successful:', response.data);
      setMessage(response.data.message);
      // Navigate to the summary view page after receiving the response
      if (response.data.id) {
        // Dispatch event to notify App.jsx to refresh summaries list
        window.dispatchEvent(new Event('summaryCreated'));
        navigate(`/summary/${response.data.id}`);
      }
    } catch (error) {
      console.error('❌ Upload error:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response,
        code: error.code,
        url: API_ENDPOINTS.UPLOAD,
      });
      setMessage(`Error: ${error.response?.data.error || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const summarizeText = async () => {
    const headers = { 'X-User-UID': localStorage.getItem('userUid') };
    console.log('📝 Summarizing text to:', API_ENDPOINTS.SUMMARIZE);
    setIsLoading(true);
    setMessage('Summarizing...');
    try {
      const response = await axios.post(
        API_ENDPOINTS.SUMMARIZE,
        { text, percentage: Number(percentage) },
        { headers },
      );
      console.log('✅ Summarize successful:', response.data);
      setMessage(response.data.message);
      // Navigate to the summary view page after receiving the response
      if (response.data.id) {
        // Dispatch event to notify App.jsx to refresh summaries list
        window.dispatchEvent(new Event('summaryCreated'));
        navigate(`/summary/${response.data.id}`);
      }
    } catch (error) {
      console.error('❌ Summarize error:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response,
        code: error.code,
        url: API_ENDPOINTS.SUMMARIZE,
      });
      setMessage(`Error: ${error.response?.data.error || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded z-50 flex items-center justify-center animate-fadeIn">
          <div className="bg-surface-200 rounded p-8 border-2 border-orange-500 flex flex-col items-center gap-4 animate-scaleIn max-w-sm w-full mx-4">
            <div className="relative">
              <Spinner size={3} color="primary" />
              <div className="absolute inset-0 animate-ping opacity-20">
                <Spinner size={3} color="primary" />
              </div>
            </div>
            <div className="text-center w-full">
              <p className="font-display text-xl font-bold text-text-900 mb-2">
                {internalFile ? '📤 Uploading File' : '✨ Analyzing Text'}
              </p>
              <p className="text-sm text-text-500 mb-3">
                {message || 'Please wait while we process your request...'}
              </p>
              <div className="w-full bg-surface-200 rounded-full h-1.5 overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Input Card */}
      <div className="bg-surface-50 rounded p-6 md:p-8">
        {/* Input Area */}
        <div className="mb-6">
          {internalFile ? (
            <div className="min-h-[200px] flex items-center justify-center">
              <PickedFile fileName={internalFile.name} onRemove={clearFile} />
            </div>
          ) : (
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={text}
                onChange={handleTextChange}
                className="w-full bg-surface-200 rounded p-4 md:p-6 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none text-text-900 placeholder-text-400 text-base md:text-lg transition-all duration-200"
                style={{ minHeight: '200px', maxHeight: '400px' }}
                placeholder="// paste_your_text_here or upload a document below..."
                disabled={!!internalFile}
              />
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept=".pdf,.doc,.docx,.txt"
              />

              {/* Character count */}
              {text && (
                <div className="absolute bottom-4 right-4 text-xs text-text-600 bg-surface-300 px-3 py-1 rounded-full">
                  {text.length} chars
                </div>
              )}
            </div>
          )}
        </div>

        {/* Options Row */}
        <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-6">
          {/* Percentage Input */}
          <div className="flex-1 bg-surface-200 rounded p-4">
            <label
              htmlFor="percentage"
              className="block text-xs font-semibold text-text-400 uppercase tracking-wider mb-2"
            >
              // summary_length
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="percentage"
                value={percentage}
                onChange={handlePercentageChange}
                className="flex-1 bg-surface-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 text-text-900 font-bold text-lg"
                placeholder="Auto"
                min="1"
                max="100"
              />
              <span className="text-text-500 font-semibold text-lg px-2">%</span>
              <span className="text-xs text-teal-500 bg-surface-300 px-3 py-1 rounded-full whitespace-nowrap">
                {percentage ? `[${percentage}%]` : '[AUTO]'}
              </span>
            </div>
          </div>

          {/* Upload Button */}
          <div className="sm:w-48 bg-surface-200 rounded p-4 flex flex-col">
            <label className="block text-xs font-semibold text-text-400 uppercase tracking-wider mb-2">
              // upload_file
            </label>
            <button
              onClick={triggerFileInput}
              className="flex-1 bg-surface-300 hover:bg-surface-400 rounded px-4 py-3 transition-all duration-200 flex items-center justify-center gap-3 group"
            >
              <svg
                className="w-5 h-5 text-text-500 group-hover:text-orange-500 transition-colors"
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
              <span className="text-sm font-semibold text-text-500 group-hover:text-orange-500 transition-colors">
                Browse
              </span>
            </button>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={internalFile ? uploadFileAndSummarize : summarizeText}
          disabled={isLoading || (!text && !internalFile)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-black py-4 px-8 rounded transition-all duration-200 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
        >
          {isLoading ? (
            <>
              <Spinner size={1.5} color="white" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <svg
                className="w-6 h-6 group-hover:scale-110 transition-transform"
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
              <span>Summarize Now</span>
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </>
          )}
        </button>

        {/* Message Display */}
        {message && !isLoading && (
          <div
            className={`mt-4 p-4 rounded ${
              message.includes('Error')
                ? 'bg-red-50 border border-red-200 text-red-700'
                : 'bg-green-50 border border-green-200 text-green-700'
            }`}
          >
            <div className="flex items-center gap-2">
              {message.includes('Error') ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span className="font-medium">{message}</span>
            </div>
          </div>
        )}
      </div>

      {/* Supported Formats Info */}
      <div className="mt-4 text-center">
        <p className="text-sm text-text-400 flex items-center justify-center gap-2 flex-wrap">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            // supported_formats:
          </span>
          <span className="font-semibold text-text-500">
            .txt .pdf .doc .docx
          </span>
        </p>
      </div>
    </div>
  );
};

export default InputComponent;
