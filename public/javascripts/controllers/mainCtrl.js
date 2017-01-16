var app = angular.module('mainCtrl', []);
app.controller('MainCtrl', ['$scope', 'auth',
function($scope, auth) {
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.isAdmin = auth.isAdmin;
	//setting title to blank here to prevent empty posts
	$scope.title = '';
	$scope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if (toState.resolve) {
        $scope.showSpinner();
    }
});
$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    if (toState.resolve) {
        $scope.hideSpinner();
    }
});
}]);