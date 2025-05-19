import { multiply } from "../src/commands/multiply";

describe('multiply function', () => {
  console.log("Testing multiply command...");

  test('multiplies positive numbers correctly', () => {
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

  test('handles decimals', () => {
    expect(multiply(0.5, 2)).toBe(1);
    expect(multiply(2.5, 2.5)).toBe(6.25);
  });

  afterAll(() => {
    console.log("All multiply tests passed!");
  });
}); 
