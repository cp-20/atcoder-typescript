export class UnionFind {
  parent: number[];
  rank: number[];

  constructor(n: number) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }

  find(u: number): number {
    if (this.parent[u] !== u) {
      this.parent[u] = this.find(this.parent[u]);
    }
    return this.parent[u];
  }

  unite(u: number, v: number): boolean {
    const rootU = this.find(u);
    const rootV = this.find(v);

    if (rootU !== rootV) {
      if (this.rank[rootU] > this.rank[rootV]) {
        this.parent[rootV] = rootU;
      } else if (this.rank[rootU] < this.rank[rootV]) {
        this.parent[rootU] = rootV;
      } else {
        this.parent[rootV] = rootU;
        this.rank[rootU]++;
      }
      return true;
    }
    return false;
  }
}
