app.controller('graphicsController',['$scope','Vote','$state','$filter','auth','$window', function($scope,Vote,$state,$filter,auth,$window){

        $scope.generalChart=true;
        $scope.hourChart=false;
        $scope.ageChart=false;
        $scope.earlyChart=false;
        $scope.showChart = function(chart) {
            switch(chart)
            {
                case 'General':
                $scope.generalChart=true;
                $scope.hourChart=false;
                $scope.ageChart=false;
                $scope.earlyChart=false;
                break;
                case 'Hour':
                $scope.generalChart=false;
                $scope.hourChart=true;
                $scope.ageChart=false;
                $scope.earlyChart=false;
                break;
                case 'Age':
                $scope.generalChart=false;
                $scope.hourChart=false;
                $scope.ageChart=true;
                $scope.earlyChart=false;
                break;
                case 'Early':
                $scope.generalChart=false;
                $scope.hourChart=false;
                $scope.ageChart=false;
                $scope.earlyChart=true;
                break;
                default:
                break;

            }
        };

        
}]);