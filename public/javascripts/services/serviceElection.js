var app = angular.module('serviceElection', []);

app.factory('election', ['$http', '$filter', function($http, $filter)
{
  this.election = {};
  this.election.getElection = function ()
  {
    return  $http.get('/api/election').then( function (res)
    {
      res.data.map(function(item)
      {
        item._id = item._id;
        item.election_day = $filter('date')(new Date(item.election_day), 'yyyy-MM-dd');
        item.final_election = $filter('date')(new Date(item.final_election), 'yyyy-MM-dd');
        item.initial_election = $filter('date')(new Date(item.initial_election), 'yyyy-MM-dd');
      });
       return res.data;
    });
  };
  return this.election;
}]);
