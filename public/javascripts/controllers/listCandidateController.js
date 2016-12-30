'use strict';

var app = angular.module('adminListCandidate', ['datatables','ui.bootstrap' ,'ui.bootstrap.modal', 'serviceProvince', 'serviceParty', 'ngFileUpload']);

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

app.controller('modalCandidateController', ['$scope','$uibModalInstance', 'item', 'province', 'party','$http', 'Upload', '$filter', function ($scope, $uibModalInstance, item, province, party, $http, Upload, $filter)
{
  var that = $scope;
  that.provinces = [];
  that.cantones = [];
  that.districts = [];
  that.candidate = item;
  that.candidate.img = item.image;
  $('#election_day').text( $filter('date')(new Date(item.election_day), 'yyyy-MM-dd'));
  that.initial_elections = [{id: 1, date:"2000"}, {id: 2, date: "2005"}, {id: 3, date:"2010"}, {id: 4, date:"2015"}];
  that.final_elections = [{id: 1, date:"2005"}, {id: 2, date: "2010"}, {id: 3, date:"2015"}, {id: 4, date:"2020"}];
  that.parties = [];
  that.election_day = {};
  that.popup = { opened: false };
  party.getParties().then( function (data)
  {
    that.parties = data;
  });
  $scope.open = function()
  {
    $scope.popup.opened = true;
  };

  $scope.getDate = function ()
  {
    var d = new Date();
   var h = d.getHours();
   var m = d.getMinutes();
   var s = d.getSeconds();
   var hour = h + ":" + m + ":" + s;
    return that.election_day_text  = $('#election_day').val();
  };
  $scope.uploadFile = function (file)
  {
    if(file !='')
    {
      Upload.upload({
        url: 'api/file',
        method: 'POST',
        data: { image: file}
      }).then(function (resp){
        that.requestImage = resp;
        let path ='/uploads/'+ resp.data.filename;
        that.candidate.image = path;
      }, function (resp){
      }, function (evt){
      });
    }
  };

  province.getProvinces().then(function (data)
  {
    that.provinces = data;
  });

  $scope.showCantones = function (cantones)
  {
     return $scope.cantones = cantones;
  };

  $scope.showDistricts = function(districts)
  {
    return that.districts = districts;
  };

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
