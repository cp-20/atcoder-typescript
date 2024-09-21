import { describe, expect, test } from 'bun:test';
import { CumulativeSum } from './cumulative-sum';

describe('CumulativeSum', () => {
  test('getRange', () => {
    const sum = new CumulativeSum(
      [1, 2, 3, 4],
      0,
      (a, b) => a + b,
      (a, b) => a - b,
    );

    expect(sum.getRange(0, 4)).toBe(10);
    expect(sum.getRange(1, 4)).toBe(9);
    expect(sum.getRange(0, 3)).toBe(6);
    expect(sum.getRange(1, 3)).toBe(5);
    expect(sum.getRange(2, 3)).toBe(3);
    expect(sum.getRange(2, 2)).toBe(0);
  });
});
