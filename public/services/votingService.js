app.factory('Vote', ['$http', function($http){
	var o = {
		citizens: []
	};

	o.getAll = function() {
		return $http.get('/api/citizens').then(function(res){
			return res.data;
		});
	};

	o.addVote = function(voteInfo) {
		return $http.put('/api/citizens/'+voteInfo.id,voteInfo);
	};
	o.getElectionData=function(){
		return $http.get('/api/currentElection2').then(function(res){
			return res.data;
		})
	};
	return o;
}]);
