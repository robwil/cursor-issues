/**
 * Divides the first number by the second number and returns the result
 * 
 * @param {number} a - Dividend (number being divided)
 * @param {number} b - Divisor (number to divide by)
 * @returns {number} - Result of a divided by b
 * @throws {Error} - Throws an error if attempting to divide by zero
 * 
 * @example
 * import { divide } from './commands/divide.mjs';
 * 
 * // Basic usage
 * const result = divide(10, 2);
 * console.log(result); // Output: 5
 * 
 * // Decimal result
 * console.log(divide(10, 3)); // Output: 3.3333333333333335
 * 
 * // Error handling for division by zero
 * try {
 *   divide(10, 0);
 * } catch (error) {
 *   console.error(error.message); // Output: "Division by zero is not allowed"
 * }
 * 
 * // Negative numbers
 * console.log(divide(-10, 2)); // Output: -5
 * console.log(divide(10, -2)); // Output: -5
 * console.log(divide(-10, -2)); // Output: 5
 */
export function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}
