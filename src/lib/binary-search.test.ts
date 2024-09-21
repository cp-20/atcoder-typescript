import { describe, expect, test } from 'bun:test';
import { lowerBoundNumber, upperBoundNumber } from './binary-search';

describe('BinarySearch', () => {
  test('lowerBoundNumber', () => {
    const arr = [1, 2, 2, 3, 4, 6, 8, 8, 10, 10];
    expect(lowerBoundNumber(arr, 0)).toBe(0);
    expect(lowerBoundNumber(arr, 1)).toBe(0);
    expect(lowerBoundNumber(arr, 2)).toBe(1);
    expect(lowerBoundNumber(arr, 5)).toBe(5);
    expect(lowerBoundNumber(arr, 8)).toBe(6);
    expect(lowerBoundNumber(arr, 9)).toBe(8);
    expect(lowerBoundNumber(arr, 10)).toBe(8);
    expect(lowerBoundNumber(arr, 11)).toBe(10);
  });

  test('upperBoundNumber', () => {
    const arr = [1, 2, 2, 3, 4, 6, 8, 8, 10, 10];
    expect(upperBoundNumber(arr, 0)).toBe(0);
    expect(upperBoundNumber(arr, 1)).toBe(1);
    expect(upperBoundNumber(arr, 2)).toBe(3);
    expect(upperBoundNumber(arr, 5)).toBe(5);
    expect(upperBoundNumber(arr, 8)).toBe(8);
    expect(upperBoundNumber(arr, 9)).toBe(8);
    expect(upperBoundNumber(arr, 10)).toBe(10);
    expect(upperBoundNumber(arr, 11)).toBe(10);
  });
});
