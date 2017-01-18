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

  this.election.addElection= function(obj)
  {
    return $http.post('/api/election', obj).then(function (res)
    {
      return res.data;
    });
  };

  this.election.getElection2 = function ()
  {
    return  $http.get('/api/election').then( function (res)
    {
      res.data.map(function(item)
      {
        item._id = item._id;
        item.electionDay =item.electionDay;

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
