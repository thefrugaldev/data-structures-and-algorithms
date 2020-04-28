export default interface DisjointSet {
  find(p: number, q: number): boolean;
  union(p: number, q: number): void;
}
