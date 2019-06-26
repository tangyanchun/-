/**
 * Created by Administrator on 2018/5/2.
 */
angular.module('controllers',[]).controller('incomeDetailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetIncomeExpenditureAnalysisDetailList','$ionicLoading','Global',
        function ($scope,$rootScope,$stateParams,$state,GetIncomeExpenditureAnalysisDetailList,$ionicLoading,Global) {

            $rootScope.title = "收入明细";
            $scope.param={
                pageSize:1000,
                picFlag:false,
                date:$stateParams.date
            };
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetIncomeExpenditureAnalysisDetailList.get({sysShopId:$stateParams.sysShopId,pageSize:$scope.param.pageSize,startTime:$scope.param.date+" 00:00:00",endTime:$scope.param.date+' 23:59:59'},function (data) {
                    if(data.result==Global.SUCCESS&&data.responseData!=null) {
                        $ionicLoading.hide();
                        $scope.incomeDetails=data.responseData;
                        $scope.param.picFlag=false;
                        if(data.responseData.length<=0){
                            $scope.param.picFlag=true;
                        }
                    }else {
                        $ionicLoading.hide();
                        $scope.param.picFlag=true;
                    }
                })
            })

        }]);