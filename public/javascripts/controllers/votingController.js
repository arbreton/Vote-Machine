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
        console.log($scope.voteInfo);



        $scope.electionInfo={};
        $scope.electionInfo.candidates={};

        //Candidate available variables (setting it to false hides the candidate in the elections)
        $scope.candPres1 = false;
        $scope.candPres2 = false;
        $scope.candPres3 = false;
        $scope.candPres4 = false;
        $scope.candPres5 = false;
        $scope.candPres6 = false;

    //    $scope.cand1img="/uploads/Luis_Guillermo.jpg";
    //    $scope.cand2img="/uploads/Johnny_Araya.png";
    //    $scope.cand3img="/uploads/Jose_Villalta.png";
    //    $scope.cand4img="/uploads/Otto_Guevara.jpg";
    //    $scope.cand5img="/uploads/Rodolfo_Piza.png";
    //    $scope.cand6img="/uploads/Jose_Miguel.jpg";


        $scope.part1img="https://pac.cr/wp-content/uploads/2015/05/pac15_y1.png";
        Vote.getElectionData().then(function(data){
            console.log(data);
            $scope.electionInfo=data;   
            $scope.voteInfo.electionID=$scope.electionInfo[0]._id;
            if($scope.electionInfo.length>0){
            
                if($scope.electionInfo[0].candidates.length>0){
                    $scope.candPres1 = true;
                    $scope.candidateName1=$scope.electionInfo[0].candidates[0].name;
                    $scope.firstLastNameCandidate1=$scope.electionInfo[0].candidates[0].firstLastName;
                    $scope.secondLastNameCandidate1=$scope.electionInfo[0].candidates[0].secondLastName;
                    $scope.displayNameCandidate1= $scope.candidateName1+" "+$scope.firstLastNameCandidate1;
                    $scope.partyCodeCandidate1=$scope.electionInfo[0].candidates[0].party.description;
                    $scope.partyCodeCandidate1=$scope.electionInfo[0].candidates[0].party.description;
                    $scope.prop1candPres1=$scope.electionInfo[0].candidates[0].proposal;
                    $scope.prop2candPres1="No federal government profit from student loans. (Nov 2015)";
                    $scope.prop3candPres1="Opposes Common Core. (Feb 2015)";
                    $scope.cand1img=$scope.electionInfo[0].candidates[0].image;
                    $scope.part1img=$scope.electionInfo[0].candidates[0].party.image;
                }

                if($scope.electionInfo[0].candidates.length>1){
                    $scope.candPres2 = true;
                    $scope.candidateName2=$scope.electionInfo[0].candidates[1].name;
                    $scope.firstLastNameCandidate2=$scope.electionInfo[0].candidates[1].firstLastName;
                    $scope.secondLastNameCandidate2=$scope.electionInfo[0].candidates[1].secondLastName;
                    $scope.displayNameCandidate2= $scope.candidateName2+" "+$scope.firstLastNameCandidate2;
                    $scope.partyCodeCandidate2=$scope.electionInfo[0].candidates[1].party.description;
                    $scope.partyCodeCandidate2=$scope.electionInfo[0].candidates[1].party.description;
                    $scope.prop1candPres2=$scope.electionInfo[0].candidates[1].proposal;
                    $scope.prop2candPres2="No federal government profit from student loans. (Nov 2015)";
                    $scope.prop3candPres2="Opposes Common Core. (Feb 2015)";
                    $scope.cand2img=$scope.electionInfo[0].candidates[1].image;
                    $scope.part2img=$scope.electionInfo[0].candidates[1].party.image;
                }

                if($scope.electionInfo[0].candidates.length>2){
                    $scope.candPres3 = true;
                    $scope.candidateName3=$scope.electionInfo[0].candidates[2].name;
                    $scope.firstLastNameCandidate3=$scope.electionInfo[0].candidates[2].firstLastName;
                    $scope.secondLastNameCandidate3=$scope.electionInfo[0].candidates[2].secondLastName;
                    $scope.displayNameCandidate3= $scope.candidateName3+" "+$scope.firstLastNameCandidate3;
                    $scope.partyCodeCandidate3=$scope.electionInfo[0].candidates[2].party.description;
                    $scope.partyCodeCandidate3=$scope.electionInfo[0].candidates[2].party.description;
                    $scope.prop1candPres3=$scope.electionInfo[0].candidates[2].proposal;
                    $scope.prop2candPres3="No federal government profit from student loans. (Nov 2015)";
                    $scope.prop3candPres3="Opposes Common Core. (Feb 2015)";
                    $scope.cand3img=$scope.electionInfo[0].candidates[2].image;
                    $scope.part3img=$scope.electionInfo[0].candidates[2].party.image;
                }

                if($scope.electionInfo[0].candidates.length>3){
                    $scope.candPres4 = true;
                    $scope.candidateName4=$scope.electionInfo[0].candidates[3].name;
                    $scope.firstLastNameCandidate4=$scope.electionInfo[0].candidates[3].firstLastName;
                    $scope.secondLastNameCandidate4=$scope.electionInfo[0].candidates[3].secondLastName;
                    $scope.displayNameCandidate4= $scope.candidateName4+" "+$scope.firstLastNameCandidate4;
                    $scope.partyCodeCandidate4=$scope.electionInfo[0].candidates[3].party.description;
                    $scope.partyCodeCandidate4=$scope.electionInfo[0].candidates[3].party.description;
                    $scope.prop1candPres4=$scope.electionInfo[0].candidates[3].proposal;
                    $scope.prop2candPres4="No federal government profit from student loans. (Nov 2015)";
                    $scope.prop3candPres4="Opposes Common Core. (Feb 2015)";
                    $scope.cand4img=$scope.electionInfo[0].candidates[3].image;
                    $scope.part4img=$scope.electionInfo[0].candidates[3].party.image;
                }

                if($scope.electionInfo[0].candidates.length>4){
                    $scope.candPres5 = true;
                    $scope.candidateName5=$scope.electionInfo[0].candidates[4].name;
                    $scope.firstLastNameCandidate5=$scope.electionInfo[0].candidates[4].firstLastName;
                    $scope.secondLastNameCandidate5=$scope.electionInfo[0].candidates[4].secondLastName;
                    $scope.displayNameCandidate5= $scope.candidateName5+" "+$scope.firstLastNameCandidate5;
                    $scope.partyCodeCandidate5=$scope.electionInfo[0].candidates[4].party.description;
                    $scope.partyCodeCandidate5=$scope.electionInfo[0].candidates[4].party.description;
                    $scope.prop1candPres5=$scope.electionInfo[0].candidates[4].proposal;
                    $scope.prop2candPres5="No federal government profit from student loans. (Nov 2015)";
                    $scope.prop3candPres5="Opposes Common Core. (Feb 2015)";
                    $scope.cand5img=$scope.electionInfo[0].candidates[4].image;
                    $scope.part5img=$scope.electionInfo[0].candidates[4].party.image;
                }
                
                if($scope.electionInfo[0].candidates.length>5){
                    $scope.candPres6 = true;
                    $scope.candidateName6=$scope.electionInfo[0].candidates[5].name;
                    $scope.firstLastNameCandidate6=$scope.electionInfo[0].candidates[5].firstLastName;
                    $scope.secondLastNameCandidate6=$scope.electionInfo[0].candidates[5].secondLastName;
                    $scope.displayNameCandidate6= $scope.candidateName6+" "+$scope.firstLastNameCandidate6;
                    $scope.partyCodeCandidate6=$scope.electionInfo[0].candidates[5].party.description;
                    $scope.partyCodeCandidate6=$scope.electionInfo[0].candidates[5].party.description;
                    $scope.prop1candPres6=$scope.electionInfo[0].candidates[5].proposal;
                    $scope.prop2candPres6="No federal government profit from student loans. (Nov 2015)";
                    $scope.prop3candPres6="Opposes Common Core. (Feb 2015)";
                    $scope.cand6img=$scope.electionInfo[0].candidates[5].image;
                    $scope.part6img=$scope.electionInfo[0].candidates[5].party.image;
                }

            }
            $scope.temporalItem={};
            $scope.temporalItem.citizenID=$scope.voteInfo.citizenID;
            $scope.temporalItem.electionID=$scope.voteInfo.electionID;
            Vote.getElectionUserData($scope.temporalItem).then(function(data){
                console.log(data);
                if(data.length>0){
                    
                    $window.alert("You have already voted and will be disconected");
                    auth.logOut();;
                    
                }
            });
        });
        

        //Initial messages of the vote buttons
        $scope.msgPresCand1="Vote";
        $scope.msgPresCand2="Vote";
        $scope.msgPresCand3="Vote";
        $scope.msgPresCand4="Vote";
        $scope.msgPresCand5="Vote";
        $scope.msgPresCand6="Vote";

        //Candidate campaign promises hidden (setting it to false shows the campaign promises)
        $scope.cand1 = true;
        $scope.cand2 = true;
        $scope.cand3 = true;
        $scope.cand4 = true;
        $scope.cand5 = true;
        $scope.cand6 = true;

        $scope.candidateName2="Johnny";
        $scope.firstLastNameCandidate2="Araya";
        $scope.secondLastNameCandidate2="Monge";
        $scope.displayNameCandidate2= $scope.candidateName2+" "+$scope.firstLastNameCandidate2;
        $scope.partyCodeCandidate2="02";
        $scope.partyCodeCandidate2="Partido Liberación Nacional";

        $scope.prop1candPres2="We have 2 trillion barrels of oil; enough for 283 years. (Nov 2015)";
        $scope.prop2candPres2="Solar hasn't caught on because it has a 32-year payback. (Aug 2015)";
        $scope.prop3candPres2="Enough natural gas in Marcellus Shale for 110 year supply. (Dec 2011)";

        $scope.candidateName3="José";
        $scope.firstLastNameCandidate3="Villalta";
        $scope.secondLastNameCandidate3="Florez-Estrada";
        $scope.displayNameCandidate3= $scope.candidateName3+" "+$scope.firstLastNameCandidate3;
        $scope.partyCodeCandidate3="03";
        $scope.partyCodeCandidate3="Partido Frente Amplio";
        $scope.prop1candPres3="Eminent domain is something you need very strongly. (Feb 2016)";
        $scope.prop2candPres3="Asbestos got a bad rap from miners & mob-led movement. (Oct 1997)";
        $scope.prop3candPres3="Happiest people have great families & God in their lives. (Nov 2015)";

        $scope.candidateName4="Otto";
        $scope.firstLastNameCandidate4="Guevara";
        $scope.secondLastNameCandidate4="Guth";
        $scope.displayNameCandidate4= $scope.candidateName4+" "+$scope.firstLastNameCandidate4;
        $scope.partyCodeCandidate4="04";
        $scope.partyCodeCandidate4="Movimiento Libertario";
        $scope.prop1candPres4="Mutually profitable 2-way relationship with the media. (Nov 2015)";
        $scope.prop2candPres4="Gun violence is inevitable; regulations won't help. (Oct 2015)";
        $scope.prop3candPres4="Create V.A. mental health division to reduce veteran suicide. (Sep 2016)";

        $scope.candidateName5="Rodolfo";
        $scope.firstLastNameCandidate5="Piza";
        $scope.secondLastNameCandidate5="Rocafort";
        $scope.displayNameCandidate5= $scope.candidateName5+" "+$scope.firstLastNameCandidate5;
        $scope.partyCodeCandidate5="05";
        $scope.partyCodeCandidate5="Partido Unidad Social Cristiana";
        $scope.prop1candPres5="Ignore career diplomats who insist on nuance. (Nov 2015)";
        $scope.prop2candPres5="I am against gun control. (Feb 2011)";
        $scope.prop3candPres5="Develop nukes in South Korea & Japan to counter North Korea. (Apr 2016)";

        $scope.candidateName6="José Miguel";
        $scope.firstLastNameCandidate6="Corrales";
        $scope.secondLastNameCandidate6="Bolaños";
        $scope.displayNameCandidate6= $scope.candidateName6+" "+$scope.firstLastNameCandidate6;
        $scope.partyCodeCandidate6="06";
        $scope.partyCodeCandidate6="Partido Patria Nueva";
        $scope.prop1candPres6="Trade pacts are no good for us and no good for our workers. (Feb 2016)";
        $scope.prop2candPres6="20% tax on all imported goods. (Dec 2011)";
        $scope.prop3candPres6="China is dumping steel all over & killing steel companies. (Oct 2016)";


        
        $scope.show = function(number) {
            switch(number){
                case 1:
                $scope.cand1 = $scope.cand1 === false ? true: false;
                break;
                case 2:
                $scope.cand2 = $scope.cand2 === false ? true: false;
                break;
                case 3:
                $scope.cand3 = $scope.cand3 === false ? true: false;
                break;
                case 4:
                $scope.cand4 = $scope.cand4 === false ? true: false;
                break;
                case 5:
                $scope.cand5 = $scope.cand5 === false ? true: false;
                break;
                case 6:
                $scope.cand6 = $scope.cand6 === false ? true: false;
                break;

                default:
                break;
            }
        };


        
        $scope.part2img="http://alwaght.com/upload/logo/201629_6/20162935839245.jpg";
        $scope.part3img="http://4.bp.blogspot.com/-A3wXqdiplpw/Vc04v_vxECI/AAAAAAAAAMI/EeEMHCkaJcY/s1600/FRENTE%2BAMPLIO%2Blogo%2Bflor.jpg";
        $scope.part4img="http://2.bp.blogspot.com/-Bsjb-8D54f4/UEqPvGPlFLI/AAAAAAAABO4/PreBVEsTt5U/s1600/48820_100000625261389_313_n.jpg";
        $scope.part5img="https://radiosantaclara.org/media/uploads/logo_partido_unidad_social_cristiana_big.jpg";
        $scope.part6img="http://www.crwflags.com/fotw/images/c/cr%7Dpn.gif";


        
        $scope.showOther=function(){

        }

        $scope.nullvote=function(){

        }

        

                    

        $scope.votepres = function(number) {
            $scope.voteInfo.candidate_id=(number-1);

            switch(number){
                case 1:
                    $scope.voteInfo.name=$scope.displayNameCandidate1;
                    $scope.voteInfo.firstLastName=$scope.firstLastNameCandidate1;
                    $scope.voteInfo.secondLastName=$scope.secondLastNameCandidate1;
                    $scope.voteInfo.proposals=$scope.prop1candPres1;
                    $scope.voteInfo.code=$scope.partyCodeCandidate1;
                    $scope.voteInfo.description=$scope.partyCodeCandidate1;
                    $scope.voteInfo.electionDate='12-13-2016';
                    $scope.voteInfo.voteDate='12-13-2016';
                    $scope.voteInfo.voted=true;
                    $scope.voteInfo.others="asdas";
                    $scope.$parent.voteInfo=$scope.voteInfo;
                   
                    $scope.msgPresCand1="Selected";
                    $scope.msgPresCand2="Change vote";
                    $scope.msgPresCand3="Change vote";
                    $scope.msgPresCand4="Change vote";
                    $scope.msgPresCand5="Change vote";
                    $scope.msgPresCand6="Change vote";
                    
                break;
                case 2:
                    $scope.voteInfo.name=$scope.displayNameCandidate2;
                    $scope.voteInfo.firstLastName=$scope.firstLastNameCandidate2;
                    $scope.voteInfo.secondLastName=$scope.secondLastNameCandidate2;
                    $scope.voteInfo.proposals=$scope.prop1candPres2;
                    $scope.voteInfo.code=$scope.partyCodeCandidate2;
                    $scope.voteInfo.description=$scope.partyCodeCandidate2;
                    $scope.voteInfo.electionDate='12-13-2016';
                    $scope.voteInfo.voteDate='12-13-2016';
                    $scope.voteInfo.voted=true;
                    $scope.voteInfo.others="asdas";
                    $scope.$parent.voteInfo=$scope.voteInfo;
                    
                    $scope.msgPresCand1="Change vote";
                    $scope.msgPresCand2="Selected";
                    $scope.msgPresCand3="Change vote";
                    $scope.msgPresCand4="Change vote";
                    $scope.msgPresCand5="Change vote";
                    $scope.msgPresCand6="Change vote";
                    $scope.othercand=false;
                break;
                case 3:
                    $scope.voteInfo.name=$scope.displayNameCandidate3;
                    $scope.voteInfo.firstLastName=$scope.firstLastNameCandidate3;
                    $scope.voteInfo.secondLastName=$scope.secondLastNameCandidate3;
                    $scope.voteInfo.proposals=$scope.prop1candPres3;
                    $scope.voteInfo.code=$scope.partyCodeCandidate3;
                    $scope.voteInfo.description=$scope.partyCodeCandidate3;
                    $scope.voteInfo.electionDate='12-13-2016';
                    $scope.voteInfo.voteDate='12-13-2016';
                    $scope.voteInfo.voted=true;
                    $scope.voteInfo.others="asdas";
                    $scope.$parent.voteInfo=$scope.voteInfo;
                    $scope.msgPresCand1="Change vote";
                    $scope.msgPresCand2="Change vote";
                    $scope.msgPresCand3="Selected";
                    $scope.msgPresCand4="Change vote";
                    $scope.msgPresCand5="Change vote";
                    $scope.msgPresCand6="Change vote";
                    $scope.othercand=false;
                break;
                case 4:
                    $scope.voteInfo.name=$scope.displayNameCandidate4;
                    $scope.voteInfo.firstLastName=$scope.firstLastNameCandidate4;
                    $scope.voteInfo.secondLastName=$scope.secondLastNameCandidate4;
                    $scope.voteInfo.proposals=$scope.prop1candPres4;
                    $scope.voteInfo.code=$scope.partyCodeCandidate4;
                    $scope.voteInfo.description=$scope.partyCodeCandidate4;
                    $scope.voteInfo.electionDate='12-13-2016';
                    $scope.voteInfo.voteDate='12-13-2016';
                    $scope.voteInfo.voted=true;
                    $scope.voteInfo.others="asdas";
                    $scope.$parent.voteInfo=$scope.voteInfo;
                    $scope.msgPresCand1="Change vote";
                    $scope.msgPresCand2="Change vote";
                    $scope.msgPresCand3="Change vote";
                    $scope.msgPresCand4="Selected";
                    $scope.msgPresCand5="Change vote";
                    $scope.msgPresCand6="Change vote";
                    $scope.othercand=false;
                break;
                case 5:
                    $scope.voteInfo.name=$scope.displayNameCandidate5;
                    $scope.voteInfo.firstLastName=$scope.firstLastNameCandidate5;
                    $scope.voteInfo.secondLastName=$scope.secondLastNameCandidate5;
                    $scope.voteInfo.proposals=$scope.prop1candPres5;
                    $scope.voteInfo.code=$scope.partyCodeCandidate5;
                    $scope.voteInfo.description=$scope.partyCodeCandidate5;
                    $scope.voteInfo.electionDate='12-13-2016';
                    $scope.voteInfo.voteDate='12-13-2016';
                    $scope.voteInfo.voted=true;
                    $scope.voteInfo.others="asdas";
                    $scope.$parent.voteInfo=$scope.voteInfo;
                    $scope.msgPresCand1="Change vote";
                    $scope.msgPresCand2="Change vote";
                    $scope.msgPresCand3="Change vote";
                    $scope.msgPresCand4="Change vote";
                    $scope.msgPresCand5="Selected";
                    $scope.msgPresCand6="Change vote";
                    $scope.othercand=false;
                break;
                case 6:
                    $scope.voteInfo.name=$scope.displayNameCandidate6;
                    $scope.voteInfo.firstLastName=$scope.firstLastNameCandidate6;
                    $scope.voteInfo.secondLastName=$scope.secondLastNameCandidate6;
                    $scope.voteInfo.proposals=$scope.prop1candPres6;
                    $scope.voteInfo.code=$scope.partyCodeCandidate6;
                    $scope.voteInfo.description=$scope.partyCodeCandidate6;
                    $scope.voteInfo.electionDate='12-13-2016';
                    $scope.voteInfo.voteDate='12-13-2016';
                    $scope.voteInfo.voted=true;
                    $scope.voteInfo.others="asdas";
                    $scope.$parent.voteInfo=$scope.voteInfo;
                    $scope.msgPresCand1="Change vote";
                    $scope.msgPresCand2="Change vote";
                    $scope.msgPresCand3="Change vote";
                    $scope.msgPresCand4="Change vote";
                    $scope.msgPresCand5="Change vote";
                    $scope.msgPresCand6="Selected";
                    $scope.othercand=false;
                break;
                case 7:
                    $scope.voteInfo.name="null";
                    $scope.voteInfo.firstLastName="";
                    $scope.voteInfo.secondLastName="";
                    $scope.voteInfo.proposals="";
                    $scope.voteInfo.code="";
                    $scope.voteInfo.description="";
                    $scope.voteInfo.electionDate='12-13-2016';
                    $scope.voteInfo.voteDate='12-13-2016';
                    $scope.voteInfo.voted=true;
                    $scope.voteInfo.others="";
                    $scope.$parent.voteInfo=$scope.voteInfo;
                    $scope.msgPresCand1="Change vote";
                    $scope.msgPresCand2="Change vote";
                    $scope.msgPresCand3="Change vote";
                    $scope.msgPresCand4="Change vote";
                    $scope.msgPresCand5="Change vote";
                    $scope.msgPresCand6="Change vote";
                    $scope.othercand=false;
                break;
                default:
                break;
            }
            
            console.log($scope.voteInfo);
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

        $scope.registerVote=function(){
            
            console.log($scope.electionInfo);
            $scope.voteInfo.voteHour=new Date;
            $scope.voteInfo.name=$scope.voteInfo.name+" "+$scope.voteInfo.secondLastName;
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