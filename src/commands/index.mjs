/**
 * Export all calculator commands for easy importing
 * 
 * This module exports all the calculator operations from a single entry point,
 * allowing users to import any or all functions with a single import statement.
 * 
 * @module calculator/commands
 * 
 * @example
 * // Import all operations
 * import { sum, subtract, multiply, divide } from './commands/index.mjs';
 * 
 * // Or import just what you need
 * import { sum, multiply } from './commands/index.mjs';
 * 
 * // Use the imported functions
 * console.log(sum(5, 3));      // Output: 8
 * console.log(multiply(4, 2)); // Output: 8
 */
export { sum } from './sum.mjs';
export { subtract } from './subtract.mjs';
export { multiply } from './multiply.mjs';
export { divide } from './divide.mjs'; 
