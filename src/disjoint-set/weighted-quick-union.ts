import DisjointSet from "./DisjointSet";

class WeightedQuickUnion implements DisjointSet {
  disjointSet: number[];
  size: number[];

  constructor(quantity: number) {
    this.disjointSet = [];
    this.size = [];

    for (let i = 0; i < quantity; i++) {
      this.disjointSet[i] = i;
      this.size[i] = 1;
    }
  }

  private root(valueToCheck: number): number {
    while (this.disjointSet[valueToCheck] !== valueToCheck) {
      valueToCheck = this.disjointSet[valueToCheck];
    }

    return valueToCheck;
  }

  private isDirectChild(p: number, q: number): boolean {
    return this.disjointSet[p] === this.disjointSet[q];
  }

  connected(p: number, q: number): boolean {
    if (this.isDirectChild(p, q)) return true;

    return this.root(p) === this.root(q);
  }

  union(p: number, q: number): void {
    const rootP = this.root(p);
    const rootQ = this.root(q);

    if (rootP === rootQ) return;

    if (this.size[rootP] <= this.size[rootQ]) {
      this.disjointSet[rootP] = rootQ;
      this.size[rootQ] += this.size[rootP];
    } else {
      this.disjointSet[rootQ] = rootP;
      this.size[rootP] += this.size[rootQ];
    }
  }
}

export default WeightedQuickUnion;
