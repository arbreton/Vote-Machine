'use strict';

var app = angular.module('adminListparty', ['datatables','ui.bootstrap' ,'ui.bootstrap.modal', 'serviceProvince', 'serviceMatch', 'ngFileUpload']);

app.controller('listPartyController', [ '$scope', '$http', '$uibModal', '$timeout', function($scope, $http, $uibModal, $timeout)
{
  var that = $scope;
  that.parties = [];
  that.response = {};
  $http.get('/api/canditates').success( function (data)
  {
      that.parties = data;
  });

  $scope.deleteItem = function (index,party)
  {
    $http.put('/api/party-delete/'+ party._id , party ).success(function (data)
    {
      that.response = data;
      that.parties.splice(index, 1);
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
         that.response = data.request;
         $timeout(function (){$(".success-request").show().delay(2000).fadeOut();},1000);
          that.parties[index] = data;
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

app.controller('modalpartyController', ['$scope','$uibModalInstance', 'item', 'province', 'match','$http', 'Upload', function ($scope, $uibModalInstance, item, province, match, $http, Upload)
{
  var that = $scope;
  that.provinces = [];
  that.cantones = [];
  that.districts = [];
  that.party = item;
  that.party.img = item.image;
  that.initial_elections = [{id: 1, date:"2000"}, {id: 2, date: "2005"}, {id: 3, date:"2010"}, {id: 4, date:"2015"}];
  that.final_elections = [{id: 1, date:"2005"}, {id: 2, date: "2010"}, {id: 3, date:"2015"}, {id: 4, date:"2020"}];
  that.matches = [];
  match.getMatches().then( function (data)
  {
    that.matches = data;
  })
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
        that.party.image = path;
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
    that.party.election_date = {id: that.election_date_ini.id, date: that.election_date_ini.date + ' ' + that.election_date_end.date};
      $http.put('/api/party-update/'+ that.party._id, that.party).success(function (data)
      {
        that.party.request = data;
        $uibModalInstance.close(that.party);
      });
  };
}]);


app.controller('modalConfirmationController', ['$scope', '$uibModalInstance', 'item', function ($scope, $uibModalInstance, item)
{
  var that = $scope;
  that.party = item;
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
