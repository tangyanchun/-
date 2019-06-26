angular.module('controllers',[]).controller('refillCardCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetUserRechargeCardList','Global',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetUserRechargeCardList,Global) {
            $rootScope.title = "基本信息";
            $scope.param={
                flag:false,
                picFlag:false
            }
           $scope.prepaidPhoneRecordsGo=function (id,rechargeCardType) {
               if(rechargeCardType == '0'){
                   $state.go("accountDetails",{id:id,rechargeCardType:rechargeCardType})
               }else{
                   $state.go("detailsOfCashier",{id:id})
               }
           }
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetUserRechargeCardList.get({
                    sysUserId:$stateParams.sysUserId,
                    sysShopId:$stateParams.sysShopId,
                },function(data) {
                    if(data.result==Global.SUCCESS&&data.responseData!=null) {
                        $ionicLoading.hide();
                        $scope.refillCard = data.responseData
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

            $scope.help = function(){
                $scope.param.flag=true;
            }
            $scope.disNone = function(){
                $scope.param.flag=false;
            }
        }]);