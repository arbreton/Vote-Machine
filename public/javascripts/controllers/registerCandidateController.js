'use strict';

var app = angular.module('adminCandidate', ['ngFileUpload']);

app.controller('registerCandidateController', [ '$scope', '$http', function($scope, $http)
{
  var that = $scope;
  that.eleccion = {};
  that.fecha_elecciones = [{id: 1, fecha:"2000-2005"}, {id: 2, fecha: "2005-2010"}, {id: 3, fecha:"2010-2015"}, {id: 4, fecha:"2015-2020"}];
  that.cantones = [];
  that.distritos = [];
  that.partidos = [{id:1, descripcion:"Rojo"}, {id:2,descripcion:"Verde"}];
  that.provincias = [
    {id:1, descripcion: "San Jose",
      cantones:[{id: 1, descripcion: "Central"}, {id: 2, descripcion: "Escazu"}, {id: 3, descripcion: "Mora"}],
      distritos: [{id: 1, descripcion: "Alajuela"}, {id: 2, descripcion: "San Jose"}, {id: 3, descripcion: "Carrizal"}]
     },
    {id:2, descripcion: "Alajuela",
    cantones:[{id: 1, descripcion: "Central"}, {id: 2, descripcion: "San Ramon"}, {id: 3, descripcion: "Gracia"}],
    distritos: [{id: 1, descripcion: "Carmen"}, {id: 2, descripcion: "Merced"}, {id: 3, descripcion: "Hospital"}]
  },
    {id:3, descripcion: "Cartago"},
    {id:4, descripcion: "Heridia"},
    {id:5, descripcion: "Guanacaste"},
    {id:6, descripcion: "Puntarenas"},
    {id:7, descripcion: "Limon"},
  ];



  $scope.showCantones = function (cantones)
  {
     that.cantones = cantones;
     return that.cantones;
  };

  $scope.showDistritos = function(distritos)
  {
    that.distritos = distritos;
    return that.distritos;
  };


}]);
