app.factory('chartService', ['$http', function($http){
	var o = {	};

	o.getAll = function() {
		return $http.get('/api/citizens').then(function(res){
			return res.data;
		});
	};

	o.addVote = function(voteInfo) {
		return $http.put('/api/elections/'+voteInfo.electionID+'/'+voteInfo.candidateID+'/'+voteInfo.citizenID,voteInfo);
	};
	o.addVoteCit = function(voteInfo) {
		return $http.put('/api/elections/vote/'+voteInfo.electionID+'/'+voteInfo.candidateID+'/'+voteInfo.citizenID,voteInfo);
	};
	o.getGeneralChart=function(date){
		return $http.get("/api/elections/graph/"+date+"/votes").then(function(res){
			return res.data;
			
		})
	};
	o.getElectionUserData=function(temporalItem){
		return $http.get('/api/currentElection3/'+temporalItem.electionID+"/"+temporalItem.citizenID).then(function(res){
			return res.data;
			
		})
	};
	return o;
}]);
