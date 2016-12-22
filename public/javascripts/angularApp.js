
var app = angular.module('votingApp', ['angular-loading-bar','ui.router',  'adminCandidate', 'adminListCandidate', 'ViewCharts']);

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
			/*if (auth.isLoggedIn()) {
				$state.go('home');
			}*/
		}]
		/*resolve : {
			postPromise : ['posts',
			function(posts) {
				return posts.getAll();
			}]*/

		
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
	}).state('posts', {
		url : '/posts/:id',
		templateUrl : '/posts.html',
		controller : 'PostsCtrl',
		resolve : {
			post : ['$stateParams', 'posts',
			function($stateParams, posts) {
				return posts.get($stateParams.id);
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
			/*if (auth.isLoggedIn()) {
				$state.go('home');
			}*/
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
		//controller : 'MainCtrl',
		controller : 'AdminController',
		/*resolve : {
			post : ['$stateParams', 'posts',
			function($stateParams, posts) {
				return posts.get($stateParams.id);
			}]

		}*/

	}).state('candidate',
	{
		url: '/admin/candidate',
		templateUrl: 'views/adminCandidate/registerCandidateView.html',
		controller: 'registerCandidateController'
	}).state('charts', {
		url : '/charts',
		templateUrl : 'views/charts.html',
		controller : 'chartsController'
		/*resolve : {
			post : ['$stateParams', 'posts',
			function($stateParams, posts) {
				return posts.get($stateParams.id);
			}]

		}*/
	}).state('candidates', {
		url: '/admin/candidates',
		templateUrl: 'views/adminCandidate/listCandidateView.html',
		controller: 'listCandidateController'

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
		$window.localStorage['votingapp-token'] = token;
	};

	auth.getToken = function() {
		return $window.localStorage['votingapp-token'];
	}

	auth.isLoggedIn = function() {
		var token = auth.getToken();

		if (token) {
			//console.log(JSON.parse($window.atob(token.split('.')[1])));
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			//console.log (JSON.parse($window.atob(token.split('.')[1])));
			return payload.exp > Date.now() / 1000;

		} else {
			return false;
		}
	};

	auth.isnotLoggedIn = function() {
		var token = auth.getToken();

		if (token) {
			//console.log(JSON.parse($window.atob(token.split('.')[1])));
			var payload = JSON.parse($window.atob(token.split('.')[1]));
			//console.log (JSON.parse($window.atob(token.split('.')[1])));
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
		$window.localStorage.removeItem('votingapp-token');
		$location.url("/home");
	};

	return auth;
}]);

app.factory('posts', ['$http', 'auth',
function($http, auth) {
	var o = {
		posts : []
	};

	o.getAll = function() {
		return $http.get('/posts').success(function(data) {
			angular.copy(data, o.posts);
		});
	};
	//now we'll need to create new posts
	//uses the router.post in index.js to post a new Post mongoose model to mongodb
	//when $http gets a success back, it adds this post to the posts object in
	//this local factory, so the mongodb and angular data is the same
	//sweet!
	o.create = function(post) {
	  return $http.post('/posts', post, {
	    headers: {Authorization: 'Bearer '+auth.getToken()}
	  }).success(function(data){
	    o.posts.push(data);
	  });
	};

	o.upvote = function(post) {
	  return $http.put('/posts/' + post._id + '/upvote', null, {
	    headers: {Authorization: 'Bearer '+auth.getToken()}
	  }).success(function(data){
	    post.upvotes += 1;
	  });
	};
	//downvotes
	o.downvote = function(post) {
	  return $http.put('/posts/' + post._id + '/downvote', null, {
	    headers: {Authorization: 'Bearer '+auth.getToken()}
	  }).success(function(data){
	    post.upvotes -= 1;
	  });
	};
	//grab a single post from the server
	o.get = function(id) {
		//use the express route to grab this post and return the response
		//from that route, which is a json of the post data
		//.then is a promise, a kind of newly native thing in JS that upon cursory research
		//looks friggin sweet; TODO Learn to use them like a boss.  First, this.
		return $http.get('/posts/' + id).then(function(res) {
			return res.data;
		});
	};
	//comments, once again using express
	o.addComment = function(id, comment) {
	  return $http.post('/posts/' + id + '/comments', comment, {
	    headers: {Authorization: 'Bearer '+auth.getToken()}
	  });
	};

	o.upvoteComment = function(post, comment) {
	  return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/upvote', null, {
	    headers: {Authorization: 'Bearer '+auth.getToken()}
	  }).success(function(data){
	    comment.upvotes += 1;
	  });
	};
	//downvote comments
	//I should really consolidate these into one voteHandler function
	o.downvoteComment = function(post, comment) {
	  return $http.put('/posts/' + post._id + '/comments/'+ comment._id + '/downvote', null, {
	    headers: {Authorization: 'Bearer '+auth.getToken()}
	  }).success(function(data){
	    comment.upvotes -= 1;
	  });
	};
	return o;
}]);


app.controller('MainCtrl', ['$scope', 'posts', 'auth',
function($scope, posts, auth) {
	$scope.posts = posts.posts;
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

	$scope.addPost = function() {
		if ($scope.title === '') {
			return;
		}
		posts.create({
			title : $scope.title,
			link : $scope.link,
		});
		//clear the values
		$scope.title = '';
		$scope.link = '';
	};

	$scope.upvote = function(post) {
		//our post factory has an upvote() function in it
		//we're just calling this using the post we have
		console.log('Upvoting:' + post.title + "votes before:" + post.upvotes);
		posts.upvote(post);
	};
	$scope.downvote = function(post) {
		posts.downvote(post);
	};
}]);

app.controller('AdminController', ['$scope', '$location', 'posts', 'auth', '$window',
function($scope, $location, posts, auth, $window) {

	//var token = auth.getToken();
	//var payload = JSON.parse($window.atob(token.split('.')[1]));
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

	$scope.newCandidate = function()
	{
			$location.url("/admin/candidate");
	};

	$scope.showCharts = function()
	{
			$location.url("/charts");
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


app.controller('PostsCtrl', ['$scope', 'posts', 'post', 'auth',
function($scope, posts, post, auth) {
	$scope.post = post;
	$scope.isLoggedIn = auth.isLoggedIn;

	$scope.addComment = function() {
		if ($scope.body === '') {
			return;
		}
		posts.addComment(post._id, {
			body : $scope.body,
			author : 'user'
		}).success(function(comment) {
			$scope.post.comments.push(comment);
		});
		$scope.body = '';
	};
	$scope.upvote = function(comment) {
		posts.upvoteComment(post, comment);
	};

	$scope.downvote = function(comment) {
		posts.downvoteComment(post, comment);
	};

}]);

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

