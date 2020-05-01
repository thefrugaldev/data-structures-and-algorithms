export default interface DisjointSet {
  connected(p: number, q: number): boolean;
  union(p: number, q: number): void;
}
