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

	return o;
}]);
