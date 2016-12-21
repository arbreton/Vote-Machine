'use strict';

var app = angular.module('adminCandidate', ['ngFileUpload', 'serviceMatch']);

app.controller('registerCandidateController', [ '$scope', '$http', 'Upload', '$timeout', 'match', function($scope, $http, Upload, $timeout, match)
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
  that.file = {};
  that.fotos = [];
  that.foto = {};
  that.request = {};
  $scope.candidates = [{}];

  match.getMatches().then(function (data)
  {
    that.matches = data;
  })
   $http.get('/api/provinces').success(function (res)
   {
     that.provinces = res;
   });

  $scope.showCantones = function (cantones)
  {
     return $scope.cantones = cantones;
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
    $scope.candidate = {};
  };

  $scope.uploadFile = function (file)
  {
    Upload.upload({
      url: 'api/file',
      method: 'POST',
      data: { image: file}
    }).then(function (resp)
    {
      console.log(resp)
    }, function (resp)
    {
      console.log(resp);
    }, function (evt)
    {
      console.log(evt);
    });
  };

    $scope.addNewChoice = function() {
    var newItemNo = $scope.candidates.length+1;
    $scope.candidates.push(that.candidate);
  };

  $scope.removeChoice = function() {
    var lastItem = $scope.candidates.length-1;
    $scope.candidates.splice(lastItem);
  };

  $scope.saveItem = function ()
  {
    var c = that.candidates.map(function (obj, index)
    {
         that.candidates[index].election_date = {id: that.date_election_e.id , date:that.date_election_i.fecha +'-'+ that.date_election_e.fecha };
    });
    c= that.candidates;
    //$scope.uploadFile(that.candidates);

    var x = that.candidates.map(function (item)
    {
      x = item.image;
      that.fotos.push(x);
    });

    //$scope.uploadFile(that.fotos);
    $http.post('api/candidate', c).success(function(data)
    {
      that.request = data;
      $timeout(function (){$('.success-request-fixed').show().delay(2000).fadeOut(); },100);
    });
  };

}]);
