import { multiply } from "../src/commands/multiply.mjs";

describe('multiply function', () => {
  console.log("Testing multiply command...");

  test('multiplies two positive numbers correctly', () => {
    expect(multiply(2, 3)).toBe(6);
  });

  test('handles negative numbers', () => {
    expect(multiply(-2, 3)).toBe(-6);
    expect(multiply(2, -3)).toBe(-6);
    expect(multiply(-2, -3)).toBe(6);
  });

  test('handles zero', () => {
    expect(multiply(0, 3)).toBe(0);
    expect(multiply(2, 0)).toBe(0);
    expect(multiply(0, 0)).toBe(0);
  });

  test('handles large numbers', () => {
    expect(multiply(1000, 1000)).toBe(1000000);
  });

  afterAll(() => {
    console.log("All multiply tests passed!");
  });
});
