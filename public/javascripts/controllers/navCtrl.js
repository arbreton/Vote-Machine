var app = angular.module('navCtrl', []);
app.controller('NavCtrl', ['$scope', 'auth',
function($scope, auth) {
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.currentUser = auth.currentUser;
	$scope.isAdmin = auth.isAdmin;
	$scope.logOut = auth.logOut;
	$scope.currentID=auth.currentID;
}]);