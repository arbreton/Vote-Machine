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
		return $http.put('/api/elections/'+voteInfo.electionID+'/'+voteInfo.candidateID+'/'+voteInfo.citizenID,voteInfo);
	};
	o.addVoteCit = function(voteInfo) {
		return $http.put('/api/elections/vote/'+voteInfo.electionID+'/'+voteInfo.candidateID+'/'+voteInfo.citizenID,voteInfo);
	};
	o.getElectionData=function(){
		return $http.get('/api/currentElection2').then(function(res){
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
