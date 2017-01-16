'use strict'
app.controller('graphicsController',['$scope','$state','$filter','$window','auth','election','chartService', function($scope,$state,$filter,$window,auth,election,chartService){
    
    $scope.elections = [];
    $scope.currentElection='';
    election.getElection2().then(function(data)
    {
        $scope.elections = data;
        $scope.currentIndex=$scope.elections.length-1;
        $scope.election=$scope.elections[$scope.currentIndex];
    });
    $scope.generalChart=true;
    $scope.hourChart=false;
    $scope.ageChart=false;
    $scope.earlyChart=false;
    $scope.lateChart=false;
    $scope.genderChart=false;
    $scope.provinces={};
    
    $scope.startCharts=function(chart){
        $scope.generalChartFunction($scope.election.electionDay);
    };
    
    $scope.generalChartFunction=function(date){
        chartService.getGeneralChart(date).then(function(data){
            console.log(data);
            var myData = (data);
            loader1.style.visibility = "hidden";
            $scope.hourChartFunction(date);
            Array.prototype.mapProperty = function(property) {
                return this.map(function (obj) {
                    return obj[property];
                });
            };
            var barChartData = {
                labels : myData.mapProperty('_id'),
                datasets : [
                {   
                    label: "Men",
                    hidden: true,   
                    backgroundColor:"rgba(0, 0, 255, 0.5)",
                    data : myData.mapProperty("menTotal")
                },
                {
                    label: "Women",
                    hidden: true,
                    backgroundColor:"rgba(253, 91, 232, 0.5)",
                    data : myData.mapProperty("womenTotal")
                },
                {
                    label: "Total",
                    backgroundColor:"rgba(0, 0, 0, 0.5)",
                    data : myData.mapProperty("Total")
                }
                ]
            };
            var ctx = document.getElementById("canvas").getContext("2d");
            var myNewChart = new Chart(ctx , {
                type: "bar",
                data: barChartData,
                options: {
                    scales: { 
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });  
        }); 
    };
        
    $scope.hourChartFunction=function(date){
        chartService.getTimeChart(date).then(function(data){
            var myData = (data);
            loader2.style.visibility = "hidden";
            $scope.ageChartFunction(date);
            Array.prototype.mapProperty = function(property) {
                return this.map(function (obj) {
                    return obj[property];
                });
            };
            var barChartData1 = {
                labels : myData.mapProperty('_id'),
                datasets : [ 
                {
                    label: "Men",
                    backgroundColor:"rgba(0, 0, 255, 0.5)",
                    data : myData.mapProperty("menTotal")
                },
                {
                    label: "Women",
                    backgroundColor:"rgba(253, 91, 232, 0.5)",
                    data : myData.mapProperty("womenTotal")
                }
                ]
            };
            var ctx = document.getElementById("canvas1").getContext("2d");
            var myNewChart = new Chart(ctx , {
                type: "bar",
                data: barChartData1,
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        }); 
    };
        
    $scope.ageChartFunction=function(date){
        chartService.getAgeChart(date).then(function(data){
            var myData = (data);
            loader3.style.visibility = "hidden";
            $scope.earlyChartFunction(date);
            Array.prototype.mapProperty = function(property) {
                return this.map(function (obj) {
                    return obj[property];
                });
            };
            var barChartData2 = {
                labels : myData.mapProperty('_id'),
                datasets : [
                {
                    label: "Men",
                    backgroundColor:"rgba(0, 0, 255, 0.5)",
                    data : myData.mapProperty("menTotal")
                },
                {
                    label: "Women",
                    backgroundColor:"rgba(253, 91, 232, 0.5)",
                    data : myData.mapProperty("womenTotal")
                }
                ]
            };
            var ctx = document.getElementById("canvas2").getContext("2d");
            var myNewChart = new Chart(ctx , {
                type: "bar",
                data: barChartData2,
                options:{
                    scales: {
                        yAxes: [{              
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        }); 
    };

    $scope.earlyChartFunction=function(date){
        chartService.getHourChart(date,10).then(function(data){
            var myData = (data);
            loader4.style.visibility = "hidden";
            $scope.lateChartFunction(date);
            Array.prototype.mapProperty = function(property) {
                return this.map(function (obj) {
                    return obj[property];
                });
            };
            var barChartData3 = {
                labels : myData.mapProperty('_id'),
                datasets : [
                {
                    label: "Men",
                    backgroundColor:"rgba(0, 0, 255, 0.5)",
                    data : myData.mapProperty("menTotal")
                },
                {
                    label: "Women",
                    backgroundColor:"rgba(253, 91, 232, 0.5)",
                    data : myData.mapProperty("womenTotal")
                }
                ]
            };
            var ctx = document.getElementById("canvas3").getContext("2d");
            var myNewChart3 = new Chart(ctx , {
                type: "bar",
                data: barChartData3, 
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        });
    };

    $scope.lateChartFunction=function(date){
        chartService.getHourChart(date,19).then(function(data){
            var myData = (data);
            loader5.style.visibility = "hidden";
            Array.prototype.mapProperty = function(property) {
                return this.map(function (obj) {
                    return obj[property];
                });
            };
            var barChartData4 = {
                labels : myData.mapProperty('_id'),
                datasets : [
                {
                    label: "Men",
                    backgroundColor:"rgba(0, 0, 255, 0.5)",
                    data : myData.mapProperty("menTotal")
                },
                {
                    label: "Women",
                    backgroundColor:"rgba(253, 91, 232, 0.5)",
                    data : myData.mapProperty("womenTotal")
                }
                ]
            };
            var ctx = document.getElementById("canvas4").getContext("2d");
            var myNewChart4 = new Chart(ctx , {
                type: "bar",
                data: barChartData4, 
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        });
    };

    $scope.showChart = function(chart) {
        switch(chart)
        {
            case 'General':
                $scope.generalChart=true;
                $scope.hourChart=false;
                $scope.ageChart=false;
                $scope.earlyChart=false;
                $scope.lateChart=false;
                $scope.genderChart=false;
            break;
            case 'Hour':
                $scope.generalChart=false;
                $scope.hourChart=true;
                $scope.ageChart=false;
                $scope.earlyChart=false;
                $scope.lateChart=false;
                $scope.genderChart=false;
            break;
            case 'Age':
                $scope.generalChart=false;
                $scope.hourChart=false;
                $scope.ageChart=true;
                $scope.earlyChart=false;
                $scope.lateChart=false;
                $scope.genderChart=false;
            break;
            case 'Early':
                $scope.generalChart=false;
                $scope.hourChart=false;
                $scope.ageChart=false;
                $scope.earlyChart=true;
                $scope.lateChart=false;
                $scope.genderChart=false;
            break;
            case 'Late':
                $scope.generalChart=false;
                $scope.hourChart=false;
                $scope.ageChart=false;
                $scope.earlyChart=false;
                $scope.lateChart=true;
                $scope.genderChart=false;
            break;
            case 'Genders':
                $scope.generalChart=false;
                $scope.hourChart=false;
                $scope.ageChart=false;
                $scope.earlyChart=false;
                $scope.lateChart=false;
                $scope.genderChart=true;
            break;
            case 'Interactive':
                $scope.generalChart=false;
                $scope.hourChart=false;
                $scope.ageChart=false;
                $scope.earlyChart=false;
                $scope.lateChart=false;
                $scope.genderChart=true;
            break;
            default:
            break;

        }
    };       
}]);


/*

  function interactiveChartFunction(){
$.ajax({url:"http://localhost:3000/api/elections/graph/ethnic_group",dataType:"json"})
  .fail(function(){alert("There has been an error, please check your internet connection")})
  .done(function(data){
  var myData = (data);
  loader6.style.visibility = "hidden";
  
Array.prototype.mapProperty = function(property) {
      return this.map(function (obj) {
       return obj[property];
      });

     };

 barChartData5 = {
    labels : myData.mapProperty('_id'),
     datasets : [
       {
   label: "Men",
   backgroundColor:"rgba(0, 0, 255, 0.5)",
   data : myData.mapProperty("menTotal") 
  },
  {
   label: "Women",
   backgroundColor:"rgba(253, 91, 232, 0.5)",
   data : myData.mapProperty("womenTotal")
  }
       ]
  };
 var ctx = document.getElementById("canvas5").getContext("2d");


 var myNewChart5 = new Chart(ctx , {
    type: "bar",
    data: barChartData5, 
    options:{
      scales: {
         
          yAxes: [{

              
               ticks: {
                  beginAtZero:true
              }

          }]
      }
    }
});
 //}  
 }); }
 */