angular.module('controllers',[]).controller('accountRecordsCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {
            $rootScope.title = "账户记录";
            $scope.goDrawCardRecords=function () {
                   $state.go("drawCardRecords",{sysUserId:$stateParams.sysUserId})
               };
            $scope.recordCashierGo=function () {
                $state.go("recordCashier",{sysUserId:$stateParams.sysUserId})
            }
        }]);
