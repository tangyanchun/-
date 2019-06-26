/**
 * Created by Administrator on 2018/12/5.
 */
angular.module('controllers',[]).controller('essenceListCtrl',
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
                    essenceMaterials: []
                };
                //type 0 基础原料 1 精华原料 2 香型 3 基底原料
                $scope.materialType = {
                    essenceType: "1"
                };
                $scope.extDiyMaterial = {
                    type: "1",
                    filterStr: '',//过滤条件
                    skinTypes: [],//皮肤类型
                    demands: [],//需求
                    essenceMaterials: []//精华原料
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
                    //根据用户需求查询原料
                    GetMaterialInfo.save($scope.extDiyMaterial, function (data) {
                        $ionicLoading.hide();
                        $scope.extDiyMaterial.essenceMaterials = angular.copy(data.responseData.essenceMaterials);
                        //获取当前的交易对象
                        angular.forEach($scope.diyOrderDTO.demandDTOList, function (arr) {
                            if (arr.extDiyProduct.transactionId == $scope.transactionId) {
                                $scope.demandDTOs = arr;
                            }
                        });
                        //遍历当前基础原料
                        angular.forEach($scope.extDiyMaterial.essenceMaterials, function (arr) {
                            arr.orderExist = false;
                            angular.forEach($scope.demandDTO.essenceMaterials, function (order) {
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
                        $scope.extDiyMaterial.essenceMaterials = angular.copy(data.responseData.essenceMaterials);
                        //获取当前的交易对象
                        angular.forEach($scope.diyOrderDTO.demandDTOList, function (arr) {
                            if (arr.extDiyProduct.transactionId == $scope.transactionId) {
                                $scope.demandDTOs = arr;
                            }
                        });
                        //遍历当前基础原料
                        angular.forEach($scope.extDiyMaterial.essenceMaterials, function (arr) {
                            arr.orderExist = false;
                            angular.forEach($scope.demandDTO.essenceMaterials, function (order) {
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
                        $scope.extDiyMaterial.essenceMaterials = angular.copy(data.responseData.essenceMaterials);
                        //获取当前的交易对象
                        angular.forEach($scope.diyOrderDTO.demandDTOList, function (arr) {
                            if (arr.extDiyProduct.transactionId == $scope.transactionId) {
                                $scope.demandDTOs = arr;
                            }
                        });
                        //遍历当前基础原料
                        angular.forEach($scope.extDiyMaterial.essenceMaterials, function (arr) {
                            arr.orderExist = false;
                            angular.forEach($scope.demandDTO.essenceMaterials, function (order) {
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
                        if ($scope.materialType.essenceType == item.type) {
                            angular.forEach($scope.demandDTO.essenceMaterials, function (order, index, list) {
                                if (item.flagNo == order.flagNo) {
                                    showToast("成功删除");
                                    hideToast();
                                    $scope.demandDTO.essenceMaterials.splice(index, 1);
                                }
                            })
                        }
                        item.orderExist = false
                    }
                    //如果订单中不存在，此次操作是从订单中添加
                    else {
                        if (null == $scope.demandDTO.essenceMaterials) {
                            $scope.demandDTO.essenceMaterials = [];
                        }
                        $scope.demandDTO.essenceMaterials.push(item);
                        showToast("添加成功");
                        hideToast();
                        item.orderExist = true;
                    }
                    //仅仅操作当前交易对象
                    $scope.diyOrderDTO.demandDTOList = [];
                    $scope.demandDTOs.essenceMaterials=$scope.demandDTO.essenceMaterials;
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

                    if ($scope.demandDTO.essenceMaterials==null||$scope.demandDTO.essenceMaterials.length==0) {
                        showToast("亲，你还没有选择呦");
                        hideToast();
                        return;
                    }else{
                        $state.go(selectPage(), {orderId: $scope.diyOrderDTO.orderId})
                    }
                }


            var selectPage = function () {
                var toPage = "basalList";

                //如果只选了宝宝系列，跳过选择香型页面，直接到基地原料选择界面
                if($scope.diyOrderDTO.bigTypeList.length == 1 && $scope.diyOrderDTO.bigTypeList[0].flagNo == 'e'){
                    toPage = "basalList"
                }
                //如果小类只选择了宝宝系列下的小类，跳过选择香型页面，直接到基地原料选择界面
                angular.forEach($scope.diyOrderDTO.smallTypeList, function (small, index, list) {
                    if(small.flagNo != 'r' && small.flagNo != 's' && small.flagNo != 't'){
                        toPage = "aromaList"
                    }
                })

                return toPage;
            }

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