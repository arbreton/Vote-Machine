app.factory('chartService', ['$http', function($http){
	var o = {	};

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

	o.getTimeChart=function(date){
		return $http.get("/api/elections/graph/"+date+"/time").then(function(res){
			return res.data;
			
		})
	};

	o.getAgeChart=function(date){
		return $http.get("/api/elections/graph/"+date+"/age").then(function(res){
			return res.data;
			
		})
	};

	o.getHourChart=function(date,hour){
		return $http.get("/api/elections/graph/"+date+"/votes/"+hour).then(function(res){
			return res.data;
			
		})
	};

	o.getInteractiveChart=function(date,chartType,filter){
		return $http.get("/api/elections/graph/interactive/"+date+"/"+chartType+"/"+filter).then(function(res){
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
