app.controller('votingController',['$scope','Vote','$state','$filter','auth','$uibModal','$window', function($scope,Vote,$state,$filter,auth,$uibModal,$window){


        $scope.voteInfo={};
        $scope.voteInfo.citizenID=auth.currentID();
        $scope.voteInfo.BD=auth.currentBD();
        $scope.voteInfo.gender=auth.currentGender();
        $scope.voteInfo.provinceCode=auth.currentProvince();
        $scope.voteInfo.ethnicGroup=auth.currentEthnicGroup();
        $scope.today = new Date();
        $scope.nowyear = $scope.today.getFullYear();
        $scope.voteInfo.age=parseInt($scope.nowyear)-parseInt($scope.voteInfo.BD.substring(0,4));



        $scope.electionInfo={};
        $scope.electionInfo.candidates={};

        Vote.getElectionData().then(function(data){
            $scope.electionInfo=data;
            if(data.length>0){
                $scope.voteInfo.electionID=$scope.electionInfo[0]._id;
                $scope.temporalItem={};
                $scope.temporalItem.citizenID=$scope.voteInfo.citizenID;
                $scope.temporalItem.electionID=$scope.voteInfo.electionID;
                Vote.getElectionUserData($scope.temporalItem).then(function(data){
                    if(data.length>0){
                        $window.alert("You have already voted and will be disconected");
                        auth.logOut();;

                    }
                });
            }
            else
            {
                $window.alert("There is no current election, you will be disconected");
                auth.logOut();;
            }
        });


        $scope.showOther=function(){

        }

        $scope.nullvote=function(){
            $scope.voteInfo.candidate_id=0;
            $scope.voteInfo.name='null';
            $scope.voteInfo.firstLastName='null';
            $scope.voteInfo.secondLastName='null';
            $scope.voteInfo.proposals='null';
            $scope.voteInfo.code='null';
            $scope.voteInfo.description='null';
            $scope.$parent.voteInfo=$scope.voteInfo;
        }





        $scope.votepres = function(number) {
            $scope.voteInfo.candidate_id=(number);
            var candidate = $scope.electionInfo[0].candidates[number];
            $scope.voteInfo.name=candidate.name+' '+candidate.firstLastName+' '+ candidate.secondLastName;
            $scope.voteInfo.firstLastName=candidate.firstLastNameCandidate;
            $scope.voteInfo.secondLastName=candidate.secondLastNameCandidate;
            $scope.voteInfo.proposals=candidate.proposal;
            $scope.voteInfo.code=candidate.party.image;
            $scope.voteInfo.description=candidate.party.description;
            $scope.$parent.voteInfo=$scope.voteInfo;
        }

        $scope.confirmationVote = function (index,obj)
        {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/vote/modalVoteConfirmation.html',
                controller: 'modalVoteConfirmactionController',
                size: 'sm',
                resolve:
                {
                    item: function(){
                    return obj;
                    }
                }
            });
            modalInstance.result.then( function(data)
            {
                if(data)
                {
                    $scope.votepres(index);
            }
        });
        };

        $scope.confirmationNullVote = function (obj)
        {
            var modalInstance = $uibModal.open({
                templateUrl: 'views/vote/modalVoteConfirmation.html',
                controller: 'modalVoteConfirmactionController',
                size: 'sm',
                resolve:
                {
                    item: function(){
                    return obj;
                    }
                }
            });
            modalInstance.result.then( function(data)
            {
                if(data)
                {
                    $scope.nullvote();
                }
            });
        };

        
        $scope.registerVote=function(){

            $scope.voteInfo.voteHour=new Date;
            $scope.splitHour=$filter('date')($scope.voteInfo.voteHour, 'shortTime').split(':');
            $scope.voteInfo.hour=$scope.splitHour[0];
            $scope.voteInfo.voteDate=new Date;
            $scope.voteInfo.voteDate=$filter('date')($scope.voteInfo.voteDate, 'shortDate');
            console.log($scope.voteInfo);
            Vote.addVote($scope.voteInfo).then(function(){
                $window.alert("Your vote has been registered");
                Vote.addVoteCit($scope.voteInfo).then(function(){
                    $window.alert("Thanks for voting ");
                    auth.logOut();
                });

            });
        }
}]);

app.controller('modalVoteConfirmactionController', ['$scope', '$uibModalInstance', 'item', function ($scope, $uibModalInstance, item)
{
  console.log(item)
  var that = $scope;
  that.displayNameCandidate = item;
  that.confirmation = {yes: true, no: false};

  $scope.cancel = function()
  {
    $uibModalInstance.close(that.confirmation.no);
  };
  $scope.ok = function()
  {
    $uibModalInstance.close(that.confirmation.yes);
  };

}]);
