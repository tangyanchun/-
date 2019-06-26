angular.module('controllers',[]).controller('inventoryDetailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetShopProductLevelInfo','GetStockDetailList',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetShopProductLevelInfo,GetStockDetailList) {
            $rootScope.title = "仓库产品";

            $scope.param = {
                flag: false,
                type: 0, /*客装产品  易耗品*/
                selType: 0, /*扫码入库  手动入库*/
                ids: [],/*入库产品*/
                detailProductList:[],
                searchProductList:[],
                searchContent :"",
                oneLevelList:[],
                twoLevelList:[],
                multiSelectFlag:false,
                selectProductTypeOneId:'',
                selectProductList:'',
                allUseCost:'',
                useCost:'',
                productTypeName:'客装产品'
            };

            $scope.getInfo = function (type) {
                GetShopProductLevelInfo.get({shopStoreId:$rootScope.shopInfo.shopStoreId,productType:type},function(data){
                    $scope.param.detailProductList = data.responseData.detailProductList;
                    $scope.param.oneLevelList = data.responseData.oneLevelList;
                    $scope.param.twoLevelList = data.responseData.twoLevelList;
                    $scope.param.allUseCost = data.responseData.allUseCost;
                    $scope.param.useCost = data.responseData.useCost;
                    $scope.param.selectProductTypeOneId = $scope.param.oneLevelList[0].productTypeOneId;
                });
            }

            $scope.getInfo(0)
            $scope.changeBtn = function (type) {
                $scope.param.searchContent = '';
                if($scope.param.type != type){
                        $scope.param.type = type;
                    if($scope.param.multiSelectFlag){
                        $scope.getInfo(type)
                    }else{
                        $scope.param.multiSelectFlag = !$scope.param.multiSelectFlag;
                        $scope.getInfo(type)
                    }

                }else{
                    $scope.param.multiSelectFlag = !$scope.param.multiSelectFlag;
                }


                if(type=='0')
                {
                    $scope.param.productTypeName = '客装产品';
                }
                else if(type=='1')
                {
                    $scope.param.productTypeName = '院装产品';
                }
                else if(type=='2')
                {
                    $scope.param.productTypeName = '易耗品';
                }
            };


            $scope.chooseTwoLevelList = function (productTypeOneId) {
                $scope.param.selectProductTypeOneId = productTypeOneId;
            }

            $scope.search = function(){
                $scope.param.searchProductList = [];
                GetShopProductLevelInfo.get({shopStoreId:$rootScope.shopInfo.shopStoreId,productType:$scope.param.type},function(data){
                    $scope.param.detailProductList = data.responseData.detailProductList;
                    $scope.param.useCost = data.responseData.useCost;
                    angular.forEach($scope.param.detailProductList,function (value,key) {
                        if(value.productTypeOneName.indexOf($scope.param.searchContent)!=-1||
                            value.productName.indexOf($scope.param.searchContent)!=-1||
                            (value.productCode+"").indexOf($scope.param.searchContent)!=-1)
                        {
                            $scope.param.searchProductList.push(value);
                        }
                    });
                    $scope.param.detailProductList = angular.copy($scope.param.searchProductList);
                    console.log($scope.param.detailProductList);
                })
            }

            $scope.clearSearch = function()
            {
                $scope.param.searchContent = "";
                GetShopProductLevelInfo.get({shopStoreId:$rootScope.shopInfo.shopStoreId,productType:$scope.param.type},function(data){
                    $scope.param.detailProductList = data.responseData.detailProductList;
                    $scope.param.oneLevelList = data.responseData.oneLevelList;
                    $scope.param.twoLevelList = data.responseData.twoLevelList;
                    $scope.param.useCost = data.responseData.useCost;
                })
            }

            $scope.productInventoryDetailsGo = function(shopProductId){
                var timstamp = (new Date).valueOf();
                $state.go('productInventoryDetails',{shopProductId:shopProductId,dateTime:timstamp})
            }

            $scope.chooseProductList = function(productTypeTwoId,productTypeTwoName){
                $scope.param.productTypeName = productTypeTwoName;
                GetShopProductLevelInfo.get({shopStoreId:$rootScope.shopInfo.shopStoreId,levelOneId:$scope.param.selectProductTypeOneId,
                    levelTwoId:productTypeTwoId,productType:$scope.param.type},function(data){
                    $scope.param.detailProductList = data.responseData.detailProductList;
                    /*$scope.param.oneLevelList = data.responseData.oneLevelList;
                    $scope.param.twoLevelList = data.responseData.twoLevelList;*/
                    $scope.param.useCost = data.responseData.useCost;
                    $scope.param.multiSelectFlag=false;
                })
            }
            $scope.dis = function () {
                $scope.param.multiSelectFlag = false
            }
}])
