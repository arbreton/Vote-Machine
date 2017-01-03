app.controller('votingController',['$scope','Vote','$state','$filter','auth','$window', function($scope,Vote,$state,$filter,auth,$window){

        
        $scope.voteInfo={};
        $scope.voteInfo.id=auth.currentID();

        
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


        //Candidate available variables (setting it to false hides the candidate in the elections)
        $scope.candpres1 = true;
        $scope.candpres2 = true;
        $scope.candpres3 = true;
        $scope.candpres4 = true;
        $scope.candpres5 = true;
        $scope.candpres6 = true;


        $scope.candidatename1="Luis";
        $scope.first_lastname_candidate1="Solís";
        $scope.second_lastname_candidate1="Rivera";
        $scope.display_name_candidate1= $scope.candidatename1+" "+$scope.first_lastname_candidate1;
        $scope.party_code_candidate1="01";
        $scope.party_code_candidate1="Partido Acción Ciudadana";
        $scope.prop1candpres1="Replace a Muslim ban with an extreme vetting of Muslims. (Oct 2016)";
        $scope.prop2candpres1="No federal government profit from student loans. (Nov 2015)";
        $scope.prop3candpres1="Opposes Common Core. (Feb 2015)";

        $scope.candidatename2="Johnny";
        $scope.first_lastname_candidate2="Araya";
        $scope.second_lastname_candidate2="Monge";
        $scope.display_name_candidate2= $scope.candidatename2+" "+$scope.first_lastname_candidate2;
        $scope.party_code_candidate2="02";
        $scope.party_code_candidate2="Partido Liberación Nacional";

        $scope.prop1candpres2="We have 2 trillion barrels of oil; enough for 283 years. (Nov 2015)";
        $scope.prop2candpres2="Solar hasn't caught on because it has a 32-year payback. (Aug 2015)";
        $scope.prop3candpres2="Enough natural gas in Marcellus Shale for 110 year supply. (Dec 2011)";

        $scope.candidatename3="José";
        $scope.first_lastname_candidate3="Villalta";
        $scope.second_lastname_candidate3="Florez-Estrada";
        $scope.display_name_candidate3= $scope.candidatename3+" "+$scope.first_lastname_candidate3;
        $scope.party_code_candidate3="03";
        $scope.party_code_candidate3="Partido Frente Amplio";
        $scope.prop1candpres3="Eminent domain is something you need very strongly. (Feb 2016)";
        $scope.prop2candpres3="Asbestos got a bad rap from miners & mob-led movement. (Oct 1997)";
        $scope.prop3candpres3="Happiest people have great families & God in their lives. (Nov 2015)";

        $scope.candidatename4="Otto";
        $scope.first_lastname_candidate4="Guevara";
        $scope.second_lastname_candidate4="Guth";
        $scope.display_name_candidate4= $scope.candidatename4+" "+$scope.first_lastname_candidate4;
        $scope.party_code_candidate4="04";
        $scope.party_code_candidate4="Movimiento Libertario";
        $scope.prop1candpres4="Mutually profitable 2-way relationship with the media. (Nov 2015)";
        $scope.prop2candpres4="Gun violence is inevitable; regulations won't help. (Oct 2015)";
        $scope.prop3candpres4="Create V.A. mental health division to reduce veteran suicide. (Sep 2016)";

        $scope.candidatename5="Rodolfo";
        $scope.first_lastname_candidate5="Piza";
        $scope.second_lastname_candidate5="Rocafort";
        $scope.display_name_candidate5= $scope.candidatename5+" "+$scope.first_lastname_candidate5;
        $scope.party_code_candidate5="05";
        $scope.party_code_candidate5="Partido Unidad Social Cristiana";
        $scope.prop1candpres5="Ignore career diplomats who insist on nuance. (Nov 2015)";
        $scope.prop2candpres5="I am against gun control. (Feb 2011)";
        $scope.prop3candpres5="Develop nukes in South Korea & Japan to counter North Korea. (Apr 2016)";

        $scope.candidatename6="José Miguel";
        $scope.first_lastname_candidate6="Corrales";
        $scope.second_lastname_candidate6="Bolaños";
        $scope.display_name_candidate6= $scope.candidatename6+" "+$scope.first_lastname_candidate6;
        $scope.party_code_candidate6="06";
        $scope.party_code_candidate6="Partido Patria Nueva";
        $scope.prop1candpres6="Trade pacts are no good for us and no good for our workers. (Feb 2016)";
        $scope.prop2candpres6="20% tax on all imported goods. (Dec 2011)";
        $scope.prop3candpres6="China is dumping steel all over & killing steel companies. (Oct 2016)";

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


        $scope.part1img="https://pac.cr/wp-content/uploads/2015/05/pac15_y1.png";
        $scope.part2img="http://alwaght.com/upload/logo/201629_6/20162935839245.jpg";
        $scope.part3img="http://4.bp.blogspot.com/-A3wXqdiplpw/Vc04v_vxECI/AAAAAAAAAMI/EeEMHCkaJcY/s1600/FRENTE%2BAMPLIO%2Blogo%2Bflor.jpg";
        $scope.part4img="http://2.bp.blogspot.com/-Bsjb-8D54f4/UEqPvGPlFLI/AAAAAAAABO4/PreBVEsTt5U/s1600/48820_100000625261389_313_n.jpg";
        $scope.part5img="https://radiosantaclara.org/media/uploads/logo_partido_unidad_social_cristiana_big.jpg";
        $scope.part6img="http://www.crwflags.com/fotw/images/c/cr%7Dpn.gif";


        $scope.cand1img="/uploads/Luis_Guillermo.jpg";
        $scope.cand2img="/uploads/Johnny_Araya.png";
        $scope.cand3img="/uploads/Jose_Villalta.png";
        $scope.cand4img="/uploads/Otto_Guevara.jpg";
        $scope.cand5img="/uploads/Rodolfo_Piza.png";
        $scope.cand6img="/uploads/Jose_Miguel.jpg";

        $scope.showother=function(){

        }

        $scope.nullvote=function(){

        }

        

                    

        $scope.votepres = function(number) {

            switch(number){
                case 1:
                    $scope.voteInfo.name=$scope.candidatename1;
                    $scope.voteInfo.first_lastname=$scope.first_lastname_candidate1;
                    $scope.voteInfo.second_lastname=$scope.second_lastname_candidate1;
                    $scope.voteInfo.proposals=$scope.prop1candpres1;
                    $scope.voteInfo.code=$scope.party_code_candidate1;
                    $scope.voteInfo.description=$scope.party_code_candidate1;
                    $scope.voteInfo.election_date='12-13-2016';
                    $scope.voteInfo.vote_date='12-13-2016';
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
                    $scope.voteInfo.name=$scope.candidatename2;
                    $scope.voteInfo.first_lastname=$scope.first_lastname_candidate2;
                    $scope.voteInfo.second_lastname=$scope.second_lastname_candidate2;
                    $scope.voteInfo.proposals=$scope.prop1candpres2;
                    $scope.voteInfo.code=$scope.party_code_candidate2;
                    $scope.voteInfo.description=$scope.party_code_candidate2;
                    $scope.voteInfo.election_date='12-13-2016';
                    $scope.voteInfo.vote_date='12-13-2016';
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
                    $scope.voteInfo.name=$scope.candidatename3;
                    $scope.voteInfo.first_lastname=$scope.first_lastname_candidate3;
                    $scope.voteInfo.second_lastname=$scope.second_lastname_candidate3;
                    $scope.voteInfo.proposals=$scope.prop1candpres3;
                    $scope.voteInfo.code=$scope.party_code_candidate3;
                    $scope.voteInfo.description=$scope.party_code_candidate3;
                    $scope.voteInfo.election_date='12-13-2016';
                    $scope.voteInfo.vote_date='12-13-2016';
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
                    $scope.voteInfo.name=$scope.candidatename4;
                    $scope.voteInfo.first_lastname=$scope.first_lastname_candidate4;
                    $scope.voteInfo.second_lastname=$scope.second_lastname_candidate4;
                    $scope.voteInfo.proposals=$scope.prop1candpres4;
                    $scope.voteInfo.code=$scope.party_code_candidate4;
                    $scope.voteInfo.description=$scope.party_code_candidate4;
                    $scope.voteInfo.election_date='12-13-2016';
                    $scope.voteInfo.vote_date='12-13-2016';
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
                    $scope.voteInfo.name=$scope.candidatename5;
                    $scope.voteInfo.first_lastname=$scope.first_lastname_candidate5;
                    $scope.voteInfo.second_lastname=$scope.second_lastname_candidate5;
                    $scope.voteInfo.proposals=$scope.prop1candpres5;
                    $scope.voteInfo.code=$scope.party_code_candidate5;
                    $scope.voteInfo.description=$scope.party_code_candidate5;
                    $scope.voteInfo.election_date='12-13-2016';
                    $scope.voteInfo.vote_date='12-13-2016';
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
                    $scope.voteInfo.name=$scope.candidatename6;
                    $scope.voteInfo.first_lastname=$scope.first_lastname_candidate6;
                    $scope.voteInfo.second_lastname=$scope.second_lastname_candidate6;
                    $scope.voteInfo.proposals=$scope.prop1candpres6;
                    $scope.voteInfo.code=$scope.party_code_candidate6;
                    $scope.voteInfo.description=$scope.party_code_candidate6;
                    $scope.voteInfo.election_date='12-13-2016';
                    $scope.voteInfo.vote_date='12-13-2016';
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
                    $scope.voteInfo.first_lastname="";
                    $scope.voteInfo.second_lastname="";
                    $scope.voteInfo.proposals="";
                    $scope.voteInfo.code="";
                    $scope.voteInfo.description="";
                    $scope.voteInfo.election_date='12-13-2016';
                    $scope.voteInfo.vote_date='12-13-2016';
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

        $scope.registerVote=function(){
            $scope.voteInfo.vote_hour=new Date;
            $scope.splitHour=$filter('date')($scope.voteInfo.vote_hour, 'shortTime').split(':');
            $scope.voteInfo.vote_hour=$scope.splitHour[0];
            $scope.voteInfo.vote_date=new Date;
            $scope.voteInfo.vote_date=$filter('date')($scope.voteInfo.vote_date, 'shortDate');
            console.log($scope.voteInfo);
            Vote.addVote($scope.voteInfo).then(function(){
                $window.alert("Thanks for voting ");
                auth.logOut();
            });
        }
}]);