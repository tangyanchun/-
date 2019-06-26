/**
 * Created by Administrator on 2018/5/4.
 */
angular.module('controllers',[]).controller('systemSetupCtrl',
    ['$scope','$rootScope','$stateParams','$state','BossUserLoginOut',
        function ($scope,$rootScope,$stateParams,$state,BossUserLoginOut) {

            $rootScope.title = "设置";
            /*点击关于我们跳转到关于我们页面*/
            $scope.aboutMineGo=function () {
                $state.go("aboutMine")
            };
            /*点击退出登录*/
            $scope.exitLogon=function () {
                BossUserLoginOut.get({},function (data) {
                    if(data.result =="0x00001"){
                        alert("退出成功");
                        window.localStorage.removeItem("beautyUserLoginToken");
                        window.localStorage.removeItem("beautyBossLoginToken");
                        window.localStorage.removeItem("beautyClerkLoginToken");
                        $state.go("bossLogin",{redirectUrl:'workHome'});
                    }
                })
            }
        }]);