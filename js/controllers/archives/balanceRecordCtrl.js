angular.module('controllers',[]).controller('balanceRecordCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {
            $rootScope.title = "欠款记录";
            $scope.accountDetailsGO=function () {
                $state.go("accountDetails")
            }
        }]);