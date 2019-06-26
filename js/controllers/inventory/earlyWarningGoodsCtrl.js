angular.module('controllers', []).controller('earlyWarningGoodsCtrl',
    ['$scope', '$rootScope', '$stateParams', '$state', '$ionicLoading','GetShopProductLevelInfo','GetProductInfo','GetEarlyWarningProductLevelInfo',
        function ($scope, $rootScope, $stateParams, $state, $ionicLoading,GetShopProductLevelInfo,GetProductInfo,GetEarlyWarningProductLevelInfo) {
            $rootScope.title = "";
            $scope.sum = 0;
            $scope.param = {
                flag: false,
                type: 0, /*客装产品  易耗品*/
                selType: 0, /*扫码入库  手动入库*/
                indexs: [],/*入库产品*/
                ids: [],/*入库产品*/
                detailProductList:[],
                searchProductList:[],
                searchContent :"",
                oneLevelList:[],
                twoLevelList:[],
                multiSelectFlag:true,
                selectProductTypeOneId:'',
                selectProductList:'',
            };

             $scope.$on('$ionicView.enter', function() {
                     $rootScope.shopInfo.entryShopProductList = [];
                     $scope.sum = 0;
                     $scope.param.ids = [];
                     $scope.param.indexs = [];
                     GetEarlyWarningProductLevelInfo.get({sysShopId:$stateParams.sysShopId},function(data){

                         $scope.param.detailProductList = data.responseData.detailProductList;
                         $scope.param.oneLevelList = data.responseData.oneLevelList;
                         $scope.param.selectProductTypeOneId = $scope.param.oneLevelList[0].productTypeOneId;
                         $scope.param.twoLevelList = data.responseData.twoLevelList;
                     })
              })

            GetEarlyWarningProductLevelInfo.get({sysShopId:$stateParams.sysShopId},function(data){

                $scope.param.detailProductList = data.responseData.detailProductList;
                $scope.param.oneLevelList = data.responseData.oneLevelList;
                $scope.param.selectProductTypeOneId = $scope.param.oneLevelList[0].productTypeOneId;
                $scope.param.twoLevelList = data.responseData.twoLevelList;
            })

            
            $scope.selNext = function () {
                $scope.param.flag = true;
            };
            $scope.all = function () {
                $scope.param.multiSelectFlag = false;
            };

            $scope.threeMess = function () {
                $scope.param.flag = false;
            };


            $scope.search = function(){
                $scope.param.searchProductList = [];
                var productInfo = $("#search").val();
                GetEarlyWarningProductLevelInfo.get({sysShopId:$stateParams.sysShopId,productInfo:productInfo},function(data){
                    $scope.param.detailProductList = data.responseData.detailProductList;
                    angular.forEach($scope.param.detailProductList,function (value,key) {
                        if(value.productTypeOneName.indexOf($scope.param.searchContent)!=-1||
                            value.productName.indexOf($scope.param.searchContent)!=-1||
                            (value.productCode+"").indexOf($scope.param.searchContent)!=-1)
                        {
                            $scope.param.searchProductList.push(value);
                        }
                    })
                    $scope.param.detailProductList = angular.copy($scope.param.searchProductList);
                })
            }

            $scope.clearSearch = function(){
                $scope.param.searchContent = "";
                GetEarlyWarningProductLevelInfo.get({sysShopId:$stateParams.sysShopId},function(data){
                    $scope.param.detailProductList = data.responseData.detailProductList;
                    $scope.param.oneLevelList = data.responseData.oneLevelList;
                    $scope.param.twoLevelList = data.responseData.twoLevelList;
                })
            }
}])