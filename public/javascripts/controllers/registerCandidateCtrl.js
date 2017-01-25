'use strict';

var app = angular.module('adminCandidate', ['ngFileUpload','ui.bootstrap', 'serviceParty', 'serviceProvince', 'serviceElection', 'serviceCandidate']);

app.controller('registerCandidateCtrl', [ '$scope','$timeout' ,'$filter', 'Upload', 'party', 'province', 'election','candidate',
function($scope, $timeout, $filter, Upload, party, province, election, candidate)
{
  $scope.candidate = {};
  $scope.select_item =
  {
    status:false
  };
  $scope.cantones = [];
  $scope.districts = [];
  $scope.elections = [];
  $scope.parties = [];
  $scope.provinces = [];
  $scope.file = {};
  $scope.request = {};
  $scope.requestImage = {};
  $scope.election_day = {};
  $scope.electionCandidate = {};

  party.getParties().then(function (data)
  {
    $scope.parties = data;
  });

  election.getElection().then(function(data)
  {
        $scope.elections = data;
  });

  $scope.getParty = function (value, index)
  {
    $scope.indexPrevious;
    if($scope.parties[index].selectItem == undefined)
    {
      $scope.parties[index].selectItem = true;
      if($scope.indexPrevious != undefined)
      {
        $scope.parties[$scope.indexPrevious].selectItem = false;
        $scope.indexPrevious = index;
        $scope.addPartyCandidate(value);
      }
      else
      {
        $scope.indexPrevious = index;
        $scope.addPartyCandidate(value);
      }
    }
    else
    {
      if($scope.parties[index] == $scope.indexPrevious)
      {
        $scope.parties[index].selectItem = true;
        $scope.addPartyCandidate(value);
      }
      else
      {
        $scope.parties[$scope.indexPrevious].selectItem = false;
        $scope.parties[index].selectItem = true;
        $scope.indexPrevious = index;
        $scope.addPartyCandidate(value);
      }
    }
  };

  $scope.addPartyCandidate = function (obj)
  {
    $scope.candidate.party = obj;
  };

  province.getProvinces().then(function (data)
  {
    $scope.provinces = data
  });

  $scope.showCantones = function (cantones)
  {
     return $scope.cantones = cantones;
  };

  $scope.showParty = function (index, obj)
  {
    return  $scope.candidates[index].img_party= obj.image;
  };

  $scope.showDistricts = function(districts)
  {
    return $scope.districts = districts;
  };

  $scope.clearItem = function()
  {
    $scope.saveForm.$setPristine();
    $scope.restForm();
  };

  $scope.restForm = function()
  {
    $scope.candidate = {};
    $scope.requestImage = {};
    $scope.select_item = { status:false};
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
      $scope.addItemByIndex( resp.data);
      $scope.requestImage = resp;
    },
    function (resp){
    },
     function (evt){
    });
  };

  $scope.addItemByIndex = function(resImage)
  {
      let path ='/uploads/'+resImage.filename;
      return $scope.candidate.image = path;
  }
  $scope.saveItem = function ()
  {
    /*$scope.electionCandidate.candidates = $scope.candidates;
    $scope.electionCandidate.election =*/
    $scope.candidate.election= $scope.electionDay._id;
    candidate.addCandidate($scope.candidate).then(function(data)
    {
      $scope.request = data;
      $timeout(function ()
      {
        $('.success-request-fixed').show().delay(2000).fadeOut();
      },100);
      $scope.clearItem();
    });
  };

}]);
