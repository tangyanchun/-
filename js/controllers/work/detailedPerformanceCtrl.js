/**
 * Created by Administrator on 2018/5/2.
 */
angular.module('controllers',[]).controller('detailedPerformanceCtrl',
    ['$scope','$rootScope','$stateParams','$state',"GetBossPerformanceList","Global",'GetClerkPerformanceListClerk','$ionicScrollDelegate','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetBossPerformanceList,Global,GetClerkPerformanceListClerk,$ionicScrollDelegate,$ionicLoading) {

            $rootScope.title = "业绩明细";
            $scope.flag = false;


            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                $scope.param={
                    picFlag:false
                };
                 $scope.userConsumeRequest = {
                     pageSize:1000,
                     searchFile:$stateParams.searchFile,
                     startTime:$stateParams.startDate+' 00:00:00',
                     endTime:$stateParams.endDate+' 23:59:59'

                 };
                if ($stateParams.sysClerkId != "") {
                    $scope.userConsumeRequest.sysClerkId = $stateParams.sysClerkId
                    GetClerkPerformanceListClerk.get($scope.userConsumeRequest,function(data){
                        if(data.result==Global.SUCCESS&&data.responseData!=null) {
                            $ionicLoading.hide();
                            $scope.list = data.responseData;
                            $scope.detailedPerformance = data.responseData;
                            if(data.responseData.length<=0){
                                $scope.param.picFlag=true;
                            }
                        }else {
                            $ionicLoading.hide();
                            $scope.param.picFlag=true;
                        }

                    })
                }
                if ($stateParams.sysShopId != "") {
                    $scope.userConsumeRequest.sysShopId = $stateParams.sysShopId;
                    GetBossPerformanceList.get($scope.userConsumeRequest,function(data){
                        if(data.result==Global.SUCCESS&&data.responseData!=null) {
                            $ionicLoading.hide();
                            $scope.list = data.responseData;
                            $scope.detailedPerformance = data.responseData;
                            if(data.responseData.length<=0){
                                $scope.param.picFlag=true;
                            }
                        }else {
                            $ionicLoading.hide();
                            $scope.param.picFlag=true;
                        }

                    })
                }
            })


            $scope.expenditureDetailsGo = function(flowNo){
                $state.go("details",{flowNo:flowNo,searchFile:$stateParams.searchFile})
            }
            $scope.sel = function(){
                $ionicScrollDelegate.$getByHandle('dashboard').scrollTop(false);
                $scope.flag = true;
            };
            $scope.all=function () {
                $scope.flag = false
            }
            /*type 0 全部*/
            /*type 1 消费*/
            /*type 2 充值*/
            $scope.getInfo = function(type){
                $scope.detailedPerformance=[];
                if(type!='-1'){
                    for( var i=0;i<$scope.list.length;i++){
                        if($scope.list[i].type==type){
                            $scope.detailedPerformance.push($scope.list[i])
                        }
                    }
                }else{
                    $scope.detailedPerformance=$scope.list
                }
                if( $scope.detailedPerformance.length<=0){
                    $scope.param.picFlag=true;
                }else{
                    $scope.param.picFlag=false
                }
                $scope.flag = false

            };

        }])