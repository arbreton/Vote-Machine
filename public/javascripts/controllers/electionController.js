'use strict'
var app = angular.module('election', ['ui.bootstrap', 'datatables', 'serviceElection']);

app.controller('electionController', ['$scope', '$http' ,'election', '$filter', '$timeout', function ($scope, $http ,election, $filter, $timeout)
{
  var that = $scope;
  that.election = {};
  that.elections = [];
  that.status = {};
  $scope.date;
  that.popup = {
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

  $scope.openDay = function()
  {
    that.popup.day = true;
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

    for(var i = 0; i<that.elections.length; i++)
    {
        if(that.elections[i].electionDay === selectDate)
        {
          that.status.electionDay = true;
          break;
        }
        else
        {
          that.status.electionDay = false;
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
    that.election = {};
    //that.status.electionDay = false;
  };

  $scope.resetForm();

  $scope.saveItem = function()
  {
    $http.post('/api/election', that.election).success(function (data)
    {
      if(data.status = 200)
      {
        that.status.request = true;
        $timeout(function (){$('.success-request-fixed').show().delay(2000).fadeOut(); },100);
        //$scope.clearItem();
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
