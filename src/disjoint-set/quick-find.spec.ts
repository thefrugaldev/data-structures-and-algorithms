import QuickFind from "./quick-find";

describe("QuickFind", () => {
  describe("Find", () => {
    it("New instance should return false", () => {
      const quickFind = new QuickFind(10);

      expect(quickFind.find(1, 3)).toBe(false);
    });

    it("Same values should return true", () => {
      const quickFind = new QuickFind(10);

      quickFind.disjointSet[1] = 3;

      expect(quickFind.find(1, 3)).toBe(true);
    });
  });

  describe("Union", () => {
    it("Union should set first value equal to second value", () => {
      const quickFind = new QuickFind(10);

      quickFind.union(4, 3);

      expect(quickFind.disjointSet[4]).toEqual(quickFind.disjointSet[3]);
      expect(quickFind.disjointSet[4]).toBe(3);
    });

    it("Union should update all existing connected values", () => {
      const quickFind = new QuickFind(10);

      quickFind.union(4, 5);
      quickFind.union(4, 6);
      quickFind.union(5, 3);

      expect(quickFind.disjointSet[5]).toEqual(quickFind.disjointSet[3]);

      expect(quickFind.disjointSet[4]).toBe(3);
      expect(quickFind.disjointSet[5]).toBe(3);
    });
  });
});
