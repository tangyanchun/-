/**
 * Created by Administrator on 2018/5/6.
 */
angular.module('controllers',[]).controller('myStoreCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetBossAllShopList','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetBossAllShopList,$ionicLoading) {

            $rootScope.title = "我的门店";
           /* $scope.branchShopGo=function (sysShopId) {
                $state.go("branchShop",{sysShopId:sysShopId})
            };*/
             /*点击价目表跳转到相应页面*/
            /* $scope.goPrices=function () {
                 $state.go("prices")
             };*/
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetBossAllShopList.get(function (data) {
                    $ionicLoading.hide()
                    $scope.shopList=data.responseData;/*根据type类型区分是美容院还是分店*/
                })
            })


        }]);