import { divide } from "../src/commands/divide.js";

describe("divide function", () => {
  test("divides positive numbers correctly", () => {
    expect(divide(10, 2)).toBe(5);
    expect(divide(15, 3)).toBe(5);
  });

  test("divides negative numbers correctly", () => {
    expect(divide(-10, 2)).toBe(-5);
    expect(divide(10, -2)).toBe(-5);
    expect(divide(-10, -2)).toBe(5);
  });

  test("divides decimal numbers correctly", () => {
    expect(divide(5.5, 2)).toBe(2.75);
    expect(divide(10, 4)).toBe(2.5);
  });

  test("throws error when dividing by zero", () => {
    expect(() => divide(10, 0)).toThrow("Division by zero is not allowed");
  });
});
