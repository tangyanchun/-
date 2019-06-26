/**
 * Created by Administrator on 2018/6/1.
 */
angular.module('controllers',[]).controller('employeeAccountRecordsCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {
            $rootScope.title = "账户记录";
            $scope.goDrawCardRecords=function () {
                $state.go("employeeDrawCardRecords",{sysUserId:$stateParams.sysUserId})
            };
            $scope.recordCashierGo=function () {
                $state.go("employeeRecordCashier",{sysUserId:$stateParams.sysUserId})
            }

        }]);
