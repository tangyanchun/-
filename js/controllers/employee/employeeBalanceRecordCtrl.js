/**
 * Created by Administrator on 2018/6/1.
 */
angular.module('controllers',[]).controller('employeeBalanceRecordCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {
            $rootScope.title = "欠款记录";
            $scope.accountDetailsGO=function () {
                $state.go("employeeAccountDetails")
            }
        }]);