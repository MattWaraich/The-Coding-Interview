const vendingMachine = require("./vendingmachine");
const inventory = require("./inventory.json");
const VENDING = new vendingMachine(inventory);

describe("Vending Machine", () => {
  describe("show all the items", () => {
    it("should print all items", () => {
      expect(VENDING.printInventory()).toEqual({
        items: [
          { name: "LAYS", count: 5, price: 2 },
          { name: "RUFFLES", count: 10, price: 2 },
          { name: "DORITOS", count: 2, price: 2 },
          { name: "CANDY", count: 12, price: 1 }
        ]
      });
    });

    it("should return correct item if exact amount inserted", () => {
      const item = VENDING.findItem("LAYS", 2);
      expect(item.name).toEqual("LAYS");
    });

    it("should return correct item if more than exact amount inserted", () => {
      const item = VENDING.findItem("LAYS", 6);
      expect(item.name).toEqual("LAYS");
    });

    it("should return undefined if less than the right amount inserted", () => {
      const item = VENDING.findItem("LAYS", 1);
      expect(item).toEqual(undefined);
    });

    it("should return undefined if an item not in inventory is requested", () => {
      const item = VENDING.findItem("TWIZZLERS", 6);
      expect(item).toEqual(undefined);
    });

    it("Should throw an error - Not enough money"),
      () => {
        expect(() => {
          item.toThrow();
        });
      };
  });
});

// paste the 4 non functioning test cases back from notes
