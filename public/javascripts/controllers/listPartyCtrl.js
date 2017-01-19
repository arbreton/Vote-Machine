'use strict';

var app = angular.module('adminListParty', ['datatables','ui.bootstrap', 'serviceProvince', 'ngFileUpload', 'serviceParty', 'moduleParty', 'confirmation']);

app.controller('listPartyCtrl', [ '$scope', '$uibModal', '$timeout', 'party',  function($scope, $uibModal, $timeout, party)
{
  $scope.parties = [];
  $scope.response = {};
  $scope.persons = {};
  party.getParties().then( function (data)
  {
      $scope.parties = data;
  });

  $scope.deleteItem = function (index, obj)
  {
    party.deleteItem(obj).then(function (data)
    {
      $scope.response = data;
      $scope.parties.splice(index, 1);
      $timeout(function (){$(".success-request").show().delay(4000).fadeOut();},1000);
    });
  };

  $scope.editItem = function (index, obj)
   {
     var modalInstance = $uibModal.open({
       animation: $scope.animationsEnabled,
       templateUrl: 'views/adminParty/modalPartyView.html',
       controller: 'modalPartyController',
       size: 'lg',
       resolve:
       {
         item: function ()
         {
            return obj;
        }
       }
     });

     modalInstance.result.then(function (data)
     {
       if(data != null || undefined )
       {
         $scope.response = data.request;
         $timeout(function (){$(".success-request").show().delay(4000).fadeOut();},1000);
          $scope.parties[index] = data;
       }
     });
   };

$scope.confirmationDelete = function (index,party)
{
  var modalIntance = $uibModal.open({
    templateUrl: 'views/adminParty/modalConfirmationView.html',
    controller: 'modalConfirmationCtrl',
    size: 'sm',
    resolve: {
      item: function (){
        return party;
      }
    }
  });

  modalIntance.result.then( function (data)
  {
    if(data)
    {
      $scope.deleteItem(index, party);
    }
  });
};


}]);
/*

app.controller('modalConfirmationController', ['$scope', '$uibModalInstance', 'item', function ($scope, $uibModalInstance, item)
{
  var $scope = $scope;
  $scope.party = item;
  $scope.confirmation = {yes: true, no: false};

  $scope.cancel = function ()
  {
    $uibModalInstance.close($scope.confirmation.no);
  };
  $scope.ok = function ()
  {
    $uibModalInstance.close($scope.confirmation.yes);
  };
}]);
*/
