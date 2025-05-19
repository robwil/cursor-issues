/**
 * Divides the first number by the second number and returns the result
 * @param a - Dividend
 * @param b - Divisor
 * @returns Result of a divided by b
 * @throws Error if b is zero
 */
export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
} 
