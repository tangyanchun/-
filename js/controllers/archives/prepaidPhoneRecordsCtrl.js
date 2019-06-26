angular.module('controllers',[]).controller('prepaidPhoneRecordsCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','GetUserConsumeByFlowId','Global',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,GetUserConsumeByFlowId,Global) {
            $rootScope.title = "充值记录";
            $scope.accountDetailsGo=function () {
                $state.go("accountDetails")
            }
            GetUserConsumeByFlowId.get({
                flowId:"10b939362aca4680b1634718106cf840" /*$stateParams.id*/
            },function(data){
                if(data.result==Global.SUCCESS&&data.responseData!=null){
                    $scope.prepaidPhoneRecords =data.responseData
                }
            })
        }]);