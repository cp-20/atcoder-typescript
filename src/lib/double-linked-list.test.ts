import { describe, expect, test } from 'bun:test';
import { DoubleLinkedList } from './double-linked-list';

describe('DoubleLinkedList', () => {
  const indexOutOfRangeError = DoubleLinkedList.IndexOutOfRangeError;
  test('toArray', () => {
    const list = new DoubleLinkedList([1, 2, 3, 4, 5]);
    expect(list.toArray()).toEqual([1, 2, 3, 4, 5]);
  });

  test('getNodeFromHead', () => {
    const list = new DoubleLinkedList([1, 2, 3, 4, 5]);
    expect(() => list.getNodeFromHead(-1)).toThrow(indexOutOfRangeError);
    expect(list.getNodeFromHead(0)).toBe(1);
    expect(list.getNodeFromHead(1)).toBe(2);
    expect(list.getNodeFromHead(2)).toBe(3);
    expect(list.getNodeFromHead(3)).toBe(4);
    expect(list.getNodeFromHead(4)).toBe(5);
    expect(() => list.getNodeFromHead(5)).toThrow(indexOutOfRangeError);
  });

  test('getNodesFromHead', () => {
    const list = new DoubleLinkedList([1, 2, 3, 4, 5]);
    expect(() => list.getNodesFromHead(-1, 0)).toThrow(indexOutOfRangeError);
    expect(list.getNodesFromHead(0, 0)).toEqual([1]);
    expect(list.getNodesFromHead(0, 1)).toEqual([1, 2]);
    expect(list.getNodesFromHead(1, 2)).toEqual([2, 3]);
    expect(list.getNodesFromHead(1, 3)).toEqual([2, 3, 4]);
    expect(list.getNodesFromHead(2, 4)).toEqual([3, 4, 5]);
    expect(() => list.getNodesFromHead(0, 5)).toThrow(indexOutOfRangeError);
  });

  test('getNodeFromTail', () => {
    const list = new DoubleLinkedList([1, 2, 3, 4, 5]);
    expect(() => list.getNodeFromTail(-1)).toThrow(indexOutOfRangeError);
    expect(list.getNodeFromTail(0)).toBe(5);
    expect(list.getNodeFromTail(1)).toBe(4);
    expect(list.getNodeFromTail(2)).toBe(3);
    expect(list.getNodeFromTail(3)).toBe(2);
    expect(list.getNodeFromTail(4)).toBe(1);
    expect(() => list.getNodeFromTail(5)).toThrow(indexOutOfRangeError);
  });

  test('getNodesFromTail', () => {
    const list = new DoubleLinkedList([1, 2, 3, 4, 5]);
    expect(() => list.getNodesFromTail(-1, 0)).toThrow(indexOutOfRangeError);
    expect(list.getNodesFromTail(0, 0)).toEqual([5]);
    expect(list.getNodesFromTail(0, 1)).toEqual([5, 4]);
    expect(list.getNodesFromTail(1, 2)).toEqual([4, 3]);
    expect(list.getNodesFromTail(1, 3)).toEqual([4, 3, 2]);
    expect(list.getNodesFromTail(2, 4)).toEqual([3, 2, 1]);
    expect(() => list.getNodesFromTail(0, 5)).toThrow(indexOutOfRangeError);
  });

  test('getNode', () => {
    const list = new DoubleLinkedList([1, 2, 3, 4, 5]);
    expect(() => list.getNode(-1)).toThrow(indexOutOfRangeError);
    expect(list.getNode(0)).toBe(1);
    expect(list.getNode(1)).toBe(2);
    expect(list.getNode(2)).toBe(3);
    expect(list.getNode(3)).toBe(4);
    expect(list.getNode(4)).toBe(5);
    expect(() => list.getNode(5)).toThrow(indexOutOfRangeError);
  });

  test('getNodes', () => {
    const list = new DoubleLinkedList([1, 2, 3, 4, 5]);
    expect(() => list.getNodes(-1, 0)).toThrow(indexOutOfRangeError);
    expect(list.getNodes(0, 0)).toEqual([1]);
    expect(list.getNodes(0, 1)).toEqual([1, 2]);
    expect(list.getNodes(1, 2)).toEqual([2, 3]);
    expect(list.getNodes(1, 3)).toEqual([2, 3, 4]);
    expect(list.getNodes(2, 4)).toEqual([3, 4, 5]);
    expect(() => list.getNodes(0, 5)).toThrow(indexOutOfRangeError);
  });

  test('insertHead', () => {
    const list = new DoubleLinkedList([1]);
    list.insertHead(2);
    expect(list.toArray()).toEqual([2, 1]);

    const list2 = new DoubleLinkedList<number>([]);
    list2.insertHead(1);
    expect(list2.toArray()).toEqual([1]);
  });

  test('insertTail', () => {
    const list = new DoubleLinkedList([1]);
    list.insertTail(2);
    expect(list.toArray()).toEqual([1, 2]);

    const list2 = new DoubleLinkedList<number>([]);
    list2.insertTail(1);
    expect(list2.toArray()).toEqual([1]);
  });

  test('deleteHead', () => {
    const list = new DoubleLinkedList([1, 2, 3]);
    list.deleteHead();
    expect(list.toArray()).toEqual([2, 3]);
    list.deleteHead();
    expect(list.toArray()).toEqual([3]);
    list.deleteHead();
    expect(list.toArray()).toEqual([]);
    list.deleteHead();
    expect(list.toArray()).toEqual([]);
  });

  test('deleteTail', () => {
    const list = new DoubleLinkedList([1, 2, 3]);
    list.deleteTail();
    expect(list.toArray()).toEqual([1, 2]);
    list.deleteTail();
    expect(list.toArray()).toEqual([1]);
    list.deleteTail();
    expect(list.toArray()).toEqual([]);
    list.deleteTail();
    expect(list.toArray()).toEqual([]);
  });

  test('reverse', () => {
    const list = new DoubleLinkedList([1, 2, 3, 4, 5]);
    list.reverse();
    expect(list.toArray()).toEqual([5, 4, 3, 2, 1]);
  });
});
