var app = angular.module('modalCandidate', []);

app.controller('modalCandidateCtrl', ['$scope','$uibModalInstance', 'item', 'province', 'party','$http', 'Upload', '$filter', function ($scope, $uibModalInstance, item, province, party, $http, Upload, $filter)
{
  $scope.provinces = [];
  $scope.cantones = [];
  $scope.districts = [];
  $scope.candidate = item;
  $scope.candidate.img = item.image;
  $scope.parties = [];
  $scope.popup =
  {
    opened: false
  };
  party.getParties().then( function (data)
  {
    $scope.parties = data;
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
        $scope.requestImage = resp;
        let path ='/uploads/'+ resp.data.filename;
        $scope.candidate.image = path;
      }, function (resp){
      }, function (evt){
      });
    }
  };

  province.getProvinces().then(function (data)
  {
    $scope.provinces = data;
  });

  $scope.showCantones = function (cantones)
  {
     return $scope.cantones = cantones;
  };

  $scope.showDistricts = function(districts)
  {
    return $scope.districts = districts;
  };

  $scope.cancel = function() {  $uibModalInstance.dismiss('Cancel'); }

  $scope.updateItem = function ()
  {
      $http.put('/api/candidate-update/'+ $scope.candidate._id, $scope.candidate).success(function (data)
      {
        $scope.candidate.request = data;
        $uibModalInstance.close($scope.candidate);
      });
  };
}]);
//end controller
