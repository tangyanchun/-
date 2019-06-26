/**
 * Created by Administrator on 2018/6/1.
 */
angular.module('controllers',[]).controller('employeeAccountDetailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetUserConsumeByFlowId','Global',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetUserConsumeByFlowId,Global) {
            $rootScope.title = "账户记录";
            GetUserConsumeByFlowId.get({
                flowId:$stateParams.id
            },function(data){
                if(data.result==Global.SUCCESS&&data.responseData!=null){
                    $scope.accountDetails =data.responseData
                }
            })
        }])