class vendingMachine {
  constructor(inventory) {
    this.inventory = inventory;
  }

  printInventory() {
    return this.inventory;
  }

  amountToCoins(amount, coins) {
    if (amount === 0) {
      return [];
    } else {
      if (amount >= coins[0].price) {
        let left = amount - coins[0].price;
        let array = [coins[0].name];
        array.concat(this.amountToCoins(left, coins));
      } else {
        coins.shift;
        this.amountToCoins(amount, coins);
      }
    }
  }

  // dispenseItem(selection, changeInput) {
  //   const item = this.inventory;

  //   const price = this.inventory.items.filter(
  //     item => item.name === selection
  //   )[0].price;
  //   const name = this.inventory.items.filter(item => item.name === selection)[0]
  //     .name;

  //   const ObjSelectedItem = this.inventory.items.filter(
  //     item => item.name === selection
  //   );
  //   if (ObjSelectedItem.length < 1) {
  //     throw new Error("Sorry, this is not a valid selection");
  //   }

  //   if (price === changeInput) {
  //     if (ObjSelectedItem[0].count === 0) {
  //       throw new Error("Sold out");
  //     }

  //     ObjSelectedItem[0].count -= 1;
  //     return name;
  //   }
  //   let changeRequired = price - changeInput;

  //   if (price > changeInput) {
  //     throw new Error(
  //       `Insert more money! ${changeRequired} more to purchase ${name}`
  //     );
  //   } else if (price < changeInput) {
  //     return this.amountToCoins(changeInput, this.inventory.coins);
  //   }
  // }

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

  restockItem(restockItem) {
    const item = this.inventory.items;
    const maxAmount = item[restockItem].maxAmount;
    const currentAmount = item[restockItem].currentAmount;
    if (!item[restockItem]) throw new Error("This item does not exist");
    if (currentAmount === maxAmount) {
      throw new Error("Inventory count is already full (" + maxAmount + ")");
    }
    const possibleRestock = maxAmount - currentAmount;
    const itemRestock = currentAmount + possibleRestock;
    return "Inventory count full (" + itemRestock + ") for this";
  }

  resupplyChange(restockChange) {
    const change = this._changeInventory.change;
    const currentAmount = change[restockChange].currentAmount;
    const maxAmount = change[restockChange].maxAmount;
    const possibleRestock = maxAmount - currentAmount;
    const changeRestock = currentAmount + possibleRestock;
    if (currentAmount === maxAmount) {
      throw new Error(
        "Inventory count full (" +
          maxAmount +
          ") for " +
          change[restockChange].name
      );
    }
    return "Inventory count full (" + changeRestock + ")";
  }
}

module.exports = vendingMachine;
