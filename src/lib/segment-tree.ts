type Merger<T> = (a: T, b: T) => T;
type DestructiveMerger<T> = (a: T, b: T) => void;

/**
 * **Segment Tree**
 * - update: O(log n)
 * - getRange: O(log n)
 */
export class SegmentTree<T> {
  static IndexOutOfRangeError = new Error('Index out of range');

  constructor(
    initial: T[],
    private zero: T,
    private merge: Merger<T>,
    private destructiveMerge?: DestructiveMerger<T>,
  ) {
    this.n = initial.length;
    this.tree = new Array(2 * this.n).fill(0);
    this.build(initial);
  }

  private n: number;
  private tree: T[];

  private calcValue(index: number) {
    return this.merge(this.tree[index * 2], this.tree[index * 2 + 1]);
  }

  private build(arr: T[]) {
    for (let i = 0; i < this.n; i++) {
      this.tree[this.n + i] = arr[i];
    }
    for (let i = this.n - 1; i > 0; --i) {
      this.tree[i] = this.calcValue(i);
    }
  }

  /**
   * update value at index
   * @param index
   * @param value
   */
  update(index: number, value: T) {
    index += this.n;
    this.tree[index] = value;
    while (index >= 1) {
      index = Math.floor(index / 2);
      this.tree[index] = this.calcValue(index);
    }
  }

  get(index: number): T {
    if (index < 0 || index >= this.n) throw SegmentTree.IndexOutOfRangeError;
    return this.tree[index + this.n];
  }

  /**
   * get merged value of range [left, right)
   * @param left
   * @param right
   * @returns
   */
  getRange(left: number, right: number): T {
    if (left < 0 || right > this.n || left > right) throw SegmentTree.IndexOutOfRangeError;
    if (left === right) return this.zero;

    let res = this.zero;

    const merge = (add: T) => {
      if (this.destructiveMerge) {
        this.destructiveMerge(res, add);
      } else {
        res = this.merge(res, add);
      }
    };

    for (left += this.n, right += this.n; left < right; left >>= 1, right >>= 1) {
      if (left & 1) merge(this.tree[left++]);
      if (right & 1) merge(this.tree[--right]);
    }

    return res;
  }
}
