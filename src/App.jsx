import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import SummaryForm from './components/SummaryForm.jsx';
import SummaryView from './components/SummaryView.jsx';
import { API_ENDPOINTS } from './config/api.js';

import './index.css';

const App = () => {
  const [isSavingEnabled, setIsSavingEnabled] = useState(false);
  const [userUid, setUserUid] = useState('');
  const [summaries, setSummaries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSummaries = async () => {
    setIsLoading(true);
    try {
      if (!userUid) throw new Error('User UID is not set.');
      const response = await fetch(API_ENDPOINTS.USER_TEXTS, {
        method: 'GET',
        headers: {
          'X-User-UID': userUid,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch summaries');
      const data = await response.json();
      setSummaries(data);
    } catch (err) {
      console.error('Error fetching summaries:', err);
      // Optionally update the UI to show an error message
    } finally {
      setIsLoading(false); // Ensure isLoading is always set to false
    }
  };

  useEffect(() => {
    const saveSummaries = localStorage.getItem('saveSummaries') === 'true';
    const uid = saveSummaries ? localStorage.getItem('userUid') : '';
    setIsSavingEnabled(saveSummaries);
    setUserUid(uid);

    // If saving is disabled, clear summaries
    if (!saveSummaries) {
      setSummaries([]);
    }
  }, []);

  // Listen for changes to the saveSummaries setting
  useEffect(() => {
    const handleSaveSummariesChange = () => {
      const saveSummaries = localStorage.getItem('saveSummaries') === 'true';
      const uid = saveSummaries ? localStorage.getItem('userUid') : '';
      setIsSavingEnabled(saveSummaries);
      setUserUid(uid);

      // If saving is disabled, clear summaries from the UI
      if (!saveSummaries) {
        setSummaries([]);
      } else if (uid) {
        // If saving is enabled and we have a UID, fetch summaries
        fetchSummaries();
      }
    };

    window.addEventListener('saveSummariesChanged', handleSaveSummariesChange);

    return () => {
      window.removeEventListener(
        'saveSummariesChanged',
        handleSaveSummariesChange,
      );
    };
  }, [userUid]);

  // Listen for new summary creation
  useEffect(() => {
    const handleSummaryCreated = () => {
      if (userUid && isSavingEnabled) {
        fetchSummaries();
      }
    };

    window.addEventListener('summaryCreated', handleSummaryCreated);

    return () => {
      window.removeEventListener('summaryCreated', handleSummaryCreated);
    };
  }, [userUid, isSavingEnabled]);

  useEffect(() => {
    if (userUid) {
      fetchSummaries();
    }
  }, [userUid]);

  return (
    <div className="flex flex-col h-screen w-full">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <SummaryForm
              summaries={summaries}
              isSavingEnabled={isSavingEnabled}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/summary/:id"
          element={<SummaryView summaries={summaries} />}
        />
      </Routes>
    </div>
  );
};

export default App;
