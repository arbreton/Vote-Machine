var app = angular.module('serviceMatch', []);

app.factory('match', ['$http', function ($http)
{
    this.match = {};
    this.match.getMatches = function ()
    {
      return $http.get('/api/match').then(function (res)
      {
          return res.data;
      });
    };
    return this.match;
}]);
