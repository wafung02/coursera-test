(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ShoppingListController1', ShoppingListController1)
.controller('ShoppingListController2', ShoppingListController2)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// LIST #1 - controller
ShoppingListController1.$inject = ['ShoppingListCheckOffService'];
function ShoppingListController1(ShoppingListCheckOffService) {
  var toBuyItem = this;
  toBuyItem.items = ShoppingListCheckOffService.getItems("toBuyItems");
  toBuyItem.removeItem = function (itemIndex) {
    try {
      ShoppingListCheckOffService.removeItem(itemIndex);
    } catch (error) {
      toBuyItem.errorMessage = error.message;
    }
  };
}


// LIST #2 - controller
ShoppingListController2.$inject = ['ShoppingListCheckOffService'];
function ShoppingListController2(ShoppingListCheckOffService) {
  var boughtItem = this;
  boughtItem.items = ShoppingListCheckOffService.getItems("boughtItems");

}


// If not specified, maxItems assumed unlimited
function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var boughtItems = [];
  var toBuyItems = [
    {
      name: "Milk",
      quantity: "2 Bottles"
    },
    {
      name: "Bread",
      quantity: "2 Loafs"
    },
    {
      name: "Cookies",
      quantity: "3 Bags"
    },
    {
      name: "Chocolate",
      quantity: "5 Packs"
    },
    {
      name: "Cola",
      quantity: "5 Bottles"
    }
  ];

  service.getItems = function (itemname) {
    if (itemname === "toBuyItems") {
      return toBuyItems;
    };

    if (itemname === "boughtItems"){
      return boughtItems;
    };
  };


  service.removeItem = function (itemIndex) {
    var item = {
      name: toBuyItems[itemIndex].name,
      quantity: toBuyItems[itemIndex].quantity
    };

    boughtItems.push(item);

    if (toBuyItems.length > 0) {
      toBuyItems.splice(itemIndex, 1);
    };
    if ((toBuyItems.length === undefined) || (toBuyItems.length === 0)){
      throw new Error("Everything is bought!");
    };
  };
}

})();
