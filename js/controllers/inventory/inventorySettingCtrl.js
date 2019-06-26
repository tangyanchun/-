angular.module('controllers',[]).controller('inventorySettingCtrl',
               ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
                   function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {
                       $rootScope.title = "设置";
            /*库管设置*/
                       $scope.libraryTubeSettingGo = function () {
                           $state.go("libraryTubeSetting",shopStoreId:$rootScope.shopInfo.shopStoreId)
                       }

           /*产品品牌设置*/
                       $scope.productBrandGo = function () {
                           $state.go("productBrand")
                       }
            /*添加仓库产品*/
                       $scope.addProductGo = function () {
                           $state.go("addProduct")
                       }
           /*编辑仓库产品*/
                       $scope.warehouseProductsGo = function () {
                           $state.go("warehouseProducts")
                       }
                   }])
