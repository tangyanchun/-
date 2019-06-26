angular.module('controllers',[]).controller('drawCardRecordsDetailCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','ConsumeFlowNo',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,ConsumeFlowNo) {
            $rootScope.title = "详情";
            ConsumeFlowNo.get({consumeFlowNo:$stateParams.flowNo},function (data) {
                $scope.drawCardRecordsDetail=data.responseData;
                console.log( $scope.drawCardRecordsDetail)
            })
        }]);