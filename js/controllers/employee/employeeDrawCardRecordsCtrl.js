/**
 * Created by Administrator on 2018/6/1.
 */
angular.module('controllers',[]).controller('employeeDrawCardRecordsCtrl',
    ['$scope','$rootScope','$stateParams','$state','$ionicLoading','UserStampCardRecordList','Global',
        function ($scope,$rootScope,$stateParams,$state,$ionicLoading,UserStampCardRecordList,Global) {
            $rootScope.title = "划卡记录";
            $scope.goDrawCardRecordsDetail=function (flowNo) {
                $state.go("employeeDrawCardRecordsDetail",{flowNo:flowNo})
            };
            UserStampCardRecordList.get({sysUserId:$stateParams.sysUserId},function(data){
                if(data.result==Global.SUCCESS&&data.responseData!=null){
                    $scope.recordCashier =data.responseData
                }
            })
        }]);