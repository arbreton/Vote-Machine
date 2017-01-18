var app = angular.module('serviceParty', []);

app.factory('party', ['$http', function ($http)
{
    this.party = {};
    this.party.getParties = function ()
    {
      return $http.get('/api/parties').then(function (res)
      {
          return res.data;
      });
    };

    this.party.addParty = function(obj)
    {
      return $http.post('/api/parties', obj).then(function (res)
      {
        return res.data;
      });
    };

    this.party.deleteParty = function (obj)
    {
      return $http.put('/api/party-delete/'+ obj._id , obj ).then(function (res)
      {
        return that.res = data;
      });
    };

    return this.party;
}]);
