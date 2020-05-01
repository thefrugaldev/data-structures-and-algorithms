import QuickUnion from "./quick-union";
import WeightedQuickUnion from "./weighted-quick-union";
import WeightedQuickUnionPathCompression from "./weight-qu-path-compession";

describe("QuickUnion", () => {
  describe("Find", () => {
    describe("New Instance", () => {
      it("Should return false", () => {
        const quickUnion = new QuickUnion(10);

        expect(quickUnion.connected(1, 3)).toBe(false);
      });
    });

    test("If values have the same root", () => {
      const quickUnion = new QuickUnion(10);

      quickUnion.disjointSet[2] = 9;
      quickUnion.disjointSet[4] = 9;
      quickUnion.disjointSet[3] = 4;

      quickUnion.disjointSet[5] = 6;

      expect(quickUnion.connected(2, 9)).toBe(true);
      expect(quickUnion.connected(4, 9)).toBe(true);
      expect(quickUnion.connected(3, 4)).toBe(true);
      expect(quickUnion.connected(3, 9)).toBe(true);

      expect(quickUnion.connected(5, 6)).toBe(true);

      expect(quickUnion.connected(5, 9)).toBe(false);
      expect(quickUnion.connected(5, 3)).toBe(false);
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

describe("WeightedQuickUnion", () => {
  describe("Union", () => {
    it("Should update first argument's root to second argument's root", () => {
      const weightedQuickUnion = new WeightedQuickUnion(10);

      weightedQuickUnion.union(2, 9);

      expect(weightedQuickUnion.disjointSet[2]).toEqual(
        weightedQuickUnion.disjointSet[9]
      );
      expect(weightedQuickUnion.disjointSet[2]).toEqual(9);
    });

    it("Should not update first argument's child values to second argument's root", () => {
      const weightedQuickUnion = new WeightedQuickUnion(10);

      weightedQuickUnion.union(2, 9);
      weightedQuickUnion.union(3, 4);
      weightedQuickUnion.union(4, 9);

      weightedQuickUnion.union(5, 6);

      weightedQuickUnion.union(9, 6); //This should only affect 9 and 6

      expect(weightedQuickUnion.disjointSet[9]).toEqual(
        weightedQuickUnion.disjointSet[6]
      );

      //only root nodes should be updated, not children
      expect(weightedQuickUnion.disjointSet[2]).toEqual(9);
      expect(weightedQuickUnion.disjointSet[4]).toEqual(9);
      expect(weightedQuickUnion.disjointSet[3]).toEqual(4);
      expect(weightedQuickUnion.disjointSet[5]).toEqual(6);
    });

    it("Should only set the smaller tree's root to the larger tree's root", () => {
      const weightedQuickUnion = new WeightedQuickUnion(10);

      weightedQuickUnion.union(4, 3);
      expect(weightedQuickUnion.disjointSet[4]).toEqual(3);

      weightedQuickUnion.union(3, 8); // 3 is the larger tree, so its root takes precedence
      expect(weightedQuickUnion.disjointSet[8]).toEqual(3);

      weightedQuickUnion.union(6, 5);
      expect(weightedQuickUnion.disjointSet[6]).toEqual(5);

      weightedQuickUnion.union(9, 4);
      expect(weightedQuickUnion.disjointSet[9]).toEqual(3);

      weightedQuickUnion.union(2, 1);
      expect(weightedQuickUnion.disjointSet[2]).toEqual(1);

      weightedQuickUnion.union(5, 0);
      expect(weightedQuickUnion.disjointSet[0]).toEqual(5);

      weightedQuickUnion.union(7, 2);
      expect(weightedQuickUnion.disjointSet[7]).toEqual(1);

      weightedQuickUnion.union(6, 1);
      expect(weightedQuickUnion.disjointSet[5]).toEqual(1);

      weightedQuickUnion.union(7, 3);
      expect(weightedQuickUnion.disjointSet[3]).toEqual(1);
    });

    it("Should update the size of the larger root to the size of the smaller root after a union", () => {
      const weightedQuickUnion = new WeightedQuickUnion(10);

      weightedQuickUnion.union(4, 3);
      expect(weightedQuickUnion.size[3]).toEqual(2);

      weightedQuickUnion.union(3, 8);
      expect(weightedQuickUnion.size[3]).toEqual(3);

      weightedQuickUnion.union(6, 5);
      expect(weightedQuickUnion.size[5]).toEqual(2);

      weightedQuickUnion.union(9, 4);
      expect(weightedQuickUnion.size[3]).toEqual(4);

      weightedQuickUnion.union(2, 1);
      expect(weightedQuickUnion.size[1]).toEqual(2);

      weightedQuickUnion.union(5, 0);
      expect(weightedQuickUnion.size[5]).toEqual(3);

      weightedQuickUnion.union(7, 2);
      expect(weightedQuickUnion.size[1]).toEqual(3);

      weightedQuickUnion.union(6, 1);
      expect(weightedQuickUnion.size[1]).toEqual(6);

      weightedQuickUnion.union(7, 3);
      expect(weightedQuickUnion.size[1]).toEqual(10);
    });
  });
});

describe("WeightedQuickUnionPathCompression", () => {
  describe("Union", () => {
    it("Should update first argument's root to second argument's root", () => {
      const weightedQuickUnionPathCompression = new WeightedQuickUnionPathCompression(
        10
      );

      weightedQuickUnionPathCompression.union(2, 9);

      expect(weightedQuickUnionPathCompression.disjointSet[2]).toEqual(
        weightedQuickUnionPathCompression.disjointSet[9]
      );
      expect(weightedQuickUnionPathCompression.disjointSet[2]).toEqual(9);
    });

    it("Should not update first argument's child values to second argument's root", () => {
      const weightedQuickUnionPathCompression = new WeightedQuickUnionPathCompression(
        10
      );

      weightedQuickUnionPathCompression.union(2, 9);
      weightedQuickUnionPathCompression.union(3, 4);
      weightedQuickUnionPathCompression.union(4, 9);

      weightedQuickUnionPathCompression.union(5, 6);

      weightedQuickUnionPathCompression.union(9, 6); //This should only affect 9 and 6

      expect(weightedQuickUnionPathCompression.disjointSet[9]).toEqual(
        weightedQuickUnionPathCompression.disjointSet[6]
      );

      //only root nodes should be updated, not children
      expect(weightedQuickUnionPathCompression.disjointSet[2]).toEqual(9);
      expect(weightedQuickUnionPathCompression.disjointSet[4]).toEqual(9);
      expect(weightedQuickUnionPathCompression.disjointSet[3]).toEqual(4);
      expect(weightedQuickUnionPathCompression.disjointSet[5]).toEqual(6);
    });

    it("Should only set the smaller tree's root to the larger tree's root", () => {
      const weightedQuickUnionPathCompression = new WeightedQuickUnionPathCompression(
        13
      );

      weightedQuickUnionPathCompression.union(1, 0);
      weightedQuickUnionPathCompression.union(2, 0);
      expect(weightedQuickUnionPathCompression.disjointSet[1]).toEqual(0);
      expect(weightedQuickUnionPathCompression.disjointSet[2]).toEqual(0);

      weightedQuickUnionPathCompression.union(3, 1);
      weightedQuickUnionPathCompression.union(4, 1);
      weightedQuickUnionPathCompression.union(5, 1);
      expect(weightedQuickUnionPathCompression.disjointSet[3]).toEqual(0);
      expect(weightedQuickUnionPathCompression.disjointSet[4]).toEqual(0);
      expect(weightedQuickUnionPathCompression.disjointSet[5]).toEqual(0);

      weightedQuickUnionPathCompression.union(6, 3);
      weightedQuickUnionPathCompression.union(7, 3);
      expect(weightedQuickUnionPathCompression.disjointSet[6]).toEqual(0);
      expect(weightedQuickUnionPathCompression.disjointSet[7]).toEqual(0);

      weightedQuickUnionPathCompression.union(8, 6);
      weightedQuickUnionPathCompression.union(9, 6);
      expect(weightedQuickUnionPathCompression.disjointSet[8]).toEqual(0);
      expect(weightedQuickUnionPathCompression.disjointSet[9]).toEqual(0);

      weightedQuickUnionPathCompression.union(10, 8);
      expect(weightedQuickUnionPathCompression.disjointSet[10]).toEqual(0);

      weightedQuickUnionPathCompression.union(11, 9);
      weightedQuickUnionPathCompression.union(12, 9);
      expect(weightedQuickUnionPathCompression.disjointSet[11]).toEqual(0);
      expect(weightedQuickUnionPathCompression.disjointSet[12]).toEqual(0);
    });

    it("Should update the size of the larger root to the size of the smaller root after a union", () => {
      const weightedQuickUnionPathCompression = new WeightedQuickUnionPathCompression(
        13
      );
      weightedQuickUnionPathCompression.union(1, 0);
      weightedQuickUnionPathCompression.union(2, 0);

      weightedQuickUnionPathCompression.union(3, 1);
      weightedQuickUnionPathCompression.union(4, 1);
      weightedQuickUnionPathCompression.union(5, 1);

      weightedQuickUnionPathCompression.union(6, 3);
      weightedQuickUnionPathCompression.union(7, 3);

      weightedQuickUnionPathCompression.union(8, 6);
      weightedQuickUnionPathCompression.union(9, 6);

      weightedQuickUnionPathCompression.union(10, 8);

      weightedQuickUnionPathCompression.union(11, 9);
      weightedQuickUnionPathCompression.union(12, 9);

      expect(weightedQuickUnionPathCompression.size[0]).toEqual(13);
    });

    it("Should make every other node point to its grandparent (halving the path length)", () => {
      const sut = new WeightedQuickUnionPathCompression(13);

      sut.disjointSet = [0, 0, 0, 1, 1, 1, 3, 3, 6, 6, 8, 9, 9]; //pre-set initial tree structure

      expect(sut.isDirectChild(1, 0)).toEqual(true);
      expect(sut.isDirectChild(2, 0)).toEqual(true);
      expect(sut.isDirectChild(3, 1)).toEqual(true);
      expect(sut.isDirectChild(4, 1)).toEqual(true);
      expect(sut.isDirectChild(5, 1)).toEqual(true);
      expect(sut.isDirectChild(6, 3)).toEqual(true);
      expect(sut.isDirectChild(7, 3)).toEqual(true);
      expect(sut.isDirectChild(8, 6)).toEqual(true);
      expect(sut.isDirectChild(9, 6)).toEqual(true);
      expect(sut.isDirectChild(10, 8)).toEqual(true);
      expect(sut.isDirectChild(11, 9)).toEqual(true);
      expect(sut.isDirectChild(12, 9)).toEqual(true);

      sut.union(9, 0);
      expect(sut.isDirectChild(9, 3)).toEqual(true);
      expect(sut.isDirectChild(6, 3)).toEqual(true);
      expect(sut.isDirectChild(3, 0)).toEqual(true);

      sut.union(9, 0);
      expect(sut.isDirectChild(9, 0)).toEqual(true);
      expect(sut.isDirectChild(6, 3)).toEqual(true);
    });
  });
});
