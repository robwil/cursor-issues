/** @type {import('jest').Config} */
const config = {
  // Module name mapper to handle ESM imports
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
    "^(\\.{1,2}/.*)\\.mjs$": "$1",
  },

  // Specify the test environment
  testEnvironment: "node",

  // Match test files
  testMatch: ["**/?(*.)+(spec|test).mjs"],

  // Path patterns to ignore for tests
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};

export default config;
