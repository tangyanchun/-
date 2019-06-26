/**
 * Created by Administrator on 2018/5/3.
 */
angular.module('controllers',[]).controller('switchShopCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        function ($scope,$rootScope,$stateParams,$state) {

            $rootScope.title = "考勤记录-切换店铺";
            $scope.param={
                redPackerFlag:false
            };
            $scope.tabShop=function () {
                $scope.param.redPackerFlag=true;
            };
            /*$scope.closeFlag=function () {
                $scope.param.redPackerFlag=false;
            }*/
        }]);