'use strict';

var app = angular.module('adminCandidate', ['ngFileUpload']);

app.controller('registerCandidateController', [ '$scope', '$http', 'Upload', function($scope, $http, Upload)
{
  var that = $scope;
  that.candidate = {};
  that.fecha_inicial = [{id: 1, fecha:"2000"}, {id: 2, fecha: "2005"}, {id: 3, fecha:"2010"}, {id: 4, fecha:"2015"}];
  that.fecha_final = [{id: 1, fecha:"2005"}, {id: 2, fecha: "2010"}, {id: 3, fecha:"2015"}, {id: 4, fecha:"2020"}];
  that.cantones = [];
  that.districts = [];
  that.partidos = [{id:1, descripcion:"Rojo"}, {id:2,descripcion:"Verde"}];
  that.provinces = [];
  that.file = {};
  $scope.candidates = [{id: 'choice1'}];
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
    //$scope.saveForm.$setPristine();
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
      data: {file: file}
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
    $scope.candidates.push({'id':'candidates'+newItemNo});
  };

  $scope.removeChoice = function() {
    var lastItem = $scope.candidates.length-1;
    $scope.candidates.splice(lastItem);
  };

  $scope.saveItem = function ()
  {
    $scope.uploadFile(that.file);

    $http.post('api/candidate').success(function(data)
    {
      console.log(data);
    });
  };

}]);
