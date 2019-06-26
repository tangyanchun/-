angular.module('controllers',[]).controller('warehousePeopleCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {
            $rootScope.title='家人'
        $scope.addFamilyGo = function () {
            $state.go("addFamily")
        }

        }])
