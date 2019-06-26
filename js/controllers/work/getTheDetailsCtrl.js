angular.module('controllers',[]).controller('getTheDetailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','getProductDrawRecordDetail',
        function ($scope,$rootScope,$stateParams,$state,getProductDrawRecordDetail) {
            $rootScope.title = "领取想详情";
            getProductDrawRecordDetail.get({
                consumeFlowNo:$stateParams.flowNo
            },function (data) {
                $scope.details=data.responseData
            })

        }]);