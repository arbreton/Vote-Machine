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
        item.electionDay = $filter('date')(new Date(item.electionDay), 'yyyy-MM-dd');
        item.finalElection = $filter('date')(new Date(item.finalElection), 'yyyy-MM-dd');
        item.initialElection = $filter('date')(new Date(item.initialElection), 'yyyy-MM-dd');
      });
       return res.data;
    });
  }; //end funcion getElection

  this.election.filterElection = function (elections, selectDate)
  {
    elections.filter(function(item)
    {
      return item.electionDay == selectDate;
    });
    return elections;
  };
  return this.election;
}]);
