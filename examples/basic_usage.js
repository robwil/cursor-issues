/**
 * Basic usage example for the calculator
 * 
 * Run with: node examples/basic_usage.js
 */

// Import the calculator functions
import { sum, subtract, multiply, divide } from '../src/commands/index.mjs';

// Define some numbers to work with
const num1 = 10;
const num2 = 5;

// Perform calculations
console.log(`Sum: ${num1} + ${num2} = ${sum(num1, num2)}`);
console.log(`Subtract: ${num1} - ${num2} = ${subtract(num1, num2)}`);
console.log(`Multiply: ${num1} * ${num2} = ${multiply(num1, num2)}`);
console.log(`Divide: ${num1} / ${num2} = ${divide(num1, num2)}`);

// Example with different numbers
const a = 24;
const b = 6;
console.log(`\nUsing different numbers (${a} and ${b}):`);
console.log(`Sum: ${a} + ${b} = ${sum(a, b)}`);
console.log(`Subtract: ${a} - ${b} = ${subtract(a, b)}`);
console.log(`Multiply: ${a} * ${b} = ${multiply(a, b)}`);
console.log(`Divide: ${a} / ${b} = ${divide(a, b)}`); 
