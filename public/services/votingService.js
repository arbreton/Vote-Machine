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
/*
	o.create = function(post) {
		return $http.post('/api/new-post', post, {
			headers: {Authorization: 'Bearer ' + auth.getToken()}
		}).success(function(data){
			o.posts.push(data);
		});
	};

	o.upvote = function(post) {
			return $http.put('/api/posts/' + post._id + '/upvote', null, {
				headers: {Authorization: 'Bearer ' + auth.getToken()}
			}).success(function(data){
				post.upvotes += 1;
			});
		};

	o.get = function(id) {
		return $http.get('/api/posts/' + id).then(function(res){
			return res.data;
		})
	};

	o.addVote = function(voteInfo) {
		return $http.post('/serv/put', voteInfo, {
			headers: {Authorization: 'Bearer ' + auth.getToken()}
		});
	};

	o.edit = function(post) {
		return $http.put('/api/edit-post', post, {
			headers: {Authorization: 'Bearer ' + auth.getToken()}
		});
	};

	o.delete = function(post) {
		return $http.delete('/api/delete-post/'+post._id,  {
			headers: {Authorization: 'Bearer ' + auth.getToken()}
		});
	};
	*/
	return o;
}]);
