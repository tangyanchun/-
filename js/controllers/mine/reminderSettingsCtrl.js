/**
 * Created by Administrator on 2018/5/4.
 */
angular.module('controllers',[]).controller('reminderSettingsCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetShopRemindSetting','UpdateShopRemindSetting',
        function ($scope,$rootScope,$stateParams,$state,GetShopRemindSetting,UpdateShopRemindSetting) {
            $rootScope.title = "提醒设置";
            $scope.param={
                status:false
            };
            $scope.getInfo = function () {
                GetShopRemindSetting .get(function (data) {
                    $scope.remindList=data.responseData;
                    if($scope.remindList.status=="1"){
                        $scope.param.status=true/*不启动*/
                    }else {
                        $scope.param.status=false/*启动*/
                    }
                    console.log($scope.remindList.id)
                });
            };
            $scope.getInfo();
            $scope.checks=function () {
                if($scope.param.status==true){
                    $scope.remindList.status="1"
                }else {
                    $scope.remindList.status="0"
                }
                UpdateShopRemindSetting .save({id: $scope.remindList.id,status:$scope.remindList.status},function (data) {
                   if(data.result=="0x00001"){
                       $scope.getInfo();
                       $state.go("basicSetting")
                   }
                });
            }


        }]);