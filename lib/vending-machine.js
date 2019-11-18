let VENDING_INVENTORY = new Map();

VENDING_INVENTORY.set("LAYS", { count: 5, price: 2 });
VENDING_INVENTORY.set("RUFFLES", { count: 10, price: 2 });
VENDING_INVENTORY.set("DORITOS", { count: 2, price: 2 });
VENDING_INVENTORY.set("CANDY", { count: 12, price: 1 });

module.exports.printInventory = function() {
  VENDING_INVENTORY.forEach(function(itemInfo, item) {
    console.log("Inventory for " + item + " is " + itemInfo.count);
  });
};

module.exports.refillInventory = function() {
  VENDING_INVENTORY.forEach(function(itemInfo, item) {
    if (itemInfo.count < 2) {
      //purchase more of item
      VENDING_INVENTORY.set(item, { count: 8, price: itemInfo.price });
    }
  });
};

module.exports.dispenseInventory = function(item, payment) {
  const itemToPurchase = VENDING_INVENTORY.get(item);
  if (payment >= itemToPurchase.price) {
    const change = calculateChange(payment);
    return {
      item: itemToPurchase,
      change: change
    };
  } else {
    console.log("Insufficient funds!");
  }
};

module.exports.calculateChange = function(itemPrice, payment) {
  //calculate this
  return 0;
};

module.exports = VENDING_MACHINE;
