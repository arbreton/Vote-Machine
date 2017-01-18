var app = angular.module('serviceCandidate', []);

app.factory('candidate', ['$http', function ($http)
{
    this.candidate = {};
    this.candidate.getCandidates = function ()
    {
      return $http.get('/api/parties').then(function (res)
      {
          return res.data;
      });
    };

    this.candidate.addCandidate = function(obj)
    {
      return $http.post('/api/candidate', obj).then(function (res)
      {
        return res.data;
      });
    };

    this.candidate.deleteCandidate = function (obj)
    {
      return $http.put('/api/candidate-delete/'+ obj._id , obj ).then(function (res)
      {
        return that.res = data;
      });
    };

    return this.candidate;
}]);
