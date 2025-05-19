/**
 * Multiplies two numbers and returns the result
 * 
 * @param {number} a - First number (multiplicand)
 * @param {number} b - Second number (multiplier)
 * @returns {number} - Product of a and b
 * 
 * @example
 * import { multiply } from './commands/multiply.mjs';
 * 
 * // Basic usage
 * const result = multiply(4, 5);
 * console.log(result); // Output: 20
 * 
 * // Multiplying by zero
 * console.log(multiply(100, 0)); // Output: 0
 * 
 * // Negative numbers
 * console.log(multiply(-3, 4)); // Output: -12
 * console.log(multiply(-3, -4)); // Output: 12
 * 
 * // Decimals
 * console.log(multiply(2.5, 4)); // Output: 10
 */
export function multiply(a, b) {
  return a * b;
}
