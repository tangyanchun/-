/**
 * Created by Administrator on 2018/11/28.
 */
angular.module('controllers',[]).controller('currentDemandCtrl',
    ['$scope','$rootScope','$stateParams','$state','UpdateOrderInfo','GetAllProductInfo','Global','$ionicLoading','$timeout',
        function ($scope,$rootScope,$stateParams,$state,UpdateOrderInfo,GetAllProductInfo,Global,$ionicLoading,$timeout) {
            $scope.$on('$ionicView.enter', function() {
                $scope.diyProduct = {};
                $scope.arr = [];
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetAllProductInfo.save($scope.diyProduct, function (data) {
                    $ionicLoading.hide();
                    for (var i = 0; i < data.responseData.length; i++) {
                        $scope.demandList = data.responseData[i];
                        $scope.demandList.checklist = false;
                        $scope.arr.push($scope.demandList)
                    }

                });
                $scope.num = 0;
                $scope.checkDemand = function (index) {
                    //如果当前点击的产品为非勾选状态
                    if (!$scope.arr[index].checklist) {
                        if ($scope.num == 1) {
                            showToast("亲，超出可选择范围了");
                            hideToast();
                            return;
                        }
                        $scope.num += 1
                    }
                    //如果当前点击的皮肤为勾选状态
                    else {
                        $scope.num -= 1
                    }

                    $scope.arr[index].checklist = !$scope.arr[index].checklist;
                    /*点击选错还可以重修勾选*/

                    /*如果值为0 重置 循环数据 让状态重置初始*/
                    if ($scope.num == 0) {
                        for (var i = 0; i < $scope.arr.length; i++) {
                            $scope.arr[i].checklist = false;
                        }
                    }

                };
                $scope.nextPage = function () {
                    $scope.diyOrderDTO = {
                        demandDTOList: []
                    };

                    $scope.updateProduct = {
                        extDiyProduct: {
                            //用来区分用户选择的多个产品组合
                            transactionId: '',
                            id: "",
                            flagNo: "",
                            name: ""
                        }
                    };

                    $scope.transactionId = localStorage.getItem("transactionId");

                    if (null == $scope.transactionId) {
                        $scope.updateProduct.extDiyProduct.transactionId = Date.parse(new Date());
                        localStorage.setItem("transactionId", $scope.updateProduct.extDiyProduct.transactionId)
                    } else {
                        $scope.updateProduct.extDiyProduct.transactionId = $scope.transactionId
                    }

                    if ($scope.num == 1) {
                        for (var i = 0; i < $scope.arr.length; i++) {
                            if ($scope.arr[i].checklist == true) {
                                $scope.updateProduct.extDiyProduct.id = $scope.arr[i].id;
                                $scope.updateProduct.extDiyProduct.flagNo = $scope.arr[i].flagNo;
                                $scope.updateProduct.extDiyProduct.name = $scope.arr[i].name;
                                $scope.diyOrderDTO.demandDTOList.push($scope.updateProduct)
                            }
                        }

                        UpdateOrderInfo.save($scope.diyOrderDTO, function (data) {
                            if (Global.SUCCESS != data.result) {
                                showToast("操作失败，请联系客服，谢谢");
                                hideToast();
                                return;
                            }
                            $scope.orderId = data.responseData.orderId;

                            $state.go("selectionList", {orderId: $scope.orderId})
                        })
                    } else {
                        showToast("请先选择类型");
                        hideToast();
                    }
                }
            });
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