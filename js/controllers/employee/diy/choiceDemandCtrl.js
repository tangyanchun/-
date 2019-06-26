/**
 * Created by Administrator on 2018/11/28.
 */
angular.module('controllers',[]).controller('choiceDemandCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetAllSkinTypeInfo','GetSkinTypeInfoByNo','UpdateOrderInfo','Global','$ionicLoading','$timeout','GetMaterialInfo',
        function ($scope,$rootScope,$stateParams,$state,GetAllSkinTypeInfo,GetSkinTypeInfoByNo,UpdateOrderInfo,Global,$ionicLoading,$timeout,GetMaterialInfo) {
            $scope.$on('$ionicView.enter', function() {
                $scope.diySkinType = {
                    orderId:$stateParams.orderId,
                    type: "1"
                };
                $scope.arr = [];
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });

                $scope.extDiyMaterial = {
                    type: "",
                    filterStr: '',//过滤条件
                    skinTypes: [],//皮肤类型
                    demands: [],//需求
                    basalMaterials: [],//基底
                    prodFlagNo:''//当前产品信息
                };

                GetAllSkinTypeInfo.save($scope.diySkinType, function (data) {
                    $ionicLoading.hide();
                    for (var i = 0; i < data.responseData.length; i++) {
                        $scope.arrChilde = data.responseData[i];
                        $scope.arrChilde.changeBg = false;
                        $scope.arrChilde.checklist = false;
                        $scope.arr.push($scope.arrChilde)
                    }
                });

                $scope.num = 0;
                $scope.checkSkin = function (index, id) {

                    //如果当前点击的皮肤为非勾选状态
                    if (!$scope.arr[index].checklist) {
                        if ($scope.num == 2) {
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
                            $scope.arr[i].changeBg = false;
                        }
                    }

                    $scope.requestBody = {typeOneId: id};
                    GetSkinTypeInfoByNo.save($scope.requestBody, function (data) {
                        $scope.skin2List = data.responseData;
                        /*点击调取接口与第一个接口比对，相同的状态不改变，不同的置灰。*/
                        if ($scope.num == 1) {
                            angular.forEach($scope.skin2List, function (skin, index, array) {
                                angular.forEach($scope.arr, function (arr, index, array) {
                                    if (arr.id == skin.typeTwoId && skin.ruleStatus == "0") {
                                        arr.changeBg = true
                                    }
                                })
                            });
                        }
                    })
                };
                $scope.nextPage = function () {
                    $scope.diyOrderDTO = {
                        smallTypeList: []
                    };
                    if ($scope.num >= 1 && $scope.num <= 2) {

                        angular.forEach($scope.arr, function (arr, index, array) {
                            if (arr.checklist == true && arr.changeBg == false) {
                                $scope.diyOrderDTO.smallTypeList.push(arr)
                            }
                        });

                        UpdateOrderInfo.save($scope.diyOrderDTO, function (data) {
                            if (Global.SUCCESS != data.result) {
                                showToast("操作失败，请联系客服，谢谢");
                                hideToast();
                                return;
                            }

                            //校验有没成分数据
                            $scope.diyOrderDTO = data.responseData
                            $scope.extDiyMaterial.skinTypes=[]
                            $scope.extDiyMaterial.demands=[]
                            $scope.extDiyMaterial.prodFlagNo='m'
                            angular.forEach($scope.diyOrderDTO.bigTypeList, function (arr) {
                                $scope.extDiyMaterial.skinTypes.push(arr.flagNo)
                            });

                            angular.forEach($scope.diyOrderDTO.smallTypeList, function (arr) {
                                $scope.extDiyMaterial.demands.push(arr.flagNo)
                            });
                            //过滤校验，防止没有成分数据
                            GetMaterialInfo.save($scope.extDiyMaterial, function (data) {
                                //判断有无基础原料和精华原料
                                if(data.responseData.basisMaterials.length == 0 ||
                                    data.responseData.essenceMaterials.length == 0
                                        ){
                                    alert("根据您的皮肤类型，不建议此项需求搭配，请重新选择")
                                    return
                                }
                                //判断有无基底原料
                                $scope.extDiyMaterial.type = '3'
                                GetMaterialInfo.save($scope.extDiyMaterial, function (data) {
                                    if(data.responseData.basalMaterials.length == 0){
                                        alert("根据您的皮肤类型，不建议此项需求搭配，请重新选择")
                                        return
                                    }
                                })
                                $state.go("currentDemand")
                            });


                        })

                    } else {
                        showToast("请先选择类型");
                        hideToast();
                        return
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