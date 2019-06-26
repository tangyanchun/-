angular.module('controllers',[]).controller('historicalRecordCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading) {
            $rootScope.title = "历史记录";

            $scope.outboundOrderDetailsGo = function(){
                $state.go('outboundOrderDetails')
            }

        }])
