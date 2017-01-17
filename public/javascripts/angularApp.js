var app = angular.module('votingApp', ['angular-loading-bar','ui.router',  'adminCandidate', 'adminListCandidate', 'adminParty','adminListParty','capitalizeFilter', 'authFactory', 'mainCtrl', 'authCtrl', 'navCtrl' , 'adminCtrl', 'election']);
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
		controller : 'votingController'
	}).state('login', {
		url : '/login',
		templateUrl : 'views/login.html',
		controller : 'AuthCtrl',
		onEnter : ['$state', 'auth',
		//Function to Redirect admins and users
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
		templateUrl : 'views/register.html',
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
	}).state('candidates', {
		url: '/admin/candidates',
		templateUrl: 'views/adminCandidate/listCandidateView.html',
		controller: 'listCandidateController'
	}).state('parties', {
		url: '/admin/parties',
		templateUrl: 'views/adminParty/listPartyView.html',
		controller: 'listPartyController'
	}).state('graphics', {
		url: '/graphics',
		templateUrl: 'views/graphicsView.html',
		controller: 'graphicsController'

	}).state('election', {
		url: '/admin/election',
		templateUrl: 'views/election/electionView.html',
		controller: 'electionController'
	})
	;
	$urlRouterProvider.otherwise('home');
}]);

