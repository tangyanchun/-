/**
 * Created by Administrator on 2018/5/5.
 */
angular.module('controllers',[]).controller('basicSettingCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        function ($scope,$rootScope,$stateParams,$state) {

            $rootScope.title = "基础资料设置";
            $scope.param = {
                sysShopName:$stateParams.sysShopName
            };
            /*点击美容院设置*/
            $scope.beautySettingGo=function () {
                $state.go("beautySetting")
            };
            /*点击编辑分店*/
          /*  $scope.shopListGo=function () {
                $state.go("shopList")
            };*/
             /*添加项目*/
            $scope.addProjectGo=function () {
                $state.go("addProject")
            };
            /*修改删除项目*/
            $scope.projectListGo=function () {
                $state.go("projectList")
            };
            /*点击产品品牌设置*/
            $scope.productBrandGo=function () {
                $state.go("productBrand")
            };
            /*点击添加产品*/
            $scope.addProductGo=function () {
                $state.go("addProduct")
            };

            /*添加套卡*/
            $scope.addCardsGo=function () {
                $state.go("addCards")
            };
            /*点解项目大类*/
            $scope.projectDifferenceGo=function () {
                $state.go("projectDifference")
            };
            /*点击项目大类设置*/
            $scope.projectBrandGo=function () {
                $state.go("projectBrand")
            }
        }]);