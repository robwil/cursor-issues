#!/usr/bin/env node

import { sum } from "./commands/sum.js";
import { subtract } from "./commands/subtract.js";

/**
 * Main calculator function that processes command line arguments
 * and outputs the results of sum and subtract operations
 */
function main() {
  // Get command line arguments (skip the first two which are node and script path)
  const args = process.argv.slice(2);

  // Check if we have exactly two arguments
  if (args.length !== 2) {
    console.error("Usage: node calculator.js <number1> <number2>");
    process.exit(1);
  }

  // Parse the arguments as numbers
  const num1 = parseFloat(args[0]);
  const num2 = parseFloat(args[1]);

  // Check if arguments are valid numbers
  if (isNaN(num1) || isNaN(num2)) {
    console.error("Error: Both arguments must be valid numbers");
    process.exit(1);
  }

  // Calculate and output results
  console.log(`Sum: ${num1} + ${num2} = ${sum(num1, num2)}`);
  console.log(`Subtract: ${num1} - ${num2} = ${subtract(num1, num2)}`);
}

// Run the main function
main();
