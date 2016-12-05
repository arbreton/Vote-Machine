'use strict';

var app = angular.module('adminListCandidate', ['datatables']);

app.controller('listCandidateController', [ '$scope', '$http', function($scope, $http)
{
  var that = $scope;
  that.eleccion = {};
  that.fecha_elecciones = [{id: 1, fecha:"2000-2005"}, {id: 2, fecha: "2005-2010"}, {id: 3, fecha:"2010-2015"}, {id: 4, fecha:"2015-2020"}];
  that.provincias = [
    {id:1, descripcion: "San Jose", cantones:[{id: 1, descripcion: "Central"}, {id: 2, descripcion: "Escazu"}, {id: 3, descripcion: "Mora"}] },
    {id:2, descripcion: "Alajuela"},
    {id:3, descripcion: "Cartago"},
    {id:4, descripcion: "Heridia"},
    {id:5, descripcion: "Guanacaste"},
    {id:6, descripcion: "Puntarenas"},
    {id:7, descripcion: "Limon"},
  ];

}]);
