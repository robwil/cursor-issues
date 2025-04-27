import { strict as assert } from "assert";
import { sum } from "../src/commands/sum.mjs";

console.log("Testing sum command...");

// Test: adds two positive numbers correctly
assert.equal(sum(2, 3), 5, "should add positive numbers correctly");

// Test: handles negative numbers
assert.equal(sum(-2, 3), 1, "should handle negative and positive numbers");
assert.equal(sum(2, -3), -1, "should handle positive and negative numbers");
assert.equal(sum(-2, -3), -5, "should handle negative numbers");

// Test: handles zero
assert.equal(sum(0, 3), 3, "should handle zero and positive numbers");
assert.equal(sum(2, 0), 2, "should handle positive and zero numbers");
assert.equal(sum(0, 0), 0, "should handle zeros");

console.log("All sum tests passed!");
