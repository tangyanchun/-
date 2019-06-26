/**
 * Created by Administrator on 2018/5/31.
 */
angular.module('controllers',[]).controller('employeeMyStoreCtrl',
    ['$scope','$rootScope','$stateParams','$state',
        function ($scope,$rootScope,$stateParams,$state) {

            $rootScope.title = "我的门店";
            $scope.branchShopGo=function () {
                $state.go("employeeBranchShop")
            };
        }]);