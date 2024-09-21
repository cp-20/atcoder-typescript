import { describe, expect, test } from 'bun:test';
import { SegmentTree } from './segment-tree';
import { randomRange, range } from './utils/array';
import { bench, report } from './test-helper';

describe('SegmentTree', () => {
  test('get', () => {
    const tree = new SegmentTree([1, 2, 3], 0, (a: number, b: number) => a + b);
    expect(() => tree.get(-1)).toThrow(SegmentTree.IndexOutOfRangeError);
    expect(tree.get(0)).toBe(1);
    expect(tree.get(1)).toBe(2);
    expect(tree.get(2)).toBe(3);
    expect(() => tree.get(4)).toThrow(SegmentTree.IndexOutOfRangeError);
  });

  test('get range sum', () => {
    const tree = new SegmentTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 0, (a: number, b: number) => a + b);

    expect(tree.getRange(0, 1)).toBe(1);
    expect(tree.getRange(0, 2)).toBe(3);
    expect(tree.getRange(1, 3)).toBe(5);
    expect(tree.getRange(2, 3)).toBe(3);
    expect(tree.getRange(5, 5)).toBe(0);
    expect(tree.getRange(0, 10)).toBe(55);
  });

  test('get range min', () => {
    const tree = new SegmentTree([2, 5, 3, 4, 1, 6, 8, 7, 9, 10], Infinity, (a: number, b: number) => Math.min(a, b));

    expect(tree.getRange(0, 1)).toBe(2);
    expect(tree.getRange(0, 2)).toBe(2);
    expect(tree.getRange(1, 3)).toBe(3);
    expect(tree.getRange(2, 3)).toBe(3);
    expect(tree.getRange(5, 5)).toBe(Infinity);
    expect(tree.getRange(6, 10)).toBe(7);
  });

  test('get range max', () => {
    const tree = new SegmentTree([2, 5, 3, 4, 1, 6, 8, 7, 9, 10], -Infinity, (a: number, b: number) => Math.max(a, b));

    expect(tree.getRange(0, 1)).toBe(2);
    expect(tree.getRange(0, 2)).toBe(5);
    expect(tree.getRange(1, 3)).toBe(5);
    expect(tree.getRange(2, 3)).toBe(3);
    expect(tree.getRange(5, 5)).toBe(-Infinity);
    expect(tree.getRange(6, 10)).toBe(10);
  });

  test('update', () => {
    const tree = new SegmentTree([1, 2, 3], 0, (a: number, b: number) => a + b);
    tree.update(1, 5);
    expect(tree.getRange(0, 3)).toBe(9);
    tree.update(2, 10);
    expect(tree.getRange(0, 3)).toBe(16);
  });
});

describe.if(!!Bun.env.BENCH)('SegmentTree (perf)', () => {
  const cases = [1e2, 1e3, 1e4, 1e5, 2 * 1e5];

  test('getRange', () => {
    const result = cases.flatMap((size) => {
      const tree = new SegmentTree(range(size), 0, (a: number, b: number) => a + b);

      return cases.map((count) => {
        const ranges = [randomRange(0, size, count), randomRange(0, size, count)];
        for (let i = 0; i < count; i++) {
          if (ranges[0][i] > ranges[1][i]) {
            [ranges[0][i], ranges[1][i]] = [ranges[1][i], ranges[0][i]];
          }
        }
        const time = bench(() => {
          for (let i = 0; i < count; i++) {
            tree.getRange(ranges[0][i], ranges[1][i]);
          }
        });

        return { size, count, time };
      });
    });

    report(result);
  });

  test('update', () => {
    const result = cases.flatMap((size) => {
      const tree = new SegmentTree(range(size), 0, (a: number, b: number) => a + b);

      return cases.map((count) => {
        const updates = [randomRange(0, size, count), randomRange(0, size, count)];
        const time = bench(() => {
          for (let i = 0; i < count; i++) {
            tree.update(updates[0][i], updates[1][i]);
          }
        });

        return { size, count, time };
      });
    });

    report(result);
  });
});
