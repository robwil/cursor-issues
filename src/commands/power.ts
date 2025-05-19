import BigNumber from 'bignumber.js';

/**
 * Raises the first number to the power of the second number and returns the result
 * Uses BigNumber to handle large numbers accurately
 * @param base - Base number
 * @param exponent - Exponent
 * @returns Result of base raised to the power of exponent
 */
export function power(base: number, exponent: number): number {
  // Use BigNumber for calculation to handle large numbers
  const baseAsBig = new BigNumber(base);
  const result = baseAsBig.exponentiatedBy(exponent);
  
  // Convert back to number for compatibility with the rest of the calculator
  // Note: This will lose precision for very large numbers
  return result.toNumber();
} 
