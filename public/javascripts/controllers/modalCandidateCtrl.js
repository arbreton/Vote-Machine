var app = angular.module('modalCandidate', ['serviceCandidate', 'serviceProvince']);

app.controller('modalCandidateCtrl', ['$scope','$uibModalInstance', '$filter', 'item', 'province', 'party', 'Upload', 'candidate', function ($scope, $uibModalInstance, $filter, item, province, party, Upload, candidate)
{

  province.getProvinces().then(function (data)
  {
    $scope.cantones = [];
    $scope.districts = [];

    $scope.candidate = item;
    $scope.candidate.img = item.image;

    $scope.provinces = [];
    $scope.provinces = data;

    var province = $scope.provinces.filter(function(province){
      return (province.id == $scope.candidate.province.id);
    })

    $scope.cantones = province[0].cantones;

   var canton = $scope.cantones.filter(function(canton){
     return (canton.id == $scope.candidate.province.canton.id);
   })

    $scope.districts = canton[0].districts;
  });

  $scope.parties = [];
  party.getParties().then( function (data)
  {
    $scope.parties = data;
  });

  $scope.getParty = function (obj)
  {
    console.log(obj)
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

    $scope.showCantones = function (cantones)
    {
       return $scope.cantones = cantones;
    };

    $scope.showDistricts = function(districts)
    {
      return $scope.districts = districts;
    };

  $scope.cancel = function()
  {
    $uibModalInstance.dismiss('Cancel');
  };

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
