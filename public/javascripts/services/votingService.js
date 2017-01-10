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
		return $http.put('/api/elections/'+voteInfo.election_id+'/'+voteInfo.candidate_id+'/'+voteInfo.citizen_id,voteInfo);
	};
	o.addVoteCit = function(voteInfo) {
		return $http.put('/api/elections/vote/'+voteInfo.election_id+'/'+voteInfo.candidate_id+'/'+voteInfo.citizen_id,voteInfo);
	};
	o.getElectionData=function(){
		return $http.get('/api/currentElection2').then(function(res){
			return res.data;
			
		})
	};
	o.getElectionUserData=function(temporalItem){
		return $http.get('/api/currentElection3/'+temporalItem.election_id+"/"+temporalItem.citizen_id).then(function(res){
			return res.data;
			
		})
	};
	return o;
}]);
