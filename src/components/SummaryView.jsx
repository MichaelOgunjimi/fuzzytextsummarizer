import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LeftArrowIcon, RightArrowIcon } from './utilities/Svgs.jsx';
import { SummarizeAgainInput } from './utilities/SummarizeAgainInput.jsx';
import Sidebar from './Sidebar.jsx'; // Assuming Sidebar is a default export
import Summary from './Summary.jsx';
import TypingSummary from './TypingSummary.jsx';
import Spinner from './utilities/Spinner.jsx';
import { API_ENDPOINTS } from '../config/api.js';

const SummaryView = ({ summaries }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSummary, setCurrentSummary] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [percentage, setPercentage] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchSummary(id);
  }, [id]);

  const handleSummarizeAgain = (newSummary) => {
    newSummary.timestamp = new Date(); // Add a timestamp when the summary is added
    setCurrentSummary((prevSummary) => ({
      ...prevSummary,
      summaries: [...prevSummary.summaries, newSummary],
    }));
    setLastUpdated(new Date());
  };

  async function fetchSummary(id) {
    setIsLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.TEXT_SUMMARY(id));
      if (!response.ok) throw new Error('Failed to fetch summary');
      const data = await response.json();
      setCurrentSummary(data);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching summary:', err);
      setIsLoading(false);
    }
  }

  async function summarizeAgain() {
    setIsLoading(true);
    try {
      const response = await fetch(API_ENDPOINTS.SUMMARIZE_AGAIN(id), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ percentage: Number(percentage) }),
      });
      if (!response.ok) throw new Error('Failed to fetch summary');
      const data = await response.json();
      handleSummarizeAgain(data.summary);
    } catch (err) {
      console.error('Error fetching summary:', err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleTypingComplete = () => {
    setTypingComplete((prevState) => !prevState);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-background-100 via-background-50 to-background-100">
      {sidebarOpen && <Sidebar summaries={summaries} id={id} />}
      <ToggleButton sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <MainContent
        sidebarOpen={sidebarOpen}
        currentSummary={currentSummary}
        percentage={percentage}
        setPercentage={setPercentage}
        summarizeAgain={summarizeAgain}
        isLoading={isLoading}
        lastUpdated={lastUpdated}
        handleTypingComplete={handleTypingComplete}
      />
    </div>
  );
};

const ToggleButton = ({ sidebarOpen, setSidebarOpen }) => (
  <div
    className={`fixed left-0 top-1/2 transform -translate-y-1/2 transition-all duration-300 z-20 ${sidebarOpen ? 'translate-x-72' : 'translate-x-0'}`}
  >
    <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 p-4 rounded-r-2xl text-background-50 focus:outline-none shadow-2xl transition-all duration-200 hover:shadow-3xl group"
      aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
    >
      <div className="transform group-hover:scale-110 transition-transform">
        {sidebarOpen ? <LeftArrowIcon /> : <RightArrowIcon />}
      </div>
    </button>
  </div>
);

const MainContent = ({
  sidebarOpen,
  currentSummary,
  percentage,
  setPercentage,
  summarizeAgain,
  isLoading,
  lastUpdated,
  typingComplete,
}) => {
  const summaryContentRef = useRef(null);

  // Scroll to bottom when content changes or page loads
  useEffect(() => {
    if (summaryContentRef.current) {
      setTimeout(() => {
        summaryContentRef.current.scrollTop =
          summaryContentRef.current.scrollHeight;
      }, 100);
    }
  }, [currentSummary, isLoading, typingComplete, lastUpdated]);

  return (
    <div
      className={`flex-1 ${sidebarOpen ? 'ml-72' : 'ml-0'} mb-20 transition-all duration-300 ease-in-out`}
    >
      <div className="p-4 md:p-8 max-w-6xl mx-auto flex flex-col h-full">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-text-900 mb-2">
            Summary Details
          </h1>
          <p className="text-text-600">
            Review your original text and generated summaries
          </p>
        </div>

        {/* Summaries Container */}
        <div
          className="flex-1 overflow-auto scrollbar bg-background-50 p-6 md:p-8 rounded-2xl border-2 border-background-300 shadow-xl space-y-6"
          ref={summaryContentRef}
        >
          {currentSummary.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Spinner size={3} />
                <p className="text-text-600 mt-4">Loading summary...</p>
              </div>
            </div>
          ) : (
            currentSummary && (
              <>
                <Summary
                  summary={{
                    text: currentSummary.text,
                    created_at: currentSummary.created_at,
                    uploaded_filename: currentSummary.uploaded_filename,
                  }}
                  isOriginal={true}
                />
                {currentSummary.summaries &&
                  currentSummary.summaries.map((summary, index) => {
                    const isLatestOrOnly =
                      (lastUpdated &&
                        summary.timestamp &&
                        new Date(summary.timestamp).getTime() ===
                          lastUpdated.getTime()) ||
                      currentSummary.summaries.length === 1;

                    return isLatestOrOnly ? (
                      <TypingSummary
                        key={summary.id}
                        summary={summary}
                        onTypingComplete={typingComplete}
                      />
                    ) : (
                      <Summary
                        key={summary.id}
                        summary={summary}
                        isOriginal={false}
                      />
                    );
                  })}
              </>
            )
          )}
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-4 p-8 bg-gradient-to-br from-background-100 to-background-200 rounded-xl border border-background-300">
              <Spinner size={3} />
              <div className="text-center">
                <p className="text-text-800 font-semibold text-lg">
                  Generating Summary...
                </p>
                <p className="text-text-600 text-sm mt-1">
                  This may take a few moments
                </p>
              </div>
            </div>
          )}
        </div>
        <SummarizeAgainInput
          percentage={percentage}
          setPercentage={setPercentage}
          summarizeAgain={summarizeAgain}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default SummaryView;
