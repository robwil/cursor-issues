import { divide } from "../src/commands/divide.mjs";

describe('divide function', () => {
  console.log("Testing divide function...");

  test('divides two positive numbers correctly', () => {
    expect(divide(6, 3)).toBe(2);
    expect(divide(5, 2)).toBe(2.5);
  });

  test('handles negative numbers', () => {
    expect(divide(-6, 3)).toBe(-2);
    expect(divide(6, -3)).toBe(-2);
    expect(divide(-6, -3)).toBe(2);
  });

  test('handles zero as dividend', () => {
    expect(divide(0, 3)).toBe(0);
  });

  test('throws error when dividing by zero', () => {
    expect(() => {
      divide(5, 0);
    }).toThrow("Cannot divide by zero");
  });

  test('returns valid decimal results', () => {
    expect(divide(1, 3)).toBeCloseTo(0.3333, 4);
    expect(divide(2, 3)).toBeCloseTo(0.6667, 4);
  });

  afterAll(() => {
    console.log("All divide tests passed!");
  });
});
