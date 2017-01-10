var app = angular.module('serviceElection', []);

app.factory('election', ['$http', function($http)
{
  this.election = {};
  this.election.getElection = function ()
  {
    return  $http.get('/api/election').then( function (res)
    {
       return res.data;
    });
  };
  return this.election;
}]);
