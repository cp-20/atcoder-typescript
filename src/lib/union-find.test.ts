import { UnionFind } from './union-find';
import { describe, expect, test } from 'bun:test';

describe('UnionFind', () => {
  test('should work', () => {
    const uf = new UnionFind(5);
    expect(uf.find(0)).toBe(0);
    expect(uf.find(1)).toBe(1);
    expect(uf.find(2)).toBe(2);
    expect(uf.find(3)).toBe(3);
    expect(uf.find(4)).toBe(4);

    uf.unite(0, 1);
    expect(uf.find(0)).toBe(0);
    expect(uf.find(1)).toBe(0);

    uf.unite(2, 3);
    expect(uf.find(2)).toBe(2);
    expect(uf.find(3)).toBe(2);

    uf.unite(0, 2);
    expect(uf.find(0)).toBe(0);
    expect(uf.find(1)).toBe(0);
    expect(uf.find(2)).toBe(0);
    expect(uf.find(3)).toBe(0);
  });
});
