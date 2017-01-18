var app = angular.module('moduleParty', ['ui.bootstrap', 'serviceParty']);
app.controller('modalPartyController', ['$scope','$uibModalInstance', 'item', 'Upload', 'party', function ($scope, $uibModalInstance, item, Upload, party)
{
  $scope.party = item;
$scope.requestImage = {};
  $scope.uploadFile = function (file)
  {
    if(file !='')
    {
      Upload.upload({
        url: 'api/upload-file-party',
        method: 'POST',
        data: { image: file}
      }).then(function (resp)
      {
        $scope.requestImage = resp;
        let path ='/uploads/parties/'+ resp.data.filename;
        $scope.party.image = path;
      },
      function (resp){
      },
      function (evt){
      });
    }
  };

  $scope.cancel = function() {  $uibModalInstance.dismiss('Cancel'); }

  $scope.updateItem = function ()
  {
      party.updateParty($scope.party).then(function (data)
      {
        $scope.party.request = data;
        $uibModalInstance.close($scope.party);
      });
  };
}]);
