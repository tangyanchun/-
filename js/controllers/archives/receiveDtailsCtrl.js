angular.module('controllers',[]).controller('receiveDtailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {
            $rootScope.title = "领取详情";

        }])
