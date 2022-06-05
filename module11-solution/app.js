(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
$scope.checkLunch = function () {
var checkLunchResult = "Please enter data first";
var targetColor = "#FF0100";

if ($scope.name != undefined) {
  var input = $scope.name.replace(/ /g,"").trim();
  var input_r = input.replace(/,/g,"").trim();
  if (input_r.length > 0) {
    var checkLunchResult = stringToSplit(input, ',');
    var targetColor = "#00B050";
  }
}

$scope.results = checkLunchResult;
$scope.bkcolor = targetColor;

}
}

// DO NOT CONSIDER EMPTY ITEMS BETWEN ,, //
function stringToSplit(string,separator) {
  var arrayOfStrings = string.split(separator);
  var results = [];
  var targetColor = [];
  var emptyCount = 0;

  for (var i = 0; i < arrayOfStrings.length; i++) {
     if (arrayOfStrings[i].length == 0) {
       emptyCount += 1;
     }
   }

  var stringNumber = arrayOfStrings.length - emptyCount;

  if (stringNumber <= 3 && stringNumber > 0) {
    results = "Enjoy!"
  }
  if (stringNumber > 3) {
    results = "Too much!"
  }
  return results;
}

})();
