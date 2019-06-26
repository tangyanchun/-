angular.module('controllers',[]).controller('accountDetailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetRechargeRecord','Global','BossUtil',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetRechargeRecord,Global,BossUtil) {
            $rootScope.title = "账户记录";
            $scope.param={
                picFlag:false
            }
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetRechargeRecord.get({
                    flowId:$stateParams.id,
                    pageSize:1000
                },function(data){
                    BossUtil.checkResponseData(data,'accountDetails&'+$stateParams.id);
                    $ionicLoading.hide()
                    if(data.result==Global.SUCCESS&&data.responseData!=null){
                        $scope.accountDetails =data.responseData
                        $scope.param.picFlag=false;
                        if(data.responseData.length<=0){
                            $scope.param.picFlag=true;
                        }
                    }else{
                        $scope.param.picFlag=true;
                    }
                })
            })

            $scope.detailsOfCashierGo = function (id,flowNo) {
                 $state.go("detailsOfCashier",{id:id,flowNo:flowNo,rechargeCardType:$stateParams.rechargeCardType})
            }
        }])