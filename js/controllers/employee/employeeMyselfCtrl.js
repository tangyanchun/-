/**
 * Created by Administrator on 2018/5/31.
 */

angular.module('controllers',[]).controller('employeeMyselfCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetCurrentLoginUserInfo','BossUtil','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetCurrentLoginUserInfo,BossUtil,$ionicLoading) {

            $rootScope.title = "我的";
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
            /*点击头像跳转*/
            $scope.modificationInformationGo=function () {
                $state.go("employeeInformation")
            };
            /*这期不需要*/
            /*点击我的门店跳转*/
           /* $scope.myStoreGo=function () {
                $state.go("employeeMyStore")
            };*/

            /*点击设置*/
            $scope.setInformationGo=function () {
                $state.go("employeeSet")
            };

            /*查询我的信息*/
            GetCurrentLoginUserInfo.get(function (data) {
                $ionicLoading.hide();
                BossUtil.checkResponseData(data,'myself');
                $scope.userInfo=data.responseData;
            })
            });
        }]);