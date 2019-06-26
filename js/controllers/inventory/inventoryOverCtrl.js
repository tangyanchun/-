angular.module('controllers',[]).controller('inventoryOverCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {
            $rootScope.title = "盘点";

            $scope.inventoryGo = function(){
                $state.go('inventory')
            }
            $scope.inventoryRecordsDetailsGo = function(){
                $state.go('inventoryRecordsDetails')
            }



        }]);
