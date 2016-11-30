var ngToggle = angular.module('VotingApp', []);

    
        ngToggle.controller('dataLoadCtrl',['$scope', function($scope){

        $scope.fotoUsuario="https://upload.wikimedia.org/wikipedia/commons/7/76/Laura-Chinchilla-cropped.jpg";
        $scope.nombreUsuario="Laura Chinchilla Miranda";
        $scope.direccionUsuario="Distrito de Zapote en el cantón de San José.";
        $scope.nacimientoUsuario="28 de marzo de 1959";
        $scope.masInfoUsuario="Información adicional";
            
}]);

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
        $scope.candpres4 = true;
        $scope.candpres5 = true;
        $scope.candpres6 = true;

        $scope.nomcandpres1="Luis Guillermo Solís";
        $scope.partidocand1="Partido Acción Ciudadana";
        $scope.prop1candpres1="Iniciativa sociedades de convivencia";
        $scope.prop2candpres1="Respeto a los derechos de los animales";
        $scope.prop3candpres1="Reelección consecutiva única";
        
        $scope.nomcandpres2="Johnny Araya Monge";
        $scope.partidocand2="Partido Liberación Nacional";
        $scope.prop1candpres2="Voy a poner la mejor maquina de cafe";
        $scope.prop2candpres2="Voy a poner la mejor maquina de cafe";
        $scope.prop3candpres2="Voy a poner la mejor maquina de cafe";

        $scope.nomcandpres3="José María Villalta Florez-Estrada";
        $scope.partidocand3="Partido Frente Amplio";
        $scope.prop1candpres3="Propuesta 1";
        $scope.prop2candpres3="Propuesta 2";
        $scope.prop3candpres3="Propuesta 3";

        $scope.nomcandpres4="Otto Guevara Guth";
        $scope.partidocand4="Movimiento Libertario";
        $scope.prop1candpres4="Propuesta 1";
        $scope.prop2candpres4="Propuesta 2";
        $scope.prop3candpres4="Propuesta 3";

        $scope.nomcandpres5="Rodolfo Piza Rocafort";
        $scope.partidocand5="Partido Unidad Social Cristiana";
        $scope.prop1candpres5="Propuesta 1";
        $scope.prop2candpres5="Propuesta 2";
        $scope.prop3candpres5="Propuesta 3";

        $scope.nomcandpres6="José Miguel Corrales Bolaños";
        $scope.partidocand6="Partido Patria Nueva";
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
        			
        			$scope.othercand=false;
        		break;
        		case 2:
        			
        			$scope.othercand=false;
        		break;
        		case 3:
        			
        			$scope.othercand=false;
        		break;
        		case 4:
        			
        			$scope.othercand=false;
        		break;
        		case 5:
        			
        			$scope.othercand=false;
        		break;
        		case 6:
        			
        			$scope.othercand=false;
        		break;
        		default:
        		break;
        	}
            
            
        }
}]);