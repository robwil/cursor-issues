/**
 * Adds two numbers and returns the result
 * 
 * @param {number} a - First number
 * @param {number} b - Second number
 * @returns {number} - Sum of a and b
 * 
 * @example
 * import { sum } from './commands/sum.mjs';
 * 
 * // Basic usage
 * const result = sum(5, 3);
 * console.log(result); // Output: 8
 * 
 * // Works with negative numbers
 * console.log(sum(-10, 5)); // Output: -5
 * 
 * // Works with decimals
 * console.log(sum(1.5, 2.5)); // Output: 4
 */
export function sum(a, b) {
  return a + b;
}
