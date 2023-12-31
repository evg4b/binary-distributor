/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: process.env.CI === 'true',
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageProvider: 'babel',
  coverageReporters: ['text', 'lcov'],
};

module.exports = config;
