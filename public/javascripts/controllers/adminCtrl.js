var app = angular.module('adminCtrl', []);
app.controller('AdminController', ['$scope', '$location', 'auth', '$window',
function($scope, $location, auth, $window) {
	$scope.isLoggedIn = auth.isLoggedIn;
	$scope.isnotLoggedIn = auth.isnotLoggedIn;
	$scope.isAdmin = auth.isAdmin;
	if(auth.isLoggedIn()==true){
	$scope.name = auth.payload().name;
	$scope.firstLastName = auth.payload().firstLastName;
	$scope.secondLastName = auth.payload().secondLastName;
	$scope.province = auth.payload().province;
	$scope.canton = auth.payload().canton;
	$scope.district = auth.payload().district;
	$scope.birthDate = auth.payload().birthDate;
	$scope.image = auth.payload().image;
	}
	//setting title to blank here to prevent empty posts
	$scope.title = '';
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
			$location.url("/graphics");
	};

	$scope.showCandidates = function ()
	{
			$location.url("/admin/candidates");
	};
	$scope.showParties = function ()
	{
			$location.url("/admin/parties");
	};
	$scope.voteNow = function()
	{
			$location.url("/voting");
	};
	$scope.showElection = function ()
	{
		$location.url("/admin/election");
	};
	$scope.showRegister = function ()
	{
		$location.url("/admin/register");
	};
}]);