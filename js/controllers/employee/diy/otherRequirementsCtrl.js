/**
 * Created by Administrator on 2018/11/28.
 */
angular.module('controllers',[]).controller('otherRequirementsCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetAllProductInfo','GetOrderInfo','UpdateOrderInfo','Global','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetAllProductInfo,GetOrderInfo,UpdateOrderInfo,Global,$ionicLoading) {
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
                orderId : $stateParams.orderId
            };
            $scope.arr = [];

            $scope.diySkinType = {
                type:"0"
            };

            //获取所有的产品信息
            GetAllProductInfo.save($scope.diyProduct,function (data) {

                for(var i=0;i<data.responseData.length;i++){
                    $scope.demandList = data.responseData[i];
                    $scope.demandList.checklist=false;
                    $scope.demandList.checkGoods=false;

                    //存储所有的订单信息
                    $scope.arr.push($scope.demandList)
                }

                GetOrderInfo.save($scope.diyOrderDTO,function (data) {
                    $ionicLoading.hide();
                    $scope.diyOrderDTO = data.responseData;
                    angular.forEach($scope.arr, function(prod){
                        angular.forEach($scope.diyOrderDTO.demandDTOList, function(demandDTO){
                            //如果产品在订单中已经存在，则用户不可再次勾选
                            if(demandDTO.extDiyProduct.flagNo == prod.flagNo){
                                prod.checklist=true;
                            }
                        });
                    });
                })
            });
            $scope.num=0;
            });

            $scope.checkDemand=function (index) {
                //如果当前点击的产品为非勾选状态
                if(!$scope.arr[index].checkGoods){
                    if($scope.num == 1){
                        alert("亲，您只能勾选一种产品哦！");
                        return;
                    }
                    $scope.num+=1
                }
                //如果当前点击的皮肤为勾选状态
                else {
                    $scope.num-=1
                }

                $scope.arr[index].checkGoods=!$scope.arr[index].checkGoods;/*点击选错还可以重修勾选*/
            };


            $scope.nextTep=function () {
                $scope.diyOrderDTO = {
                    demandDTOList:[]
                };

                $scope.updateProduct={
                    extDiyProduct:{
                        //用来区分用户选择的多个产品组合
                        transactionId:'',
                        id:"",
                        flagNo:"",
                        name:""
                    }
                };
                //这里需要重新生成新的交易流水号
                $scope.transactionId = localStorage.getItem("transactionId");
                if(null == $scope.transactionId){
                    $scope.updateProduct.extDiyProduct.transactionId = Date.parse(new Date());
                    localStorage.setItem("transactionId",$scope.updateProduct.extDiyProduct.transactionId)
                }else{
                    $scope.updateProduct.extDiyProduct.transactionId = $scope.transactionId
                }
                if($scope.num==1){
                    for(var i=0;i<$scope.arr.length;i++){
                        if($scope.arr[i].checkGoods==true){
                            $scope.updateProduct.extDiyProduct.id=$scope.arr[i].id;
                            $scope.updateProduct.extDiyProduct.flagNo=$scope.arr[i].flagNo;
                            $scope.updateProduct.extDiyProduct.name=$scope.arr[i].name;
                            $scope.diyOrderDTO.demandDTOList.push($scope.updateProduct)
                        }
                    }

                    UpdateOrderInfo.save($scope.diyOrderDTO,function (data) {
                        if(Global.SUCCESS != data.result){
                            alert("操作失败，请联系客服，谢谢");
                            return
                        }
                        $scope.orderId = data.responseData.orderId;

                        $state.go("selectionList",{orderId:$scope.orderId})
                    })
                }else{
                    alert("亲，选择类型不满足哦")
                }



            };
            $scope.goPay=function () {
                $state.go("settlement",{orderId:$scope.diyOrderDTO.orderId})
            };
        }]);