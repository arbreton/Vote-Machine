'use strict';

var app = angular.module('adminCandidate', ['ngFileUpload', 'serviceMatch', 'serviceProvince', 'ui.bootstrap']);

app.controller('registerCandidateController', [ '$scope', '$http', 'Upload', '$timeout', 'match', 'province', '$filter', function($scope, $http, Upload, $timeout, match, province, $filter)
{
  var that = $scope;
  that.candidate = {};
  that.date_election_i = {};
  that.date_election_e = {};
  that.initial_elections = [{id: 1, date:"2000"}, {id: 2, date: "2005"}, {id: 3, date:"2010"}, {id: 4, date:"2015"}];
  that.final_elections = [{id: 1, date:"2005"}, {id: 2, date: "2010"}, {id: 3, date:"2015"}, {id: 4, date:"2020"}];
  that.cantones = [];
  that.final_election = {};
  that.initial_election = {};
  that.districts = [];
  that.matches = [];
  that.provinces = [];
  $scope.file = {};
  that.request = {};
  that.requestImage = {};
  that.candidates = [{}];
  that.election_day = {};
  that.election_day_text = {};
  that.popup = { opened: false };
  match.getMatches().then(function (data)
  {
    that.matches = data;
  });

  $scope.open = function()
  {
    $scope.popup.opened = true;
  };

  $scope.getDate = function ()
  {
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

  $scope.showMatch = function (index, obj)
  {
    return  that.candidates[index].img_match= obj.image;
  };

  $scope.showDistricts = function(districts)
  {
    return that.districts = districts;
  };

  $scope.clearItem = function()
  {
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
    });
  };

}]);
