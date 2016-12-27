var app = angular.module('votingApp', ['angular-loading-bar','ui.router',  'adminCandidate', 'adminListCandidate', 'adminParty', 'ViewCharts']);

app.config(['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home', {
		url : '/home',
		templateUrl : '/home.html',
		controller : 'MainCtrl',
		onEnter : ['$state', 'auth',
		function($state, auth) {
			if (auth.isAdmin() == false) {
				$state.go('voting');
			}
			if (auth.isAdmin() == true) {
				$state.go('admin');
			}

		}]

	}).state('voting', {
		url : '/voting',
		templateUrl : 'views/votingView.html',
		controller : 'votingController',
		resolve : {
			postPromise : ['posts',
			function(posts) {
				return posts.getAll();
			}]

		}
	}).state('login', {
		url : '/login',
		templateUrl : 'views/login.html',
		controller : 'AuthCtrl',
		onEnter : ['$state', 'auth',
		function($state, auth) {
			if (auth.isAdmin() == false) {
				$state.go('voting');
			}
			if (auth.isAdmin() == true) {
				$state.go('admin');
			}

		}]

	}).state('register', {
		url : '/register',
		templateUrl : '/register.html',
		controller : 'AuthCtrl',
		onEnter : ['$state', 'auth',
		function($state, auth) {
			if (auth.isLoggedIn()) {
				$state.go('home');
			}
		}]

	}).state('admin', {
		url : '/admin',
		templateUrl : 'views/adminDash.html',
		controller : 'AdminController',
	}).state('candidate',
	{
		url: '/admin/candidate',
		templateUrl: 'views/adminCandidate/registerCandidateView.html',
		controller: 'registerCandidateController'
	}).state('party',
	{
		url: '/admin/party',
		templateUrl: 'views/adminParty/registerPartyView.html',
		controller: 'registerPartyController'
	}).state('charts', {
		url : '/charts',
		templateUrl : 'views/charts.html',
		controller : 'chartsController'
	}).state('candidates', {
		url: '/admin/candidates',
		templateUrl: 'views/adminCandidate/listCandidateView.html',
		controller: 'listCandidateController'


	}).state('graphics', {
		url: '/graphics',
		templateUrl: 'views/graphicsView.html'

	}).state('partys', {
		url: '/admin/partys',
		templateUrl: 'views/adminParty/listPartyView.html',
		controller: 'listPartyController'


	}).state('JSONtest', {
		url: '/JSONtest',
		templateUrl: 'views/JSONtest.html'

	})
	;


	$urlRouterProvider.otherwise('home');
}]);




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

	auth.isnotLoggedIn = function() {
		var token = auth.getToken();

		if (token) {
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return false;

		} else {
			return true;
		}
	};

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



	auth.payload = function() {
		if (auth.isLoggedIn()) {
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload;
		}
	};


	auth.currentUser = function() {
		if (auth.isLoggedIn()) {
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload.electoral_code;
		}
	};

	auth.currentID = function() {
		if (auth.isLoggedIn()) {
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			return payload._id;
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

app.controller('AdminController', ['$scope', '$location', 'auth', '$window',
function($scope, $location, auth, $window) {

	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.isnotLoggedIn = auth.isnotLoggedIn;
	$scope.isAdmin = auth.isAdmin;
	if(auth.isLoggedIn()==true){
	$scope.name = auth.payload().name;
	$scope.first_lastname = auth.payload().first_lastname;
	$scope.second_lastname = auth.payload().second_lastname;
	$scope.province = auth.payload().province;
	$scope.canton = auth.payload().canton;
	$scope.district = auth.payload().district;
	$scope.birth_year = auth.payload().birth_year;
	}

	//setting title to blank here to prevent empty posts
	$scope.title = '';
	//console.log(auth.payload());

//setting the loading spinner when the user logs in
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

//button functionality
	$scope.newCandidate = function()
	{
			$location.url("/admin/candidate");
	};

	$scope.newParty = function()
	{
			$location.url("/admin/party");
	};

	$scope.showCharts = function()
	{
			$location.url("/charts");
	};

	$scope.showCandidates = function ()
	{
			$location.url("/admin/candidates");
	};

	$scope.voteNow = function()
	{
			$location.url("/voting");
	};


}]);


app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});


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

app.controller('NavCtrl', ['$scope', 'auth',
function($scope, auth) {
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.currentUser = auth.currentUser;
	$scope.isAdmin = auth.isAdmin;
	$scope.logOut = auth.logOut;
	$scope.currentID=auth.currentID;
}]);
