import { strict as assert } from "assert";
import { multiply } from "../src/commands/multiply.mjs";

console.log("Testing multiply command...");

// Test: multiplies two positive numbers correctly
assert.equal(multiply(2, 3), 6, "should multiply positive numbers correctly");

// Test: handles negative numbers
assert.equal(
  multiply(-2, 3),
  -6,
  "should handle negative and positive numbers"
);
assert.equal(
  multiply(2, -3),
  -6,
  "should handle positive and negative numbers"
);
assert.equal(multiply(-2, -3), 6, "should handle negative numbers");

// Test: handles zero
assert.equal(multiply(0, 3), 0, "should handle zero and positive numbers");
assert.equal(multiply(2, 0), 0, "should handle positive and zero numbers");
assert.equal(multiply(0, 0), 0, "should handle zeros");

console.log("All multiply tests passed!");
