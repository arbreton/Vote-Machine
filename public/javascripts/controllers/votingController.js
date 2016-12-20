app.controller('votingController',['$scope','Vote','$state','$filter','auth', function($scope,Vote,$state,$filter,auth){

        
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


        $scope.nomcandpres1="Luis";
        $scope.first_lastname_candidate1="Solís";
        $scope.second_lastname_candidate1="Rivera";
        $scope.display_name_candidate1= $scope.nomcandpres1+" "+$scope.first_lastname_candidate1;
        $scope.party_code_candidate1="01";
        $scope.party_code_candidate1="Partido Acción Ciudadana";
        $scope.prop1candpres1="Iniciativa sociedades de convivencia";
        $scope.prop2candpres1="Respeto a los derechos de los animales";
        $scope.prop3candpres1="Reelección consecutiva única";

        $scope.nomcandpres2="Johnny";
        $scope.first_lastname_candidate2="Araya";
        $scope.second_lastname_candidate2="Monge";
        $scope.party_code_candidate2="02";
        $scope.party_code_candidate2="Partido Liberación Nacional";

        $scope.prop1candpres2="Propuesta 1";
        $scope.prop2candpres2="Propuesta 2";
        $scope.prop3candpres2="Propuesta 3";

        $scope.nomcandpres3="José";
        $scope.first_lastname_candidate3="Villalta";
        $scope.second_lastname_candidate3="Florez-Estrada";
        $scope.party_code_candidate3="03";
        $scope.party_code_candidate3="Partido Frente Amplio";
        $scope.prop1candpres3="Propuesta 1";
        $scope.prop2candpres3="Propuesta 2";
        $scope.prop3candpres3="Propuesta 3";

        $scope.nomcandpres4="Otto";
        $scope.first_lastname_candidate4="Guevara";
        $scope.second_lastname_candidate4="Guth";
        $scope.party_code_candidate4="04";
        $scope.party_code_candidate4="Movimiento Libertario";
        $scope.prop1candpres4="Propuesta 1";
        $scope.prop2candpres4="Propuesta 2";
        $scope.prop3candpres4="Propuesta 3";

        $scope.nomcandpres5="Rodolfo";
        $scope.first_lastname_candidate5="Piza";
        $scope.second_lastname_candidate5="Rocafort";
        $scope.party_code_candidate5="05";
        $scope.party_code_candidate5="Partido Unidad Social Cristiana";
        $scope.prop1candpres5="Propuesta 1";
        $scope.prop2candpres5="Propuesta 2";
        $scope.prop3candpres5="Propuesta 3";

        $scope.nomcandpres6="José Miguel";
        $scope.first_lastname_candidate6="Corrales";
        $scope.second_lastname_candidate6="Bolaños";
        $scope.party_code_candidate6="06";
        $scope.party_code_candidate6="Partido Patria Nueva";
        $scope.prop1candpres6="Propuesta 1";
        $scope.prop2candpres6="Propuesta 2";
        $scope.prop3candpres6="Propuesta 3";

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


        $scope.cand1img="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Luis_Guillermo_Sol%C3%ADs%2C_Costa_Rica_03.JPG/800px-Luis_Guillermo_Sol%C3%ADs%2C_Costa_Rica_03.JPG";
        $scope.cand2img="https://upload.wikimedia.org/wikipedia/commons/c/c9/Johnny_Araya_en_el_festival_Chepe_Joven_2011_cropped.png";
        $scope.cand3img="https://upload.wikimedia.org/wikipedia/commons/4/47/Frente_Amplio_%28Costa_Rica%29_-_Asamblea_Provincial_en_Quesada_24_cropped.png";
        $scope.cand4img="https://upload.wikimedia.org/wikipedia/commons/b/b7/Otto_Guevara.jpg";
        $scope.cand5img="https://upload.wikimedia.org/wikipedia/commons/4/4e/Photo_of_Mr._Rodolfo_Piza_and_company_in_PUSC_cropped.png";
        $scope.cand6img="https://upload.wikimedia.org/wikipedia/commons/7/72/Jose_Miguel_Corrales_cropped.jpg";

        $scope.showother=function(){

        }

        $scope.nullvote=function(){

        }

        

                    

        $scope.votepres = function(number) {

            switch(number){
                case 1:
                    $scope.voteInfo.name=$scope.nomcandpres1;
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
                    $scope.voteInfo.name=$scope.nomcandpres2;
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
                    $scope.voteInfo.name=$scope.nomcandpres3;
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
                    $scope.voteInfo.name=$scope.nomcandpres4;
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
                    $scope.voteInfo.name=$scope.nomcandpres5;
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
                    $scope.voteInfo.name=$scope.nomcandpres6;
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
                $state.go('home');
            });
        }
}]);