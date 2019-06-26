angular.module('controllers',[]).controller('reservoirRunningWaterCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {
            $rootScope.title = "出水库流水";

        }])
