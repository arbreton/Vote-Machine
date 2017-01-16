var app = angular.module('modalCandidate', []);

app.controller('modalCandidateController', ['$scope','$uibModalInstance', 'item', 'province', 'party','$http', 'Upload', '$filter', function ($scope, $uibModalInstance, item, province, party, $http, Upload, $filter)
{
  var that = $scope;
  that.provinces = [];
  that.cantones = [];
  that.districts = [];
  that.candidate = item;
  that.candidate.img = item.image;
  that.parties = [];
  that.popup =
  {
    opened: false
  };
  party.getParties().then( function (data)
  {
    that.parties = data;
  });
  $scope.open = function()
  {
    $scope.popup.opened = true;
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
//end controller
