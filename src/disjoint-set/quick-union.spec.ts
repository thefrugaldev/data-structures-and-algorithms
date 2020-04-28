import QuickUnion from "./quick-union";

describe("QuickUnion", () => {
  describe("Find", () => {
    describe("New Instance", () => {
      it("Should return false", () => {
        const quickUnion = new QuickUnion(10);

        expect(quickUnion.find(1, 3)).toBe(false);
      });
    });

    test("If values have the same root", () => {
      const quickUnion = new QuickUnion(10);

      quickUnion.disjointSet[2] = 9;
      quickUnion.disjointSet[4] = 9;
      quickUnion.disjointSet[3] = 4;

      quickUnion.disjointSet[5] = 6;

      expect(quickUnion.find(2, 9)).toBe(true);
      expect(quickUnion.find(4, 9)).toBe(true);
      expect(quickUnion.find(3, 4)).toBe(true);
      expect(quickUnion.find(3, 9)).toBe(true);

      expect(quickUnion.find(5, 6)).toBe(true);

      expect(quickUnion.find(5, 9)).toBe(false);
      expect(quickUnion.find(5, 3)).toBe(false);
    });
  });
  describe("Union", () => {
    it("Should update first argument's root to second argument's root", () => {
      const quickUnion = new QuickUnion(10);

      quickUnion.union(2, 9);

      expect(quickUnion.disjointSet[2]).toEqual(quickUnion.disjointSet[9]);
      expect(quickUnion.disjointSet[2]).toEqual(9);
    });

    it("Should not update first argument's child values to second argument's root", () => {
      const quickUnion = new QuickUnion(10);

      quickUnion.union(2, 9);
      quickUnion.union(3, 4);
      quickUnion.union(4, 9);

      quickUnion.union(5, 6);

      quickUnion.union(9, 6); //This should only affect 9 and 6

      expect(quickUnion.disjointSet[9]).toEqual(quickUnion.disjointSet[6]);

      //only root nodes should be updated, not children
      expect(quickUnion.disjointSet[2]).toEqual(9);
      expect(quickUnion.disjointSet[4]).toEqual(9);
      expect(quickUnion.disjointSet[3]).toEqual(4);
      expect(quickUnion.disjointSet[5]).toEqual(6);
    });
  });
});
