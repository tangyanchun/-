/**
 * Created by Administrator on 2018/6/1.
 */
angular.module('controllers',[]).controller('employeeDetailsOfCashierCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','ConsumeFlowNo','Global',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,ConsumeFlowNo,Global) {
            $rootScope.title = "收银详情   ";
            ConsumeFlowNo.get({
                consumeFlowNo:$stateParams.flowNo
            },function(data){
                if(data.result==Global.SUCCESS&&data.responseData!=null)
                {
                    $scope.details = data.responseData;

                }
            })
        }])
