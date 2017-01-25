var app = angular.module('votingApp', ['angular-loading-bar','ui.router',  'adminCandidate', 'adminListCandidate', 'adminParty','adminListParty','capitalizeFilter' , 'provinceFactory' ,'authFactory', 'mainCtrl', 'registerCtrl' ,'authCtrl', 'navCtrl' , 'adminCtrl', 'election', 'formly', 'formlyBootstrap']);
app.config(['$stateProvider', '$urlRouterProvider','formlyConfigProvider',
function($stateProvider, $urlRouterProvider, formlyConfigProvider) {

formlyConfigProvider.setType({ 
          name: 'datepicker', 
          template: '<input  id="{{id}}" class="form-control" ng-click="open($event)" ng-model="model[options.key  || index]" is-open="to.isOpen" ng-click="to.isOpen = true" datepicker-options="to.datepickerOptions" />', 
          wrapper: ['bootstrapLabel', 'bootstrapHasError'], 
          controller: ['$scope', function($scope) { 
             $scope.open = function($event) { 
              $event.preventDefault(); 
              $event.stopPropagation(); 
              $scope.opened = true; 
            }; 
           }], 
          defaultOptions: { 
            templateOptions: { 
              addonLeft: { 
                class: 'glyphicon glyphicon-calendar', 
                onClick: function(options, scope) { 
                  options.templateOptions.isOpen = !options.templateOptions.isOpen; 
                } 
              },        
              onFocus: function($viewValue, $modelValue, scope) { 
                scope.to.isOpen = !scope.to.isOpen; 
              }, 
              datepickerOptions: {} 
            } 
          } 
        }); 

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
		controller : 'VotingCtrl'
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
	}).state('adminregister', {
		url : '/admin/register',
		templateUrl : 'views/adminRegister.html',
		controller : 'AdminController',
	}).state('candidate',
	{
		url: '/admin/candidate',
		templateUrl: 'views/adminCandidate/registerCandidateView.html',
		controller: 'registerCandidateCtrl'
	}).state('party',
	{
		url: '/admin/party',
		templateUrl: 'views/adminParty/registerPartyView.html',
		controller: 'registerPartyCtrl'
	}).state('candidates', {
		url: '/admin/candidates',
		templateUrl: 'views/adminCandidate/listCandidateView.html',
		controller: 'listCandidateCtrl'
	}).state('parties', {
		url: '/admin/parties',
		templateUrl: 'views/adminParty/listPartyView.html',
		controller: 'listPartyCtrl'
	}).state('graphics', {
		url: '/graphics',
		templateUrl: 'views/graphicsView.html',
		controller: 'ChartCtrl'

	}).state('election', {
		url: '/admin/election',
		templateUrl: 'views/election/electionView.html',
		controller: 'electionCtrl'
	})
	;
	$urlRouterProvider.otherwise('home');
}]);
