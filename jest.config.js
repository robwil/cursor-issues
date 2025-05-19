/**
 * Jest configuration for ES modules
 * 
 * @type {import('jest').Config}
 */
export default {
  // Indicates that we are using ESM
  transform: {},
  
  // Test environment
  testEnvironment: 'node',
  
  // File extensions to consider as test files
  testMatch: ['**/*.test.mjs'],
  
  // Directories to exclude from testing
  testPathIgnorePatterns: ['/node_modules/'],
  
  // Display verbose output
  verbose: true
};
