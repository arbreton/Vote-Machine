app.controller('graphicsController',['$scope','Vote','$state','$filter','auth','$window','election','chartService', function($scope,Vote,$state,$filter,auth,$window,election,chartService){


        var that = $scope;
        that.elections = [];
        that.currentElection='';

        election.getElection2().then(function(data)
        {
            that.elections = data;
            that.currentIndex=that.elections.length-1;
            that.election=that.elections[that.currentIndex];
        });

        $scope.generalChart=true;
        $scope.hourChart=false;
        $scope.ageChart=false;
        $scope.earlyChart=false;
        $scope.lateChart=false;
        $scope.genderChart=false;
        $scope.provinces={};
        $scope.chart1={};
        $scope.chart2={};
        $scope.chart3={};
        $scope.chart4={};
        $scope.chart5={};
        $scope.chart6={};


        $scope.startCharts=function(chart){
            $scope.generalChartFunction(that.election.electionDay,$scope.chart1,$scope.chart2,$scope.chart3,$scope.chart4,$scope.chart5,$scope.chart6);
        };

        $scope.makeVotes=function(){

            
        };

        $scope.generalChartFunction=function(date, chart1){
            chartService.getGeneralChart(date).then(function(data){
                console.log(data);
                var myData = (data);
                loader1.style.visibility = "hidden";
                chart1 && chart1.destroy1 && chart1.destroy();
                chart2 && chart2.destroy && chart2.destroy()
                chart3 && chart3.destroy && chart3.destroy()
                chart4 && chart4.destroy && chart4.destroy()
                chart5 && chart5.destroy && chart5.destroy()
                chart6 && chart6.destroy && chart6.destroy()
                $scope.hourChartFunction(date);
                Array.prototype.mapProperty = function(property) {
                    return this.map(function (obj) {
                        return obj[property];
                    });
                };
                barChartData = {
                    labels : myData.mapProperty('_id'),
                    datasets : [
                    {   
                        label: "Men",
                        hidden: true,   
                        backgroundColor:"rgba(0, 0, 255, 0.5)",
                        data : myData.mapProperty("menTotal") //actual value (which becomes the graph)
                    },
                    {
                        label: "Women",
                        hidden: true,
                        backgroundColor:"rgba(253, 91, 232, 0.5)",
                        data : myData.mapProperty("womenTotal") //actual value (which becomes the graph)
                    },
                    {
                        label: "Total",
                        backgroundColor:"rgba(0, 0, 0, 0.5)",
                        data : myData.mapProperty("Total") //actual value (which becomes the graph)
                    }
                    ]
                };
                var ctx = document.getElementById("canvas").getContext("2d");
                chart1 = new Chart(ctx , {
                    type: "bar",
                    data: barChartData,
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

        $scope.hourChartFunction=function(date){
            chartService.getHourChart(date).then(function(data){
                var myData = (data);
                loader2.style.visibility = "hidden";
                ageChartFunction();
                Array.prototype.mapProperty = function(property) {
                    return this.map(function (obj) {
                        return obj[property];
                    });
                };

// Example: myData.mapProperty('rank') to get an array of all ranks 
 barChartData1 = {
    labels : myData.mapProperty('_id'),//Labels
     datasets : [
       {
   label: "Men",

   backgroundColor:"rgba(0, 0, 255, 0.5)",
   data : myData.mapProperty("menTotal") //actual value (which becomes the graph)
  },
  {
   label: "Women",
   backgroundColor:"rgba(253, 91, 232, 0.5)",
   data : myData.mapProperty("womenTotal") //actual value (which becomes the graph)
  }
       ]
  };
 var ctx = document.getElementById("canvas1").getContext("2d");


 var myNewChart = new Chart(ctx , {
    type: "bar",
    data: barChartData1,
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
function generalChartFunction(date){
 //$.ajax({url:"http://localhost:3000/api/citizens/graph/vote2",dataType:"json"})
  $.ajax({url:"http://localhost:3000/api/elections/graph/"+date+"/votes",dataType:"json"})
  .fail(function(){alert("There has been an error, please check your internet connection")})
  .done(function(data){
  var myData = (data);
  loader1.style.visibility = "hidden";
  hourChartFunction();
  //console.log(myData[0].name);
Array.prototype.mapProperty = function(property) {
      return this.map(function (obj) {
       return obj[property];
      });

     };

// Example: myData.mapProperty('rank') to get an array of all ranks 
 barChartData = {
    labels : myData.mapProperty('_id'),//Labels
     datasets : [
       {
   label: "Men",
   hidden: true,

   backgroundColor:"rgba(0, 0, 255, 0.5)",
   data : myData.mapProperty("menTotal") //actual value (which becomes the graph)
  },
  {
   label: "Women",
   hidden: true,
   backgroundColor:"rgba(253, 91, 232, 0.5)",
   data : myData.mapProperty("womenTotal") //actual value (which becomes the graph)
  }
  ,
  {
   label: "Total",
   backgroundColor:"rgba(0, 0, 0, 0.5)",
   data : myData.mapProperty("Total") //actual value (which becomes the graph)
  }
       ]
  };
 var ctx = document.getElementById("canvas").getContext("2d");


 var myNewChart = new Chart(ctx , {
    type: "bar",
    data: barChartData,
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
 }); 
}


function hourChartFunction(){
 $.ajax({url:"http://localhost:3000/api/elections/graph/gender/time",dataType:"json"})
  .fail(function(){alert("There has been an error, please check your internet connection")})
  .done(function(data){
  var myData = (data);
  loader2.style.visibility = "hidden";
  ageChartFunction();
  //console.log(myData[0].name);
Array.prototype.mapProperty = function(property) {
      return this.map(function (obj) {
       return obj[property];
      });

     };

// Example: myData.mapProperty('rank') to get an array of all ranks 
 barChartData1 = {
    labels : myData.mapProperty('_id'),//Labels
     datasets : [
       {
   label: "Men",

   backgroundColor:"rgba(0, 0, 255, 0.5)",
   data : myData.mapProperty("menTotal") //actual value (which becomes the graph)
  },
  {
   label: "Women",
   backgroundColor:"rgba(253, 91, 232, 0.5)",
   data : myData.mapProperty("womenTotal") //actual value (which becomes the graph)
  }
       ]
  };
 var ctx = document.getElementById("canvas1").getContext("2d");


 var myNewChart = new Chart(ctx , {
    type: "bar",
    data: barChartData1,
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
  function ageChartFunction(){
 $.ajax({url:"http://localhost:3000/api/elections/graph/age",dataType:"json"})
  .fail(function(){alert("There has been an error, please check your internet connection")})
  .done(function(data){
  var myData = (data);
  loader3.style.visibility = "hidden";
  earlyChartFunction();
  //console.log(myData[0].name);
Array.prototype.mapProperty = function(property) {
      return this.map(function (obj) {
       return obj[property];
      });

     };

// Example: myData.mapProperty('rank') to get an array of all ranks 
 barChartData2 = {
    labels : myData.mapProperty('_id'),//Labels
     datasets : [
       {
   label: "Men",

   backgroundColor:"rgba(0, 0, 255, 0.5)",
   data : myData.mapProperty("menTotal") //actual value (which becomes the graph)
  },
  {
   label: "Women",
   backgroundColor:"rgba(253, 91, 232, 0.5)",
   data : myData.mapProperty("womenTotal") //actual value (which becomes the graph)
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
 //}  
 }); 
}

function earlyChartFunction(){
$.ajax({url:"http://localhost:3000/api/elections/graph/votes/10",dataType:"json"})
  .fail(function(){alert("There has been an error, please check your internet connection")})
  .done(function(data){
  var myData = (data);
  loader4.style.visibility = "hidden";
  lateChartFunction();
Array.prototype.mapProperty = function(property) {
      return this.map(function (obj) {
       return obj[property];
      });

     };

// Example: myData.mapProperty('rank') to get an array of all ranks 
 barChartData3 = {
    labels : myData.mapProperty('_id'),//Labels
     datasets : [
       {
   label: "Men",
   backgroundColor:"rgba(0, 0, 255, 0.5)",
   data : myData.mapProperty("menTotal") //actual value (which becomes the graph)
  },
  {
   label: "Women",
   backgroundColor:"rgba(253, 91, 232, 0.5)",
   data : myData.mapProperty("womenTotal") //actual value (which becomes the graph)
  }
       ]
  };

 //window.onload = function(){
//console.log("cheerio")
 var ctx = document.getElementById("canvas3").getContext("2d");


 var myNewChart3 = new Chart(ctx , {
    type: "bar",
    data: barChartData3, 
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

 function lateChartFunction(){
$.ajax({url:"http://localhost:3000/api/elections/graph/votes/19",dataType:"json"})
  .fail(function(){alert("There has been an error, please check your internet connection")})
  .done(function(data){
  var myData = (data);
  loader5.style.visibility = "hidden";
Array.prototype.mapProperty = function(property) {
      return this.map(function (obj) {
       return obj[property];
      });

     };

// Example: myData.mapProperty('rank') to get an array of all ranks 
 barChartData4 = {
    labels : myData.mapProperty('_id'),//Labels
     datasets : [
       {
   label: "Men",
   backgroundColor:"rgba(0, 0, 255, 0.5)",
   data : myData.mapProperty("menTotal") //actual value (which becomes the graph)
  },
  {
   label: "Women",
   backgroundColor:"rgba(253, 91, 232, 0.5)",
   data : myData.mapProperty("womenTotal") //actual value (which becomes the graph)
  }
       ]
  };

 //window.onload = function(){

 var ctx = document.getElementById("canvas4").getContext("2d");


 var myNewChart4 = new Chart(ctx , {
    type: "bar",
    data: barChartData4, 
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

// Example: myData.mapProperty('rank') to get an array of all ranks 
 barChartData5 = {
    labels : myData.mapProperty('_id'),//Labels
     datasets : [
       {
   label: "Men",
   backgroundColor:"rgba(0, 0, 255, 0.5)",
   data : myData.mapProperty("menTotal") //actual value (which becomes the graph)
  },
  {
   label: "Women",
   backgroundColor:"rgba(253, 91, 232, 0.5)",
   data : myData.mapProperty("womenTotal") //actual value (which becomes the graph)
  }
       ]
  };

 //window.onload = function(){

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