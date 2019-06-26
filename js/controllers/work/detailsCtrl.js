/**
 * Created by Administrator on 2018/5/4.
 */
angular.module('controllers',[]).controller('detailsCtrl',
    ['$scope','$rootScope','$stateParams','$state','ConsumeFlowNo','Global',
        function ($scope,$rootScope,$stateParams,$state,ConsumeFlowNo,Global) {

            $rootScope.title = "详情";
            $scope.param={
                searchFile:$stateParams.searchFile
            }
            ConsumeFlowNo.get({
                consumeFlowNo:$stateParams.flowNo
            },function(data){
                if(data.result==Global.SUCCESS&&data.responseData!=null)
                {
                    $scope.details = data.responseData;

                }
            })

        }]);