var app = angular.module('modalCandidate', ['serviceCandidate']);

app.controller('modalCandidateCtrl', ['$scope','$uibModalInstance', '$filter', 'item', 'province', 'party', 'Upload', 'candidate', function ($scope, $uibModalInstance, $filter, item, province, party, Upload, candidate)
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
      candidate.updateCandidate($scope.candidate).then(function (data)
      {
        $scope.candidate.request = data;
        $uibModalInstance.close($scope.candidate);
      });
  };
}]);
//end controller
