import { strict as assert } from "assert";
import { subtract } from "../src/commands/subtract.mjs";

console.log("Testing subtract command...");

// Test: subtracts two positive numbers correctly
assert.equal(subtract(5, 3), 2, "should subtract positive numbers correctly");

// Test: handles negative numbers
assert.equal(
  subtract(-2, 3),
  -5,
  "should handle negative and positive numbers"
);
assert.equal(subtract(2, -3), 5, "should handle positive and negative numbers");
assert.equal(subtract(-2, -3), 1, "should handle negative numbers");

// Test: handles zero
assert.equal(subtract(0, 3), -3, "should handle zero and positive numbers");
assert.equal(subtract(2, 0), 2, "should handle positive and zero numbers");
assert.equal(subtract(0, 0), 0, "should handle zeros");

console.log("All subtract tests passed!");
