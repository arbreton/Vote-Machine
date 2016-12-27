'use strict';

var app = angular.module('adminCandidate', ['ngFileUpload', 'serviceMatch', 'serviceProvince']);

app.controller('registerCandidateController', [ '$scope', '$http', 'Upload', '$timeout', 'match', 'province', function($scope, $http, Upload, $timeout, match, province)
{
  var that = $scope;
  that.candidate = {};
  that.date_election_i = {};
  that.date_election_e = {};
  that.fecha_inicial = [{id: 1, fecha:"2000"}, {id: 2, fecha: "2005"}, {id: 3, fecha:"2010"}, {id: 4, fecha:"2015"}];
  that.fecha_final = [{id: 1, fecha:"2005"}, {id: 2, fecha: "2010"}, {id: 3, fecha:"2015"}, {id: 4, fecha:"2020"}];
  that.cantones = [];
  that.districts = [];
  that.matches = [];
  that.provinces = [];
  $scope.file = {};
  that.request = {};
  that.requestImage = {};
  that.candidates = [{}];

  match.getMatches().then(function (data)
  {
    that.matches = data;
  });
  
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
    that.candidate = {};
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
         that.candidates[index].election_date = {id: that.date_election_e.id , date:that.date_election_i.fecha +'-'+ that.date_election_e.fecha };
    });
    c= that.candidates;
    $http.post('api/candidate', c).success(function(data)
    {
      that.request = data;
      $timeout(function (){$('.success-request-fixed').show().delay(2000).fadeOut(); },100);
    });
  };

}]);
