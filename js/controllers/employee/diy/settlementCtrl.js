/**
 * Created by Administrator on 2018/11/28.
 */
angular.module('controllers',[]).controller('settlementCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetOrderInfo','GetTotalPrice','UpdateOrderInfo','Global','$ionicLoading','$timeout',
        function ($scope,$rootScope,$stateParams,$state,GetOrderInfo,GetTotalPrice,UpdateOrderInfo,Global,$ionicLoading,$timeout) {

            $scope.$on('$ionicView.enter', function(){
            $ionicLoading.show({
                content: 'Loading',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: 0
            });
            //订单号
            $scope.diyOrderDTO = {
                orderId :$stateParams.orderId
            };

            //当前交易对象（当前产品和产品原料的组合，一笔订单可以有多个组合）,此对象也用户界面显示
            $scope.demandDTO = {
                transactionId:"",
                basisMaterials:[],
                essenceMaterials:[],
                scentMaterials:[],
                basalMaterials:[]
            };

            //type 0 基础原料 1 精华原料 2 香型 3 基底原料
            $scope.materialType={
                basisType:"0",
                essenceType:"1",
                scentType:"2",
                basalType:"3"
            };

            //必须有交易流水(一款产品和产品原料的组合为一笔交易)
            $scope.transactionId = localStorage.getItem("transactionId");
            $scope.initOrder();
            $scope.totalPrice()
            if(null == $scope.transactionId){
                showToast("对不起，操作异常，请清空订单重新操作,谢谢");
                hideToast();
                return
            }

            });

            $scope.initOrder = function () {
                GetOrderInfo.save($scope.diyOrderDTO,function (data) {
                    $ionicLoading.hide();

                    $scope.diyOrderDTO = data.responseData;

                    /*皮肤类型*/
                    $scope.skinType=data.responseData.bigTypeList;
                    /*需求*/
                    $scope.skinDemand=data.responseData.smallTypeList;
                    /*当前状态*/
                    $scope.current=data.responseData.demandDTOList;
                });
            };
            $scope.orderChange = function (item2,transactionId) {
                //获取当前的交易对象
                angular.forEach($scope.diyOrderDTO.demandDTOList, function(arr){
                    if(arr.extDiyProduct.transactionId == transactionId){
                        $scope.demandDTO = arr;
                    }
                });
                //如果订单中已存在，此次操作是从订单中删除
                if($scope.materialType.basisType == item2.type){
                    angular.forEach($scope.demandDTO.basisMaterials, function(order,index,list){
                        if(item2.flagNo == order.flagNo){
                            $scope.demandDTO.basisMaterials.splice(index, 1);
                        }
                    })
                }
                else if($scope.materialType.essenceType==item2.type){
                    angular.forEach($scope.demandDTO.essenceMaterials, function(order,index,list){
                        if(item2.flagNo == order.flagNo){
                            $scope.demandDTO.essenceMaterials.splice(index, 1);
                        }

                    })
                }
                else if($scope.materialType.scentType==item2.type){
                    angular.forEach($scope.demandDTO.scentMaterials, function(order,index,list){
                        if(item2.flagNo == order.flagNo){
                            $scope.demandDTO.scentMaterials.splice(index, 1);
                        }

                    })
                }
                else if($scope.materialType.basalType==item2.type){
                    angular.forEach($scope.demandDTO.basalMaterials, function(order,index,list){
                        if(item2.flagNo == order.flagNo){
                            $scope.demandDTO.basalMaterials.splice(index, 1);
                        }
                    })
                }
                //仅仅操作当前交易对象
                $scope.diyOrderDTO.demandDTOList = [];
                $scope.demandDTO.transactionId = transactionId;
                $scope.diyOrderDTO.demandDTOList.push($scope.demandDTO);
                UpdateOrderInfo.save($scope.diyOrderDTO,function (data) {
                    if(Global.SUCCESS != data.result){
                        showToast("操作失败，请联系客服，谢谢");
                        hideToast();
                        return
                    }
                    $scope.initOrder();
                    $scope.totalPrice()
                })
            };
            $scope.diyOrderDTO = {
                orderId :$stateParams.orderId
            };
            $scope.totalPrice = function () {
                GetTotalPrice.save($scope.diyOrderDTO,function (data) {
                    $scope.price=data.responseData;
                });

            };
            $scope.goPay=function () {
                // console.log($scope.diyOrderDTO.demandDTOList);
                // debugger
                  // for(var  i=0 ;i<$scope.diyOrderDTO.demandDTOList.length;i++){
                  //    if($scope.diyOrderDTO.demandDTOList[i].basalMaterials.length==0&&$scope.diyOrderDTO.demandDTOList[i].basisMaterials.length==0&&$scope.diyOrderDTO.demandDTOList[i].essenceMaterials.length==0&&$scope.diyOrderDTO.demandDTOList[i].scentMaterials.length==0){
                  //        $scope.totalPrice()
                  //      alert("亲，您还没有选择商品呦");
                  //        $state.go("chooseSkin");
                  //        return;
                  //    }
                  // }
                $state.go("diyPay",{orderId: $scope.diyOrderDTO.orderId})
            };
            var showToast = function (content) {
                $ionicLoading.show({
                    template: content
                });
            };

            var hideToast = function () {
                $timeout(function () {
                    $ionicLoading.hide();
                }, 1000);
            };
        }]);