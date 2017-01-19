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

	o.getInteractiveChart=function(date,interactiveChartItem){
		return $http.get("/api/elections/graph/interactive/"+date+"/"+interactiveChartItem.provinceCode+"/"+interactiveChartItem.age+"/"+interactiveChartItem.hour+"/"+interactiveChartItem.ethnicGroup).then(function(res){
			return res.data;
			
		})
	};

	o.getInteractiveDistrictChart=function(date,interactiveChartItem){
		return $http.get("/api/elections/graph/interactive/district/"+date+"/"+interactiveChartItem.provinceCode).then(function(res){
			return res.data;
			
		})
	};

	o.getInteractiveAgeChart=function(date,interactiveChartItem){
		return $http.get("/api/elections/graph/interactive/age/"+date+"/"+interactiveChartItem.age).then(function(res){
			return res.data;
			
		})
	};

	o.getInteractiveDistrictAgeChart=function(date,interactiveChartItem){
		return $http.get("/api/elections/graph/interactive/districtAge/"+date+"/"+interactiveChartItem.provinceCode+"/"+interactiveChartItem.age).then(function(res){
			return res.data;
			
		})
	};

	o.getInteractiveHourChart=function(date,interactiveChartItem){
		return $http.get("/api/elections/graph/interactive/hour/"+date+"/"+interactiveChartItem.hour).then(function(res){
			return res.data;
			
		})
	};

	o.getInteractiveDistrictHourChart=function(date,interactiveChartItem){
		return $http.get("/api/elections/graph/interactive/districtHour/"+date+"/"+interactiveChartItem.provinceCode+"/"+interactiveChartItem.hour).then(function(res){
			return res.data;
			
		})
	};

	o.getInteractiveAgeHourChart=function(date,interactiveChartItem){
		return $http.get("/api/elections/graph/interactive/ageHour/"+date+"/"+interactiveChartItem.age+"/"+interactiveChartItem.hour).then(function(res){
			return res.data;
			
		})
	};

	o.getInteractiveDistrictAgeHourChart=function(date,interactiveChartItem){
		return $http.get("/api/elections/graph/interactive/districtAgeHour/"+date+"/"+interactiveChartItem.provinceCode+"/"+interactiveChartItem.age+"/"+interactiveChartItem.hour).then(function(res){
			return res.data;
			
		})
	};

	o.getInteractiveEthnicChart=function(date,interactiveChartItem){
		return $http.get("/api/elections/graph/interactive/ethnic/"+date+"/"+interactiveChartItem.ethnicGroup).then(function(res){
			return res.data;
			
		})
	};

	o.getInteractiveDistrictEthnicChart=function(date,interactiveChartItem){
		return $http.get("/api/elections/graph/interactive/districtEthnic/"+date+"/"+interactiveChartItem.provinceCode+"/"+interactiveChartItem.ethnicGroup).then(function(res){
			return res.data;
			
		})
	};

	o.getInteractiveAgeEthnicChart=function(date,interactiveChartItem){
		return $http.get("/api/elections/graph/interactive/ageEthnic/"+date+"/"+interactiveChartItem.age+"/"+interactiveChartItem.ethnicGroup).then(function(res){
			return res.data;
			
		})
	};

	o.getInteractiveDistrictAgeEthnicChart=function(date,interactiveChartItem){
		return $http.get("/api/elections/graph/interactive/districtAgeEthnic/"+date+"/"+interactiveChartItem.provinceCode+"/"+interactiveChartItem.age+"/"+interactiveChartItem.ethnicGroup).then(function(res){
			return res.data;
			
		})
	};

	o.getInteractiveHourEthnicChart=function(date,interactiveChartItem){
		return $http.get("/api/elections/graph/interactive/hourEthnic/"+date+"/"+interactiveChartItem.hour+"/"+interactiveChartItem.ethnicGroup).then(function(res){
			return res.data;
			
		})
	};

	o.getInteractiveDistrictHourEthnicChart=function(date,interactiveChartItem){
		return $http.get("/api/elections/graph/interactive/districtHourEthnic/"+date+"/"+interactiveChartItem.provinceCode+"/"+interactiveChartItem.hour+"/"+interactiveChartItem.ethnicGroup).then(function(res){
			return res.data;
			
		})
	};

	o.getInteractiveAgeHourEthnicChart=function(date,interactiveChartItem){
		return $http.get("/api/elections/graph/interactive/ageHourEthnic/"+date+"/"+interactiveChartItem.age+"/"+interactiveChartItem.hour+"/"+interactiveChartItem.ethnicGroup).then(function(res){
			return res.data;
			
		})
	};

	o.getInteractiveChart2=function(date,chartType,filter){
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
