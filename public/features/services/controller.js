function ServiceCtrl($scope){
	console.log("Hello From ServiceCtrl")
	$scope.message = "Hello from controllers"

	var svc1 = {
		name: "LinkedIn"
	}

	var svc2 = {
		name: "Rotten Tomatoes"
	}

	var serviceClients = [svc1,svc2]
	$scope.serviceClients = serviceClients;
}