require('@testing-library/jest-dom');
require('jest-fetch-mock').enableMocks();

// Mock import.meta.env for Jest
global.import_meta_env = {
  VITE_API_BASE_URL: '/api',
};