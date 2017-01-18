'use strict';

var app = angular.module('adminListParty', ['datatables','ui.bootstrap', 'serviceProvince', 'ngFileUpload', 'serviceParty']);

app.controller('listPartyCtrl', [ '$scope', '$uibModal', '$timeout', 'party', 'DTOptionsBuilder', 'DTColumnDefBuilder', function($scope, $uibModal, $timeout, party, DTOptionsBuilder, DTColumnDefBuilder)
{
  $scope.parties = [];
  $scope.response = {};
  $scope.persons = {};
  party.getParties().then( function (data)
  {
      $scope.parties = data;
      $scope.persons = data;
  });
    $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');
    $scope.dtColumnDefs = [
       DTColumnDefBuilder.newColumnDef(0),
       DTColumnDefBuilder.newColumnDef(1),
       DTColumnDefBuilder.newColumnDef(2).notSortable()
   ];
   /*$scope.person2Add = _buildPerson2Add(1);
   $scope.addPerson = addPerson;
   $scope.modifyPerson = modifyPerson;
   $scope.removePerson = removePerson;

   function _buildPerson2Add(id) {
       return {
           id: id,
           description: 'Foo' + id,
           image: 'Bar' + id
       };
   }
   function addPerson() {
       $scope.persons.push(angular.copy($scope.person2Add));
       $scope.person2Add = _buildPerson2Add($scope.person2Add.id + 1);
   }
   function modifyPerson(index) {
       $scope.persons.splice(index, 1, angular.copy($scope.person2Add));
       $scope.person2Add = _buildPerson2Add($scope.person2Add.id + 1);
   }
   function removePerson(index) {
       $scope.persons.splice(index, 1);
   }*/

  $scope.deleteItem = function (index,party)
  {
    party.deleteItem(party).then(function (data)
    {
      $scope.response = data;
      $scope.parties.splice(index, 1);
      $timeout(function (){$(".success-request").show().delay(2000).fadeOut();},1000);
    });
  };

  $scope.editItem = function (index, obj)
   {
     var modalInstance = $uibModal.open({
       animation: $scope.animationsEnabled,
       templateUrl: 'views/adminparty/modalparty.html',
       controller: 'modalpartyController',
       size: 'lg',
       resolve:
       {
         item: function () { return obj;}
       }
     });

     modalInstance.result.then(function (data)
     {
       if(data != null || undefined )
       {
         $scope.response = data.request;
         $timeout(function (){$(".success-request").show().delay(2000).fadeOut();},1000);
          $scope.parties[index] = data;
       }
     });
   };

$scope.confirmationDelete = function (index,party)
{
  var modalIntance = $uibModal.open({
    templateUrl: 'views/adminparty/modalConfirmation.html',
    controller: 'modalConfirmationController',
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
