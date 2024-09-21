import { describe, expect, test } from 'bun:test';
import { listPermutations } from './itertools';

describe('itertools', () => {
  test('listPermutations', () => {
    const elements = [1, 2, 3];
    expect(listPermutations(elements)).toEqual([
      [1, 2, 3],
      [2, 1, 3],
      [2, 3, 1],
      [1, 3, 2],
      [3, 1, 2],
      [3, 2, 1],
    ]);
  });
});
