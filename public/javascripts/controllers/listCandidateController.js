'use strict';

var app = angular.module('adminListCandidate', ['datatables']);

app.controller('listCandidateController', [ '$scope', '$http', function($scope, $http)
{
  var that = $scope;

  that.candidates = [];

  $http.get('/api/canditate').success( function (data)
  {
      that.candidates = data;
  });

  $scope.deleteItem = function (candidate)
  {

    $http.put('/api/candidate/'+ candidate._id , candidate ).success(function (data)
    {

    });
  };

}]);
