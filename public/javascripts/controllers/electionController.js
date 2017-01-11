'use strict'
var app = angular.module('election', ['ui.bootstrap', 'datatables', 'serviceElection']);

app.controller('electionController', ['$scope', '$http' ,'election', function ($scope, $http ,election)
{
  var that = $scope;
  that.election = {};
  that.elections = [];
  that.popup = { from: false, to: false, day: false };
    $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true,
  };
  election.getElection().then(function (data)
  {
    that.elections = data;
  })
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
  $scope.select = function (date)
  {
    console.log(date)
  }

  $scope.saveItem = function()
  {
    $http.post('/api/election', that.election).success(function (data)
    {
      if(data.status = 200)
      {
        console.log('test')
      }
    });
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
