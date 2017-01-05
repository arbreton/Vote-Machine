'use strict'
var app = angular.module('election', ['ui.bootstrap']);

app.controller('electionController', ['$scope', function ($scope)
{
  var that = $scope;
  that.election = {};
  that.popup = { from: false, to: false, day: false };
    $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.openFrom = function()
  {
    that.popup.from = true;
  };

  $scope.openTo = function()
  {
    that.popup.to = true;
  };

  $scope.openDay = function ()
  {
    that.popup.day = true;
  };

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }

}]);
