'use strict';

var app = angular.module('adminParty', ['ngFileUpload', 'serviceParty']);

app.controller('registerPartyCtrl', [ '$scope', '$timeout', 'Upload', 'party', function($scope, $timeout,Upload, party)
{
  $scope.party = {};
  $scope.status = {};
  $scope.parties = [{}];

  $scope.clearItem = function()
  {
    $scope.restForm();
  };

  $scope.restForm = function()
  {
    $scope.party = {};
    $scope.restStatus();
  };

  $scope.restStatus = function ()
  {
      $scope.status.requestImage = false;
  };

  $scope.restForm();
  $scope.uploadFile = function (party)
  {
    Upload.upload({
      url: 'api/upload-file-party',
      method: 'POST',
      data: { image: party}
    }).then(function (res){
      if(res.status == 200)
      {
        $scope.path = '/uploads/parties/' + res.data.filename;
        $scope.party.path = $scope.path;
        $scope.status.requestImage = true;
      }
    },
     function (res){
    },
    function (evt)
    {
    });
  };

  $scope.saveItem = function ()
  {
    party.addParty($scope.party).then(function (data)
    {
      if(data.status==200)
      {
        $scope.status.request = true;
        $timeout(function (){$('.success-request-fixed').show().delay(2000).fadeOut(); },100);
        $scope.clearItem();
      }
    });
  };

}]);
