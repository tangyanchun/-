angular.module('controllers',[]).controller('automaticallyStorageCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {
            $rootScope.title = "扫码入库";

        }])