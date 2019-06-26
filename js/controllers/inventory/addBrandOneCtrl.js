angular.module('controllers',[]).controller('addBrandOneCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {
            $rootScope.title = "添加品牌";
            $scope.addSeriesGo = function () {
                $state.go("addSeries")
            }


        }])
