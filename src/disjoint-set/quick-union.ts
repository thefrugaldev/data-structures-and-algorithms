import DisjointSet from "./DisjointSet";

class QuickUnion implements DisjointSet {
  disjointSet: number[];

  constructor(quantity: number) {
    this.disjointSet = [];

    for (let i = 0; i < quantity; i++) this.disjointSet[i] = i;
  }

  private root(valueToCheck: number) {
    while (this.disjointSet[valueToCheck] !== valueToCheck) {
      valueToCheck = this.disjointSet[valueToCheck];
    }

    return valueToCheck;
  }

  private isDirectChild(p: number, q: number) {
    return this.disjointSet[p] === q;
  }

  connected(p: number, q: number): boolean {
    if (this.isDirectChild(p, q)) return true;

    return this.root(p) === this.root(q);
  }

  union(p: number, q: number): void {
    const rootP = this.root(p);
    const rootQ = this.root(q);

    this.disjointSet[rootP] = rootQ;
  }
}

export default QuickUnion;
