export class MultipleSet<T> {
  private set: Set<T>;
  private map: Map<T, number>;

  public get size() {
    return this.set.size;
  }

  constructor(initial: T[]) {
    this.set = new Set<T>(initial);
    this.map = this.countArray(initial);
  }

  private countArray(arr: T[]) {
    const result = new Map<T, number>();
    for (let i = 0; i < arr.length; i++) {
      result.set(arr[i], (result.get(arr[i]) ?? 0) + 1);
    }
    return result;
  }

  copy() {
    const newSet = new MultipleSet([...this.set]);
    newSet.map = new Map(this.map);
    return newSet;
  }

  has(x: T) {
    return this.set.has(x);
  }

  count(x: T) {
    return this.map.get(x) ?? 0;
  }

  add(x: T) {
    this.set.add(x);
    this.map.set(x, (this.map.get(x) ?? 0) + 1);
  }

  delete(x: T) {
    if (!this.set.has(x)) return;
    const prev = this.map.get(x)!;
    this.map.set(x, prev - 1);
    if (prev === 1) this.set.delete(x);
  }

  subtract(other: MultipleSet<T>) {
    const newSet = new MultipleSet([...this.set]);
    for (const [k, v] of other.map) {
      const prev = this.map.get(k);
      if (prev === undefined) continue;
      const next = prev - v;
      if (next <= 0) {
        newSet.map.delete(k);
        newSet.set.delete(k);
      } else {
        newSet.map.set(k, next);
      }
    }
    return newSet;
  }

  concat(...others: MultipleSet<T>[]) {
    const all = [this, ...others];
    const newSet = new MultipleSet([...all.flatMap((x) => [...x.set])]);

    for (const v of newSet.set) {
      newSet.map.set(
        v,
        all.reduce((acc, x) => acc + x.count(v), 0),
      );
    }

    return newSet;
  }

  merge(other: MultipleSet<T>) {
    this.set = new Set([...this.set, ...other.set]);
    for (const [k, v] of other.map) {
      this.map.set(k, (this.map.get(k) ?? 0) + v);
    }
  }

  entries() {
    return this.map.entries();
  }
}
