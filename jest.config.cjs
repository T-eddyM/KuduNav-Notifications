// jest.config.js
module.exports = {
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    forceExit: true,
    collectCoverage: true, // Collect coverage information
    coverageDirectory: 'coverage', // Directory to output coverage files
    coverageReporters: ['text', 'lcov'], // Report formats
  };
  