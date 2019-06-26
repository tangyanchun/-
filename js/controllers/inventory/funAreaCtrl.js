angular.module('controllers',[]).controller('funAreaCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {
            $rootScope.title = "汉方美业";

            $scope.putInStorageGo = function(){
                var timstamp = (new Date).valueOf();
                $state.go('putInStorage',{name:$stateParams.name,dateTime:timstamp})
            }
            $scope.outboundGo = function(){
                var timstamp = (new Date).valueOf();
                $state.go('outbound',{name:$stateParams.name,dateTime:timstamp})
            }
            $scope.inventoryDetailsGo = function(){
                var timstamp = (new Date).valueOf();
                $state.go('inventoryDetails',{shopStoreId:$rootScope.shopInfo.shopStoreId,dateTime:timstamp})
            }
            /*盘点*/
            $scope.inventoryGo = function(){
                $state.go('inventory')
            }
            /*设置*/
            $scope.inventorySettingGo = function(){
                $state.go('inventorySetting')
            }

            /*库管设置*/
            $scope.libraryTubeSettingGo = function(){
                var timstamp = (new Date).valueOf();
                $state.go('libraryTubeSetting',{shopStoreId:$rootScope.shopInfo.shopStoreId,dateTime:timstamp})
            }


            /*预警商品*/
            $scope.earlyWarningGoods = function(){
                $state.go('earlyWarningGoods',{sysShopId:$rootScope.shopInfo.shopStoreId});
            }
 }]);