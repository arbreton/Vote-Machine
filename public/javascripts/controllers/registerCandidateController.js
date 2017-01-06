'use strict';

var app = angular.module('adminCandidate', ['ngFileUpload', 'serviceParty', 'serviceProvince', 'ui.bootstrap', 'serviceElection']);

app.controller('registerCandidateController', [ '$scope', '$http', 'Upload', '$timeout', 'party', 'province', '$filter', 'election', function($scope, $http, Upload, $timeout, party, province, $filter, election)

{
  var that = $scope;
  that.candidate = {};
  that.select_item = { status:false};
  that.cantones = [];
  that.districts = [];
  that.elections = [];
  that.parties = [];
  that.provinces = [];
  $scope.file = {};
  that.request = {};
  that.requestImage = {};
  that.candidates = [{}];
  that.election_day_text = {};
  that.popup = { opened: false };

  party.getParties().then(function (data)
  {
    that.parties = data;
  });

  election.getElection().then(function(data)
  {
    that.elections = data;
  });

  $scope.getParty = function (value, index)
  {
    that.itemPrevious = index;
    that.item;
      if(that.itemPrevious == index)
      {
        if(that.item ==undefined)
        {
          that.parties[that.itemPrevious].selectItem = true;
          that.item = that.itemPrevious;
        }
        else {
          that.parties[index].selectItem = true;
          that.parties[that.item].selectItem = false;
        }
      }
      else {
        that.parties[that.itemPrevious].selectItem = false;
      }

  };
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
  province.getProvinces().then(function (data)
  {
    that.provinces = data
  });

  $scope.showCantones = function (cantones)
  {
     return that.cantones = cantones;
  };

  $scope.showParty = function (index, obj)
  {
    return  that.candidates[index].img_party= obj.image;
  };

  $scope.showDistricts = function(districts)
  {
    return that.districts = districts;
  };

  $scope.clearItem = function()
  {
    $scope.saveForm.$setPristine();
    $scope.restForm();
  };

  $scope.restForm = function()
  {
    that.candidates = [{}];
    that.requestImage = {};
  };
  $scope.restForm();
  $scope.uploadFile = function (file, index)
  {
    Upload.upload({
      url: 'api/file',
      method: 'POST',
      data: { image: file}
    }).then(function (resp)
    {
      $scope.addItemByIndex(index, resp.data);
      that.requestImage = resp;
    }, function (resp)
    {
    }, function (evt)
    {
    });
  };

    $scope.addNewChoice = function() {
    var newItemNo = that.candidates.length+1;
    that.candidates.push(that.candidate);
  };

  $scope.removeChoice = function() {
    var lastItem = $scope.candidates.length-1;
    that.candidates.splice(lastItem);
  };

  $scope.addItemByIndex = function(index, resImage)
  {
    if(index != null)
    {
      let path ='/uploads/'+resImage.filename;
      return that.candidates[index].image = path;
    }
  }
  $scope.saveItem = function ()
  {
    var c = that.candidates.map(function (obj, index)
    {
         that.candidates[index].initial_election = that.initial_election
         that.candidates[index].final_election = that.final_election;
         that.candidates[index].election_day = $scope.getDate();
    });
    c= that.candidates;
    $http.post('api/candidate', c).success(function(data)
    {
      that.request = data;
      $timeout(function (){$('.success-request-fixed').show().delay(2000).fadeOut(); },100);
      $scope.clearItem();
    });
  };

}]);
