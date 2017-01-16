'use strict';

var app = angular.module('adminParty', ['ngFileUpload', 'serviceParty']);

app.controller('registerPartyController', [ '$scope', '$http', 'Upload', '$timeout', 'party', function($scope, $http, Upload, $timeout, party)
{
  var that = $scope;
  that.party = {};
  that.status = {};
  that.parties = [{}];

  $scope.clearItem = function()
  {
    $scope.restForm();
  };

  $scope.restForm = function()
  {
    that.party = {};
    $scope.restStatus();
  };

  $scope.restStatus = function ()
  {
      that.status.requestImage = false;
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
        that.path = '/uploads/parties/' + res.data.filename;
        that.party.path = that.path;
        that.status.requestImage = true;
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
    party.addParty(that.party).then(function (data)
    {
      if(data.status==200)
      {
        that.status.request = true;
        $timeout(function (){$('.success-request-fixed').show().delay(2000).fadeOut(); },100);
        $scope.clearItem();
      }
    });
  };

}]);
