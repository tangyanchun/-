angular.module('controllers',[]).controller('inventoryRecordsCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {
            $rootScope.title = "仓库产品";
            $scope.inventoryRecordsDetailsGo = function () {
                $state.go("inventoryRecordsDetails")
            }

        }])
