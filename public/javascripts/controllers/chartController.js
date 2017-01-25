'use strict'
app.controller('ChartCtrl',['$scope','$state','$filter','$window','auth','election','serviceChart','province', function($scope,$state,$filter,$window,auth,election,serviceChart,province){
    
    $scope.elections = [];
    $scope.chartFunction=function(){

    };
    var myNewChart={};
    var myNewChart1={};
    var myNewChart2={};
    var myNewChart3={};
    var myNewChart4={};
    var myNewChart5={};
    $scope.currentElection='';
    $scope.interactiveChartItem={};
    $scope.ageGroups=[];
    
    for (var i = 18; i <= 105; i=i+10) {
    $scope.ageGroups.push(i);
    };
    
    $scope.voteHours=['10','11','12','13','14','15','16','17','18','19'];
    $scope.ethnicGroups=["Blancos y Mestizos", "Mulatos", "Amerindios", "Afrocostarricenses", "Asiaticos", "Ninguno", "Otros"];
    election.getElection2().then(function(data)
    {
        $scope.elections = data;
        $scope.currentIndex=$scope.elections.length-1;
        $scope.election=$scope.elections[$scope.currentIndex];
        $scope.generalChartFunction($scope.election.electionDay);
    });
    $scope.generalChart=true;
    $scope.hourChart=false;
    $scope.ageChart=false;
    $scope.earlyChart=false;
    $scope.lateChart=false;
    $scope.genderChart=false;
    province.getProvinces().then(function(data)
    {
        $scope.provinces=data;
    });
    
    $scope.startCharts=function(chart){
        $scope.generalChartFunction($scope.election.electionDay);
    };
    
    $scope.showCantones = function (cantones)
    {
        return $scope.cantones = cantones;
    };

    $scope.showDistricts = function(districts)
    {
        return $scope.districts = districts;
    };

    $scope.getCode=function(id)
    {
        $scope.getChart();
    };

    $scope.getCodes=function(id)
    {
        $scope.interactiveChartItem.provinceCode=id;
        $scope.$parent.interactiveChartItem=$scope.interactiveChartItem;
        $scope.getChart();
    };

    $scope.setAge=function(id){
        $scope.interactiveChartItem.age=id;
        $scope.getChart();
    };

    $scope.setHour=function(id){
        $scope.interactiveChartItem.hour=id;
        $scope.$parent.interactiveChartItem=$scope.interactiveChartItem;
        $scope.getChart();
    };

    $scope.setEthnicGroup=function(id){
        $scope.interactiveChartItem.ethnicGroup=id;
        $scope.getChart();
    };

    $scope.getChart = function()
    {
        $scope.requestedChart=0;
        if($scope.districtFilter)
            $scope.requestedChart+=1;
        
        if($scope.ageFilter)
            $scope.requestedChart+=10;
            
        if($scope.hourFilter)
            $scope.requestedChart+=100;

        if($scope.ethnicFilter)
            $scope.requestedChart+=1000;
        $scope.chooseChart($scope.requestedChart);
    };

    $scope.chooseChart=function(chart){
        switch(chart){
            case 1:
            $scope.chartFunction=serviceChart.getInteractiveDistrictChart;
            break;
            case 10:
            $scope.chartFunction=serviceChart.getInteractiveAgeChart;
            break
            case 11:
            $scope.chartFunction=serviceChart.getInteractiveDistrictAgeChart;
            break;
            case 100:
            $scope.chartFunction=serviceChart.getInteractiveHourChart;
            break;
            case 101:
            $scope.chartFunction=serviceChart.getInteractiveDistrictHourChart;
            break;
            case 110:
            $scope.chartFunction=serviceChart.getInteractiveAgeHourChart;
            break;
            case 111:
            $scope.chartFunction=serviceChart.getInteractiveDistrictAgeHourChart;
            break;
            case 1000:
            $scope.chartFunction=serviceChart.getInteractiveEthnicChart;
            break;
            case 1001:
            $scope.chartFunction=serviceChart.getInteractiveDistrictEthnicChart;
            break;
            case 1010:
            $scope.chartFunction=serviceChart.getInteractiveAgeEthnicChart;
            break;
            case 1011:
            $scope.chartFunction=serviceChart.getInteractiveDistrictAgeEthnicChart;
            break;
            case 1100:
            $scope.chartFunction=serviceChart.getInteractiveHourEthnicChart;
            break;
            case 1101:
            $scope.chartFunction=serviceChart.getInteractiveDistrictHourEthnicChart;
            break;
            case 1110:
            $scope.chartFunction=serviceChart.getInteractiveAgeHourEthnicChart;
            break;
            case 1111:
            $scope.chartFunction=serviceChart.getInteractiveChart;
            
            break;
            default:
            break;
        }
        $scope.interactiveChartFunction($scope.election.electionDay,$scope.interactiveChartItem);
        
    };

    $scope.generalChartFunction=function(date){
        serviceChart.getGeneralChart(date).then(function(data){
            myNewChart && myNewChart.destroy && myNewChart.destroy();
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
            myNewChart = new Chart(ctx , {
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
        serviceChart.getTimeChart(date).then(function(data){
            myNewChart1 && myNewChart1.destroy && myNewChart1.destroy();
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
            var myNewChart1 = new Chart(ctx , {
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
        serviceChart.getAgeChart(date).then(function(data){
            myNewChart2 && myNewChart2.destroy && myNewChart2.destroy();
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
            var myNewChart2 = new Chart(ctx , {
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
        serviceChart.getHourChart(date,10).then(function(data){
            myNewChart3 && myNewChart3.destroy && myNewChart3.destroy();
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
        serviceChart.getHourChart(date,19).then(function(data){
            myNewChart4 && myNewChart4.destroy && myNewChart4.destroy();
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

    $scope.interactiveChartFunction=function(date,chartType,filter){
        $scope.chartFunction(date,chartType,filter).then(function(data){
            myNewChart5 && myNewChart5.destroy && myNewChart5.destroy();
            var myData = (data);
            loader6.style.visibility = "hidden";
            Array.prototype.mapProperty = function(property) {
                return this.map(function (obj) {
                    return obj[property];
                });
            };
            var barChartData5 = {
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
            myNewChart5 = new Chart(ctx , {
                type: "bar",
                data: barChartData5, 
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

