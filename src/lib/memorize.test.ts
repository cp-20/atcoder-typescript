import { describe, expect, test, mock } from 'bun:test';
import { memorize } from './memorize';

describe('memorize', () => {
  test('1 args', () => {
    const fn = mock((n: number) => n + 1);
    const memoizedFn = memorize(fn);
    expect(memoizedFn(1)).toBe(2);
    expect(fn).toHaveBeenCalledWith(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(memoizedFn(1)).toBe(2);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('2 args', () => {
    const fn = mock((n: number, m: number) => n + m);
    const memoizedFn = memorize(fn);
    expect(memoizedFn(1, 2)).toBe(3);
    expect(fn).toHaveBeenCalledWith(1, 2);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(memoizedFn(1, 2)).toBe(3);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('many args', () => {
    const fn = mock((...args: number[]) => args.reduce((p, c) => p + c, 0));
    const memoizedFn = memorize(fn);
    expect(memoizedFn(1, 2, 3, 4, 5)).toBe(15);
    expect(fn).toHaveBeenCalledWith(1, 2, 3, 4, 5);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(memoizedFn(1, 2, 3, 4, 5)).toBe(15);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
