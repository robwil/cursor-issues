import { divide } from "../src/commands/divide";

describe('divide function', () => {
  test('divides positive numbers correctly', () => {
    expect(divide(6, 3)).toBe(2);
  });

  test('handles negative numbers', () => {
    expect(divide(-6, 3)).toBe(-2);
    expect(divide(6, -3)).toBe(-2);
    expect(divide(-6, -3)).toBe(2);
  });

  test('handles dividing by 1', () => {
    expect(divide(5, 1)).toBe(5);
    expect(divide(-5, 1)).toBe(-5);
  });

  test('handles decimals', () => {
    expect(divide(1, 2)).toBe(0.5);
    expect(divide(2.5, 0.5)).toBe(5);
  });

  test('handles dividing 0 by a number', () => {
    expect(divide(0, 5)).toBe(0);
    expect(divide(0, -5)).toBe(-0);
  });

  test('throws error when dividing by zero', () => {
    expect(() => {
      divide(5, 0);
    }).toThrow("Cannot divide by zero");
  });
}); 
