class vendingMachine {
  constructor(inventory) {
    this.inventory = inventory;
  }

  printInventory() {
    console.log(this.inventory);
    return this.inventory;
  }

  findItem(requestedItem, moneyInserted) {
    let result;
    for (const item of this.inventory.items) {
      if (requestedItem === item.name) {
        result = item;
        break;
      }
    }
    if (result && moneyInserted >= result.price) {
      return result;
    } else {
      return undefined;
    }
  }
}

module.exports = vendingMachine;
