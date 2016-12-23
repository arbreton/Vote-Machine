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
        return candidate;
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
  that.elections_date_ini = [{id: 1, date:"2000"}, {id: 2, date: "2005"}, {id: 3, date:"2010"}, {id: 4, date:"2015"}];
  that.elections_date_end = [{id: 1, date:"2005"}, {id: 2, date: "2010"}, {id: 3, date:"2015"}, {id: 4, date:"2020"}];
  that.matchs = [{id:1, description:"Rojo"}, {id:2,description:"Verde"}];
  province.getProvinces().then(function (data)
  {
    that.provinces = data;
  });

  $scope.showCantones = function (cantones){ return $scope.cantones = cantones; };

  $scope.showDistricts = function(districts) { return that.districts = districts; };

  $scope.cancel = function() {  $uibModalInstance.dismiss('Cancel'); }

  $scope.updateItem = function ()
  {
    that.candidate.election_date = {id: that.election_date_ini.id, date: that.election_date_ini.date + ' ' + that.election_date_end.date};
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
  that.candidate = item;
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
