import { strict as assert } from "assert";
import { divide } from "../src/commands/divide.mjs";

console.log("Testing divide function...");

// Test: divides positive numbers correctly
assert.equal(divide(10, 2), 5, "should divide positive numbers correctly");
assert.equal(divide(15, 3), 5, "should divide positive numbers correctly");

// Test: divides negative numbers correctly
assert.equal(divide(-10, 2), -5, "should handle negative dividend");
assert.equal(divide(10, -2), -5, "should handle negative divisor");
assert.equal(divide(-10, -2), 5, "should handle negative dividend and divisor");

// Test: divides decimal numbers correctly
assert.equal(divide(5.5, 2), 2.75, "should handle decimal dividend");
assert.equal(
  divide(10, 4),
  2.5,
  "should handle division resulting in decimals"
);

// Test: throws error when dividing by zero
try {
  divide(10, 0);
  // If we get here, the test failed because no error was thrown
  assert.fail("Expected an error to be thrown when dividing by zero");
} catch (error) {
  assert.equal(
    error.message,
    "Division by zero is not allowed",
    "should throw the correct error message"
  );
}

console.log("All divide tests passed!");
