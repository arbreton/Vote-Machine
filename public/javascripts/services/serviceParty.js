var app = angular.module('serviceParty', []);

app.factory('party', ['$http', function ($http)
{
    this.match = {};
    this.match.getParties = function ()
    {
      return $http.get('/api/parties').then(function (res)
      {
          return res.data;
      });
    };
    return this.match;
}]);

