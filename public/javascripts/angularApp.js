var app = angular.module('votingApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('home', {
		url : '/home',
		templateUrl : 'views/home.html',
		controller : 'MainCtrl',
		resolve : {
			postPromise : ['posts',
			function(posts) {
				return posts.getAll();
			}]

		}
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
		templateUrl : '/login.html',
		controller : 'AuthCtrl',
		onEnter : ['$state', 'auth',
		function($state, auth) {
			if (auth.isLoggedIn()) {
				$state.go('home');
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
		templateUrl : '/admin.html',
		controller : 'Null',
		/*resolve : {
			post : ['$stateParams', 'posts',
			function($stateParams, posts) {
				return posts.get($stateParams.id);
			}]

		}*/
	});

	$urlRouterProvider.otherwise('home');
}]);

app.factory('auth', ['$http', '$window',
function($http, $window) {
	var auth = {};

	auth.saveToken = function(token) {
		$window.localStorage['votinapp-token'] = token;
	};

	auth.getToken = function() {
		return $window.localStorage['votinapp-token'];
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

	auth.currentUser = function() {
		if (auth.isLoggedIn()) {
			var token = auth.getToken();
			var payload = JSON.parse($window.atob(token.split('.')[1]));

			return payload.username;
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
		$window.localStorage.removeItem('votinapp-token');
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
	//setting title to blank here to prevent empty posts
	$scope.title = '';

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
			$state.go('home');
		});
	};
}]);

app.controller('NavCtrl', ['$scope', 'auth',
function($scope, auth) {
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.currentUser = auth.currentUser;
	$scope.logOut = auth.logOut;
}]);

app.controller('votingController',['$scope', function($scope){


		$scope.msgPresCand1="Vote";
		$scope.msgPresCand2="Vote";
		$scope.msgPresCand3="Vote";
		$scope.msgPresCand4="Vote";
		$scope.msgPresCand5="Vote";
		$scope.msgPresCand6="Vote";

        $scope.cand1 = true;
        $scope.cand2 = true;
        $scope.cand3 = true;
        $scope.cand4 = true;
        $scope.cand5 = true;
        $scope.cand6 = true;



        $scope.candpres1 = true;
        $scope.candpres2 = true;
        $scope.candpres3 = true;
        $scope.candpres4 = true;
        $scope.candpres5 = true;
        $scope.candpres6 = true;


        $scope.nomcandpres1="Luis Guillermo Solís";
        $scope.partidocand1="Partido Acción Ciudadana";
        $scope.prop1candpres1="Iniciativa sociedades de convivencia";
        $scope.prop2candpres1="Respeto a los derechos de los animales";
        $scope.prop3candpres1="Reelección consecutiva única";
        
        $scope.nomcandpres2="Johnny Araya Monge";
        $scope.partidocand2="Partido Liberación Nacional";

        $scope.prop1candpres2="Propuesta 1";
        $scope.prop2candpres2="Propuesta 2";
        $scope.prop3candpres2="Propuesta 3";

        $scope.nomcandpres3="José María Villalta";
        $scope.partidocand3="Partido Frente Amplio";
        $scope.prop1candpres3="Propuesta 1";
        $scope.prop2candpres3="Propuesta 2";
        $scope.prop3candpres3="Propuesta 3";

        $scope.nomcandpres4="Otto Guevara Guth";
        $scope.partidocand4="Movimiento Libertario";
        $scope.prop1candpres4="Propuesta 1";
        $scope.prop2candpres4="Propuesta 2";
        $scope.prop3candpres4="Propuesta 3";

        $scope.nomcandpres5="Rodolfo Piza Rocafort";
        $scope.partidocand5="Partido Unidad Social Cristiana";
        $scope.prop1candpres5="Propuesta 1";
        $scope.prop2candpres5="Propuesta 2";
        $scope.prop3candpres5="Propuesta 3";

        $scope.nomcandpres6="José Miguel Corrales";
        $scope.partidocand6="Partido Patria Nueva";
        $scope.prop1candpres6="Propuesta 1";
        $scope.prop2candpres6="Propuesta 2";
        $scope.prop3candpres6="Propuesta 3";

        $scope.show = function(number) {
        	switch(number){
        		case 1:
        		$scope.cand1 = $scope.cand1 === false ? true: false;
        		break;
        		case 2:
        		$scope.cand2 = $scope.cand2 === false ? true: false;
        		break;
        		case 3:
        		$scope.cand3 = $scope.cand3 === false ? true: false;
        		break;
        		case 4:
        		$scope.cand4 = $scope.cand4 === false ? true: false;
        		break;
        		case 5:
        		$scope.cand5 = $scope.cand5 === false ? true: false;
        		break;
        		case 6:
        		$scope.cand6 = $scope.cand6 === false ? true: false;
        		break;

        		default:
        		break;
        	}
        };

        
        $scope.part1img="https://pac.cr/wp-content/uploads/2015/05/pac15_y1.png";
        $scope.part2img="http://alwaght.com/upload/logo/201629_6/20162935839245.jpg";
        $scope.part3img="http://4.bp.blogspot.com/-A3wXqdiplpw/Vc04v_vxECI/AAAAAAAAAMI/EeEMHCkaJcY/s1600/FRENTE%2BAMPLIO%2Blogo%2Bflor.jpg";
        $scope.part4img="http://2.bp.blogspot.com/-Bsjb-8D54f4/UEqPvGPlFLI/AAAAAAAABO4/PreBVEsTt5U/s1600/48820_100000625261389_313_n.jpg";
        $scope.part5img="https://radiosantaclara.org/media/uploads/logo_partido_unidad_social_cristiana_big.jpg";
        $scope.part6img="http://www.crwflags.com/fotw/images/c/cr%7Dpn.gif";
        

        $scope.cand1img="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Luis_Guillermo_Sol%C3%ADs%2C_Costa_Rica_03.JPG/800px-Luis_Guillermo_Sol%C3%ADs%2C_Costa_Rica_03.JPG";
        $scope.cand2img="https://upload.wikimedia.org/wikipedia/commons/c/c9/Johnny_Araya_en_el_festival_Chepe_Joven_2011_cropped.png";
        $scope.cand3img="https://upload.wikimedia.org/wikipedia/commons/4/47/Frente_Amplio_%28Costa_Rica%29_-_Asamblea_Provincial_en_Quesada_24_cropped.png";
        $scope.cand4img="https://upload.wikimedia.org/wikipedia/commons/b/b7/Otto_Guevara.jpg";
        $scope.cand5img="https://upload.wikimedia.org/wikipedia/commons/4/4e/Photo_of_Mr._Rodolfo_Piza_and_company_in_PUSC_cropped.png";
        $scope.cand6img="https://upload.wikimedia.org/wikipedia/commons/7/72/Jose_Miguel_Corrales_cropped.jpg";
        
        $scope.showother=function(){
        
        }

        $scope.nullvote=function(){
        
        }




        $scope.votepres = function(number) {
        	
        	switch(number){
        		case 1:
        			
        			$scope.othercand=false;
        		break;
        		case 2:
        			
        			$scope.othercand=false;
        		break;
        		case 3:
        			
        			$scope.othercand=false;
        		break;
        		case 4:
        			
        			$scope.othercand=false;
        		break;
        		case 5:
        			
        			$scope.othercand=false;
        		break;
        		case 6:
        			
        			$scope.othercand=false;
        		break;
        		default:
        		break;
        	}
            
            
        }
}]);

