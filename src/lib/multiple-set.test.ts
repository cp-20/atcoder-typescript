import { describe, expect, test } from 'bun:test';
import { MultipleSet } from './multiple-set';
import { bench, report } from './test-helper';
import { randomRange, range } from './utils/array';

describe('MultipleSet', () => {
  test('size', () => {
    const set = new MultipleSet([1, 2, 3, 3]);
    expect(set.size).toBe(3);
  });

  test('copy', () => {
    const set = new MultipleSet([1, 2, 3, 3]);
    const copy = set.copy();
    expect(copy.size).toBe(3);
    copy.add(4);
    expect(copy.size).toBe(4);
    expect(set.size).toBe(3);
    expect(set.has(4)).toBe(false);
  });

  test('has', () => {
    const set = new MultipleSet([1, 2, 3, 3]);
    expect(set.has(1)).toBe(true);
    expect(set.has(2)).toBe(true);
    expect(set.has(3)).toBe(true);
    expect(set.has(4)).toBe(false);
  });

  test('count', () => {
    const set = new MultipleSet([1, 2, 3, 3]);
    expect(set.count(1)).toBe(1);
    expect(set.count(2)).toBe(1);
    expect(set.count(3)).toBe(2);
    expect(set.count(4)).toBe(0);
  });

  test('add', () => {
    const set = new MultipleSet([1, 2, 3, 3]);
    set.add(4);
    expect(set.size).toBe(4);
    expect(set.has(4)).toBe(true);
    expect(set.count(4)).toBe(1);
    set.add(3);
    expect(set.size).toBe(4);
    expect(set.count(3)).toBe(3);
  });

  test('delete', () => {
    const set = new MultipleSet([1, 2, 3, 3]);
    set.delete(3);
    expect(set.size).toBe(3);
    expect(set.count(3)).toBe(1);
    set.delete(3);
    expect(set.size).toBe(2);
    expect(set.count(3)).toBe(0);
    set.delete(3);
    expect(set.size).toBe(2);
    expect(set.count(3)).toBe(0);
  });
});

describe.if(!!Bun.env.BENCH)('MultipleSet (perf)', () => {
  const cases = [1e2, 1e3, 1e4, 1e5, 2 * 1e5];

  test('copy', () => {
    const result = cases.map((size) => {
      const set = new MultipleSet<number>(range(size));
      const time = bench(() => {
        set.copy();
      });
      return { size, time };
    });
    report(result);
  });

  test('has', () => {
    const result = cases.map((count) => {
      const set = new MultipleSet<number>(range(count));
      const has = randomRange(0, count, count);
      const time = bench(() => {
        for (let i = 0; i < count; i++) {
          set.has(has[i]);
        }
      });
      return { count, time };
    });
    report(result);
  });

  test('count', () => {
    const result = cases.map((count) => {
      const set = new MultipleSet<number>(range(count));
      const counts = randomRange(0, count, count);
      const time = bench(() => {
        for (let i = 0; i < count; i++) {
          set.count(counts[i]);
        }
      });
      return { count, time };
    });
    report(result);
  });

  test('add', () => {
    const result = cases.map((count) => {
      const set = new MultipleSet<number>([]);
      const adds = randomRange(0, count, count);
      const time = bench(() => {
        for (let i = 0; i < count; i++) {
          set.add(adds[i]);
        }
      });
      return { count, time };
    });
    report(result);
  });

  test('delete', () => {
    const result = cases.map((count) => {
      const set = new MultipleSet<number>(range(count));
      const deletes = randomRange(0, count, count);
      const time = bench(() => {
        for (let i = 0; i < count; i++) {
          set.delete(deletes[i]);
        }
      });
      return { count, time };
    });
    report(result);
  });

  test('concat', () => {
    const result = cases.flatMap((size) => {
      const set1 = new MultipleSet<number>(randomRange(0, size, size));
      const set2 = new MultipleSet<number>(randomRange(0, size, size));
      const time = bench(() => {
        set1.concat(set2);
      });
      return { size, time };
    });
    report(result);
  });

  test('merge', () => {
    const result = cases.flatMap((size) => {
      const set1 = new MultipleSet<number>(randomRange(0, size, size));
      const set2 = new MultipleSet<number>(randomRange(0, size, size));
      const time = bench(() => {
        set1.merge(set2);
      });
      return { size, time };
    });
    report(result);
  });
});
