/**
 * Created by Administrator on 2018/5/31.
 */
angular.module('controllers',[]).controller('employeeSchedulingCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetShopClerkScheduleListForClerk','Global','$filter','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetShopClerkScheduleListForClerk,Global,$filter,$ionicLoading) {
            $rootScope.title = "排班";
            $scope.param={
                nowdate:new Date().getFullYear()+"年"+parseInt(new Date().getMonth()+1)+"月",//初始化时间
                compileDateFlag:true
            };
            $scope.queryScheduleList = function (searchDate) {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetShopClerkScheduleListForClerk.get({
                    searchDate:searchDate
                },function (data) {
                    if(data.result == Global.SUCCESS){
                        $ionicLoading.hide();
                        $scope.tempWeek = data.responseData.dateDetail;
                        for(var i = 0; i < $scope.tempWeek.length; i++){
                            $scope.tempWeek[i] = ($scope.tempWeek[i].split("||")[0].substr($scope.tempWeek[i].split("||")[0].length-2,2)+","+$scope.tempWeek[i].split("||")[1].replace("星期","周")).split(",")
                        }
                        $scope.tempUser = data.responseData.responseList;
                        var C = $scope.tempUser[0].clerkSchInfo;
                       var A =  $filter('date')(C[0].scheduleDate, 'EEEE');/*过滤时间查看  根据时间戳查看返回的时间是星期几 头部的星期是固定的 根据过滤时间如果是周五 那就要前面push五个空的，以此列推*/
                       var B = {
                           scheduleDate:"",
                           scheduleType:''
                       };
                   /*不知道返回数据的第一个时间戳是多少 这样判断有点愚蠢 不过方法可行*/
                       if(A == '星期五'){
                           for(var i=0;i<5;i++){
                               C.unshift(B)
                           }
                       }else if(A == '星期一'){
                           for(var i=0;i<1;i++){
                               C.unshift(B)
                           }
                       }else if(A == '星期二'){
                           for(var i=0;i<2;i++){
                               C.unshift(B)
                           }
                       }else if(A == '星期三'){
                           for(var i=0;i<3;i++){
                               C.unshift(B)
                           }
                       }else if(A == '星期四'){
                           for(var i=0;i<4;i++){
                               C.unshift(B)
                           }
                       }else if(A == '星期六'){
                           for(var i=0;i<6;i++){
                               C.unshift(B)
                           }
                       }
                        console.log(C);
                    }
                })
            };

            $scope.queryScheduleList($scope.param.nowdate.replace("年","-").replace("月","-1"));
            $scope.compileDateFn = function () {
                if(new Date().getFullYear()+"年"+parseInt(new Date().getMonth()+1)+"月" == $scope.param.nowdate){
                    $scope.param.compileDateFlag = false
                }else{
                    $scope.param.compileDateFlag = true
                }
            };
            $scope.compileDateFn();

            /*更改日期*/
            $scope.subMonth = function () {
                $scope.dataYear = parseInt($scope.param.nowdate.split("年")[0]);
                $scope.dataMonth = parseInt($scope.param.nowdate.split("年")[1].split("月")[0]);
                $scope.param.nowdate = $scope.dataYear+"年"+($scope.dataMonth-1)+"月";
                if($scope.dataMonth == 0){
                    $scope.dataYear = $scope.dataYear-1;
                    $scope.dataMonth = 12;
                    $scope.param.nowdate = $scope.dataYear+"年"+$scope.dataMonth+"月"
                }
                $scope.queryScheduleList($scope.param.nowdate.replace("年","-").replace("月","-1"));
                $scope.compileDateFn()
            };
            $scope.addMonth = function () {
                $scope.dataYear = parseInt($scope.param.nowdate.split("年")[0]);
                $scope.dataMonth = parseInt($scope.param.nowdate.split("年")[1].split("月")[0]);
                $scope.param.nowdate = $scope.dataYear+"年"+($scope.dataMonth+1)+"月";
                if($scope.dataMonth == 12){
                    $scope.dataYear = $scope.dataYear+1;
                    $scope.dataMonth = 0;
                    $scope.param.nowdate = $scope.dataYear+"年"+$scope.dataMonth+"月"
                }
                $scope.queryScheduleList($scope.param.nowdate.replace("年","-").replace("月","-1"));
                $scope.compileDateFn()
            };

        }]);