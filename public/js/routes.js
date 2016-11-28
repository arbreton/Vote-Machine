var app = angular.module('admin', ['dashboard.candidatos', 'ngRoute']);

app.config(['$routeProvider', function ($routeProvider)
{
    $routeProvider.when('#/dashboard/candidatos',
    {
      templateUrl: '../views/navar.view.ejs',
      controller: 'DashboardCandidatoController'
    });
}]);
