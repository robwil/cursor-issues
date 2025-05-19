/** @type {import('jest').Config} */
const config = {
  // Use ts-jest for TypeScript files
  preset: 'ts-jest',
  
  // Test environment
  testEnvironment: 'node',
  
  // File extensions to consider as test files
  testMatch: ['**/*.test.ts'],
  
  // Directories to exclude from testing
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  
  // Display verbose output
  verbose: true,
  
  // Transform TypeScript files
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
};

module.exports = config; 
