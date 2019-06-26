/**
 * Created by Administrator on 2018/11/28.
 */
angular.module('controllers',[]).controller('printTicketCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetOrderInfo','GetTotalPrice',
        function ($scope,$rootScope,$stateParams,$state,GetOrderInfo,GetTotalPrice) {

            //订单号,界面显示用
            $scope.diyOrderDTO = {
                orderId : $stateParams.orderId,
                createDate:"",
                bigType:" ",
                smallType:" ",
                product:''

            };
            //原料对象，界面显示用
            $scope.materials={
                basalMaterials:[],
                basisMaterials:[],
                essenceMaterials:[],
                scentMaterials:[],
                totalPrice:''
            };


            GetOrderInfo.save($scope.diyOrderDTO,function (data) {
                //订单信息
                $scope.diyOrderDTO = data.responseData;

                angular.forEach($scope.diyOrderDTO.bigTypeList, function(arr,index){
                    if(index==0){
                        $scope.diyOrderDTO.bigType = arr.name
                    }else{
                        $scope.diyOrderDTO.bigType = $scope.diyOrderDTO.bigType+'-'+ arr.name
                    }
                });

                angular.forEach($scope.diyOrderDTO.smallTypeList, function(arr,index){
                    if(index==0){
                        $scope.diyOrderDTO.smallType = arr.name
                    }else{
                        $scope.diyOrderDTO.smallType = $scope.diyOrderDTO.smallType+'-'+ arr.name
                    }
                });

                angular.forEach($scope.diyOrderDTO.demandDTOList, function(arr,index){
                    if(index==0){
                        $scope.diyOrderDTO.product = arr.extDiyProduct.name
                    }else{
                        $scope.diyOrderDTO.product = $scope.product+'-'+ arr.name
                    }
                });

                angular.forEach($scope.diyOrderDTO.demandDTOList, function(arr,index){
                    angular.forEach(arr.basalMaterials, function(mater,index){
                        $scope.materials.basalMaterials.push(mater)
                    });
                    angular.forEach(arr.basisMaterials, function(mater,index){
                        $scope.materials.basisMaterials.push(mater)
                    });
                    angular.forEach(arr.essenceMaterials, function(mater,index){
                        $scope.materials.essenceMaterials.push(mater)
                    });
                    angular.forEach(arr.scentMaterials, function(mater,index){
                        $scope.materials.scentMaterials.push(mater)
                    })
                });

                $scope.searchOrderDTO = {
                    orderId : $stateParams.orderId,
                    createDate:"",
                    bigType:" ",
                    smallType:" ",
                    product:''

                };
                GetTotalPrice.save($scope.searchOrderDTO,function (data) {
                    $scope.materials.totalPrice = data.responseData
                })
            })
        }]);