'use strict';

var app = angular.module('adminListCandidate', ['ui.bootstrap' , 'serviceProvince', 'serviceParty', 'ngFileUpload', 'serviceElection', 'serviceCandidate', 'modalCandidate', 'confirmation' ]);

app.controller('listCandidateCtrl', ['$scope', '$http', '$uibModal', '$timeout',  'election', '$filter', 'candidate', function($scope, $http, $uibModal, $timeout, election, $filter, candidate)
{
  var $scope = $scope;
  $scope.candidates = [];
  $scope.response = {};
  $scope.elections = [];
  $scope.dateNow = {};
  $scope.dateNow = $filter('date')(new Date(), 'yyyy-MM-dd');
  election.getElection().then(function(data)
  {
    $scope.elections = data;
  });

  $scope.deleteItem = function (index, obj)
  {
    candidate.deleteCandidate(obj).then(function (data)
    {
      $scope.response = data;
      $scope.candidates.splice(index, 1);
      $timeout(function ()
      {
        $(".success-request").show().delay(2000).fadeOut();},1000);
      });
  };

  $scope.editItem = function (index, obj)
   {
     var modalInstance = $uibModal.open({
       animation: $scope.animationsEnabled,
       templateUrl: 'views/adminCandidate/modalCandidateView.html',
       controller: 'modalCandidateCtrl',
       size: 'lg',
       resolve:
       {
         item: function () {
           return obj;
         }
       }
     });

     modalInstance.result.then(function (data)
     {
       if(data != null || undefined )
       {
         $scope.response = data.request;
         $timeout(function (){$(".success-request").show().delay(2000).fadeOut();},1000);
          $scope.candidates[index] = data;
       }
     });
   };

  $scope.confirmationDelete = function (index, obj)
  {
    var modalInstance = $uibModal.open({
      templateUrl: 'views/adminCandidate/modalConfirmationView.html',
      controller: 'modalConfirmationCtrl',
      size: 'sm',
      resolve:
      {
        item: function(){
          return obj;
        }
      }
    });
    modalInstance.result.then( function(data)
    {
      if(data)
      {
        $scope.deleteItem(index, obj);
      }
    });
  };


}]);
