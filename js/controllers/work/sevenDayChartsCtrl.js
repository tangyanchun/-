/**
 * Created by Administrator on 2018/5/2.
 */
angular.module('controllers',["ionic-datepicker"]).controller('sevenDayChartsCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetExpenditureAndIncome','BossUtil','Global','$filter','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetExpenditureAndIncome,BossUtil,Global,$filter,$ionicLoading) {

            $rootScope.title = "7日收益趋势图";





            $scope.getInfo=function(){
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                if($stateParams.id!='a'){
                    GetExpenditureAndIncome.get({sysShopId:$stateParams.id},function (data) {
                        if(data.result==Global.SUCCESS&&data.responseData!=null){
                            $scope.sevenDayCharts = data.responseData
                            $scope.HPic()
                            $ionicLoading.hide()
                        }


                    })
                }else{
                    GetExpenditureAndIncome.get({},function (data) {
                        if(data.result==Global.SUCCESS&&data.responseData!=null){
                            $scope.sevenDayCharts = data.responseData
                            $scope.HPic()
                            $ionicLoading.hide()
                        }


                    })
                }
            }
            $scope.getInfo()

            $scope.HPic =function(){
                $scope.cardSeries = [
                    {
                        name: '耗卡',
                        data: [20,30.40,22,33,42,25]
                    },
                    {
                        name: '业绩',
                        data: [1,2,3,4],
                        color:'orange'
                    }
                ];

                $scope.cardOptions = {
                    title:'',
                    chart: {
                        type: 'line'
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
                        layout: '',
                        align: 'right',
                        verticalAlign: 'top',
                        borderWidth: 0,
                        x:10,
                    },
                    credits: {		            //去除右下角highcharts标志
                        enabled: false
                    },
                };

                for(var i=0;i< $scope.sevenDayCharts.length;i++){
                    $scope.cardSeries[0].data[i] =  $scope.sevenDayCharts[i].expenditure;
                    $scope.cardSeries[1].data[i] =  $scope.sevenDayCharts[i].income;
                    $scope.cardOptions.xAxis.categories[i] =  $scope.sevenDayCharts[i].formateDate
                }
            }



}]);