var app = angular.module('authCtrl', []);
app.controller('AuthCtrl', ['$scope', '$state', 'auth','$window',
function($scope, $state, auth, $window) {
	$scope.user = {};
	$scope.register = function() {
		auth.register($scope.user).error(function(error) {
				$scope.error = error;
		}).then(function() {
			$window.alert("Your request has been submitted, please wait from 2-3 business days for a reply on your email with additional information on how to recover your account.");
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