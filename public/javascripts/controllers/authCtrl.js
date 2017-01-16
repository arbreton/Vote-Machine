var app = angular.module('authCtrl', []);
app.controller('AuthCtrl', ['$scope', '$state', 'auth',
function($scope, $state, auth) {
	$scope.user = {};

	$scope.register = function() {
		auth.register($scope.user).error(function(error) {
			$scope.error = error;
		}).then(function() {
			$state.go('home');
		});
	};
	$scope.logIn = function() {
		auth.logIn($scope.user).error(function(error) {
			$scope.error = error;
		}).then(function() {
			if(auth.isAdmin() == false){
				$state.go('voting');
			}
			if(auth.isAdmin() == true){
				$state.go('admin');
			}
		});
	};
}]);