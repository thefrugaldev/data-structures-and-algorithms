import DisjointSet from "./DisjointSet";

class QuickFind implements DisjointSet {
  disjointSet: number[];

  constructor(quantity: number) {
    this.disjointSet = [];

    for (let i = 0; i < quantity; i++) this.disjointSet[i] = i;
  }

  connected = (p: number, q: number): boolean => {
    return this.disjointSet[p] === this.disjointSet[q];
  };

  union = (p: number, q: number): void => {
    const pid = this.disjointSet[p];
    const qid = this.disjointSet[q];

    this.disjointSet.forEach((value, index) => {
      if (value === pid) {
        this.disjointSet[index] = qid;
      }
    });
  };
}

export default QuickFind;
