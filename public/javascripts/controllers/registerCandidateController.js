'use strict';

var app = angular.module('adminCandidate', ['ngFileUpload']);

app.controller('registerCandidateController', [ '$scope', '$http', 'Upload', function($scope, $http, Upload)
{
  var that = $scope;
  that.candidate = {};
  that.date_election_i = {};
  that.date_election_e = {};
  that.fecha_inicial = [{id: 1, fecha:"2000"}, {id: 2, fecha: "2005"}, {id: 3, fecha:"2010"}, {id: 4, fecha:"2015"}];
  that.fecha_final = [{id: 1, fecha:"2005"}, {id: 2, fecha: "2010"}, {id: 3, fecha:"2015"}, {id: 4, fecha:"2020"}];
  that.cantones = [];
  that.districts = [];
  that.partidos = [{id:1, descripcion:"Rojo"}, {id:2,descripcion:"Verde"}];
  that.provinces = [];
  that.file = {};
  that.fotos = [];
  that.foto = {};
  $scope.candidates = [{}];
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
      method: 'POST',
      data: {foto: file}
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
         that.candidates[index].fecha_election = {codigo: that.date_election_e.id , fecha:that.date_election_i.fecha + that.date_election_e.fecha };
    });
    c= that.candidates;
    //$scope.uploadFile(that.candidates);

    var x = that.candidates.map(function (item)
    {
      x = item.foto;
      that.fotos.push(x);
    });

    $scope.uploadFile(that.candidates);
    $http.post('api/candidate', c).success(function(data)
    {
      console.log(data);
    });
  };

}]);
