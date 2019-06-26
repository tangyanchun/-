/**
 * Created by Administrator on 2018/6/1.
 */
angular.module('controllers',[]).controller('employeeProductDtailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetProductDrawRecord','ProductAndRechargeCard','Global',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetProductDrawRecord,ProductAndRechargeCard,Global) {
            $rootScope.title = "产品详情";
            $scope.param={
                flag:true,
                orderType:"1"
            };
            $scope.chooseTab = function (type) {
                if(type =="0"){
                    $scope.param.flag = true;
                    $scope.param.orderType = '1';
                }else{
                    $scope.param.flag = false;
                    $scope.param.orderType = '0';
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
                        $scope.productDetails=data.responseData;
                    }
                })
            };
            $scope.getInfo();

            $scope.getInfos = function () {
                var userConsumeRequestDTO = {
                    consumeType:1,
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
