/**
 * Created by Administrator on 2018/5/3.
 */
angular.module('controllers',[]).controller('balanceOfPaymentsAllCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetCashEarningsTendency','Global',
        function ($scope,$rootScope,$stateParams,$state,GetCashEarningsTendency,Global) {

            $rootScope.title = "趋势图";
            if($stateParams.id !='a'){
                GetCashEarningsTendency.get({
                },function(data){
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $scope.balanceOfPaymentsAll = data.responseData;
                        $scope.HPic()
                    }

                })
            }else{
                GetCashEarningsTendency.get({
                    sysShopId:$stateParams.id
                },function(data){
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $scope.balanceOfPaymentsAll = data.responseData;
                        $scope.HPic()
                    }

                })
            }




            $scope.HPic = function(){
                var tangyanchun = setInterval(function () {
                    if($("#box").length != 0){
                        clearInterval(tangyanchun)
                        var myChart = echarts.init(document.getElementById("box"));
                        option = {
                            title: {
                                text: '近七日现金收益',
                                subtext: ''
                            },
                            legend: {
                                data:['现金收益'],
                                right:20,
                                top:5
                            },
                            grid: {
                                left: '3%',   //图表距边框的距离
                                right: '10%',
                                bottom: '3%',
                                containLabel: true
                            },
                            xAxis: {
                                type: 'category',
                                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                axisLine:{
                                    lineStyle:{
                                        color:'red'
                                    }
                                },
                                //x轴文字旋转
                                axisLabel:{
                                    interval:0,//横轴信息全部显示
                                    rotate:-30,//-30度角倾斜显示
                                },
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                name:'现金收益',
                                data: [820, 932, 901, 934, 1290, 1330, 1320],
                                type: 'line'
                            }]
                        };

                        for(var i=0;i<$scope.balanceOfPaymentsAll.length;i++){
                            option.xAxis.data[i]=$scope.balanceOfPaymentsAll[i].formateDate;
                            option.series[0].data[i] = $scope.balanceOfPaymentsAll[i].cashEarnings

                        }
                        myChart.setOption(option)

                    }
                },100);
            }
        }]);