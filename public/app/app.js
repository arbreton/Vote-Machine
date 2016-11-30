var app = angular.module('votingApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider)
{
  $routeProvider.when('/votingapp',
  {
    templateUrl: '/views/index.html',
    controller: 'DashboardCandidatoController'
  });
}]);
