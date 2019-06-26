/**
 * Created by Administrator on 2018/12/5.
 */
angular.module('controllers',[]).controller('basalListCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetMaterialInfo','GetOrderInfo','UpdateOrderInfo','Global','$ionicLoading','$timeout',
        function ($scope,$rootScope,$stateParams,$state,GetMaterialInfo,GetOrderInfo,UpdateOrderInfo,Global,$ionicLoading,$timeout) {
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                //订单号
                $scope.diyOrderDTO = {
                    orderId: $stateParams.orderId,
                    demandDTOList: []
                };
                $scope.demandDTO = {
                    basalMaterials: []
                };
                //type 0 基础原料 1 精华原料 2 香型 3 基底原料
                $scope.materialType = {
                    basalType: "3"
                };
                $scope.extDiyMaterial = {
                    type: "3",
                    filterStr: '',//过滤条件
                    skinTypes: [],//皮肤类型
                    demands: [],//需求
                    basalMaterials: [],//基底
                    prodFlagNo:''//当前产品信息
                };
                $scope.transactionId = localStorage.getItem("transactionId");
                if (null == $scope.transactionId) {
                    showToast("对不起，操作异常，请清空订单重新操作,谢谢");
                    hideToast();
                    return
                }

                GetOrderInfo.save($scope.diyOrderDTO, function (data) {
                    //订单信息
                    $scope.diyOrderDTO = data.responseData;

                    angular.forEach($scope.diyOrderDTO.bigTypeList, function (arr) {
                        $scope.extDiyMaterial.skinTypes.push(arr.flagNo)
                    });

                    angular.forEach($scope.diyOrderDTO.smallTypeList, function (arr) {
                        $scope.extDiyMaterial.demands.push(arr.flagNo)
                    });

                    $scope.transactionId = localStorage.getItem("transactionId");

                    angular.forEach($scope.diyOrderDTO.demandDTOList, function (arr) {
                        if(arr.extDiyProduct.transactionId == $scope.transactionId){
                            $scope.extDiyMaterial.prodFlagNo = arr.extDiyProduct.flagNo
                        }
                    });

                    //根据用户需求查询原料
                    GetMaterialInfo.save($scope.extDiyMaterial, function (data) {
                        $ionicLoading.hide();
                        $scope.extDiyMaterial.basalMaterials = angular.copy(data.responseData.basalMaterials);
                        //获取当前的交易对象
                        angular.forEach($scope.diyOrderDTO.demandDTOList, function (arr) {
                            if (arr.extDiyProduct.transactionId == $scope.transactionId) {
                                $scope.demandDTOs = arr;
                            }
                        });
                        //遍历当前基础原料
                        angular.forEach($scope.extDiyMaterial.basalMaterials, function (arr) {
                            arr.orderExist = false;
                            angular.forEach($scope.demandDTO.basalMaterials, function (order) {
                                if (arr.flagNo == order.flagNo) {
                                    arr.orderExist = true
                                }
                            })
                        });

                    });
                });
                /*搜索*/
                $scope.search = function () {
                    GetMaterialInfo.save($scope.extDiyMaterial, function (data) {
                        $scope.extDiyMaterial.basalMaterials = angular.copy(data.responseData.basalMaterials);
                        //获取当前的交易对象
                        angular.forEach($scope.diyOrderDTO.demandDTOList, function (arr) {
                            if (arr.extDiyProduct.transactionId == $scope.transactionId) {
                                $scope.demandDTOs = arr;
                            }
                        });
                        //遍历当前基础原料
                        angular.forEach($scope.extDiyMaterial.basalMaterials, function (arr) {
                            arr.orderExist = false;
                            angular.forEach($scope.demandDTO.basalMaterials, function (order) {
                                if (arr.flagNo == order.flagNo) {
                                    arr.orderExist = true
                                }
                            })
                        });

                    });
                };
                /*取消搜索*/
                $scope.clearSearch = function () {
                    $scope.extDiyMaterial.filterStr = "";
                    GetMaterialInfo.save($scope.extDiyMaterial, function (data) {
                        $scope.extDiyMaterial.basalMaterials = angular.copy(data.responseData.basalMaterials);
                        //获取当前的交易对象
                        angular.forEach($scope.diyOrderDTO.demandDTOList, function (arr) {
                            if (arr.extDiyProduct.transactionId == $scope.transactionId) {
                                $scope.demandDTOs = arr;
                            }
                        });
                        //遍历当前基础原料
                        angular.forEach($scope.extDiyMaterial.basalMaterials, function (arr) {
                            arr.orderExist = false;
                            angular.forEach($scope.demandDTO.basalMaterials, function (order) {
                                if (arr.flagNo == order.flagNo) {
                                    arr.orderExist = true
                                }
                            })
                        });

                    });
                };
        });
                $scope.orderChange = function (item) {
                    //如果订单中已存在，此次操作是从订单中删除
                    if (item.orderExist) {
                        item.orderExist = false;
                        if ($scope.materialType.basalType == item.type) {
                            angular.forEach($scope.demandDTO.basalMaterials, function (order, index, list) {
                                if (item.flagNo == order.flagNo) {
                                    showToast("成功删除");
                                    hideToast();
                                    $scope.demandDTO.basalMaterials.splice(index, 1);
                                }
                            })
                        }
                        item.orderExist = false
                    }
                    //如果订单中不存在，此次操作是从订单中添加
                    else {
                        if (null == $scope.demandDTO.basalMaterials) {
                            $scope.demandDTO.basalMaterials = [];
                        }
                        if ($scope.demandDTO.basalMaterials.length == 1) {
                            showToast("亲，您只能选择一个呦");
                            hideToast();
                            return;
                        }
                        $scope.demandDTO.basalMaterials.push(item);
                        showToast("添加成功");
                        hideToast();
                        item.orderExist = true;
                    }
                    //仅仅操作当前交易对象
                    $scope.diyOrderDTO.demandDTOList = [];
                    $scope.demandDTOs.basalMaterials=$scope.demandDTO.basalMaterials;
                    $scope.diyOrderDTO.demandDTOList.push($scope.demandDTOs);
                    UpdateOrderInfo.save($scope.diyOrderDTO, function (data) {
                        if (Global.SUCCESS != data.result) {
                            showToast("操作失败，请联系客服，谢谢");
                            hideToast();
                            return
                        }
                    })
                };

                $scope.nextPage = function () {
                    if ($scope.demandDTO.basalMaterials==null||$scope.demandDTO.basalMaterials.length==0) {
                        showToast("亲，你还没有选择呦");
                        hideToast();
                    }else{
                        $state.go("detailedList", {orderId: $scope.diyOrderDTO.orderId})
                    }
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