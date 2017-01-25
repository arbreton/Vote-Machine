'use strict';

var app = angular.module('adminListCandidate', ['ui.bootstrap', 'datatables', 'serviceProvince', 'serviceParty', 'ngFileUpload', 'serviceElection', 'serviceCandidate', 'modalCandidate', 'confirmation' ]);

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
    $scope.election=data[0];
  });

  $scope.deleteItem = function (indexCandidate, obj, idElection)
  {
    candidate.deleteCandidate(obj).then(function (data)
    {
      $scope.response = data;
      var e = $scope.elections.map(function (item, index)
      {
        if(item._id==idElection)
        {
          item.candidates.splice(indexCandidate, 1);
        }
      });
      $timeout(function ()
      {
        $(".success-request").show().delay(2000).fadeOut();},1000);
      });
  };

  $scope.editItem = function (index, obj, idElection)
   {
     obj.read=false;
     obj.idElection = idElection;
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

   $scope.readOnly = function (obj, value)
    {
      obj.read=value;
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

  $scope.confirmationDelete = function (indexCandidate, obj, idElection)
  {
    console.log($scope.elections)
    obj.idElection= idElection;
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

        $scope.deleteItem(indexCandidate,obj,idElection);
      }
    });
  };


}]);
