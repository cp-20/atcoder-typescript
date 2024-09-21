export class CumulativeSum<T> {
  private sum: T[];
  constructor(
    arr: T[],
    zero: T,
    add: (a: T, b: T) => T,
    private sub: (a: T, b: T) => T,
  ) {
    this.sum = new Array(arr.length + 1).fill(zero);
    for (let i = 0; i < arr.length; i++) {
      this.sum[i + 1] = add(this.sum[i], arr[i]);
    }
  }

  /**
   * get sum of range [left, right)
   * @param left
   * @param right
   * @returns
   */
  getRange(left: number, right: number): T {
    return this.sub(this.sum[right], this.sum[left]);
  }
}
