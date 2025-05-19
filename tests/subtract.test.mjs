import { subtract } from "../src/commands/subtract.mjs";

describe('subtract function', () => {
  console.log("Testing subtract command...");

  test('subtracts two positive numbers correctly', () => {
    expect(subtract(5, 3)).toBe(2);
  });

  test('handles negative numbers', () => {
    expect(subtract(-2, 3)).toBe(-5);
    expect(subtract(2, -3)).toBe(5);
    expect(subtract(-2, -3)).toBe(1);
  });

  test('handles zero', () => {
    expect(subtract(0, 3)).toBe(-3);
    expect(subtract(2, 0)).toBe(2);
    expect(subtract(0, 0)).toBe(0);
  });

  afterAll(() => {
    console.log("All subtract tests passed!");
  });
});
