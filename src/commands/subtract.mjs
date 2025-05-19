/**
 * Subtracts the second number from the first number and returns the result
 * 
 * @param {number} a - First number (minuend)
 * @param {number} b - Second number (subtrahend)
 * @returns {number} - Result of a minus b
 * 
 * @example
 * import { subtract } from './commands/subtract.mjs';
 * 
 * // Basic usage
 * const result = subtract(10, 4);
 * console.log(result); // Output: 6
 * 
 * // When the result is negative
 * console.log(subtract(5, 10)); // Output: -5
 * 
 * // Works with decimals
 * console.log(subtract(5.5, 2.2)); // Output: 3.3 (may have floating-point precision issues)
 */
export function subtract(a, b) {
  return a - b;
}
