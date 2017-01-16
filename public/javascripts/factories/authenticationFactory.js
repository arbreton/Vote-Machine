var app = angular.module('authFactory', []);
app.factory('auth', ['$http', '$window', '$location',
function($http,$window, $location) {
	var auth = {};

	auth.saveToken = function(token) {
		$window.localStorage['votingApp-token'] = token;
	};
	auth.getToken = function() {
		return $window.localStorage['votingApp-token'];
	}
	auth.isLoggedIn = function() {
		var token = auth.getToken();
		if (token) {
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.exp > Date.now() / 1000;

		} else {
			return false;
		}
	};
//Verifying if the user is not logged in
	auth.isnotLoggedIn = function() {
		var token = auth.getToken();

		if (token) {
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return false;
		} else {
			return true;
		}
	};
//Verifying if the user is admin
	auth.isAdmin = function() {
		if (auth.isLoggedIn()) {
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			if(payload.role == "ad"){
				return true;
			}else{
				return false;
			}
		}
	};
// Token
	auth.payload = function() {
		if (auth.isLoggedIn()) {
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload;
		}
	};
// Checking the current user
	auth.currentUser = function() {
		if (auth.isLoggedIn()) {
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.electoralCode;
		}
	};
	auth.currentID = function() {
		if (auth.isLoggedIn()) {
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload._id;
		}
	};
	auth.currentBD = function() {
		if (auth.isLoggedIn()) {
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.birthDate;
		}
	};
	auth.currentGender = function() {
		if (auth.isLoggedIn()) {
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.gender;
		}
	};
	auth.currentProvince = function() {
		if (auth.isLoggedIn()) {
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.provinceCode;
		}
	};
	auth.currentEthnicGroup = function() {
		if (auth.isLoggedIn()) {
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.ethnicGroup;
		}
	};
	auth.register = function(user) {
		return $http.post('/register', user).success(function(data) {
			auth.saveToken(data.token);
		});
	};

	auth.logIn = function(user) {
		return $http.post('/login', user).success(function(data) {
			auth.saveToken(data.token);
		});
	};
	auth.logOut = function() {
		$window.localStorage.removeItem('votingApp-token');
		$location.url("/home");
	};
	return auth;
}]);