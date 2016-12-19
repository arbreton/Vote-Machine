'use strict';

var app = angular.module('adminListCandidate', ['datatables','ui.bootstrap' ,'ui.bootstrap.modal', 'serviceProvince']);

app.controller('listCandidateController', [ '$scope', '$http', '$uibModal', '$timeout', function($scope, $http, $uibModal, $timeout)
{
  var that = $scope;
  that.candidates = [];
  that.response = {};
  $http.get('/api/canditates').success( function (data)
  {
      that.candidates = data;
  });

  $scope.deleteItem = function (index,candidate)
  {
    $http.put('/api/candidate-delete/'+ candidate._id , candidate ).success(function (data)
    {
      that.response = data;
      that.candidates.splice(index, 1);
      $timeout(function (){$(".success-request").show().delay(2000).fadeOut();},1000);
    });
  };


  $scope.editItem = function (index, obj)
   {
     var modalInstance = $uibModal.open({
       animation: $scope.animationsEnabled,
       templateUrl: 'views/adminCandidate/modalCandidate.html',
       controller: 'modalCandidateController',
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
         that.response = data.request;
         $timeout(function (){$(".success-request").show().delay(2000).fadeOut();},1000);
          that.candidates[index] = data;
       }
     });
   };

$scope.confirmationDelete = function (index,candidate)
{
  var modalIntance = $uibModal.open({
    templateUrl: 'views/adminCandidate/modalConfirmation.html',
    controller: 'modalConfirmationController',
    size: 'sm',
    resolve: {
      item: function (){
        return true;
      }
    }
  });

  modalIntance.result.then( function (data)
  {
    if(data)
    {
      $scope.deleteItem(index, candidate);
    }
  });
};


}]);

app.controller('modalCandidateController', ['$scope','$uibModalInstance', 'item', 'province','$http', function ($scope, $uibModalInstance, item, province, $http)
{
  var that = $scope;
  that.provinces = [];
  that.cantones = [];
  that.districts = [];
  that.candidate = item;
  that.fecha_inicial = [{id: 1, fecha:"2000"}, {id: 2, fecha: "2005"}, {id: 3, fecha:"2010"}, {id: 4, fecha:"2015"}];
  that.fecha_final = [{id: 1, fecha:"2005"}, {id: 2, fecha: "2010"}, {id: 3, fecha:"2015"}, {id: 4, fecha:"2020"}];
  that.partidos = [{codigo:1, descripcion:"Rojo"}, {codigo:2,descripcion:"Verde"}];
  province.getProvinces().then(function (data)
  {
    that.provinces = data;
  });

  $scope.showCantones = function (cantones){ return $scope.cantones = cantones; };

  $scope.showDistricts = function(districts) { return that.districts = districts; };

  $scope.cancel = function() {  $uibModalInstance.dismiss('Cancel'); }

  $scope.updateItem = function ()
  {
      $http.put('/api/candidate-update/'+ that.candidate._id, that.candidate).success(function (data)
      {
        that.candidate.request = data;
        $uibModalInstance.close(that.candidate);
      });
  };



}]);


app.controller('modalConfirmationController', ['$scope', '$uibModalInstance', 'item', function ($scope, $uibModalInstance, item)
{
  var that = $scope;
  that.confirmation = {yes: true, no: false};

  $scope.cancel = function ()
  {
    $uibModalInstance.close(that.confirmation.no);
  };
  $scope.ok = function ()
  {
    $uibModalInstance.close(that.confirmation.yes);
  };
}]);
