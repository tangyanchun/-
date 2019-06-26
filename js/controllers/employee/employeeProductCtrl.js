/**
 * Created by Administrator on 2018/6/1.
 */
angular.module('controllers',[]).controller('employeeProductCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetUserProductList',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetUserProductList) {
            $rootScope.title = "产品";
            $scope.goProductDetails=function () {
                $state.go("employeeProductDtails")
            };
            GetUserProductList.get({sysShopId: $stateParams.sysShopId,sysUserId:$stateParams.sysUserId},function (data) {
                $scope.product=data.responseData;
            })
        }]);
