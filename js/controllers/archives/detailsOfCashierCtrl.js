angular.module('controllers',[]).controller('detailsOfCashierCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','ProductAndRechargeCard','Global','ConsumeFlowNo',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,ProductAndRechargeCard,Global,ConsumeFlowNo) {
            $rootScope.title = "消费详情";
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                var userConsumeRequestDTO = {
                    consumeType:0,
                    flowId:$stateParams.id,
                    goodsType:2
                }
                if($stateParams.id!=""&&$stateParams.flowNo!=''||($stateParams.id==""&&$stateParams.flowNo!='')){
                    ConsumeFlowNo.get({
                        consumeFlowNo:$stateParams.flowNo
                    },function (data) {
                        $ionicLoading.hide()
                        if(data.result==Global.SUCCESS&&data.responseData!=null){
                            $scope.info =data.responseData
                        }
                    })
                }else {
                    ProductAndRechargeCard.save(userConsumeRequestDTO,function (data) {
                        $ionicLoading.hide()
                        if(data.result==Global.SUCCESS&&data.responseData!=null){
                            $scope.info =data.responseData
                        }
                    })
                }

            })
        }]);
