(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundList.html',
    scope: {
      foundItem: '<',
      onRemove: '&',
      notFound: '<'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


function FoundItemsDirectiveController() {
  var list = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;
  var error = [];
  list.checkSearchTerm = function(searchTerm){
    var keyword = searchTerm;
    if ((keyword == undefined) || (keyword.length === 0)){
      error = 1;
      list.error = function() {return error;}
      }
    else {
      {
        var promise = MenuSearchService.getMatchedMenuItems();
        promise.then(function (response) {
          list.categories = response.data.menu_items;

          var found = [];
          var searchTerm = keyword.toLowerCase();
          var j = 0;
          for (var i = 0; i < list.categories.length; i++) {
                var name = list.categories[i].name;
                var short_name = list.categories[i].short_name;
                var description = list.categories[i].description;

                if (description.toLowerCase().indexOf(searchTerm) !== -1) {

                  found[j] = {
                    name: name,
                    short_name: short_name,
                    description: description
                  }
                  j++;
                }
          }

          if (j==0) {
            error = 1;
            list.error = function() {return error;}
          }

          else {
            error = 0;
            list.error = function() {return error;}
          }

          list.removeItem = function (itemIndex) {
            found.splice(itemIndex, 1);
          };

          list.getItem = function () {
            return found;
          }

        })
      }

      }
    }
  };

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;
  service.getMatchedMenuItems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;


  };

}

})();
