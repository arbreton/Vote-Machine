var app = angular.module('moduleParty', []);
app.controller('modalPartyController', ['$scope','$uibModalInstance', 'item', 'party', 'Upload', function ($scope, $uibModalInstance, item, party, Upload)
{
  that.party.img = item.image;
  that.parties = [];

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
