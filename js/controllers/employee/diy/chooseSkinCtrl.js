/**
 * Created by Administrator on 2018/11/28.
 */
angular.module('controllers',[]).controller('chooseSkinCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetAllSkinTypeInfo','GetSkinTypeInfoByNo','GetOrderInfo','UpdateOrderInfo','Global','$ionicLoading','$timeout',
        function ($scope,$rootScope,$stateParams,$state,GetAllSkinTypeInfo,GetSkinTypeInfoByNo,GetOrderInfo,UpdateOrderInfo,Global,$ionicLoading,$timeout) {
            $scope.$on('$ionicView.enter', function() {
                $scope.diySkinType = {
                    type: "0"
                };
                if(localStorage.getItem('userType')=='beautyBoss'){
                    localStorage.removeItem('userType')
                }
                $scope.arr = [];
                /*一进页面初始化*/
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                if(localStorage.getItem('userType')=='beautyBoss'){
                    localStorage.removeItem('userType')
                }
                $scope.diyOrderDTO = {}

                $scope.orderId = ''

                GetAllSkinTypeInfo.save($scope.diySkinType, function (data) {
                    if(data.errorInfo==Global.TOKEN_EMPLOYEE){
                        alert('该手机号绑定的不是店员帐号，请用店员帐号登录！')
                    }
                    $ionicLoading.hide();
                    for (var i = 0; i < data.responseData.length; i++) {
                        $scope.arrChilde = data.responseData[i];
                        $scope.arrChilde.changeBg = false;
                        $scope.arrChilde.checklist = false;
                        $scope.arr.push($scope.arrChilde)
                    }
                });

                //初始化订单信息
                $scope.diyOrderDTO.initFlag = "true"
                GetOrderInfo.save($scope.diyOrderDTO,function (data) {
                    $scope.diyOrderDTO = data.responseData
                    $scope.orderId = $scope.diyOrderDTO.orderId
                })

            $scope.num=0;
            $scope.checkSkin=function (index,id) {

                //如果当前点击的皮肤为非勾选状态
                if(!$scope.arr[index].checklist){
                    if($scope.num == 1){
                        showToast("亲，超出可选择范围了");
                        hideToast();
                        return;
                    }
                    $scope.num+=1
                }
                //如果当前点击的皮肤为勾选状态
                else {
                    $scope.num-=1
                }
                $scope.arr[index].checklist=!$scope.arr[index].checklist;/*点击选错还可以重修勾选*/

                /*如果值为0 重置 循环数据 让状态重置初始*/
                if($scope.num==0){
                    for(var i=0;i< $scope.arr.length;i++){
                        $scope.arr[i].checklist=false;
                        $scope.arr[i].changeBg=false;
                    }
                }

                $scope.requestBody = {typeOneId:id};
                GetSkinTypeInfoByNo.save($scope.requestBody,function (data) {
                    $scope.skin2List = data.responseData;
                    /*点击调取接口与第一个接口比对，相同的状态不改变，不同的置灰。*/
                    if($scope.num==1){
                        angular.forEach($scope.skin2List, function(skin,index,array){
                            angular.forEach($scope.arr, function(arr,index,array){
                                if(arr.id == skin.typeTwoId && skin.ruleStatus == "0"){
                                    arr.changeBg=true
                                }
                            })
                        });
                    }
                });
                $scope.nextPage()
            };

            $scope.nextPage=function () {
                $scope.diyOrderDTO = {
                    bigTypeList:[]
                };
                if($scope.num==1){
                    angular.forEach($scope.arr, function(arr,index,array){
                        if(arr.checklist == true && arr.changeBg == false){
                            $scope.diyOrderDTO.bigTypeList.push(arr)
                        }
                    });
                    UpdateOrderInfo.save($scope.diyOrderDTO,function (data) {
                        if(Global.SUCCESS != data.result){
                            showToast("操作失败，请联系客服，谢谢");
                            hideToast();
                            return;
                        }
                    })

                }else{
                    showToast("请先选择类型");
                    hideToast();
                    return;
                }
               $state.go("choiceDemand",{orderId:$scope.orderId})
            };
                /*清空*/
                $scope.empty=function () {
                    angular.forEach($scope.arr, function(arr,index,array){
                        arr.changeBg=false
                        arr.checklist = false;
                        $scope.num = 0;
                    })
                    showToast("清空历史记录成功");
                    hideToast();
                };
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