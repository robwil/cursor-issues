import { power } from "../src/commands/power";

describe('power function', () => {
  console.log("Testing power command...");

  test('calculates positive base with positive exponent correctly', () => {
    expect(power(2, 3)).toBe(8);
    expect(power(5, 2)).toBe(25);
  });

  test('calculates with exponent 0', () => {
    expect(power(5, 0)).toBe(1);
    expect(power(0, 0)).toBe(1);
    expect(power(-5, 0)).toBe(1);
  });

  test('calculates with exponent 1', () => {
    expect(power(5, 1)).toBe(5);
    expect(power(-5, 1)).toBe(-5);
  });

  test('calculates with negative base', () => {
    expect(power(-2, 2)).toBe(4);
    expect(power(-2, 3)).toBe(-8);
  });

  test('calculates with negative exponent', () => {
    expect(power(2, -1)).toBe(0.5);
    expect(power(2, -2)).toBe(0.25);
  });

  afterAll(() => {
    console.log("All power tests passed!");
  });
}); 
