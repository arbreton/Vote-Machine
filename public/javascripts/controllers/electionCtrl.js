'use strict';
var app = angular.module('election', ['ui.bootstrap', 'datatables', 'serviceElection']);

app.controller('electionCtrl', ['$scope', '$http' , '$filter', '$timeout', 'election', function ($scope, $http, $filter, $timeout, election)
{
  $scope.election = {};
  $scope.elections = [];
  $scope.status = {};
  $scope.date;
  $scope.popup = {
    from: false,
    to: false,
    day: false
  };
  $scope.dateOptions = {
    minDate: new Date(),
    showWeeks: true
  };
  election.getElection().then(function (data)
  {
    $scope.elections = data;
  });
  $scope.openFrom = function()
  {
    $scope.popup.from = true;
  };
  $scope.openTo = function()
  {
    $scope.popup.to = true;
  };
  $scope.openDay = function()
  {
    $scope.popup.day = true;
  };
  $scope.minDateDisabled = function ()
  {
    $scope.dateOptions.minDate = $scope.dateOptions.minDate ? null : new Date();
  };
  //get election day and y compare with date selected
  $scope.select = function (date)
  {
    $scope.minDateDisabled();
    var selectDate = $filter('date')(new Date(date), 'yyyy-MM-dd');

    for(var i = 0; i<$scope.elections.length; i++)
    {
        if($scope.elections[i].electionDay === selectDate)
        {
          $scope.status.electionDay = true;
          break;
        }
        else
        {
          $scope.status.electionDay = false;
          break;
        }
    }
  };
  $scope.clearItem = function()
  {
    $scope.saveForm.$setPristine();
    $scope.resetForm();
  };
  $scope.resetForm = function()
  {
    $scope.election = {};
  };
  $scope.resetForm();
  $scope.saveItem = function()
  {
    election.addElection($scope.election).then(function (data)
    {
      if(data.status = 200)
      {
        $scope.status.request = true;
        $timeout(function (){$('.success-request-fixed').show().delay(2000).fadeOut(); },100);
      }
    });
  };
  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }
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
