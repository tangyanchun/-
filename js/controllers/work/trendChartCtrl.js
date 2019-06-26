angular.module('controllers',[]).controller('trendChartCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetCashEarningsTendency','Global','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetCashEarningsTendency,Global,$ionicLoading) {

            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                if($stateParams.id !='a'){
                    GetCashEarningsTendency.get({
                        sysShopId:$stateParams.id
                    },function(data){
                        if(data.result==Global.SUCCESS&&data.responseData!=null){
                            $scope.trendChart = data.responseData;
                            $ionicLoading.hide()
                            $scope.HPic()
                        }
                    })
                }else{
                    GetCashEarningsTendency.get({
                    },function(data){
                        if(data.result==Global.SUCCESS&&data.responseData!=null){
                            $scope.trendChart = data.responseData;
                            $ionicLoading.hide()
                            $scope.HPic()
                        }
                    })
                }

            })




            $scope.HPic =function(){
                $scope.series = [
                    {
                        name: '现金',
                        data: [20,30.40,22,33,42,25]
                    },

                ];

                $scope.options = {
                    title:'',
                    chart: {
                        type: 'column'
                    },
                    xAxis: {
                        categories: [],
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: ''
                        }
                    },

                    legend: {
                        enabled: false
                    },
                    credits: {		            //去除右下角highcharts标志
                        enabled: false
                    },
                };
                for(var i=0;i< $scope.trendChart.length;i++){
                    $scope.series[0].data[i] =  $scope.trendChart[i].cashEarnings;
                    $scope.options.xAxis.categories[i] =  $scope.trendChart[i].formateDate
                }
            }

        }])