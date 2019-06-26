angular.module('controllers',[]).controller('productDtailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetProductDrawRecord','ProductAndRechargeCard','Global',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetProductDrawRecord,ProductAndRechargeCard,Global) {
            $rootScope.title = "产品详情";
            $scope.param={
                flag:true,
                orderType:"0"
            };
            $scope.chooseTab = function (type) {
                $scope.param.orderType = type;
                if(type =="0"){
                    $scope.param.flag = true;
                    $scope.getInfo();
                }else{
                    $scope.param.flag = false;
                    $scope.getInfos()
                }
            };
            /*领取记录*/
            $scope.getInfo = function () {
                var userConsumeRequestDTO={
                    flowId:$stateParams.flowId,
                    goodsType:"4"
                };
                GetProductDrawRecord.save(userConsumeRequestDTO,function (data) {
                    if(data.result==Global.SUCCESS&&data.responseData!=null) {
                        $scope.productDtails=data.responseData;
                    }
                })
            };
            $scope.getInfo();

            $scope.getInfos = function () {
                var userConsumeRequestDTO = {
                    consumeType:'0',
                    flowId:$stateParams.flowId,
                    goodsType:'4'
                };
                ProductAndRechargeCard.save(userConsumeRequestDTO,function (data) {
                    if(data.result==Global.SUCCESS&&data.responseData!=null) {
                        $scope.info=data.responseData;
                    }
                    
                })
            }

        }]);
