/**
 * Created by Administrator on 2018/5/4.
 */
angular.module('controllers',[]).controller('myselfCtrl',
    ['$scope','$rootScope','$stateParams','$state','GetCurrentLoginUserInfo','BossUtil','$ionicLoading',
        function ($scope,$rootScope,$stateParams,$state,GetCurrentLoginUserInfo,BossUtil,$ionicLoading) {

            $rootScope.title = "我的";

            /*点击头像跳转*/
            $scope.modificationInformationGo=function () {
                $state.go("modificationInformation")
            };
            /*点击我的门店跳转*/
            $scope.myStoreGo=function () {
                $state.go("myStore")
            };
            /*点击设置*/
            $scope.setInformationGo=function () {
                $state.go("setInformation")
            };
            /*查询我的信息*/
            $scope.$on('$ionicView.enter', function() {
                $ionicLoading.show({
                    content: 'Loading',
                    animation: 'fade-in',
                    showBackdrop: true,
                    maxWidth: 200,
                    showDelay: 0
                });
                GetCurrentLoginUserInfo.get(function (data) {
                    BossUtil.checkResponseData(data,'myself');
                    $ionicLoading.hide()
                    $scope.userInfo=data.responseData;
                })
            })

        }]);