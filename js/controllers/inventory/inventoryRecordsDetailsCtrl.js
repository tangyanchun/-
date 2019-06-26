angular.module('controllers',[]).controller('inventoryRecordsDetailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {
            $rootScope.title = "盘点记录详情";
            /*出入库流水*/
            $scope.reservoirRunningWaterGo = function(){
                $state.go('reservoirRunningWater')
            }
            /*平仓*/
            $scope.unwindGo = function(){
                $state.go('unwind')
            }

        }])