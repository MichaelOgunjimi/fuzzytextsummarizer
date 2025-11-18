// API Configuration
const isDevelopment = import.meta.env.MODE === 'development';
const API_BASE_URL = isDevelopment
  ? import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5500/api/v1'
  : 'https://lingosummarapi.michaelogunjimi.com/api/v1';

// Debug logging
console.log('🔧 API Configuration:', {
  MODE: import.meta.env.MODE,
  isDevelopment,
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  API_BASE_URL: API_BASE_URL,
});

export const API_ENDPOINTS = {
  SUMMARIZE: `${API_BASE_URL}/summarize`,
  UPLOAD: `${API_BASE_URL}/upload`,
  USER_TEXTS: `${API_BASE_URL}/texts/user`,
  TEXT_SUMMARY: (id) => `${API_BASE_URL}/text/summary/${id}`,
  SUMMARIZE_AGAIN: (id) => `${API_BASE_URL}/summarize-again/${id}`,
};

export default API_BASE_URL;
