/** @type {import('jest').Config} */
const config = {
  // Common options
  verbose: true,
  
  // Use Jest projects to organize test types
  projects: [
    {
      displayName: 'unit',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['**/*.test.ts'],
      testPathIgnorePatterns: ['/node_modules/', '/dist/', '.*\\.integration\\.test\\.ts$'],
      transform: {
        '^.+\\.ts$': 'ts-jest'
      }
    },
    {
      displayName: 'integration',
      preset: 'ts-jest',
      testEnvironment: 'node',
      testMatch: ['**/*.integration.test.ts'],
      testPathIgnorePatterns: ['/node_modules/', '/dist/'],
      transform: {
        '^.+\\.ts$': 'ts-jest'
      }
    }
  ]
};

module.exports = config; 
