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
  that.election_day = {};
  that.electionCandidate = {};
  that.popup = { opened: false };

  party.getParties().then(function (data)
  {
    that.parties = data;
  });

  election.getElection().then(function(data)
  {
    /*data.map(function (item)
    {*/
        that.elections = data;
    //});

  });

  $scope.getParty = function (value, index)
  {
    that.indexPrevious;
    if(that.parties[index].selectItem == undefined)
    {
      that.parties[index].selectItem = true;
    //  $scope.addPartyCandidate(value, index);
      if(that.indexPrevious != undefined)
      {
        that.parties[that.indexPrevious].selectItem = false;
        that.indexPrevious = index;
        $scope.addPartyCandidate(value, index);
      }
      else
      {
        that.indexPrevious = index;
      }
    }
    else
    {
      if(that.parties[index] == that.indexPrevious)
      {
        that.parties[index].selectItem = true;
        $scope.addPartyCandidate(value, index);
      }
      else
      {
        that.parties[that.indexPrevious].selectItem = false;
        that.parties[index].selectItem = true;
        that.indexPrevious = index;
        $scope.addPartyCandidate(value, index);
      }
    }
  };
  $scope.addPartyCandidate = function (value, index)
  {
    that.candidates[index].party = value;
  };
  $scope.open = function()
  {
    $scope.popup.opened = true;
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
    that.electionCandidate.candidates = that.candidates;
    that.electionCandidate.election = that.election_day._id;

    $http.post('api/candidate', that.electionCandidate).success(function(data)
    {
      that.request = data;
      $timeout(function (){$('.success-request-fixed').show().delay(2000).fadeOut(); },100);
      $scope.clearItem();
    });
  };

}]);
