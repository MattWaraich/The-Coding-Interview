const VendingMachine = require("../lib/vending-machine");
const inventory = require("../inventory.json");
const VENDING = new VendingMachine(inventory);

describe("Vending Machine", () => {
  describe("show all the items", () => {
    it("should print all items", () => {
      expect(VENDING.printInventory()).toEqual({
        items: [
          { name: "LAYS", count: 5, price: 2 },
          { name: "RUFFLES", count: 10, price: 2 },
          { name: "DORITOS", count: 2, price: 2 },
          { name: "CANDY", count: 12, price: 1 }
        ],
        coins: [
          { name: "toonie", count: 10, price: 2 },
          { name: "loonie", count: 20, price: 1 },
          { name: "quarter", count: 30, price: 0.25 },
          { name: "dime", count: 40, price: 0.1 },
          { name: "nickel", count: 50, price: 0.05 }
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

    it("Should throw an error - Not item found", () => {
      const item = VENDING.findItem("OREO");
      expect(() => {
        item.toThrow();
      });
    });
  });

  describe("Restock Inventory:", () => {
    describe("When restockItem = 'Candy' ", () => {
      it("should return 'Inventory count is now full (12) for this item", () => {
        expect(() => {
          VENDING.restockItem("Candy").toThrow(
            "Inventory count is now full (12) for this item"
          );
        });
      });
    });

    describe("When restocking 1 dollar", () => {
      it("should throw an error 'Inventory count is already full (20) for loonie'", () => {
        expect(() => {
          VENDING.resupplyChange("1 dollar").toThrow(
            "Inventory count is already full (20) for loonie"
          );
        });
      });
    });

    describe("When selection = 'DORITOS', changeInput='1.5'", () => {
      it("should throw an error 'You must put $0.50 more to purchase Ruffles chips'", () => {
        expect(() =>
          VENDING.dispenseItem("DORITOS", 2.0).toThrow(
            "You must put $0.50 more to purchase DORITOS chips"
          )
        );
      });
    });

    describe("When selection = 'LAYS' with exact change", () => {
      it("should throw an error 'Sorry, this item is sold out' and return all change", () => {
        expect(() => VENDING.dispenseItem("LAYS", 10).toThrow("Sold Out"));
      });
    });

    describe("When selection = 'CANDY' with more than exact change", () => {
      it("should return the correct", () => {
        expect(() => VENDING.dispenseItem("CANDY", 2).toEqual(["loonie"]));
      });
    });

    describe("Resupply Inventory Change:", () => {
      describe("When restocking 25c ", () => {
        it("should return 'Inventory count is now full (25) for this change'", () => {
          expect(() => {
            VENDING.resupplyChange("5c").toThrow(
              "Inventory count is full (50) for this change"
            );
          });
        });
      });
    });
  });
});
