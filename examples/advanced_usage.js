/**
 * Advanced usage example for the calculator
 * Shows error handling and function chaining
 * 
 * Run with: node examples/advanced_usage.js
 */

import { sum, subtract, multiply, divide } from '../src/commands/index.mjs';

// Function to perform multiple operations in sequence
function calculateComplex(a, b) {
  try {
    // Chain operations: ((a + b) * 2) / b
    const result1 = sum(a, b);
    const result2 = multiply(result1, 2);
    const result3 = divide(result2, b);
    
    console.log(`Complex calculation: ((${a} + ${b}) * 2) / ${b} = ${result3}`);
    return result3;
  } catch (error) {
    console.error(`Error in calculation: ${error.message}`);
    return null;
  }
}

// Normal case
console.log("Example 1: Normal calculation");
calculateComplex(10, 5);

// Edge case with potential division by zero
console.log("\nExample 2: Handling division by zero");
calculateComplex(10, 0);

// Example with negative numbers
console.log("\nExample 3: Using negative numbers");
calculateComplex(-5, 2);

// Example with decimal numbers
console.log("\nExample 4: Using decimal numbers");
calculateComplex(3.5, 1.5); 
