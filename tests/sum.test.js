import { sum } from "../src/commands/sum.js";

describe("sum command", () => {
  test("adds two positive numbers correctly", () => {
    expect(sum(2, 3)).toBe(5);
  });

  test("handles negative numbers", () => {
    expect(sum(-2, 3)).toBe(1);
    expect(sum(2, -3)).toBe(-1);
    expect(sum(-2, -3)).toBe(-5);
  });

  test("handles zero", () => {
    expect(sum(0, 3)).toBe(3);
    expect(sum(2, 0)).toBe(2);
    expect(sum(0, 0)).toBe(0);
  });
});
