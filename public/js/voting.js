var ngToggle = angular.module('VotingApp', []);



    ngToggle.controller('VoteCtrl',['$scope', function($scope){

        $scope.cand1 = true;
        $scope.cand2 = true;
        $scope.cand3 = true;
        $scope.cand4 = true;
        $scope.cand5 = true;
        $scope.cand6 = true;


        $scope.candpres1 = true;
        $scope.candpres2 = true;
        $scope.candpres3 = true;
        //$scope.candpres4 = true;
        //$scope.candpres5 = true;
        //$scope.candpres6 = true;

        $scope.nomcandpres1="Jennifer Vázquez";
        $scope.partidocand1="Partido1";
        $scope.prop1candpres1="Haremos del país un mejor país";
        $scope.prop2candpres1="Haremos del país un mejor país";
        $scope.prop3candpres1="Haremos del país un mejor país";

        $scope.nomcandpres2="Andre Breton";
        $scope.partidocand2="Partido2";
        $scope.prop1candpres2="Voy a poner la mejor maquina de cafe";
        $scope.prop2candpres2="Voy a poner la mejor maquina de cafe";
        $scope.prop3candpres2="Voy a poner la mejor maquina de cafe";

        $scope.nomcandpres3="Alvaro Hernandez";
        $scope.partidocand3="Partido3";
        $scope.prop1candpres3="Propuesta 1";
        $scope.prop2candpres3="Propuesta 2";
        $scope.prop3candpres3="Propuesta 3";

        $scope.nomcandpres4="Candidato 4";
        $scope.partidocand4="Partido4";
        $scope.prop1candpres4="Propuesta 1";
        $scope.prop2candpres4="Propuesta 2";
        $scope.prop3candpres4="Propuesta 3";

        $scope.nomcandpres5="Candidato 5";
        $scope.partidocand5="Partido5";
        $scope.prop1candpres5="Propuesta 1";
        $scope.prop2candpres5="Propuesta 2";
        $scope.prop3candpres5="Propuesta 3";

        $scope.nomcandpres6="Candidato 6";
        $scope.partidocand6="Partido6";
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

        $scope.imageUrlpres1="/images/votar.png";
        $scope.imageUrlpres2="/images/votar.png";
        $scope.imageUrlpres3="/images/votar.png";
        $scope.imageUrlpres4="/images/votar.png";
        $scope.imageUrlpres5="/images/votar.png";
        $scope.imageUrlpres6="/images/votar.png";
        $scope.imageUrlprop="/images/verPropuestas.png";
        $scope.cand1img="https://avatars.slack-edge.com/2016-11-07/101403588675_f83de57d74677077e415_512.jpg";
        $scope.cand2img="https://avatars2.githubusercontent.com/u/12836187?v=3&s=400";
        $scope.cand3img="https://avatars.slack-edge.com/2016-11-07/102152287238_e348cb1542eddd0335b0_192.jpg";
        $scope.cand4img="http://images.clipartpanda.com/number-four-clipart-bcyp4xRcL.png";
        $scope.cand5img="http://www.clipartbay.com/cliparts/number-5-clip-art-vykjeqo.png";
        $scope.cand6img="http://www.clker.com/cliparts/F/N/O/w/x/2/number-6-hi.png";

        $scope.imageUrlnull="/images/anularvoto.png";
        $scope.imageUrlother="/images/otro.png";

        $scope.showother=function(){
        	$scope.othercand = true;
        	$scope.imageUrlpres1="/images/cambiarvoto.png";
        	$scope.imageUrlpres2="/images/cambiarvoto.png";
        	$scope.imageUrlpres3="/images/cambiarvoto.png";
        	$scope.imageUrlpres4="/images/cambiarvoto.png";
        	$scope.imageUrlpres5="/images/cambiarvoto.png";
        	$scope.imageUrlpres6="/images/cambiarvoto.png";
        	$scope.imageUrlnull="/images/anularvoto.png";
        }

        $scope.nullvote=function(){
        $scope.imageUrlpres1="/images/votar.png";
        $scope.imageUrlpres2="/images/votar.png";
        $scope.imageUrlpres3="/images/votar.png";
        $scope.imageUrlpres4="/images/votar.png";
        $scope.imageUrlpres5="/images/votar.png";
        $scope.imageUrlpres6="/images/votar.png";
        $scope.imageUrlnull="/images/votoanulado.png";
        }



        $scope.votepres = function(number) {

        	switch(number){
        		case 1:
        			$scope.imageUrlpres1="/images/seleccionado.png";
        			$scope.imageUrlpres2="/images/cambiarvoto.png";
        			$scope.imageUrlpres3="/images/cambiarvoto.png";
        			$scope.imageUrlpres4="/images/cambiarvoto.png";
        			$scope.imageUrlpres5="/images/cambiarvoto.png";
        			$scope.imageUrlpres6="/images/cambiarvoto.png";
        			$scope.othercand=false;
        		break;
        		case 2:
        			$scope.imageUrlpres1="/images/cambiarvoto.png";
        			$scope.imageUrlpres2="/images/seleccionado.png";
        			$scope.imageUrlpres3="/images/cambiarvoto.png";
        			$scope.imageUrlpres4="/images/cambiarvoto.png";
        			$scope.imageUrlpres5="/images/cambiarvoto.png";
        			$scope.imageUrlpres6="/images/cambiarvoto.png";
        			$scope.imageUrlnull="/images/anularvoto.png";
        			$scope.othercand=false;
        		break;
        		case 3:
        			$scope.imageUrlpres1="/images/cambiarvoto.png";
        			$scope.imageUrlpres2="/images/cambiarvoto.png";
        			$scope.imageUrlpres3="/images/seleccionado.png";
        			$scope.imageUrlpres4="/images/cambiarvoto.png";
        			$scope.imageUrlpres5="/images/cambiarvoto.png";
        			$scope.imageUrlpres6="/images/cambiarvoto.png";
        			$scope.imageUrlnull="/images/anularvoto.png";
        			$scope.othercand=false;
        		break;
        		case 4:
        			$scope.imageUrlpres1="/images/cambiarvoto.png";
        			$scope.imageUrlpres2="/images/cambiarvoto.png";
        			$scope.imageUrlpres3="/images/cambiarvoto.png";
        			$scope.imageUrlpres4="/images/seleccionado.png";
        			$scope.imageUrlpres5="/images/cambiarvoto.png";
        			$scope.imageUrlpres6="/images/cambiarvoto.png";
        			$scope.imageUrlnull="/images/anularvoto.png";
        			$scope.othercand=false;
        		break;
        		case 5:
        			$scope.imageUrlpres1="/images/cambiarvoto.png";
        			$scope.imageUrlpres2="/images/cambiarvoto.png";
        			$scope.imageUrlpres3="/images/cambiarvoto.png";
        			$scope.imageUrlpres4="/images/cambiarvoto.png";
        			$scope.imageUrlpres5="/images/seleccionado.png";
        			$scope.imageUrlpres6="/images/cambiarvoto.png";
        			$scope.imageUrlnull="/images/anularvoto.png";
        			$scope.othercand=false;
        		break;
        		case 6:
        			$scope.imageUrlpres1="/images/cambiarvoto.png";
        			$scope.imageUrlpres2="/images/cambiarvoto.png";
        			$scope.imageUrlpres3="/images/cambiarvoto.png";
        			$scope.imageUrlpres4="/images/cambiarvoto.png";
        			$scope.imageUrlpres5="/images/cambiarvoto.png";
        			$scope.imageUrlpres6="/images/seleccionado.png";
        			$scope.imageUrlnull="/images/anularvoto.png";
        			$scope.othercand=false;
        		break;
        		default:
        		break;
        	}


        }
}]);

    ngToggle.controller('VoteCtrlsen',['$scope', function($scope){

        $scope.cand1 = true;
        $scope.cand2 = true;
        $scope.cand3 = true;
        $scope.cand4 = true;
        $scope.cand5 = true;
        $scope.cand6 = true;


        $scope.candpres1 = true;
        $scope.candpres2 = true;
        //$scope.candpres3 = true;
        //$scope.candpres4 = true;
        //$scope.candpres5 = true;
        //$scope.candpres6 = true;

        $scope.nomcandpres1="Jennifer Vázquez";
        $scope.partidocand1="Partido1";
        $scope.prop1candpres1="Haremos del país un mejor país";
        $scope.prop2candpres1="Haremos del país un mejor país";
        $scope.prop3candpres1="Haremos del país un mejor país";

        $scope.nomcandpres2="Andre Breton";
        $scope.partidocand2="Partido2";
        $scope.prop1candpres2="Voy a poner la mejor maquina de cafe";
        $scope.prop2candpres2="Voy a poner la mejor maquina de cafe";
        $scope.prop3candpres2="Voy a poner la mejor maquina de cafe";

        $scope.nomcandpres3="Alvaro Hernandez";
        $scope.partidocand3="Partido3";
        $scope.prop1candpres3="Propuesta 1";
        $scope.prop2candpres3="Propuesta 2";
        $scope.prop3candpres3="Propuesta 3";

        $scope.nomcandpres4="Candidato 4";
        $scope.partidocand4="Partido4";
        $scope.prop1candpres4="Propuesta 1";
        $scope.prop2candpres4="Propuesta 2";
        $scope.prop3candpres4="Propuesta 3";

        $scope.nomcandpres5="Candidato 5";
        $scope.partidocand5="Partido5";
        $scope.prop1candpres5="Propuesta 1";
        $scope.prop2candpres5="Propuesta 2";
        $scope.prop3candpres5="Propuesta 3";

        $scope.nomcandpres6="Candidato 6";
        $scope.partidocand6="Partido6";
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

        $scope.imageUrlpres1="/images/votar.png";
        $scope.imageUrlpres2="/images/votar.png";
        $scope.imageUrlpres3="/images/votar.png";
        $scope.imageUrlpres4="/images/votar.png";
        $scope.imageUrlpres5="/images/votar.png";
        $scope.imageUrlpres6="/images/votar.png";
        $scope.cand1img="https://avatars.slack-edge.com/2016-11-07/101403588675_f83de57d74677077e415_512.jpg";
        $scope.cand2img="https://avatars2.githubusercontent.com/u/12836187?v=3&s=400";
        $scope.cand3img="https://avatars.slack-edge.com/2016-11-07/102152287238_e348cb1542eddd0335b0_192.jpg";
        $scope.cand4img="http://images.clipartpanda.com/number-four-clipart-bcyp4xRcL.png";
        $scope.cand5img="http://www.clipartbay.com/cliparts/number-5-clip-art-vykjeqo.png";
        $scope.cand6img="http://www.clker.com/cliparts/F/N/O/w/x/2/number-6-hi.png";

        $scope.imageUrlnull="/images/anularvoto.png";
        $scope.imageUrlother="/images/otro.png";

        $scope.showother=function(){
        	$scope.othercand = true;
        	$scope.imageUrlpres1="/images/cambiarvoto.png";
        	$scope.imageUrlpres2="/images/cambiarvoto.png";
        	$scope.imageUrlpres3="/images/cambiarvoto.png";
        	$scope.imageUrlpres4="/images/cambiarvoto.png";
        	$scope.imageUrlpres5="/images/cambiarvoto.png";
        	$scope.imageUrlpres6="/images/cambiarvoto.png";
        	$scope.imageUrlnull="/images/anularvoto.png";
        }

        $scope.nullvote=function(){
        $scope.imageUrlpres1="/images/votar.png";
        $scope.imageUrlpres2="/images/votar.png";
        $scope.imageUrlpres3="/images/votar.png";
        $scope.imageUrlpres4="/images/votar.png";
        $scope.imageUrlpres5="/images/votar.png";
        $scope.imageUrlpres6="/images/votar.png";
        $scope.imageUrlnull="/images/votoanulado.png";
        }
        $scope.votepres = function(number) {
        	switch(number){
        		case 1:
        			$scope.imageUrlpres1="/images/seleccionado.png";
        			$scope.imageUrlpres2="/images/cambiarvoto.png";
        			$scope.imageUrlpres3="/images/cambiarvoto.png";
        			$scope.imageUrlpres4="/images/cambiarvoto.png";
        			$scope.imageUrlpres5="/images/cambiarvoto.png";
        			$scope.imageUrlpres6="/images/cambiarvoto.png";
        			$scope.othercand=false;
        		break;
        		case 2:
        			$scope.imageUrlpres1="/images/cambiarvoto.png";
        			$scope.imageUrlpres2="/images/seleccionado.png";
        			$scope.imageUrlpres3="/images/cambiarvoto.png";
        			$scope.imageUrlpres4="/images/cambiarvoto.png";
        			$scope.imageUrlpres5="/images/cambiarvoto.png";
        			$scope.imageUrlpres6="/images/cambiarvoto.png";
        			$scope.imageUrlnull="/images/anularvoto.png";
        			$scope.othercand=false;
        		break;
        		case 3:
        			$scope.imageUrlpres1="/images/cambiarvoto.png";
        			$scope.imageUrlpres2="/images/cambiarvoto.png";
        			$scope.imageUrlpres3="/images/seleccionado.png";
        			$scope.imageUrlpres4="/images/cambiarvoto.png";
        			$scope.imageUrlpres5="/images/cambiarvoto.png";
        			$scope.imageUrlpres6="/images/cambiarvoto.png";
        			$scope.imageUrlnull="/images/anularvoto.png";
        			$scope.othercand=false;
        		break;
        		case 4:
        			$scope.imageUrlpres1="/images/cambiarvoto.png";
        			$scope.imageUrlpres2="/images/cambiarvoto.png";
        			$scope.imageUrlpres3="/images/cambiarvoto.png";
        			$scope.imageUrlpres4="/images/seleccionado.png";
        			$scope.imageUrlpres5="/images/cambiarvoto.png";
        			$scope.imageUrlpres6="/images/cambiarvoto.png";
        			$scope.imageUrlnull="/images/anularvoto.png";
        			$scope.othercand=false;
        		break;
        		case 5:
        			$scope.imageUrlpres1="/images/cambiarvoto.png";
        			$scope.imageUrlpres2="/images/cambiarvoto.png";
        			$scope.imageUrlpres3="/images/cambiarvoto.png";
        			$scope.imageUrlpres4="/images/cambiarvoto.png";
        			$scope.imageUrlpres5="/images/seleccionado.png";
        			$scope.imageUrlpres6="/images/cambiarvoto.png";
        			$scope.imageUrlnull="/images/anularvoto.png";
        			$scope.othercand=false;
        		break;
        		case 6:
        			$scope.imageUrlpres1="/images/cambiarvoto.png";
        			$scope.imageUrlpres2="/images/cambiarvoto.png";
        			$scope.imageUrlpres3="/images/cambiarvoto.png";
        			$scope.imageUrlpres4="/images/cambiarvoto.png";
        			$scope.imageUrlpres5="/images/cambiarvoto.png";
        			$scope.imageUrlpres6="/images/seleccionado.png";
        			$scope.imageUrlnull="/images/anularvoto.png";
        			$scope.othercand=false;
        		break;
        		default:
        		break;
        	}}
}]);

    ngToggle.controller('VoteCtrldip',['$scope', function($scope){

        $scope.cand1 = true;
        $scope.cand2 = true;
        $scope.cand3 = true;
        $scope.cand4 = true;
        $scope.cand5 = true;
        $scope.cand6 = true;


        $scope.candpres1 = true;
        $scope.candpres2 = true;
        $scope.candpres3 = true;
        $scope.candpres4 = true;
        $scope.candpres5 = true;
        $scope.candpres6 = true;

        $scope.nomcandpres1="Jennifer Vázquez";
        $scope.partidocand1="Partido1";
        $scope.prop1candpres1="Haremos del país un mejor país";
        $scope.prop2candpres1="Haremos del país un mejor país";
        $scope.prop3candpres1="Haremos del país un mejor país";

        $scope.nomcandpres2="Andre Breton";
        $scope.partidocand2="Partido2";
        $scope.prop1candpres2="Voy a poner la mejor maquina de cafe";
        $scope.prop2candpres2="Voy a poner la mejor maquina de cafe";
        $scope.prop3candpres2="Voy a poner la mejor maquina de cafe";

        $scope.nomcandpres3="Alvaro Hernandez";
        $scope.partidocand3="Partido3";
        $scope.prop1candpres3="Propuesta 1";
        $scope.prop2candpres3="Propuesta 2";
        $scope.prop3candpres3="Propuesta 3";

        $scope.nomcandpres4="Candidato 4";
        $scope.partidocand4="Partido4";
        $scope.prop1candpres4="Propuesta 1";
        $scope.prop2candpres4="Propuesta 2";
        $scope.prop3candpres4="Propuesta 3";

        $scope.nomcandpres5="Candidato 5";
        $scope.partidocand5="Partido5";
        $scope.prop1candpres5="Propuesta 1";
        $scope.prop2candpres5="Propuesta 2";
        $scope.prop3candpres5="Propuesta 3";

        $scope.nomcandpres6="Candidato 6";
        $scope.partidocand6="Partido6";
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

        $scope.imageUrlpres1="/images/votar.png";
        $scope.imageUrlpres2="/images/votar.png";
        $scope.imageUrlpres3="/images/votar.png";
        $scope.imageUrlpres4="/images/votar.png";
        $scope.imageUrlpres5="/images/votar.png";
        $scope.imageUrlpres6="/images/votar.png";
        $scope.cand1img="https://avatars.slack-edge.com/2016-11-07/101403588675_f83de57d74677077e415_512.jpg";
        $scope.cand2img="https://avatars2.githubusercontent.com/u/12836187?v=3&s=400";
        $scope.cand3img="https://avatars.slack-edge.com/2016-11-07/102152287238_e348cb1542eddd0335b0_192.jpg";
        $scope.cand4img="http://images.clipartpanda.com/number-four-clipart-bcyp4xRcL.png";
        $scope.cand5img="http://www.clipartbay.com/cliparts/number-5-clip-art-vykjeqo.png";
        $scope.cand6img="http://www.clker.com/cliparts/F/N/O/w/x/2/number-6-hi.png";

        $scope.imageUrlnull="/images/anularvoto.png";
        $scope.imageUrlother="/images/otro.png";

        $scope.showother=function(){
        	$scope.othercand = true;
        	$scope.imageUrlpres1="/images/cambiarvoto.png";
        	$scope.imageUrlpres2="/images/cambiarvoto.png";
        	$scope.imageUrlpres3="/images/cambiarvoto.png";
        	$scope.imageUrlpres4="/images/cambiarvoto.png";
        	$scope.imageUrlpres5="/images/cambiarvoto.png";
        	$scope.imageUrlpres6="/images/cambiarvoto.png";
        	$scope.imageUrlnull="/images/anularvoto.png";
        }

        $scope.nullvote=function(){
        $scope.imageUrlpres1="/images/votar.png";
        $scope.imageUrlpres2="/images/votar.png";
        $scope.imageUrlpres3="/images/votar.png";
        $scope.imageUrlpres4="/images/votar.png";
        $scope.imageUrlpres5="/images/votar.png";
        $scope.imageUrlpres6="/images/votar.png";
        $scope.imageUrlnull="/images/votoanulado.png";
        }
        $scope.votepres = function(number) {
        	switch(number){
        		case 1:
        			$scope.imageUrlpres1="/images/seleccionado.png";
        			$scope.imageUrlpres2="/images/cambiarvoto.png";
        			$scope.imageUrlpres3="/images/cambiarvoto.png";
        			$scope.imageUrlpres4="/images/cambiarvoto.png";
        			$scope.imageUrlpres5="/images/cambiarvoto.png";
        			$scope.imageUrlpres6="/images/cambiarvoto.png";
        			$scope.othercand=false;
        		break;
        		case 2:
        			$scope.imageUrlpres1="/images/cambiarvoto.png";
        			$scope.imageUrlpres2="/images/seleccionado.png";
        			$scope.imageUrlpres3="/images/cambiarvoto.png";
        			$scope.imageUrlpres4="/images/cambiarvoto.png";
        			$scope.imageUrlpres5="/images/cambiarvoto.png";
        			$scope.imageUrlpres6="/images/cambiarvoto.png";
        			$scope.imageUrlnull="/images/anularvoto.png";
        			$scope.othercand=false;
        		break;
        		case 3:
        			$scope.imageUrlpres1="/images/cambiarvoto.png";
        			$scope.imageUrlpres2="/images/cambiarvoto.png";
        			$scope.imageUrlpres3="/images/seleccionado.png";
        			$scope.imageUrlpres4="/images/cambiarvoto.png";
        			$scope.imageUrlpres5="/images/cambiarvoto.png";
        			$scope.imageUrlpres6="/images/cambiarvoto.png";
        			$scope.imageUrlnull="/images/anularvoto.png";
        			$scope.othercand=false;
        		break;
        		case 4:
        			$scope.imageUrlpres1="/images/cambiarvoto.png";
        			$scope.imageUrlpres2="/images/cambiarvoto.png";
        			$scope.imageUrlpres3="/images/cambiarvoto.png";
        			$scope.imageUrlpres4="/images/seleccionado.png";
        			$scope.imageUrlpres5="/images/cambiarvoto.png";
        			$scope.imageUrlpres6="/images/cambiarvoto.png";
        			$scope.imageUrlnull="/images/anularvoto.png";
        			$scope.othercand=false;
        		break;
        		case 5:
        			$scope.imageUrlpres1="/images/cambiarvoto.png";
        			$scope.imageUrlpres2="/images/cambiarvoto.png";
        			$scope.imageUrlpres3="/images/cambiarvoto.png";
        			$scope.imageUrlpres4="/images/cambiarvoto.png";
        			$scope.imageUrlpres5="/images/seleccionado.png";
        			$scope.imageUrlpres6="/images/cambiarvoto.png";
        			$scope.imageUrlnull="/images/anularvoto.png";
        			$scope.othercand=false;
        		break;
        		case 6:
        			$scope.imageUrlpres1="/images/cambiarvoto.png";
        			$scope.imageUrlpres2="/images/cambiarvoto.png";
        			$scope.imageUrlpres3="/images/cambiarvoto.png";
        			$scope.imageUrlpres4="/images/cambiarvoto.png";
        			$scope.imageUrlpres5="/images/cambiarvoto.png";
        			$scope.imageUrlpres6="/images/seleccionado.png";
        			$scope.imageUrlnull="/images/anularvoto.png";
        			$scope.othercand=false;
        		break;
        		default:
        		break;
        	}}
}]);

 ngToggle.controller('VoteCtrlFin',['$scope', function($scope){
 	$scope.endVote =function () {
 						$scope.Voto1=sharedData.getvotopres;
 						$scope.Voto2=sharedData.getvotosen;
 						$scope.Voto3=sharedData.getvotodip;
 		if(sharedData.getvotoprespos==true&&sharedData.getvotopres!=0){
 				if(sharedData.getvotosenpos==true&&sharedData.getvotosen!=0){
 					if(sharedData.getvotodippos==true&&sharedData.getvotodip!=0){
 						$scope.Voto1=sharedData.getvotopres;
 						$scope.Voto2=sharedData.getvotosen;
 						$scope.Voto3=sharedData.getvotodip;

 		 	}
 		 	}
 		 	}
 		}
 	}]);
