
var app = angular.module('confirmation', []);
app.controller('modalConfirmationCtrl', ['$scope', '$uibModalInstance', 'item', function ($scope, $uibModalInstance, item)
{
  $scope.candidate = item;
  $scope.confirmation = {yes: true, no: false};
  $scope.cancel = function()
  {
    $uibModalInstance.close($scope.confirmation.no);
  };
  $scope.ok = function()
  {
    $uibModalInstance.close($scope.confirmation.yes);
  };

}]);
