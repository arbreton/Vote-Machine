var app = angular.module('serviceProvince', []);

app.factory('province', ['$http', function ($http)
{
  this.province = {};
  this.province.getProvinces = function ()
  {
    return $http.get('/api/provinces').then(function (res)
    {
        return res.data;
    });
  };

  return this.province;
}]);
